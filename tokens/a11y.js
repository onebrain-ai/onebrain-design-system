#!/usr/bin/env node
/**
 * a11y.js — WCAG 2.1 contrast guard for the OneBrain design system.
 *
 * Parses the REAL hex values out of `colors_and_type.css` (not a static copy)
 * and asserts the documented text / UI contrast pairs meet WCAG AA. This makes
 * the ratios claimed in `ACCESSIBILITY.md` machine-verified: re-ink a light
 * accent below AA and `npm test` fails. Pairs with `check.js` (token drift):
 * check.js keeps the token sources identical, a11y.js keeps them legible.
 *
 * Zero dependencies. Exits non-zero on any failure.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const CSS = fs.readFileSync(path.join(__dirname, '..', 'colors_and_type.css'), 'utf8');

// --- sRGB relative luminance + WCAG 2.1 contrast ratio -----------------------
function hexToRgb(hex) {
  const h = hex.trim().replace(/^#/, '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
}
function relLum(rgb) {
  const [r, g, b] = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(fg, bg) {
  const l1 = relLum(hexToRgb(fg));
  const l2 = relLum(hexToRgb(bg));
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

// --- pull the real hex values out of the CSS ---------------------------------
// Dark tokens live in the first :root{}; light tokens in [data-theme="light"]{}.
// Neither block contains nested braces, so a non-greedy match to `\n}` is safe.
function block(re, name) {
  const m = CSS.match(re);
  if (!m) throw new Error(`could not locate ${name} block in colors_and_type.css`);
  return m[0];
}
const ROOT = block(/:root\s*\{[\s\S]*?\n\}/, ':root');
const LIGHT = block(/\[data-theme="light"\]\s*\{[\s\S]*?\n\}/, '[data-theme="light"]');

function hexOf(scope, scopeName, name) {
  const m = scope.match(new RegExp('--' + name + '\\s*:\\s*(#[0-9a-fA-F]{3,6})\\b'));
  if (!m) throw new Error(`token --${name} (hex literal) not found in ${scopeName}`);
  return m[1];
}

const DARK_BG = hexOf(ROOT, ':root', 'color-bg');
const WHITE = '#ffffff'; // light accents are verified as text on white (ACCESSIBILITY.md)

// fg on bg, with the WCAG minimum it must clear. 4.5 = AA normal text.
const PAIRS = [
  { label: 'dark : --color-text  on --color-bg', fg: hexOf(ROOT, ':root', 'color-text'), bg: DARK_BG, min: 4.5 },
  { label: 'dark : --color-muted on --color-bg', fg: hexOf(ROOT, ':root', 'color-muted'), bg: DARK_BG, min: 4.5 },
  { label: 'light: --color-accent   on #fff', fg: hexOf(LIGHT, 'light', 'color-accent'), bg: WHITE, min: 4.5 },
  { label: 'light: --color-accent-2 on #fff', fg: hexOf(LIGHT, 'light', 'color-accent-2'), bg: WHITE, min: 4.5 },
  { label: 'light: --color-accent-3 on #fff', fg: hexOf(LIGHT, 'light', 'color-accent-3'), bg: WHITE, min: 4.5 },
  { label: 'light: --color-accent-4 on #fff', fg: hexOf(LIGHT, 'light', 'color-accent-4'), bg: WHITE, min: 4.5 },
  { label: 'light: --color-success  on #fff', fg: hexOf(LIGHT, 'light', 'color-success'), bg: WHITE, min: 4.5 },
];

let failed = 0;
console.log('a11y — WCAG 2.1 AA contrast guard\n');
for (const p of PAIRS) {
  const ratio = contrast(p.fg, p.bg);
  const ok = ratio >= p.min;
  if (!ok) failed++;
  console.log(
    `  ${ok ? 'PASS' : 'FAIL'}  ${ratio.toFixed(2).padStart(5)}:1  (min ${p.min})  ${p.label}  [${p.fg} on ${p.bg}]`
  );
}
console.log('');
if (failed) {
  console.error(`a11y FAILED — ${failed} pair(s) below WCAG AA. Re-ink the token; do not lower the bar.`);
  process.exit(1);
}
console.log(`a11y OK — ${PAIRS.length} contrast pairs pass WCAG AA.`);
