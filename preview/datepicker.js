/* ============================================================================
   OneBrain Design System — datepicker.js
   Progressively enhances <div class="datepicker" data-datepicker> into a month
   calendar: prev/next nav, day selection, today marker, roving-tabindex keyboard
   (← → ↑ ↓ Home End PgUp PgDn Enter). The selected ISO date is written to a
   hidden <input> (data-datepicker-input) if present, so it still submits in a
   form. With no JS the container's fallback <input type="date"> stays usable.

   SECURITY: all dynamic values go through textContent / setAttribute. No
   untrusted HTML is ever assigned. Zero dependencies. Load before </body>.
   ============================================================================ */
(function () {
  "use strict";

  var DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]; // Monday-first
  var MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  function iso(d) {
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }
  function sameDay(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  // Monday-first column index (0..6) for a JS getDay() (0=Sun).
  function col(jsDay) { return (jsDay + 6) % 7; }

  function enhance(root) {
    var input = root.querySelector("[data-datepicker-input]");
    var today = new Date(); today.setHours(0, 0, 0, 0);

    var selected = null;
    if (input && input.value) {
      var p = input.value.split("-");
      if (p.length === 3) selected = new Date(+p[0], +p[1] - 1, +p[2]);
    }
    var view = new Date((selected || today).getFullYear(), (selected || today).getMonth(), 1);

    // Clear fallback content, build chrome.
    root.textContent = "";

    var head = el("div", "dp-head");
    var title = el("div", "dp-title");
    var nav = el("div", "dp-nav");
    var prev = navBtn("‹", "Previous month");
    var next = navBtn("›", "Next month");
    nav.appendChild(prev); nav.appendChild(next);
    head.appendChild(title); head.appendChild(nav);
    root.appendChild(head);

    var grid = el("div", "dp-grid");
    grid.setAttribute("role", "grid");
    root.appendChild(grid);

    var foot = el("div", "dp-foot");
    root.appendChild(foot);

    function render() {
      title.textContent = MONTHS[view.getMonth()] + " " + view.getFullYear();
      grid.textContent = "";
      DOW.forEach(function (d) {
        var h = el("div", "dp-dow"); h.textContent = d; h.setAttribute("role", "columnheader");
        grid.appendChild(h);
      });

      var first = new Date(view.getFullYear(), view.getMonth(), 1);
      var lead = col(first.getDay());
      var start = new Date(first); start.setDate(first.getDate() - lead);

      for (var i = 0; i < 42; i++) {
        var d = new Date(start); d.setDate(start.getDate() + i);
        var cell = document.createElement("button");
        cell.type = "button";
        cell.className = "dp-day";
        cell.textContent = String(d.getDate());
        cell.setAttribute("role", "gridcell");
        cell.setAttribute("data-iso", iso(d));
        cell.tabIndex = -1;
        if (d.getMonth() !== view.getMonth()) cell.classList.add("is-out");
        if (sameDay(d, today)) { cell.classList.add("is-today"); cell.setAttribute("aria-current", "date"); }
        if (sameDay(d, selected)) { cell.classList.add("is-selected"); cell.setAttribute("aria-selected", "true"); }
        grid.appendChild(cell);
      }
      // roving tabindex: focusable cell is selected → today → first in-month.
      var focusable = grid.querySelector(".dp-day.is-selected") ||
        grid.querySelector(".dp-day.is-today") ||
        grid.querySelector(".dp-day:not(.is-out)");
      if (focusable) focusable.tabIndex = 0;

      foot.textContent = "";
      if (selected) {
        foot.appendChild(document.createTextNode("Selected "));
        var b = document.createElement("b"); b.textContent = iso(selected);
        foot.appendChild(b);
      } else {
        foot.appendChild(document.createTextNode("Pick a date"));
      }
    }

    function pick(isoStr, focusCell) {
      var p = isoStr.split("-");
      selected = new Date(+p[0], +p[1] - 1, +p[2]);
      if (input) { input.value = isoStr; input.dispatchEvent(new Event("change", { bubbles: true })); }
      // keep view on the picked month
      view = new Date(selected.getFullYear(), selected.getMonth(), 1);
      render();
      if (focusCell) {
        var c = grid.querySelector('.dp-day[data-iso="' + isoStr + '"]');
        if (c) { c.tabIndex = 0; c.focus(); }
      }
    }

    function shiftMonth(delta) {
      view = new Date(view.getFullYear(), view.getMonth() + delta, 1);
      render();
    }

    prev.addEventListener("click", function () { shiftMonth(-1); });
    next.addEventListener("click", function () { shiftMonth(1); });

    grid.addEventListener("click", function (e) {
      var cell = e.target.closest ? e.target.closest(".dp-day") : null;
      if (cell) pick(cell.getAttribute("data-iso"), true);
    });

    grid.addEventListener("keydown", function (e) {
      var cell = e.target.closest ? e.target.closest(".dp-day") : null;
      if (!cell) return;
      var pp = cell.getAttribute("data-iso").split("-");
      var cur = new Date(+pp[0], +pp[1] - 1, +pp[2]);
      var move = 0;
      switch (e.key) {
        case "ArrowLeft": move = -1; break;
        case "ArrowRight": move = 1; break;
        case "ArrowUp": move = -7; break;
        case "ArrowDown": move = 7; break;
        case "Home": move = -col(cur.getDay()); break;
        case "End": move = 6 - col(cur.getDay()); break;
        case "PageUp": shiftMonth(-1); return e.preventDefault();
        case "PageDown": shiftMonth(1); return e.preventDefault();
        case "Enter": case " ": pick(cell.getAttribute("data-iso"), true); return e.preventDefault();
        default: return;
      }
      e.preventDefault();
      var dest = new Date(cur); dest.setDate(cur.getDate() + move);
      if (dest.getMonth() !== view.getMonth()) view = new Date(dest.getFullYear(), dest.getMonth(), 1);
      render();
      var destCell = grid.querySelector('.dp-day[data-iso="' + iso(dest) + '"]');
      if (destCell) { grid.querySelectorAll(".dp-day").forEach(function (c) { c.tabIndex = -1; }); destCell.tabIndex = 0; destCell.focus(); }
    });

    render();
  }

  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function navBtn(label, aria) {
    var b = document.createElement("button");
    b.type = "button"; b.textContent = label; b.setAttribute("aria-label", aria);
    return b;
  }

  function init() {
    var list = document.querySelectorAll("[data-datepicker]");
    for (var i = 0; i < list.length; i++) enhance(list[i]);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
