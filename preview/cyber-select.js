/* ============================================================================
   OneBrain Design System — cyber-select.js
   Shared, dependency-free custom <select> listbox for any surface.

   WHY: .cyber-select styles the CLOSED control (the dark field + HUD caret),
   but a native <select>'s open popup is painted by the OS and cannot be
   styled — so the moment it opens you get the bright OS-blue, rounded,
   system-font list that breaks the cyber language. This enhancer keeps the
   real <select> (so forms still submit and it works with JS disabled) but
   hides it and renders an on-brand .cs-list popup the design system owns.

   USE: load once before </body>. Every `.cyber-select` that wraps a <select>
   is auto-enhanced. Opt a control OUT with data-enhance="false".

   A11y: WAI-ARIA collapsed combobox / listbox pattern — trigger keeps focus
   and points at the active option via aria-activedescendant; full keyboard
   (↑ ↓ Home End Enter Space Esc Tab) + first-letter typeahead; selection is
   mirrored back to the native <select> which re-fires input + change.
   Honors prefers-reduced-motion via CSS. Never uses scrollIntoView (it can
   break the embedded preview) — the list scrolls via scrollTop only.
   ============================================================================ */
(function () {
  "use strict";

  var CHECK =
    '<svg class="cs-check" viewBox="0 0 24 24" width="16" height="16" fill="none" ' +
    'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
    'aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

  var seq = 0;

  function enhance(wrap) {
    if (wrap.dataset.enhanced === "true") { return; }
    if (wrap.getAttribute("data-enhance") === "false") { return; }
    var sel = wrap.querySelector("select");
    if (!sel) { return; }

    wrap.dataset.enhanced = "true";
    var uid = "cs-" + seq++;
    var opts = Array.prototype.slice.call(sel.options);

    /* Resolve the visible label so the trigger + list are named by it. */
    var label = sel.id ? document.querySelector('label[for="' + sel.id + '"]') : null;
    if (label && !label.id) { label.id = uid + "-label"; }

    /* Keep the native control for form submit + a11y name, but out of flow. */
    sel.classList.add("cs-native");
    sel.setAttribute("tabindex", "-1");
    sel.setAttribute("aria-hidden", "true");

    /* Trigger button — same shape as the native field. */
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cs-trigger";
    btn.id = uid + "-btn";
    btn.setAttribute("aria-haspopup", "listbox");
    btn.setAttribute("aria-expanded", "false");
    if (label) { btn.setAttribute("aria-labelledby", label.id + " " + btn.id); }
    if (sel.disabled) { btn.disabled = true; }
    var valEl = document.createElement("span");
    valEl.className = "cs-value";
    btn.appendChild(valEl);

    /* Listbox popup. */
    var list = document.createElement("ul");
    list.className = "cs-list";
    list.id = uid + "-list";
    list.setAttribute("role", "listbox");
    list.setAttribute("tabindex", "-1");
    if (label) { list.setAttribute("aria-labelledby", label.id); }
    list.hidden = true;
    btn.setAttribute("aria-controls", list.id);

    var optEls = opts.map(function (o, i) {
      var li = document.createElement("li");
      li.className = "cs-opt";
      li.id = uid + "-opt-" + i;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", o.selected ? "true" : "false");
      if (o.selected) { li.classList.add("is-selected"); }
      if (o.disabled) { li.classList.add("is-disabled"); li.setAttribute("aria-disabled", "true"); }
      var span = document.createElement("span");
      span.className = "cs-opt-label";
      span.textContent = o.textContent;
      li.innerHTML = CHECK;
      li.appendChild(span);
      list.appendChild(li);
      return li;
    });

    wrap.appendChild(btn);
    wrap.appendChild(list);

    var isOpen = false;
    var activeIdx = sel.selectedIndex < 0 ? firstEnabled(0, 1) : sel.selectedIndex;

    function firstEnabled(from, dir) {
      for (var i = from; i >= 0 && i < opts.length; i += dir) {
        if (!opts[i].disabled) { return i; }
      }
      return -1;
    }

    function renderValue() {
      valEl.textContent = sel.selectedIndex >= 0 ? opts[sel.selectedIndex].textContent : "";
    }

    /* Move the active (highlighted) option, skipping disabled in `dir`. */
    function setActive(i, dir) {
      dir = dir || 1;
      i = Math.max(0, Math.min(opts.length - 1, i));
      while (i >= 0 && i < opts.length && opts[i].disabled) { i += dir; }
      if (i < 0 || i >= opts.length) { return; }
      activeIdx = i;
      optEls.forEach(function (el, idx) { el.classList.toggle("is-active", idx === i); });
      list.setAttribute("aria-activedescendant", optEls[i].id);
      /* Keep the active row in view — scrollTop only, never scrollIntoView. */
      var el = optEls[i];
      var top = el.offsetTop - list.clientTop;
      var bottom = top + el.offsetHeight;
      if (top < list.scrollTop) { list.scrollTop = top; }
      else if (bottom > list.scrollTop + list.clientHeight) { list.scrollTop = bottom - list.clientHeight; }
    }

    function open() {
      if (isOpen || btn.disabled) { return; }
      isOpen = true;
      wrap.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      list.hidden = false;
      setActive(sel.selectedIndex < 0 ? firstEnabled(0, 1) : sel.selectedIndex);
      document.addEventListener("mousedown", onDocDown, true);
    }

    function close(focusBtn) {
      if (!isOpen) { return; }
      isOpen = false;
      wrap.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      list.hidden = true;
      document.removeEventListener("mousedown", onDocDown, true);
      if (focusBtn) { btn.focus(); }
    }

    function commit(i) {
      if (i < 0 || i >= opts.length || opts[i].disabled) { return; }
      sel.selectedIndex = i;
      optEls.forEach(function (el, idx) {
        var on = idx === i;
        el.classList.toggle("is-selected", on);
        el.setAttribute("aria-selected", on ? "true" : "false");
      });
      renderValue();
      sel.dispatchEvent(new Event("input", { bubbles: true }));
      sel.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function onDocDown(e) { if (!wrap.contains(e.target)) { close(false); } }

    /* First-letter typeahead — buffers keystrokes for 600ms. */
    var buf = "", bufTimer = null;
    function typeahead(ch) {
      if (!isOpen) { open(); }
      buf += ch.toLowerCase();
      if (bufTimer) { clearTimeout(bufTimer); }
      bufTimer = setTimeout(function () { buf = ""; }, 600);
      for (var j = 0; j < opts.length; j++) {
        if (opts[j].disabled) { continue; }
        var t = opts[j].textContent.toLowerCase();
        var tn = t.replace(/^[^a-z0-9]+/, ""); /* skip a leading "/" on slash-commands */
        if (t.indexOf(buf) === 0 || tn.indexOf(buf) === 0) { setActive(j); return; }
      }
    }

    btn.addEventListener("click", function () { isOpen ? close(true) : open(); });

    btn.addEventListener("keydown", function (e) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          isOpen ? setActive(activeIdx + 1, 1) : open();
          break;
        case "ArrowUp":
          e.preventDefault();
          isOpen ? setActive(activeIdx - 1, -1) : open();
          break;
        case "Home": if (isOpen) { e.preventDefault(); setActive(0, 1); } break;
        case "End": if (isOpen) { e.preventDefault(); setActive(opts.length - 1, -1); } break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (!isOpen) { open(); } else { commit(activeIdx); close(true); }
          break;
        case "Escape": if (isOpen) { e.preventDefault(); close(true); } break;
        case "Tab": if (isOpen) { commit(activeIdx); close(false); } break;
        default:
          if (e.key.length === 1 && /\S/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) {
            e.preventDefault();
            typeahead(e.key);
          }
      }
    });

    optEls.forEach(function (el, i) {
      if (opts[i].disabled) { return; }
      el.addEventListener("mouseenter", function () { setActive(i); });
      el.addEventListener("click", function () { commit(i); close(true); });
    });

    renderValue();
  }

  function init() {
    Array.prototype.slice
      .call(document.querySelectorAll(".cyber-select"))
      .forEach(enhance);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
