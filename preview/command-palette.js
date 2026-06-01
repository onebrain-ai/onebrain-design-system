/* ============================================================================
   OneBrain Design System — command-palette.js
   Shared, dependency-free ⌘K command palette for any surface.

   WHY: OneBrain is driven by /skill slash-commands, so the command palette is
   the product's heart — yet every surface was re-rolling it inline (see the
   prior-art in surface-desktop.html). This enhancer owns one on-brand palette
   (the .command-palette / .cmdk-* component in components.css) and drives it
   from declarative data, so any surface gets ⌘K for free.

   USE: drop a config + a trigger anywhere on the page, then load this once
   before </body>:

     <button class="kbd" data-command-palette-open>⌘K</button>
     <script type="application/json" data-command-palette>
     { "placeholder": "Run a skill…",
       "groups": [ { "label": "CAPTURE",
         "items": [ { "name": "/capture", "desc": "Quick note", "icon": "capture" } ] } ] }
     </script>
     <script src="command-palette.js"></script>

   Opens on ⌘K / Ctrl-K or any [data-command-palette-open] click. Running a
   command (Enter / click) closes the palette and dispatches a bubbling
   `ob:command` CustomEvent on document — detail: { name, desc, group } — so the
   host decides what "run" means without this file knowing.

   A11y: WAI-ARIA dialog + combobox/listbox. The input is the combobox; it keeps
   focus and points at the active option via aria-activedescendant. Full keyboard
   (↑ ↓ Home End Enter Esc), focus is restored to the opener on close, the active
   row is kept in view with scrollTop only (never scrollIntoView — it can break
   the embedded preview). Motion + transparency prefs are honored via CSS.

   SECURITY: command names/descs are static developer config and the user query
   is matched only for filtering/highlight — every dynamic string is written via
   textContent / DOM nodes, never innerHTML, so a query can't inject markup.
   ============================================================================ */
(function () {
  "use strict";

  /* Lucide-style line icons (24-grid, stroke=currentColor) keyed by skill. */
  var ICONS = {
    capture:     '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    braindump:   '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    connect:     '<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/>',
    distill:     '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    consolidate: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    daily:       '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    weekly:      '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    recap:       '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
    research:    '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    summarize:   '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>',
    learn:       '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.6 4.6 0 0 1 8.91 14"/>',
    tasks:       '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    doctor:      '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    moc:         '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
    bookmark:    '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    "default":   '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>'
  };
  var SEARCH_GLYPH =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';

  function iconSvg(name) {
    var body = ICONS[name] || ICONS["default"];
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24");
    s.setAttribute("fill", "none");
    s.setAttribute("stroke", "currentColor");
    s.setAttribute("stroke-width", "1.75");
    s.setAttribute("stroke-linecap", "round");
    s.setAttribute("stroke-linejoin", "round");
    s.setAttribute("aria-hidden", "true");
    s.innerHTML = body; /* static, developer-controlled path data only */
    return s;
  }

  /* Build the name node with case-insensitive query matches wrapped in
     <span class="cmdk-hl"> — all via DOM text nodes, never innerHTML. */
  function highlightName(name, q) {
    var span = document.createElement("span");
    span.className = "cmdk-name";
    if (!q) { span.textContent = name; return span; }
    var lower = name.toLowerCase(), needle = q.toLowerCase(), i = 0, idx;
    while ((idx = lower.indexOf(needle, i)) !== -1) {
      if (idx > i) { span.appendChild(document.createTextNode(name.slice(i, idx))); }
      var hl = document.createElement("span");
      hl.className = "cmdk-hl";
      hl.textContent = name.slice(idx, idx + needle.length);
      span.appendChild(hl);
      i = idx + needle.length;
    }
    if (i < name.length) { span.appendChild(document.createTextNode(name.slice(i))); }
    return span;
  }

  function build(config) {
    /* Flatten groups → entries, tagging each item with its group label. */
    var items = [];
    (config.groups || []).forEach(function (g) {
      (g.items || []).forEach(function (it) {
        items.push({ name: it.name, desc: it.desc || "", icon: it.icon || "default", group: g.label || "" });
      });
    });

    var scrim = document.createElement("div");
    scrim.className = "cmdk-scrim";
    scrim.setAttribute("role", "dialog");
    scrim.setAttribute("aria-modal", "true");
    scrim.setAttribute("aria-label", "Command palette");

    var panel = document.createElement("div");
    panel.className = "command-palette";

    var field = document.createElement("div");
    field.className = "cmdk-field";
    field.innerHTML = SEARCH_GLYPH; /* static glyph */
    var input = document.createElement("input");
    input.className = "cmdk-input";
    input.type = "text";
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-expanded", "true");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("spellcheck", "false");
    input.setAttribute("aria-label", "Search commands");
    input.placeholder = config.placeholder || "Run a skill…";
    var hint = document.createElement("span");
    hint.className = "kbd";
    hint.textContent = "ESC";
    field.appendChild(input);
    field.appendChild(hint);

    var list = document.createElement("div");
    list.className = "cmdk-list";
    list.id = "cmdk-list";
    list.setAttribute("role", "listbox");
    list.setAttribute("aria-label", "Commands");
    input.setAttribute("aria-controls", list.id);

    var foot = document.createElement("div");
    foot.className = "cmdk-foot";
    foot.innerHTML =
      '<span><span class="kbd">↑</span><span class="kbd">↓</span> navigate</span>' +
      '<span><span class="kbd">↵</span> run</span>' +
      '<span><span class="kbd">esc</span> close</span>';

    panel.appendChild(field);
    panel.appendChild(list);
    panel.appendChild(foot);
    scrim.appendChild(panel);
    document.body.appendChild(scrim);

    var visible = [];      /* currently-rendered item elements, in order */
    var activeIdx = -1;
    var lastFocus = null;

    function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

    function setActive(i) {
      if (!visible.length) { activeIdx = -1; input.removeAttribute("aria-activedescendant"); return; }
      i = clamp(i, 0, visible.length - 1);
      activeIdx = i;
      visible.forEach(function (el, idx) {
        el.classList.toggle("is-active", idx === i);
        el.setAttribute("aria-selected", idx === i ? "true" : "false");
      });
      var el = visible[i];
      input.setAttribute("aria-activedescendant", el.id);
      /* keep in view — scrollTop only */
      var top = el.offsetTop, bottom = top + el.offsetHeight;
      if (top < list.scrollTop) { list.scrollTop = top; }
      else if (bottom > list.scrollTop + list.clientHeight) { list.scrollTop = bottom - list.clientHeight; }
    }

    function render() {
      var q = input.value.trim();
      var lower = q.toLowerCase();
      list.textContent = "";
      visible = [];
      var lastGroup = null, n = 0;
      items.forEach(function (it) {
        if (lower && it.name.toLowerCase().indexOf(lower) === -1 &&
            it.desc.toLowerCase().indexOf(lower) === -1) { return; }
        if (it.group && it.group !== lastGroup) {
          var gh = document.createElement("div");
          gh.className = "cmdk-group";
          gh.textContent = it.group;
          list.appendChild(gh);
          lastGroup = it.group;
        }
        var row = document.createElement("div");
        row.className = "cmdk-item";
        row.id = "cmdk-opt-" + (n++);
        row.setAttribute("role", "option");
        row.appendChild(iconSvg(it.icon));
        row.appendChild(highlightName(it.name, q));
        if (it.desc) {
          var d = document.createElement("span");
          d.className = "cmdk-desc";
          d.textContent = it.desc;
          row.appendChild(d);
        }
        row._item = it;
        row.addEventListener("mouseenter", function () { setActive(visible.indexOf(row)); });
        row.addEventListener("click", function () { run(row._item); });
        list.appendChild(row);
        visible.push(row);
      });
      if (!visible.length) {
        var empty = document.createElement("div");
        empty.className = "cmdk-empty";
        empty.textContent = q ? 'No command matches "' + q + '".' : "No commands.";
        list.appendChild(empty);
        activeIdx = -1;
        input.removeAttribute("aria-activedescendant");
      } else {
        setActive(0);
      }
    }

    function open() {
      if (scrim.classList.contains("is-open")) { return; }
      lastFocus = document.activeElement;
      scrim.classList.add("is-open");
      input.value = "";
      render();
      /* Land the caret in the search box. Focus now (works once the scrim is
         visible) AND again next frame as a backup — the scrim just flipped
         visibility in this tick, and .focus() on a not-yet-visible element is a
         no-op, so the rAF covers engines that need a frame to settle. */
      input.focus();
      requestAnimationFrame(function () {
        if (scrim.classList.contains("is-open") && document.activeElement !== input) { input.focus(); }
      });
    }
    function close() {
      if (!scrim.classList.contains("is-open")) { return; }
      scrim.classList.remove("is-open");
      if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
      lastFocus = null;
    }
    function toggle() { scrim.classList.contains("is-open") ? close() : open(); }

    function run(it) {
      close();
      document.dispatchEvent(new CustomEvent("ob:command", {
        bubbles: true,
        detail: { name: it.name, desc: it.desc, group: it.group }
      }));
    }

    input.addEventListener("input", render);
    input.addEventListener("keydown", function (e) {
      switch (e.key) {
        case "ArrowDown": e.preventDefault(); setActive(activeIdx + 1); break;
        case "ArrowUp":   e.preventDefault(); setActive(activeIdx - 1); break;
        case "Home":      e.preventDefault(); setActive(0); break;
        case "End":       e.preventDefault(); setActive(visible.length - 1); break;
        case "Enter":
          e.preventDefault();
          if (activeIdx >= 0 && visible[activeIdx]) { run(visible[activeIdx]._item); }
          break;
        case "Escape": e.preventDefault(); close(); break;
      }
    });

    /* Click the dimmed area (not the panel) closes. */
    scrim.addEventListener("mousedown", function (e) { if (e.target === scrim) { close(); } });

    /* Global ⌘K / Ctrl-K — capture phase + both targets for iframe focus quirks. */
    function onGlobalKey(e) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        toggle();
      }
    }
    window.addEventListener("keydown", onGlobalKey, true);
    document.addEventListener("keydown", onGlobalKey, true);

    /* Any [data-command-palette-open] opens it. */
    Array.prototype.slice.call(document.querySelectorAll("[data-command-palette-open]"))
      .forEach(function (btn) { btn.addEventListener("click", open); });

    /* Expose a tiny handle for programmatic control / tests. */
    window.OneBrainPalette = { open: open, close: close, toggle: toggle };
  }

  function init() {
    var data = document.querySelector("[data-command-palette]");
    if (!data) { return; }
    var config;
    try { config = JSON.parse(data.textContent); }
    catch (err) { return; } /* malformed config → no palette, page still works */
    build(config);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
