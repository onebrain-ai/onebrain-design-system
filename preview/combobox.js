/* ============================================================================
   OneBrain Design System — combobox.js
   Shared, dependency-free multi-select token field for any surface.

   WHY: a native <select multiple> is an unstyleable scrolling list box that
   breaks the cyber language and is hostile on touch. This enhancer keeps the
   real control (so forms still submit and it works with JS disabled) but hides
   it and renders the on-brand .combobox token field + listbox the design
   system owns (§22 in components.css).

   USE: load once before </body>. Every <select multiple data-combobox> is
   auto-enhanced. Opt out with data-combobox="false". The visible placeholder
   comes from data-placeholder.

   A11y: WAI-ARIA combobox + multiselectable listbox — the input owns focus and
   points at the active option via aria-activedescendant; full keyboard (↑ ↓
   Home End, Enter / Space to toggle, Backspace removes the last token when the
   query is empty, Esc closes); every change mirrors back to the native <select>
   and re-fires input + change. Honors prefers-reduced-motion via CSS. Never
   uses scrollIntoView (it can break the embedded preview) — scrollTop only.
   ============================================================================ */
(function () {
  "use strict";

  var CHECK =
    '<svg class="opt-check ob-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<polyline points="20 6 9 17 4 12"/></svg>';
  var X =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  var seq = 0;

  function enhance(sel) {
    if (sel.dataset.enhanced === "true") { return; }
    if (sel.getAttribute("data-combobox") === "false") { return; }
    if (!sel.multiple) { return; }

    sel.dataset.enhanced = "true";
    var uid = "cb-" + seq++;
    var opts = Array.prototype.slice.call(sel.options);

    var labelEl = sel.id ? document.querySelector('label[for="' + sel.id + '"]') : null;
    if (labelEl && !labelEl.id) { labelEl.id = uid + "-label"; }

    /* Keep the native control for form submit + a11y name, but out of flow. */
    sel.classList.add("cb-native");
    sel.setAttribute("tabindex", "-1");
    sel.setAttribute("aria-hidden", "true");
    sel.style.position = "absolute";
    sel.style.width = "1px";
    sel.style.height = "1px";
    sel.style.overflow = "hidden";
    sel.style.clip = "rect(0 0 0 0)";

    var wrap = document.createElement("div");
    wrap.className = "combobox";

    var field = document.createElement("div");
    field.className = "combobox-field";

    var input = document.createElement("input");
    input.type = "text";
    input.className = "combobox-input";
    input.id = uid + "-input";
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("spellcheck", "false");
    if (sel.dataset.placeholder) { input.placeholder = sel.dataset.placeholder; }
    if (labelEl) { input.setAttribute("aria-labelledby", labelEl.id); }
    if (sel.disabled) { input.disabled = true; }

    var list = document.createElement("ul");
    list.className = "combobox-list";
    list.id = uid + "-list";
    list.setAttribute("role", "listbox");
    list.setAttribute("aria-multiselectable", "true");
    if (labelEl) { list.setAttribute("aria-labelledby", labelEl.id); }
    list.hidden = true;
    input.setAttribute("aria-controls", list.id);

    var optEls = opts.map(function (o, i) {
      var li = document.createElement("li");
      li.className = "combobox-opt";
      li.id = uid + "-opt-" + i;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", o.selected ? "true" : "false");
      var span = document.createElement("span");
      span.className = "opt-label";
      span.textContent = o.textContent;
      li.innerHTML = CHECK; /* static SVG constant only */
      li.appendChild(span);
      list.appendChild(li);
      return li;
    });

    field.appendChild(input);
    wrap.appendChild(field);
    wrap.appendChild(list);
    sel.parentNode.insertBefore(wrap, sel.nextSibling);

    var isOpen = false;
    var activeIdx = -1;

    /* ---- selection state mirrored to the native <select> ------------------ */
    function fireChange() {
      sel.dispatchEvent(new Event("input", { bubbles: true }));
      sel.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function setSelected(i, on) {
      if (i < 0 || i >= opts.length || opts[i].disabled) { return; }
      opts[i].selected = on;
      optEls[i].setAttribute("aria-selected", on ? "true" : "false");
      renderTokens();
      fireChange();
    }

    function renderTokens() {
      /* Remove existing tokens (everything before the input). */
      Array.prototype.slice.call(field.querySelectorAll(".combobox-token"))
        .forEach(function (t) { t.remove(); });
      opts.forEach(function (o, i) {
        if (!o.selected) { return; }
        var tok = document.createElement("span");
        tok.className = "combobox-token";
        var lbl = document.createElement("span");
        lbl.textContent = o.textContent;
        var rm = document.createElement("button");
        rm.type = "button";
        rm.setAttribute("aria-label", "Remove " + o.textContent);
        rm.innerHTML = X; /* static SVG constant only */
        rm.addEventListener("click", function (e) {
          e.stopPropagation();
          setSelected(i, false);
          input.focus();
        });
        tok.appendChild(lbl);
        tok.appendChild(rm);
        field.insertBefore(tok, input);
      });
    }

    /* ---- filtering + active option --------------------------------------- */
    function visible(i) { return !optEls[i].hidden && !opts[i].disabled; }

    function filter() {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      opts.forEach(function (o, i) {
        var hit = o.textContent.toLowerCase().indexOf(q) !== -1;
        optEls[i].hidden = !hit;
        if (hit) { shown++; }
      });
      var empty = list.querySelector(".combobox-empty");
      if (!shown) {
        if (!empty) {
          empty = document.createElement("li");
          empty.className = "combobox-empty";
          list.appendChild(empty);
        }
        empty.textContent = 'No match for "' + input.value.trim() + '"';
      } else if (empty) { empty.remove(); }
      if (activeIdx < 0 || !visible(activeIdx)) { setActive(firstVisible(0, 1)); }
    }

    function firstVisible(from, dir) {
      for (var i = from; i >= 0 && i < opts.length; i += dir) {
        if (visible(i)) { return i; }
      }
      return -1;
    }

    function setActive(i) {
      activeIdx = i;
      optEls.forEach(function (el, idx) { el.classList.toggle("is-active", idx === i); });
      if (i >= 0) {
        input.setAttribute("aria-activedescendant", optEls[i].id);
        var el = optEls[i];
        var top = el.offsetTop;
        var bottom = top + el.offsetHeight;
        if (top < list.scrollTop) { list.scrollTop = top; }
        else if (bottom > list.scrollTop + list.clientHeight) { list.scrollTop = bottom - list.clientHeight; }
      } else {
        input.removeAttribute("aria-activedescendant");
      }
    }

    function step(dir) {
      var i = activeIdx;
      do { i += dir; } while (i >= 0 && i < opts.length && !visible(i));
      if (i >= 0 && i < opts.length) { setActive(i); }
    }

    function open() {
      if (isOpen || input.disabled) { return; }
      isOpen = true;
      list.hidden = false;
      input.setAttribute("aria-expanded", "true");
      filter();
      document.addEventListener("mousedown", onDocDown, true);
    }

    function close() {
      if (!isOpen) { return; }
      isOpen = false;
      list.hidden = true;
      input.setAttribute("aria-expanded", "false");
      document.removeEventListener("mousedown", onDocDown, true);
    }

    function onDocDown(e) { if (!wrap.contains(e.target)) { close(); } }

    field.addEventListener("mousedown", function (e) {
      if (e.target === field) { e.preventDefault(); input.focus(); open(); }
    });
    /* Open on click / typing / ArrowDown — NOT on bare focus, so tabbing into
       the field (or landing on it on load) shows the tokens without exploding
       the option list open. */
    input.addEventListener("click", open);
    input.addEventListener("input", function () { open(); filter(); });

    input.addEventListener("keydown", function (e) {
      switch (e.key) {
        case "ArrowDown": e.preventDefault(); if (!isOpen) { open(); } else { step(1); } break;
        case "ArrowUp": e.preventDefault(); if (isOpen) { step(-1); } break;
        case "Home": if (isOpen) { e.preventDefault(); setActive(firstVisible(0, 1)); } break;
        case "End": if (isOpen) { e.preventDefault(); setActive(firstVisible(opts.length - 1, -1)); } break;
        case "Enter":
          if (isOpen && activeIdx >= 0) { e.preventDefault(); toggleActive(); }
          break;
        case "Backspace":
          if (input.value === "") {
            var last = lastSelected();
            if (last >= 0) { e.preventDefault(); setSelected(last, false); }
          }
          break;
        case "Escape": if (isOpen) { e.preventDefault(); close(); } break;
      }
    });

    function toggleActive() {
      if (activeIdx < 0) { return; }
      var on = !opts[activeIdx].selected;
      setSelected(activeIdx, on);
      input.value = "";
      filter();
    }

    function lastSelected() {
      for (var i = opts.length - 1; i >= 0; i--) { if (opts[i].selected) { return i; } }
      return -1;
    }

    optEls.forEach(function (el, i) {
      if (opts[i].disabled) { el.setAttribute("aria-disabled", "true"); return; }
      el.addEventListener("mouseenter", function () { setActive(i); });
      el.addEventListener("click", function () {
        setSelected(i, !opts[i].selected);
        input.value = "";
        filter();
        input.focus();
      });
    });

    renderTokens();
  }

  function init() {
    Array.prototype.slice
      .call(document.querySelectorAll("select[multiple][data-combobox]"))
      .forEach(enhance);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
