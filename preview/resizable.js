/* ============================================================================
   OneBrain Design System — resizable.js
   Drag-to-resize for <div class="resizable" data-resizable> with a .pane on each
   side of a .resizer splitter. Pointer events (mouse + touch + pen), honors each
   pane's CSS min-width, and supports ← → keyboard nudge on a focused .resizer
   (role="separator", aria-valuenow updated). The left pane carries the width;
   the right pane fills. With no JS the panes just sit side by side.
   Zero dependencies. Load before </body>.
   ============================================================================ */
(function () {
  "use strict";

  var STEP = 16; // px per arrow press

  function minOf(node, fallback) {
    var m = parseFloat(getComputedStyle(node).minWidth);
    return isNaN(m) ? fallback : m;
  }

  function enhance(box) {
    var resizer = box.querySelector(".resizer");
    if (!resizer) return;
    var left = resizer.previousElementSibling;
    var right = resizer.nextElementSibling;
    if (!left || !right) return;

    // Left pane owns the width; right pane fills the rest.
    left.classList.add("pane-fixed");
    right.classList.add("pane-fill");
    if (!left.style.width) left.style.width = Math.round(box.clientWidth * 0.4) + "px";

    resizer.setAttribute("role", "separator");
    resizer.setAttribute("aria-orientation", "vertical");
    resizer.setAttribute("tabindex", "0");

    function bounds() {
      var total = box.clientWidth - resizer.offsetWidth;
      return { lo: minOf(left, 84), hi: total - minOf(right, 84), total: total };
    }
    function setWidth(px) {
      var b = bounds();
      px = Math.max(b.lo, Math.min(b.hi, px));
      left.style.width = px + "px";
      resizer.setAttribute("aria-valuemin", String(Math.round(b.lo)));
      resizer.setAttribute("aria-valuemax", String(Math.round(b.hi)));
      resizer.setAttribute("aria-valuenow", String(Math.round(px)));
    }

    var dragging = false;
    resizer.addEventListener("pointerdown", function (e) {
      dragging = true;
      resizer.classList.add("is-drag");
      resizer.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    resizer.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var rect = box.getBoundingClientRect();
      setWidth(e.clientX - rect.left - resizer.offsetWidth / 2);
    });
    function end(e) {
      if (!dragging) return;
      dragging = false;
      resizer.classList.remove("is-drag");
      try { resizer.releasePointerCapture(e.pointerId); } catch (_) {}
    }
    resizer.addEventListener("pointerup", end);
    resizer.addEventListener("pointercancel", end);

    resizer.addEventListener("keydown", function (e) {
      var w = left.getBoundingClientRect().width;
      if (e.key === "ArrowLeft") { setWidth(w - STEP); e.preventDefault(); }
      else if (e.key === "ArrowRight") { setWidth(w + STEP); e.preventDefault(); }
      else if (e.key === "Home") { setWidth(bounds().lo); e.preventDefault(); }
      else if (e.key === "End") { setWidth(bounds().hi); e.preventDefault(); }
    });

    // initialize aria + clamp to current bounds
    setWidth(left.getBoundingClientRect().width);
    window.addEventListener("resize", function () { setWidth(left.getBoundingClientRect().width); });
  }

  function init() {
    var list = document.querySelectorAll("[data-resizable]");
    for (var i = 0; i < list.length; i++) enhance(list[i]);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
