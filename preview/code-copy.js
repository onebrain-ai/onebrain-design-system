/* ============================================================================
   OneBrain — code-block copy enhancer (zero dependency).

   Wires every [data-code-copy] button to copy its sibling code body
   (.code-lines or <pre>) to the clipboard, with a transient "Copied" label.
   Progressive enhancement: with no JS the block still shows the code; the
   button just does nothing. Tries the async Clipboard API first, then falls
   back to a hidden-textarea execCommand for sandboxed / insecure contexts
   (the OD preview pane can sandbox this iframe).

   SECURITY: only reads text via innerText and writes via textContent — no
   untrusted value ever touches innerHTML.
   ============================================================================ */
(function () {
  function codeText(block) {
    var body = block.querySelector(".code-lines, pre");
    return body ? body.innerText.replace(/ /g, " ") : "";
  }

  function setLabel(btn, s) {
    var node = btn.querySelector("[data-cc-text]");
    if (node) { node.textContent = s; }
  }

  function flash(btn) {
    var prev = btn.getAttribute("data-label") || "Copy";
    btn.classList.add("is-copied");
    setLabel(btn, "Copied");
    setTimeout(function () {
      btn.classList.remove("is-copied");
      setLabel(btn, prev);
    }, 1400);
  }

  function fallbackCopy(text, done) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      done();
    } catch (e) { /* clipboard genuinely unavailable — leave the block as-is */ }
  }

  function wire(btn) {
    btn.addEventListener("click", function () {
      var block = btn.closest(".code-block");
      if (!block) { return; }
      var text = codeText(block);
      var done = function () { flash(btn); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
      } else {
        fallbackCopy(text, done);
      }
    });
  }

  var btns = document.querySelectorAll("[data-code-copy]");
  Array.prototype.forEach.call(btns, wire);
})();
