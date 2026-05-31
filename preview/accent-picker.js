/* ============================================================================
   OneBrain Design System — accent-picker.js
   Shared, dependency-free runtime accent picker for any surface.

   Drop a `.accent-dots` group anywhere in a surface's chrome, then load this
   script once before </body>. Each group re-keys its target's accent intents
   (--section-accent / --action-primary / --action-primary-weak / --grad-button)
   from a single click, so eyebrows, active tabs, CTAs, chips, focus rings and
   glows all follow one source of truth. The choice persists to localStorage.

   Per-group config via data-attributes on the `.accent-dots` element:
     data-accent-target   CSS selector for the surface root to re-key
                          (default: <html>, which overrides :root and cascades
                          to everything, including fixed chrome).
     data-accent-key      localStorage key (default: "ob-accent" — shared so a
                          chosen accent follows the user across surfaces).
     data-accent-default  fallback accent when nothing is stored (default: cyan).

   Each child swatch button carries data-accent="cyan|violet|magenta|amber".
   Only the four brand accents are offered so any choice stays on-palette.
   ============================================================================ */
(function () {
  "use strict";

  /* Each option pairs the chosen accent with a sibling brand accent for the
     button-frame gradient — every combination stays within the palette. */
  var ACCENTS = {
    cyan:    { c: "var(--color-accent-2)", g: "linear-gradient(135deg, var(--color-accent-2), var(--color-accent))" },
    violet:  { c: "var(--color-accent)",   g: "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))" },
    magenta: { c: "var(--color-accent-3)", g: "linear-gradient(135deg, var(--color-accent-3), var(--color-accent))" },
    amber:   { c: "var(--color-accent-4)", g: "linear-gradient(135deg, var(--color-accent-4), var(--color-accent-3))" }
  };

  function initGroup(group) {
    var targetSel = group.getAttribute("data-accent-target");
    var target = targetSel ? document.querySelector(targetSel) : document.documentElement;
    if (!target) { target = document.documentElement; }
    var key = group.getAttribute("data-accent-key") || "ob-accent";
    var def = group.getAttribute("data-accent-default") || "cyan";
    var dots = Array.prototype.slice.call(group.querySelectorAll("[data-accent]"));

    function apply(name) {
      var a = ACCENTS[name];
      if (!a) { return; }
      target.style.setProperty("--section-accent", a.c);
      target.style.setProperty("--action-primary", a.c);
      target.style.setProperty("--action-primary-weak", "color-mix(in srgb, " + a.c + " 12%, transparent)");
      target.style.setProperty("--grad-button", a.g);
      dots.forEach(function (d) {
        var on = d.getAttribute("data-accent") === name;
        d.classList.toggle("is-sel", on);
        d.setAttribute("aria-checked", on ? "true" : "false");
        d.setAttribute("aria-pressed", on ? "true" : "false");
      });
      try { localStorage.setItem(key, name); } catch (e) { /* private mode */ }
    }

    var saved = null;
    try { saved = localStorage.getItem(key); } catch (e) { /* private mode */ }
    apply(ACCENTS[saved] ? saved : def);

    dots.forEach(function (d) {
      d.addEventListener("click", function () { apply(d.getAttribute("data-accent")); });
    });
  }

  function init() {
    Array.prototype.slice
      .call(document.querySelectorAll(".accent-dots"))
      .forEach(initGroup);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
