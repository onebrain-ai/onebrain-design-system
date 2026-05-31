/* ============================================================================
   OneBrain Design System — _home.js
   Shared, dependency-free "back to Index" affordance for every preview sub-page.

   Load once per sub-page (anywhere before </body>):
     <script src="_home.js"></script>
   It injects ONE fixed bottom-left pill linking to the launcher (index.html),
   styled from the design tokens (mono, hairline border, hover → section accent,
   focus ring, frosted backdrop) so the whole review gallery has a single,
   consistent way home — change the look or the target here and every sub-page
   follows (the same shared-source principle as _preview.css / accent-picker.js).
   Mirrors the docs reader's "Index" back button (docs.html).

   Bottom-left is deliberate: every card's pill + headline sit top-left and the
   product surfaces already carry top chrome + an accent picker, so this never
   collides. It reads as review/gallery chrome, not product UI, and is hidden
   in print.

     data-home   path to the launcher (default "../index.html"; pass a deeper
                 path like "../../index.html" from ui_kits/app/).
   ============================================================================ */
(function () {
  "use strict";

  /* Capture the loading <script> synchronously so data-home resolves even when
     the injection itself is deferred to DOMContentLoaded. */
  var me = document.currentScript;
  var home = (me && me.getAttribute("data-home")) || "../index.html";

  function inject() {
    if (document.querySelector(".ob-home")) { return; }

    var css = document.createElement("style");
    css.textContent =
      ".ob-home{position:fixed;left:16px;bottom:16px;z-index:9000;display:inline-flex;" +
      "align-items:center;gap:8px;padding:9px 14px;text-decoration:none;" +
      "font-family:var(--font-mono,ui-monospace,monospace);font-size:11px;" +
      "letter-spacing:.14em;text-transform:uppercase;line-height:1;" +
      "color:var(--color-muted,#a1a1aa);" +
      "background:color-mix(in srgb,var(--color-bg-deep,#020204) 84%,transparent);" +
      "border:1px solid var(--color-border,rgba(255,255,255,.12));" +
      "transition:border-color .25s ease,color .25s ease,box-shadow .25s ease;}" +
      "@supports (backdrop-filter:blur(1px)){.ob-home{" +
      "background:color-mix(in srgb,var(--color-bg-deep,#020204) 56%,transparent);" +
      "backdrop-filter:blur(14px) saturate(1.4);" +
      "-webkit-backdrop-filter:blur(14px) saturate(1.4);}}" +
      ".ob-home svg{width:14px;height:14px;flex:none;}" +
      ".ob-home:hover{border-color:var(--section-accent,#00f3ff);" +
      "color:var(--color-text,#f0f0f2);" +
      "box-shadow:0 0 0 1px color-mix(in srgb,var(--section-accent,#00f3ff) 30%,transparent)," +
      "0 8px 24px rgba(0,0,0,.45);}" +
      ".ob-home:focus-visible{outline:2px solid var(--focus-ring,#00f3ff);outline-offset:3px;}" +
      "@media print{.ob-home{display:none;}}";
    document.head.appendChild(css);

    var a = document.createElement("a");
    a.className = "ob-home";
    a.href = home;
    a.setAttribute("aria-label", "Back to design-system index");
    a.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg><span>Index</span>';
    document.body.appendChild(a);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
