/* ============================================================================
   OneBrain Design System — ui-actions.js
   Tiny, dependency-free wiring for reusable behaviors:

     [data-dismiss]        — closes the nearest .banner / .alert / .toast / .notif
                             by setting [hidden]. Put it on the × button.
     [data-toggle-active]  — flips a .toolbar-btn between pressed / unpressed
                             (toggles .is-active + aria-pressed). For app-driven
                             formatting-style controls in a .toolbar (§20).
     [data-notif-read]     — marks the nearest .notif read (drops .is-unread).
     [data-notif-read-all] — marks every .notif in its .notif-center read.

   The .notif-center unread count pill ([data-notif-count]) re-syncs after any
   read / dismiss. Event-delegated from the document so it also covers nodes
   added later. Load once before </body>.
   ============================================================================ */
(function () {
  "use strict";

  function syncCount(center) {
    if (!center) return;
    var pill = center.querySelector("[data-notif-count]");
    if (!pill) return;
    var n = center.querySelectorAll(".notif.is-unread:not([hidden])").length;
    pill.textContent = String(n);
    pill.hidden = n === 0;
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t.closest) return;

    var readAll = t.closest("[data-notif-read-all]");
    if (readAll) {
      var center = readAll.closest(".notif-center");
      if (center) {
        center.querySelectorAll(".notif.is-unread").forEach(function (n) { n.classList.remove("is-unread"); });
        syncCount(center);
      }
      return;
    }

    var read = t.closest("[data-notif-read]");
    if (read) {
      var row = read.closest(".notif");
      if (row) { row.classList.remove("is-unread"); syncCount(row.closest(".notif-center")); }
      return;
    }

    var dismiss = t.closest("[data-dismiss]");
    if (dismiss) {
      var box = dismiss.closest(".banner, .alert, .toast, .notif");
      if (box) { box.hidden = true; syncCount(box.closest(".notif-center")); }
      return;
    }

    var toggle = t.closest("[data-toggle-active]");
    if (toggle) {
      var on = toggle.getAttribute("aria-pressed") !== "true";
      toggle.setAttribute("aria-pressed", on ? "true" : "false");
      toggle.classList.toggle("is-active", on);
    }
  });
})();
