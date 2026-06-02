/* extras.js — rating · color picker · carousel · popover dismiss.
   Zero-dependency progressive enhancers for the OneBrain showcase, in the same
   shape as ui-actions.js (one file, several small widget initializers guarded by
   the presence of their markup).
   SECURITY: no innerHTML with runtime/user data — every dynamic value goes through
   textContent / setAttribute / style. Created elements (carousel dots) carry only
   static class + aria strings. */
(function () {
  'use strict';

  // ---- RATING ---------------------------------------------------------------
  // Every glyph is the same star; .is-on colors it. Hover previews, click commits,
  // ←/→ adjust. data-readonly renders a static display rating.
  function initRating(el) {
    var stars = Array.prototype.slice.call(el.querySelectorAll('.rating-star'));
    var out = el.querySelector('.rating-value');
    var max = stars.length;
    if (!max) return;
    var value = parseFloat(el.getAttribute('data-value')) || 0;

    function paint(v) {
      stars.forEach(function (s, i) { s.classList.toggle('is-on', i < Math.round(v)); });
      if (out) out.textContent = v.toFixed(1);
    }
    function set(v) {
      value = Math.max(0, Math.min(max, v));
      el.setAttribute('data-value', String(value));
      paint(value);
    }
    paint(value);
    if (el.hasAttribute('data-readonly')) return;

    el.setAttribute('role', 'radiogroup');
    stars.forEach(function (s, i) {
      s.setAttribute('type', 'button');
      s.setAttribute('aria-label', (i + 1) + ' of ' + max + ' stars');
      s.addEventListener('mouseenter', function () { paint(i + 1); });
      s.addEventListener('click', function () { set(i + 1); });
      s.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); set(value + 1); focusActive(); }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); set(value - 1); focusActive(); }
      });
    });
    el.addEventListener('mouseleave', function () { paint(value); });
    function focusActive() { var i = Math.max(0, Math.round(value) - 1); if (stars[i]) stars[i].focus(); }
  }

  // ---- COLOR PICKER ---------------------------------------------------------
  // Generic swatch + hex field (distinct from the theme accent picker). The swatch
  // IS the color; the selected ring uses the accent. Degrades to a plain hex input.
  function initColorPicker(el) {
    var swatches = Array.prototype.slice.call(el.querySelectorAll('.cp-swatch'));
    var hex = el.querySelector('.cp-hex');
    var preview = el.querySelector('.cp-preview');

    function apply(color, fromInput) {
      if (preview) preview.style.background = color;
      if (hex && !fromInput) hex.value = color.toUpperCase();
      swatches.forEach(function (s) {
        s.classList.toggle('is-sel', (s.getAttribute('data-color') || '').toLowerCase() === color.toLowerCase());
      });
    }
    swatches.forEach(function (s) {
      var c = s.getAttribute('data-color') || '';
      s.setAttribute('type', 'button');
      s.setAttribute('aria-label', c);
      s.style.background = c;
      s.addEventListener('click', function () { apply(c, false); });
    });
    if (hex) {
      hex.addEventListener('input', function () {
        var v = hex.value.trim();
        if (/^#?[0-9a-fA-F]{6}$/.test(v)) apply(v.charAt(0) === '#' ? v : '#' + v, true);
      });
    }
    var init = (hex && hex.value) || (swatches[0] && swatches[0].getAttribute('data-color')) || '#00f3ff';
    apply(init, false);
  }

  // ---- CAROUSEL -------------------------------------------------------------
  // CSS scroll-snap track + generated dots + prev/next. Keyboard + free-scroll sync,
  // ctrls disable at the ends.
  function initCarousel(el) {
    var track = el.querySelector('.carousel-track');
    var slides = Array.prototype.slice.call(el.querySelectorAll('.carousel-slide'));
    var prev = el.querySelector('.carousel-prev');
    var next = el.querySelector('.carousel-next');
    var dotsWrap = el.querySelector('.carousel-dots');
    if (!track || !slides.length) return;
    var idx = 0;
    var dots = [];

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var d = document.createElement('button');
        d.type = 'button';
        d.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
        d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        d.addEventListener('click', function () { go(i); });
        dotsWrap.appendChild(d);
        dots.push(d);
      });
    }
    function clamp(i) { return Math.max(0, Math.min(slides.length - 1, i)); }
    function go(i) {
      idx = clamp(i);
      track.scrollTo({ left: slides[idx].offsetLeft - slides[0].offsetLeft, behavior: 'smooth' });
      sync();
    }
    function sync() {
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
      if (prev) prev.toggleAttribute('disabled', idx <= 0);
      if (next) next.toggleAttribute('disabled', idx >= slides.length - 1);
    }
    if (prev) prev.addEventListener('click', function () { go(idx - 1); });
    if (next) next.addEventListener('click', function () { go(idx + 1); });

    var raf;
    track.addEventListener('scroll', function () {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var base = slides[0].offsetLeft, nearest = 0, best = Infinity;
        slides.forEach(function (s, i) {
          var d = Math.abs((s.offsetLeft - base) - track.scrollLeft);
          if (d < best) { best = d; nearest = i; }
        });
        idx = nearest; sync();
      });
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
    });
    sync();
  }

  // ---- POPOVER (native <details>) — outside-click + Esc dismiss -------------
  function initPopover(el) {
    document.addEventListener('click', function (e) {
      if (el.open && !el.contains(e.target)) el.open = false;
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && el.open) {
        el.open = false;
        var s = el.querySelector('summary');
        if (s) s.focus();
      }
    });
  }

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  ready(function () {
    document.querySelectorAll('[data-rating]').forEach(initRating);
    document.querySelectorAll('[data-color-picker]').forEach(initColorPicker);
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);
    document.querySelectorAll('.popover').forEach(initPopover);
  });
})();
