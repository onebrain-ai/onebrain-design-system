/* ============================================================================
   OneBrain Design System — ui-actions.js
   Tiny, dependency-free wiring for two reusable behaviors:

     [data-dismiss]        — closes the nearest .banner / .alert / .toast by
                             setting [hidden]. Put it on the × button.
     [data-toggle-active]  — flips a .toolbar-btn between pressed / unpressed
                             (toggles .is-active + aria-pressed). For app-driven
                             formatting-style controls in a .toolbar (§20).

   Event-delegated from the document so it also covers nodes added later. Load
   once before </body>.
   ============================================================================ */
(function () {
  "use strict";

  document.addEventListener("click", function (e) {
    var dismiss = e.target.closest ? e.target.closest("[data-dismiss]") : null;
    if (dismiss) {
      var box = dismiss.closest(".banner, .alert, .toast");
      if (box) { box.hidden = true; }
      return;
    }
    var toggle = e.target.closest ? e.target.closest("[data-toggle-active]") : null;
    if (toggle) {
      var on = toggle.getAttribute("aria-pressed") !== "true";
      toggle.setAttribute("aria-pressed", on ? "true" : "false");
      toggle.classList.toggle("is-active", on);
    }
  });
})();
