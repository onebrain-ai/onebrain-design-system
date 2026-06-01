#!/usr/bin/env node
/* ============================================================================
   OneBrain Design System — token drift check
   Zero-dependency guard for the two hand-synced token sources + the generated
   dist (see CONTRIBUTING.md "Two token sources, kept in sync by hand").

   It fails (exit 1) on any of:

     A. dist/ is stale — re-generating from tokens.json would change a committed
        file. (You edited tokens.json but forgot `node tokens/build.js`.)
     B. colors_and_type.css and tokens.json disagree on a shared primitive's
        value, in either the dark or the light theme. (You changed a color /
        size / radius / z-index in one file but not the other.)
     C. A primitive in the parity contract below is missing from one source.

   Run:  node tokens/check.js   (or: npm test)
   No npm install required (Node >= 14, only fs/path + ./build.js).
   ============================================================================ */

'use strict';
const fs = require('fs');
const path = require('path');
const build = require('./build.js'); // importable since build.js guards its writes

const ROOT = path.join(__dirname, '..');
const CSS_FILE = path.join(ROOT, 'colors_and_type.css');
const errors = [];
const fail = (msg) => errors.push(msg);

/* ===========================================================================
   A. dist/ freshness — regenerate in memory, diff against committed files
   =========================================================================== */
function checkDist() {
  const outputs = build.buildAll();
  for (const rel of Object.keys(outputs)) {
    const file = path.join(build.DIST, rel);
    let committed;
    try {
      committed = fs.readFileSync(file, 'utf8');
    } catch {
      fail(`dist/${rel} is missing — run \`node tokens/build.js\``);
      continue;
    }
    if (committed !== outputs[rel]) {
      // surface the first differing line so the fix is obvious
      const a = committed.split('\n');
      const b = outputs[rel].split('\n');
      let i = 0;
      while (i < a.length && i < b.length && a[i] === b[i]) i++;
      fail(
        `dist/${rel} is STALE (line ${i + 1}):\n` +
          `    committed: ${JSON.stringify((a[i] || '').trim())}\n` +
          `    expected:  ${JSON.stringify((b[i] || '').trim())}\n` +
          `    -> run \`node tokens/build.js\` and commit the result`
      );
    }
  }
}

/* ===========================================================================
   B. colors_and_type.css  <->  tokens.json  primitive parity
   =========================================================================== */

// --- parse the CSS var declarations out of :root and [data-theme=light] -----
function parseCssVars(css, selector) {
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const re = new RegExp(selector.replace(/[[\]]/g, '\\$&') + '\\s*\\{([^}]*)\\}', 'g');
  const map = {};
  let block;
  while ((block = re.exec(noComments))) {
    const body = block[1];
    const decl = /--([\w-]+)\s*:\s*([^;]+);/g;
    let m;
    while ((m = decl.exec(body))) map[m[1]] = m[2].trim();
  }
  return map;
}

// resolve var(--x) references (incl. several inside one value, e.g. gradients)
function resolveCss(value, map, seen = 0) {
  if (seen > 20) return value;
  if (!/var\(--[\w-]+\)/.test(value)) return value;
  const out = value.replace(/var\(--([\w-]+)\)/g, (whole, name) =>
    name in map ? map[name] : whole
  );
  return out === value ? value : resolveCss(out, map, seen + 1);
}

// --- value normalizers (so equivalent representations compare equal) --------
const collapse = (s) => String(s).replace(/\s+/g, ' ').trim();

function normColor(v) {
  let s = collapse(v).toLowerCase();
  const rgb = s.match(/^rgba?\(([^)]+)\)$/);
  if (rgb) {
    const p = rgb[1].split(',').map((x) => x.trim());
    const hx = (n) => Math.round(parseFloat(n)).toString(16).padStart(2, '0');
    const a = p[3] === undefined ? 'ff' : Math.round(parseFloat(p[3]) * 255).toString(16).padStart(2, '0');
    return '#' + hx(p[0]) + hx(p[1]) + hx(p[2]) + a;
  }
  if (s[0] === '#') {
    let h = s.slice(1);
    if (h.length === 3) h = h.split('').map((c) => c + c).join('') + 'ff';
    else if (h.length === 4) h = h.slice(0, 3).split('').map((c) => c + c).join('') + h[3] + h[3];
    else if (h.length === 6) h += 'ff';
    return '#' + h;
  }
  return s;
}
function normDim(v) {
  const s = collapse(v);
  if (s === '0') return '0px';
  const rem = s.match(/^(-?[\d.]+)rem$/);
  if (rem) return parseFloat(rem[1]) * 16 + 'px';
  return s;
}
function normDur(v) {
  const s = collapse(v);
  const sec = s.match(/^([\d.]+)s$/);
  if (sec) return parseFloat(sec[1]) * 1000 + 'ms';
  return s;
}
const normNum = (v) => String(parseFloat(v));
const stripQuotes = (s) => collapse(s).replace(/["']/g, '');

// --- the parity contract: tokens.json path -> css var, with comparison kind -
// color: hex/rgba normalized · dim: rem->px · dur: s->ms · num: numeric
// str: var()-resolved + whitespace-collapsed · family: array join, quotes off
// bezier: array -> cubic-bezier() · clamp: compare css value to json .web ext
const KIND = { color: normColor, dim: normDim, dur: normDur, num: normNum, str: collapse, fam: stripQuotes };
const MAP = [
  // surfaces & text
  ['color.bg', 'color-bg', 'color'], ['color.bgDeep', 'color-bg-deep', 'color'],
  ['color.surface', 'color-surface', 'color'], ['color.surface2', 'color-surface-2', 'color'],
  ['color.border', 'color-border', 'color'], ['color.border2', 'color-border-2', 'color'],
  ['color.text', 'color-text', 'color'], ['color.muted', 'color-muted', 'color'],
  ['color.faint', 'color-faint', 'color'], ['color.ghost', 'color-ghost', 'color'],
  ['color.white', 'color-white', 'color'],
  // accents + diagram colors
  ['color.accent', 'color-accent', 'color'], ['color.accent2', 'color-accent-2', 'color'],
  ['color.accent3', 'color-accent-3', 'color'], ['color.accent4', 'color-accent-4', 'color'],
  ['color.vault', 'color-vault', 'color'], ['color.vault2', 'color-vault-2', 'color'],
  ['color.harness', 'color-harness', 'color'], ['color.harness2', 'color-harness-2', 'color'],
  ['color.loop', 'color-loop', 'color'], ['color.loop2', 'color-loop-2', 'color'],
  // semantic states (css aliases resolve to the same primitive)
  ['state.success', 'color-success', 'color'], ['state.info', 'color-info', 'color'],
  ['state.warning', 'color-warning', 'color'], ['state.danger', 'color-danger', 'color'],
  // chart palette
  ['chart.c1', 'chart-1', 'color'], ['chart.c2', 'chart-2', 'color'], ['chart.c3', 'chart-3', 'color'],
  ['chart.c4', 'chart-4', 'color'], ['chart.c5', 'chart-5', 'color'], ['chart.c6', 'chart-6', 'color'],
  ['chart.grid', 'chart-grid', 'color'], ['chart.axis', 'chart-axis', 'color'], ['chart.track', 'chart-track', 'color'],
  // gradients (grad-button resolves its var()s to the accent hexes)
  ['gradient.brand', 'grad-brand', 'str'], ['gradient.button', 'grad-button', 'str'],
  // type families
  ['font.family.sans', 'font-sans', 'fam'], ['font.family.mono', 'font-mono', 'fam'],
  ['font.family.display', 'font-display', 'fam'],
  // type scale (h2/hero compared against the responsive .web clamp)
  ['font.size.xs', 'text-xs', 'dim'], ['font.size.sm', 'text-sm', 'dim'],
  ['font.size.base', 'text-base', 'dim'], ['font.size.md', 'text-md', 'dim'],
  ['font.size.lg', 'text-lg', 'dim'], ['font.size.xl', 'text-xl', 'dim'],
  ['font.size.xxl', 'text-2xl', 'dim'], ['font.size.eyebrow', 'eyebrow-size', 'dim'],
  ['font.size.h2', 'text-h2', 'clamp'], ['font.size.hero', 'text-hero', 'clamp'],
  // weights / leading / tracking
  ['font.weight.light', 'weight-light', 'num'], ['font.weight.regular', 'weight-regular', 'num'],
  ['font.weight.medium', 'weight-medium', 'num'], ['font.weight.semibold', 'weight-semibold', 'num'],
  ['font.weight.bold', 'weight-bold', 'num'],
  ['font.leading.tight', 'leading-tight', 'num'], ['font.leading.snug', 'leading-snug', 'num'],
  ['font.leading.body', 'leading-body', 'num'], ['font.leading.prose', 'leading-prose', 'num'],
  ['font.tracking.tight', 'tracking-tight', 'str'], ['font.tracking.normal', 'tracking-normal', 'str'],
  ['font.tracking.wide', 'tracking-wide', 'str'], ['font.tracking.label', 'tracking-label', 'str'],
  ['font.tracking.eyebrow', 'tracking-eyebrow', 'str'],
  // spacing
  ['space.0', 'space-0', 'dim'], ['space.1', 'space-1', 'dim'], ['space.2', 'space-2', 'dim'],
  ['space.3', 'space-3', 'dim'], ['space.4', 'space-4', 'dim'], ['space.5', 'space-5', 'dim'],
  ['space.6', 'space-6', 'dim'], ['space.7', 'space-7', 'dim'], ['space.8', 'space-8', 'dim'],
  ['space.9', 'space-9', 'dim'],
  // sizes
  ['size.controlH', 'control-h', 'dim'], ['size.controlHSm', 'control-h-sm', 'dim'],
  ['size.navHeight', 'nav-height', 'dim'], ['size.contentMax', 'content-max', 'dim'],
  ['size.proseMax', 'prose-max', 'dim'], ['size.gridSize', 'grid-size', 'dim'],
  // breakpoints (json xxl == css 2xl)
  ['breakpoint.sm', 'bp-sm', 'dim'], ['breakpoint.md', 'bp-md', 'dim'], ['breakpoint.lg', 'bp-lg', 'dim'],
  ['breakpoint.xl', 'bp-xl', 'dim'], ['breakpoint.xxl', 'bp-2xl', 'dim'],
  ['breakpoint.wide', 'bp-wide', 'dim'], ['breakpoint.ultra', 'bp-ultra', 'dim'],
  // radius + clip
  ['radius.0', 'radius-0', 'dim'], ['radius.xs', 'radius-xs', 'dim'],
  ['radius.sm', 'radius-sm', 'dim'], ['radius.pill', 'radius-pill', 'dim'],
  ['clipPath.cut', 'clip-cut', 'dim'], ['clipPath.tech', 'clip-tech', 'str'],
  // motion + misc
  ['motion.duration.fast', 'dur-fast', 'dur'], ['motion.duration.base', 'dur-base', 'dur'],
  ['motion.duration.slow', 'dur-slow', 'dur'], ['motion.duration.reveal', 'dur-reveal', 'dur'],
  ['opacity.disabled', 'disabled-opacity', 'num'],
  // z-index scale
  ['zIndex.bg', 'z-bg', 'num'], ['zIndex.grid', 'z-grid', 'num'], ['zIndex.content', 'z-content', 'num'],
  ['zIndex.spine', 'z-spine', 'num'], ['zIndex.warp', 'z-warp', 'num'], ['zIndex.nav', 'z-nav', 'num'],
  ['zIndex.dropdown', 'z-dropdown', 'num'], ['zIndex.overlay', 'z-overlay', 'num'],
  ['zIndex.modal', 'z-modal', 'num'], ['zIndex.toast', 'z-toast', 'num'],
  ['zIndex.tooltip', 'z-tooltip', 'num'], ['zIndex.counter', 'z-counter', 'num'],
];

function easingStr(arr) { return 'cubic-bezier(' + arr.join(', ') + ')'; }

function jsonValue(jpath, theme, kind) {
  const node = build.rawMap[jpath];
  if (!node) return undefined;
  if (kind === 'clamp') return node.$extensions && node.$extensions.web; // responsive web value
  let v = build.resolve(jpath, theme);
  if (Array.isArray(v)) v = node.$type === 'cubicBezier' ? easingStr(v) : v.join(', ');
  return v;
}

function checkParity() {
  const css = fs.readFileSync(CSS_FILE, 'utf8');
  const dark = parseCssVars(css, ':root');
  const lightOverrides = parseCssVars(css, '[data-theme="light"]');
  const lightMap = { ...dark, ...lightOverrides };

  // motion.easing checked separately (css var name doesn't share the kebab pattern)
  const EASING = [
    ['motion.easing.outExpo', 'ease-out-expo'],
    ['motion.easing.boot', 'ease-boot'],
    ['motion.easing.drain', 'ease-drain'],
  ];

  for (const [jpath, cssName, kind] of MAP) {
    if (!build.rawMap[jpath]) { fail(`parity: tokens.json missing "${jpath}" (declared in check contract)`); continue; }
    if (!(cssName in dark)) { fail(`parity: colors_and_type.css missing --${cssName} (maps to ${jpath})`); continue; }

    const themes = kind === 'color' ? ['dark', 'light'] : ['dark'];
    for (const theme of themes) {
      const map = theme === 'light' ? lightMap : dark;
      const norm = KIND[kind === 'clamp' ? 'str' : kind] || collapse;
      const cssRaw = kind === 'fam' ? dark[cssName] : resolveCss(map[cssName], map);
      const cssVal = norm(cssRaw);
      const jVal = norm(kind === 'fam' ? jsonFamily(jpath) : jsonValue(jpath, theme, kind));
      if (cssVal !== jVal) {
        fail(
          `parity[${theme}]: ${jpath} != --${cssName}\n` +
            `    tokens.json:        ${JSON.stringify(jVal)}\n` +
            `    colors_and_type:    ${JSON.stringify(cssVal)}`
        );
      }
    }
  }

  for (const [jpath, cssName] of EASING) {
    const node = build.rawMap[jpath];
    if (!node) { fail(`parity: tokens.json missing "${jpath}"`); continue; }
    if (!(cssName in dark)) { fail(`parity: colors_and_type.css missing --${cssName}`); continue; }
    const jVal = collapse(easingStr(node.$value));
    const cssVal = collapse(dark[cssName]);
    if (jVal !== cssVal) {
      fail(`parity: ${jpath} != --${cssName}\n    tokens.json: ${jVal}\n    css: ${cssVal}`);
    }
  }
}

function jsonFamily(jpath) {
  const v = build.resolve(jpath, 'dark');
  return Array.isArray(v) ? v.join(', ') : v;
}

/* ===========================================================================
   Run
   =========================================================================== */
checkDist();
checkParity();

if (errors.length) {
  console.error(`\n✖ token drift check FAILED — ${errors.length} issue(s):\n`);
  for (const e of errors) console.error('  • ' + e + '\n');
  console.error('Fix: update colors_and_type.css AND tokens.json together, then `node tokens/build.js`.');
  process.exit(1);
}
console.log('✓ token drift check passed — dist/ fresh, colors_and_type.css <-> tokens.json in sync.');
