/* ============================================================================
   OneBrain Design System — showcase-prefs.js
   Lets the showcase shell (index.html) theme THIS preview from its right-hand
   customizer, even when the preview pane renders us inside a sandboxed iframe
   where the shell cannot reach our DOM (contentDocument is blocked across an
   opaque/cross-origin boundary).

   Two delivery paths, so it works in every embedding:
     1. postMessage  — the shell posts {type:"ob-sc-prefs", prefs:{…}} to us on
        load, on every control change, and whenever we announce we're ready.
        This crosses a sandbox boundary that contentDocument cannot.
     2. URL hash     — the shell also appends "#ob=theme:…,accent:…" to our src
        (and to the "Open in new tab" link), so the very first paint and any
        standalone open already carry the chosen settings.
   Standalone (opened directly, no shell): we fall back to the shell's stored
   prefs in localStorage, so a preview remembers the last customizer choice.

   We only ever write to OUR OWN <html> — never read the parent. Each value maps
   to a real design-system token, identical to accent-picker.js / the shell.
   ============================================================================ */
(function () {
  "use strict";

  /* Accent name -> the section/action intents + button-frame gradient.
     Mirrors the showcase shell: four brand accents + two section-identity
     accents (green = success, grey = muted) so any choice stays on-palette. */
  var ACCENTS = {
    cyan:    { c: "var(--color-accent-2)", g: "linear-gradient(135deg, var(--color-accent-2), var(--color-accent))" },
    violet:  { c: "var(--color-accent)",   g: "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))" },
    magenta: { c: "var(--color-accent-3)", g: "linear-gradient(135deg, var(--color-accent-3), var(--color-accent))" },
    amber:   { c: "var(--color-accent-4)", g: "linear-gradient(135deg, var(--color-accent-4), var(--color-accent-3))" },
    green:   { c: "var(--color-success)",  g: "linear-gradient(135deg, var(--color-success), var(--color-accent-2))" },
    grey:    { c: "var(--color-muted)",    g: "linear-gradient(135deg, var(--color-muted), var(--color-text))" }
  };

  var root = document.documentElement;

  function apply(p) {
    if (!p) { return; }
    if (p.theme === "light") { root.setAttribute("data-theme", "light"); }
    else if (p.theme === "dark") { root.removeAttribute("data-theme"); }
    if (p.density === "compact") { root.setAttribute("data-density", "compact"); }
    else if (p.density === "comfortable") { root.removeAttribute("data-density"); }
    if (p.dir === "ltr" || p.dir === "rtl") { root.setAttribute("dir", p.dir); }
    var a = ACCENTS[p.accent];
    if (a) {
      root.style.setProperty("--section-accent", a.c);
      root.style.setProperty("--action-primary", a.c);
      root.style.setProperty("--action-primary-weak", "color-mix(in srgb, " + a.c + " 12%, transparent)");
      root.style.setProperty("--grad-button", a.g);
    }
  }

  /* "#ob=theme:dark,accent:cyan,density:comfortable,dir:ltr" -> object */
  function fromHash() {
    var h = (location.hash || "").replace(/^#/, "");
    var i = h.indexOf("ob=");
    if (i === -1) { return null; }
    var seg = h.slice(i + 3).split("&")[0];
    var p = {};
    seg.split(",").forEach(function (kv) {
      var j = kv.indexOf(":");
      if (j > 0) { p[kv.slice(0, j)] = decodeURIComponent(kv.slice(j + 1)); }
    });
    return p;
  }

  /* The shell's persisted prefs (same-origin standalone open). */
  function fromStore() {
    try {
      var p = {
        theme:   localStorage.getItem("sc:theme"),
        accent:  localStorage.getItem("sc:accent"),
        density: localStorage.getItem("sc:density"),
        dir:     localStorage.getItem("sc:dir")
      };
      if (p.theme || p.accent || p.density || p.dir) { return p; }
    } catch (e) { /* storage blocked */ }
    return null;
  }

  /* Live updates from the shell — the sandbox-safe path. */
  window.addEventListener("message", function (e) {
    var d = e && e.data;
    if (d && d.type === "ob-sc-prefs") { apply(d.prefs); }
  });
  window.addEventListener("hashchange", function () {
    var p = fromHash();
    if (p) { apply(p); }
  });

  /* Initial paint: hash wins (shell-provided / Open link), else stored prefs. */
  apply(fromHash() || fromStore());

  /* Announce readiness so the shell can (re)send current prefs without a race. */
  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "ob-sc-ready" }, "*");
    }
  } catch (e) { /* no parent */ }
})();
