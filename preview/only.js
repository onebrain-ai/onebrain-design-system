/* only.js — single-component focus view for bundled preview pages.
   When a page is opened with ?only=<id>, show just the matching
   <section data-component="<id>"> and hide the page intro + siblings,
   so the showcase sidebar can list ONE entry per component (Storybook-
   style) while the file still renders as a full topical page with no
   ?only. Zero-dependency. The full page (no query) is untouched, and
   the source-basis section stays in the HTML for the package audit —
   it is only hidden from the focused view, not removed. */
(function () {
  var only = null;
  try { only = new URLSearchParams(location.search).get("only"); } catch (e) {}
  if (!only) return;

  // Robust hide — beats demo rules like .banner-stack{display:flex}.
  var s = document.createElement("style");
  s.textContent = "[data-only-hide]{display:none !important}";
  document.head.appendChild(s);

  document.documentElement.setAttribute("data-only", only);

  var match = null;
  var sections = document.querySelectorAll("[data-component]");
  for (var i = 0; i < sections.length; i++) {
    if (sections[i].getAttribute("data-component") === only) match = sections[i];
    else sections[i].setAttribute("data-only-hide", "");
  }

  // Hide the page-level lede (the component now owns the headline).
  var ledes = document.querySelectorAll(".lede");
  for (var j = 0; j < ledes.length; j++) ledes[j].setAttribute("data-only-hide", "");

  // Retitle the page H1 + eyebrow to the focused component.
  if (match) {
    var title = match.getAttribute("data-title");
    if (title) {
      var h1 = document.querySelector("h1");
      if (h1) h1.textContent = title;
      var crumb = match.getAttribute("data-crumb");
      var pill = document.querySelector(".cyber-pill");
      if (pill && crumb) {
        // keep the pulsing dot, replace the trailing label text only
        var dot = pill.querySelector(".cyber-dot");
        pill.textContent = "";
        if (dot) pill.appendChild(dot);
        pill.appendChild(document.createTextNode(" " + crumb));
      }
    }
    if (typeof match.scrollIntoView !== "function") { /* no-op */ }
  }
})();
