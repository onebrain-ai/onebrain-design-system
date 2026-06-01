# Changelog

All notable changes to **@onebrain/design-system** are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the
package uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> This is the design system's **own** version, independent of the OneBrain product
> (plugin `3.1.6` / CLI `≥3.1.0`).

## [Unreleased]

### Added

- **Showcase shell** — `index.html` is now a ThemeForest / Storybook-style browser for the whole
  system: a categorized, searchable left rail (Foundations · Components · Heroes · Surfaces ·
  Applied kit · Docs — data-driven from one `CATALOG` array, so it's trivial to extend), a center
  preview canvas with a responsive **viewport selector** (Full · 1440 · 1024 · 768 · 390 · 360),
  and a right **theme customizer** that re-keys the live preview in real time — theme (dark/light),
  accent (the four brand accents), density (comfortable/compact), and direction (LTR/RTL). All four
  controls drive real design-system tokens, none are mock knobs. Settings + last-opened item persist
  to `localStorage`; nav/panel collapse to overlay drawers under 920px. Zero-dependency vanilla JS,
  built on `colors_and_type.css` + `components.css`. It replaces the old card-grid launcher as
  the package index — sub-pages navigate through its rail, not a back button of their own. The
  in-system docs reader (`docs.html`) detects iframe embedding (`window.self !== window.top`) and
  renders **content-only** — its local top bar is dropped so it doesn't stack on the showcase
  chrome (it still shows the bar, brand, and accent picker when opened standalone in a new tab).
- **Sandbox-safe theming channel** — `preview/showcase-prefs.js`, a tiny dependency-free listener
  loaded by every preview. The showcase customizer delivers prefs over **postMessage + a URL hash**
  (`#ob=theme:…,accent:…,density:…,dir:…`) so theming works even when the preview pane renders the
  shell in a **sandboxed iframe** (opaque/cross-origin), where the old `contentDocument` write is
  blocked. A same-origin `contentDocument` fast path is kept as a bonus; a preview opened standalone
  reads the hash, then the shell's stored prefs, so it remembers the last choice.
- **Two section-identity accents in the showcase customizer** — `green` and `grey`, added beside the
  four brand accents (cyan / violet / magenta / amber) so the customizer offers six. They reuse the
  existing category colors rather than new hexes — `green` = group 05's lime `--color-success`,
  `grey` = group 06's `--color-muted` (both already light-re-inked) — mirrored across `index.html`
  and `showcase-prefs.js`. The reusable product `.accent-dots` (`accent-picker.js`) stays at the four
  brand signals, and groups 05 / 06 keep their original `--color-success` / `--color-muted` marks.

### Changed

- **Viewport (resolution) selector is desktop-only** — the showcase's `Full · 1440 · 1024 · 768 ·
  390 · 360` bar is hidden at ≤1024px (tablet + mobile), where the canvas is always full-width and
  responsive; any stored desktop device width is ignored at those sizes so a small screen never pins
  the preview to a narrow frame.

- **Surfaces no longer embed their own accent / density controls** — the in-surface accent-picker
  strips (landing nav, dashboard top bar, desktop sidebar, deck presenter chrome) and the dashboard
  density switch + the mobile *You / Appearance* accent grid are removed, along with the hard-coded
  `--section-accent` / `data-density` overrides that fought central control. Accent / theme / density
  / direction are now driven solely by the showcase customizer (or, standalone, the stored prefs), so
  the surfaces read as clean product UI. `.accent-dots` + `accent-picker.js` remain as a reusable
  component for real product settings screens; the mobile screen keeps an honest read-only "Accent ·
  Theme" row. (`DESIGN.md §2` updated to match.)

### Fixed

- **Web fonts fell back to a generic sans on GitHub Pages (Chakra Petch / JetBrains Mono).** All 12
  bundled TTFs in `fonts/` were corrupted by a UTF-8 round-trip during initial packaging — every byte
  ≥ `0x80` was rewritten to the replacement-character sequence `EF BF BD` (≈9,330 hits per file), so
  the `@font-face` resources failed to parse (`document.fonts.load` → `NetworkError`). It was masked
  locally because the machine had the fonts installed system-wide and the WebView substituted them,
  but GitHub Pages served the broken bytes to clients with no local copy, so display/mono text fell
  through to the Inter / system fallback. This is the same corruption class that hit the icon PNG/ICO
  binaries earlier. Replaced all 12 files with clean OFL originals from the canonical `google/fonts`
  source, under their existing filenames (so the relative `url()` refs are unchanged). The `.nojekyll`
  marker and relative `url()` paths were already correct, so no markup change was needed. Verified
  before/after with the `FontFace` API (error → loaded) and a render screenshot; a repo-wide sweep
  confirms **zero** remaining corrupted binaries.
- **Foundation previews and the sidebar didn't follow the accent.** Two more instances of the same
  chrome-reads-primitive root cause. (1) The Foundation preview pages (`colors-primary`, `colors-theme-dark`,
  `typography-specimens`, `spacing-radius`, `spacing-shadows`, plus the `spacing-tokens` scale bars) pinned
  their eyebrow `.pill` and incidental accent chrome (theme active-row, type stroke headline, radius demo
  boxes, spacing bars) to raw primitives (`--color-accent` / `-2` / `-3`) — only the orb followed, too
  subtle to notice — so picking an accent appeared to do nothing. Repointed that chrome to `--section-accent`.
  Genuine *palette/glow demonstrations* stay fixed by design: the named color swatches, the theme legend,
  inline `<code>` (cyan per spec), and the `--glow-cta` / `--glow-accent` demo dots. (2) The showcase sidebar's
  hover, active background, active left-bar, and active tag read the per-category `--sec` color, so they were
  category-coded and ignored the accent; repointed those interaction states to `--section-accent`. The category
  number + header gradient keep `--sec`, so categories retain a quiet identity while the thing you hover/select
  follows your accent. Verified in-browser at amber: all six eyebrows + the sidebar interaction chrome resolve
  to `#ffb000`, every fixed demo holds.
- **Showcase shell chrome ignored the accent picker.** The customizer pushed the chosen accent into
  the preview iframe but never re-keyed the showcase's *own* `<html>`, so the inspector header (the
  `TYPE` eyebrow, version mark, icon buttons, nav active item, viewport selector, search focus) stayed
  cyan no matter which accent you picked. Added `applyToShell()` — it writes the four accent intents
  (`--section-accent` / `--action-primary` / `--action-primary-weak` / `--grad-button`) onto the shell
  root on every accent change, init, and reset, mirroring the system's `.accent-dots` rule of re-keying
  `<html>` "so even fixed chrome follows". Also dropped the `.sc-vp { --section-accent: … }` pin that
  held the viewport selector on cyan, so the whole header follows one accent. Theme / density / dir stay
  preview-only by design (the shell is a stable dark inspector); the accent dots' own swatches and the
  per-group category colors stay fixed.
- **Accent customizer only re-keyed buttons, not the whole surface.** The picker rewrites the accent
  *intent* layer (`--section-accent` / `--action-primary` / `--grad-button`) on the preview root, but a
  lot of accent-colored *chrome* in the preview pages read the raw primitive `--color-accent-2`
  directly — eyebrow pills (`.eb` / `.pill`), the atmospheric `.pv-orb`, nav `[ ]` brackets, input
  focus rings, the composer/switch states, deck nav + active-slide dot — so only component-class
  elements (which read the intents) followed the chosen accent. Converted that chrome to read
  `--section-accent`, and re-pointed the `--focus-ring` token from `--color-accent-2` →
  `--action-primary` so focus rings re-key too. Genuine demonstrations are deliberately left fixed:
  the color/theme swatch tiles + legends, the multi-accent demo cards (which set `--section-accent`
  per region on purpose), hero `--ha` art direction, and the chart series. Defaults are unchanged
  (`--section-accent` / `--action-primary` both default to cyan), so only re-keying behavior improves.
- **Five preview pages still ignored the accent (Brand assets · Feedback · Icons · i18n · Interactive).**
  Two leftover causes the prior pass didn't reach: (1) the eyebrow pills set `style="--section-accent:
  var(--color-accent-2/3)"` inline — pinning the intent *to a never-re-keyed primitive* on a closer
  ancestor, which shadowed the picker's `<html>` value (the prior converter skipped any line containing
  `--section-accent` to avoid circular refs, so these survived); and (2) page-specific chrome
  (`.eb` + `.lockup-label` in brand-assets — which doesn't even load `components.css` — plus
  `.langcard .mt`, `.modrow .ob-icon`, the i18n RTL demo cards/accordions, and the icons "accent"
  in-context chip) read raw `--color-accent-N`. Removed the pins so they inherit the picker's accent,
  and pointed that chrome at `--section-accent`. Verified at a distinct accent (amber) so following is
  unambiguous. Deliberately left fixed: the brand gradient marks + wordmark lockups, the diagrams'
  domain accents, semantic alert/toast states, inline-`<code>`/syntax two-tone, and the Interactive
  page's multi-accent segmented/accordion demos. Also corrected a stale "31 nodes" → **36 nodes**
  in the brand-assets lede and `DESIGN.md §8` (the spark set grew to 36 in the edge/vertex fix).
- **Showcase customizer + "Open" were dead in the sandboxed preview pane.** The customizer wrote
  through `iframe.contentDocument`, which throws across the pane's sandbox boundary, so nothing
  changed; `target="_blank"` was likewise blocked. The customizer now themes via postMessage/hash
  (above), and **Open** uses `window.open` with a clipboard-copy fallback (flashes "Link copied")
  when popups are blocked. The viewport selector's device-width also sets an explicit `width` so a
  framed preview no longer collapses to the iframe's default.
- **CI workflow** — `.github/workflows/ci.yml` runs the two guards (`tokens/check.js`
  token-drift + `tokens/a11y.js` WCAG AA contrast) on every push to `main` and every PR,
  as separate named steps for a readable pass/fail signal. Both are zero-dependency Node
  scripts, so the job needs no `npm install`/lockfile. This gives the local `npm test`
  guards real teeth — drift or a contrast regression can no longer reach `main` silently.
- **Animated brand mark (neuron spark)** — `assets/brain.svg` (= byte-identical `build/logo.svg`)
  now carries a self-contained, additive **neuron-spark layer**: 36 node centers, auto-detected
  from the mark by morphological **opening** (erode→dilate, which deletes the thin connectors and
  keeps only the fat vertex discs) + connected-components + a circularity test, so every spark is
  locked to a real node disc — never an edge mid-span or a line crossing (those read as arcing
  "lightning" and are excluded). Each flashes (opacity + a small scale pop) on its own
  deterministic pseudo-random cycle so the network reads as *firing*. White core + cyan halo
  (halo scales subtly with node size), opacity/transform-only, plays even as an `<img>`, and
  frozen to a steady faint glow under `prefers-reduced-motion`. The mark's geometry/gradient is
  untouched (`DESIGN.md` §8/§9).
- **Token drift check** — `tokens/check.js` (run via `npm test` from the root or `tokens/`).
  A zero-dependency guard that fails CI/commit when (a) `colors_and_type.css` and
  `tokens.json` disagree on any shared primitive in the **dark or light** theme, or (b)
  `tokens/dist/` is stale vs. `tokens.json`. Closes the "two sources kept in sync by hand"
  gap from `CONTRIBUTING.md`. `tokens/build.js` is now importable (guarded by
  `require.main === module`) so the checker regenerates `dist/` in memory without touching
  the tree.
- **Overlay stacking tier** — new z-index tokens above `--z-nav` (50) in both token
  sources: `--z-dropdown` (60), `--z-overlay` (70), `--z-modal` (80), `--z-toast` (90),
  `--z-tooltip` (100). Documented as a table in `DESIGN.md` §4. Plus a `.toast-stack`
  fixed-region helper in `components.css` that owns the toast tier.
- **Custom `<select>` listbox** — `.cyber-select` now has an on-brand OPEN state. A native
  `<select>`'s option popup is painted by the OS and can't be styled (the bright OS-blue,
  rounded, system-font list), so `preview/cyber-select.js` progressively enhances any
  `.cyber-select` wrapping a `<select>`: it keeps the real control for form submit + a
  no-JS fallback, then renders a `.cs-list` popup keyed to the design tokens (frosted
  near-opaque menu fill, sharp corners, mono type, accent **check + 2px left bar + weak tint**
  for selected/active — never a solid accent fill). Full WAI-ARIA collapsed-combobox
  pattern: `aria-activedescendant`, keyboard (↑ ↓ Home End Enter Space Esc Tab) +
  first-letter typeahead, click-outside close, selection mirrored back to the native
  `<select>` (re-fires `input` + `change`). Honors reduced-motion / reduced-transparency;
  scrolls via `scrollTop` (never `scrollIntoView`). Demoed in `preview/components-forms.html`.
- **`--glass-fill-menu` token** (dark + light) — an effectively-solid frosted fill for dense
  pick-lists (select / dropdown / command palette) that must read crisply over live content.
- **`--glass-blur-scrim` token** — the backdrop blur applied to a scrim (`.scrim`,
  `.cmdk-scrim`). Drives the "background recedes behind an overlay" effect from one value.
- **Command palette** — `.command-palette` / `.cmdk-*` in `components.css` (§7.45), the ⌘K
  skill launcher that was previously re-rolled inline per surface (prior art in
  `preview/surface-desktop.html`). Driven by `preview/command-palette.js`, a zero-dependency
  enhancer that builds the list from a declarative JSON config, opens on ⌘K / Ctrl-K or any
  `[data-command-palette-open]`, and dispatches a bubbling `ob:command` event on run. Full
  WAI-ARIA dialog + combobox/listbox: `aria-activedescendant`, keyboard (↑ ↓ Home End Enter
  Esc), focus restored to the opener on close, active row = accent left-bar + weak tint (never
  a solid fill), match highlight in `.cmdk-hl`. Panel rides `--z-modal` (above the sticky nav),
  scrim at `--z-overlay`. Honors reduced-motion / reduced-transparency; scrolls via `scrollTop`.
  Demoed in `preview/components-command-palette.html` with the real 29-skill set, grouped.
- **Charts / data-viz primitives** — shared `.chart-frame`, `.chart-legend`, `.donut` (CSS
  conic-gradient ring), `.spark` sparkline, `.bar-meter`, and `.chart-svg` grid/axis/track
  conventions in `components.css` (§5.5), all keyed to the existing `--chart-1…6` +
  `--chart-grid` / `--chart-axis` / `--chart-track` scale. Closes the "tokens exist but no
  implementation" gap — `preview/charts.html` ships paste-ready inline-SVG line, area, bar,
  donut, and sparkline examples (no chart library) so dashboards stop rolling their own.
- **Icon sprite** — `assets/icons.svg`, a Lucide-line `<symbol>` set (30 icons) in the real
  product vocabulary (`ob-vault`, `ob-skill`, `ob-harness`, `ob-memory`, `ob-capture`, the
  co-evolution skills + UI affordances). Geometry-only; the new `.ob-icon` class
  (`components.css` §9) sets fill / stroke / 1.75 width / round caps once and the symbols
  inherit it, with sizes `.ob-icon-16/-20/-24`. The 14 skill marks reuse the exact paths in
  `preview/command-palette.js` so palette and sprite never diverge. Closes the "icons are a
  rule with no shipped set" gap (`DESIGN.md` §6). Demoed in `preview/components-icons.html`.
- **Interactive components** — three controls the kit was missing, in `components.css`
  (§10–§12): `.accordion` over native `<details>`/`<summary>` (keyboard + a11y for free, open
  item keys to the accent + 2px left bar); `.segmented`, a CSS-only radio group whose active
  segment is accent text + weak tint + hairline ring (never a solid fill); and `.dropzone`, a
  file upload progressively enhanced by `preview/dropzone.js` (real `<input type="file">` +
  no-JS fallback, drag-drop, a synced file list via `DataTransfer`). Demoed in
  `preview/components-interactive.html`.
- **Internationalization & RTL** — `--font-sans` and `--font-display` now carry Thai · Arabic ·
  CJK system fallbacks after the Latin faces (synced across `colors_and_type.css` +
  `tokens/tokens.json`, exported to every platform, asserted by the drift-check), so non-Latin
  text renders instead of tofu. `components.css` §13 adds a focused `[dir="rtl"]` block that
  mirrors the physical left/right decorations (card / accordion accent bar, alert state bar,
  default drawer, toast stack, open-accordion chevron). New `DESIGN.md` §10 documents the
  fallback strategy + the logical-property authoring guidance. Demoed in `preview/i18n-rtl.html`.
- **Page-level state templates** — `.page-state` in `components.css` (§12.5): full-page
  not-found / harness-fault / access-denied / vault-offline / boot-loading screens for the
  operator console. A corner-cut mono status code, italic Chakra headline, mono sub-line, real
  `.btn-tech` / `.btn-ghost` actions, and a pulsing status line — each re-tints by setting one
  var (`--section-accent`) and honors reduced-motion. Demoed in `preview/page-states.html`,
  modelled on the real `onebrain-ai/website` edge layer (`middleware.ts`, `brain-id.ts`,
  `version.ts`, `disposable-domains.ts`, `gh-stars.ts`).
- **WCAG contrast guard** — `tokens/a11y.js`, now part of `npm test` (root **and** `tokens/`).
  A zero-dependency check that parses the real hex values out of `colors_and_type.css` and
  asserts the documented text/accent pairs clear WCAG 2.1 AA on both themes (dark text/muted on
  the canvas; the five re-inked light accents on white). Makes `ACCESSIBILITY.md`'s ratios
  machine-verified — re-ink a token below 4.5:1 and the build fails. Pairs with `check.js`:
  drift keeps the sources identical, a11y keeps them legible.
- **Content & microcopy guide** — `DESIGN.md` §11: reusable copy formulas (error / empty-state /
  page-state patterns, action-label and slash-command conventions, number / date / status-line
  formatting, capitalization) so every surface reads as one product.
- **Stability & deprecation policy** — `CONTRIBUTING.md` now carries a component **maturity
  matrix** (stable / beta / experimental / deprecated) and a semver-aligned token/component
  **deprecation cycle** (add → alias → announce → remove on next major).
- **Figma / Tokens Studio bridge** — `tokens/README.md` documents round-tripping the DTCG
  `tokens.json` through the Tokens Studio Figma plugin (code stays source of truth; Figma edits
  land as a diff against `tokens.json`, never `dist/`).

### Changed

- **Showcase is the package index** — `index.html` is now the showcase shell (the old HUD
  card-grid launcher is gone). Navigation is the showcase's left rail, so the per-preview
  back-to-Index pill (`preview/_home.js`, dropped from all previews + `ui_kits/app/`) and the
  docs reader's nested doc rail were removed; `docs.html` is now a single-column reader that
  takes its `?doc=` target from the showcase rail (its `?doc=` deep-links + in-doc `.md` links
  still work). Three more docs (PROVENANCE / SKILL / tokens/README) joined the rail's Docs group.
- `.scrim` → `--z-overlay`, `.drawer` → `--z-modal`; `.dropdown` and `.tooltip .tip` now
  carry `--z-dropdown` / `--z-tooltip` so menus and hints layer correctly.
- **Overlay readability** — the scrim backdrop blur behind modals + the command palette went
  from `blur(3px)` to `--glass-blur-scrim` (`blur(16px) saturate(1.2)`), so the page behind a
  open overlay recedes into a soft wash instead of competing for focus. The command palette
  panel moved off the lighter `--glass-fill-elevated` (0.72) onto the near-opaque
  `--glass-fill-menu` — it's a dense pick-list like the select/dropdown, so its rows now read
  as crisply as theirs over the blurred scrim. `--glass-fill-menu` itself was nudged 0.97 → 0.99
  (dark) / 0.98 → 0.99 (light) to remove the last trace of bleed-through from the scrim-less menus.
- **App-icon PNG is now the gradient brain** — `assets/apple-touch-icon.png` + `build/icon.png`
  re-rendered from `brain.svg` at 180×180 (byte-identical pair), so the home-screen mark matches
  the favicon and logo instead of the preserved monochrome source tile. `preview/brand-assets.html`
  lede + cards updated to reflect the two raster marks rendering from `brain.svg`.
- **Architecture diagrams are now outlined, not filled** — `assets/diagrams/{harness-os-stack,
  coevo-loop,vault-hub}.svg` previously rendered their layers/nodes/core as large solid accent
  fills (teal gradient rects, lime discs, a purple core), violating `DESIGN.md` §2/§9 ("never put
  an accent on a large fill — accents are strokes, glows, bars, dots"). They now read in the
  `.cyber-card` language: dark recessed shapes (`#0c0c15` / `#070709`) + an accent **stroke**, with
  the harness layers carrying the 2px solid left accent bar and the loop/vault nodes a static
  blurred glow halo (kept off the breathing element so no filter re-rasterizes during animation).
  The harness stack's four emoji icons (🧠🤖✨💎) are replaced with inline **Lucide-line icons**
  (`ob-brain` / `ob-harness` / `ob-skill` / `ob-vault`, paths from `assets/icons.svg`) per §6. All
  SMIL/CSS motion (layer flow, particle travel, breathe, icon pulse) and the `prefers-reduced-motion`
  fallbacks are preserved; unused fill gradients (`g-layer`, `g-node-fill`, `g-core-fill`) removed.
- **Harness-stack brain icon sized to match its peers** — the `ob-brain` glyph in
  `harness-os-stack.svg` only fills ~11.5×14 of the Lucide 24-grid (vs 18–22 for the chip /
  sparkle / vault marks), so at the shared `scale(1.25)` it rendered visibly smaller and lighter
  than the other three layer icons. It's now scaled ×1.4 about its own center (so placement and
  the pulse animation are unchanged) with `stroke-width` dropped to `0.93` to hold the line weight
  equal to the others — measured rendered heights are now brain 18.7 / llm 17.1 / vault 19.0 /
  harness 20.9, a consistent set.

### Removed

- `preview/colors-theme-light.html` — the standalone light-theme spec card. The light scale
  (`[data-theme="light"]`) is unchanged and now exercised via the showcase **Theme** toggle on
  any preview, so a dedicated page was redundant.
- `preview/_home.js` — the shared back-to-Index pill, superseded by the showcase rail.

### Fixed

- Overlays (`.scrim`, `.modal`, `.drawer`) previously shared `--z-nav`, so the sticky glass
  nav could paint over an open modal/drawer; toast, tooltip, and dropdown had no defined
  stacking order. The new tier resolves both.
- Select listbox / dropdown popups were too translucent (`--glass-fill-elevated`, 0.72) — with
  no scrim behind them, live page content (disabled rows, checkboxes) bled through and
  clashed with the option labels, hurting readability. Scrim-less menus (`.dropdown`,
  `.cyber-select .cs-list`) now use the near-opaque `--glass-fill-menu`; modal/drawer keep
  the lighter elevated fill since their scrim already hides what's behind them.

## [1.0.0] — 2026-06-01

First complete, audit-clean package. Every token, asset, and component class is
extracted from real OneBrain source (`onebrain-ai/website`, `onebrain-ai/onebrain`)
via the bounded this-device `git clone` intake — see `PROVENANCE.md`.

### Added

- **Canonical rules** — `DESIGN.md` (product context, color, type, spacing, layout,
  components, motion, voice, anti-patterns), `README.md` (Product Overview + Preview
  Manifest + reuse workflow), `SKILL.md` (agent-usable skill entry), `PROVENANCE.md`.
- **Token foundation** — `colors_and_type.css`: "Cyber Palette — Operator Console"
  primitives (near-black canvas, four neon accents, diagram/domain accents, chart scale,
  semantic states), the full type scale with `@font-face` bindings for the 12 preserved
  brand font files, 4px spacing scale, sharp radius + corner-cut clip, glow elevation,
  motion easings, breakpoints, and the dark-first → light spec/print theme.
- **Semantic / intent token layer** — components reference intents (`--action-primary`,
  `--fb-*`, `--bg-*`, `--text-*`, `--border-*`, `--elev-*`) not raw hex, so a surface
  re-skins by remapping intents. Density contract (`data-density` + `--control-h`).
- **Reusable component layer** — `components.css`: buttons (`.btn-tech` + family), full
  form kit (input/textarea/select, checkbox/radio/switch/range, validation, composer),
  navigation (`.nav-glass`, tabs, breadcrumb, pagination), data display (`.cyber-table`,
  `.cyber-list`, `.avatar`, `.stat`, `.empty-state`), feedback (alert, toast, progress,
  skeleton, spinner), overlays (modal, drawer, tooltip, dropdown), and primitives
  (`.badge`, `.tag`, `.chip`, `.kbd`, `.cyber-link`).
- **Cross-platform token export** — `tokens/tokens.json` (W3C DTCG single source) +
  zero-dependency `tokens/build.js` generating `tokens/dist/`: namespaced CSS, typed
  JS/TS, Tailwind preset (theme-aware, with screens + gradients), SwiftUI constants
  (colors, breakpoints, font weights), and Android `colors/colors-light/dimens` XML.
  Intent layer, breakpoints, and brand gradients all export to native + Tailwind.
- **Runtime accent picker** — reusable `.accent-dots` control + `preview/accent-picker.js`;
  one click re-keys a whole surface from a single variable and persists across surfaces.
  Wired into every surface at its natural settings home.
- **Six surface scaffolds** — `preview/surface-{dashboard,deck,mobile,desktop,landing}.html`
  plus two `.ob-synthwave` hero variants (`hero-split`, `hero-centered`) with a recessed
  3D perspective grid and a floating iOS-frosted-glass operator-console terminal.
- **Focused review previews** — colors (×3), typography, spacing (×3), components (×6),
  brand-assets — each linking the real stylesheets and source-backed assets.
- **Applied UI kit** — `ui_kits/app/`: a runnable React + Babel operator console
  (Sidebar · AssistantsList · ChatArea · MessageBubble · InputBar composed by App).
- **Preserved real assets** — `assets/` + `build/` (logo, app icon, favicon, three live
  architecture diagrams), `fonts/` (12 `.ttf`), `source_examples/` (real `global.css`,
  agents, Astro libs).
- **Packaging** — root `index.html` launcher, `package.json`, `CHANGELOG.md`, `LICENSE`,
  `ACCESSIBILITY.md`, `CONTRIBUTING.md`.

### Fixed

- **Deck** — every slide rendered stacked because per-slide `display` rules collided with
  `.slide` / `.is-active` specificity; routed slide display through a `--slide-display`
  variable so exactly one slide shows with its correct layout (and print keeps real layout).
- **Buttons** — corner-cut clip ballooned into giant wedges on wide buttons; made the cut a
  width-independent fixed `12px` on the base `.btn-tech`, shared by every framed CTA and the
  composer-send. Removed redundant `.btn-block` clip. Fixed frame bloat from `.btn-sm` /
  mobile-nav padding overriding the 1.5px gradient frame. Buttons never underline as anchors.
- **Landing** — rebuilt on real tokens/components after it was authored against invented
  token and class names (`--color-accent-cyan`, `--text-4xl`, `.btn-tech` without its inner
  panel); fixed a redeclared `--section-accent` that blocked the accent picker.
- **Mobile** — fixed 360px horizontal overflow, skill-row inline overflow, FAB size/accent,
  and the capture-tab `+` glyph treatment.
- **Tier 1 hardening** — pagination/controls meet the 44px touch target; light `--color-border`
  bumped (`.12 → .18`) for a clearer-but-subtle hairline on white; added `--text-link`,
  `--border-strong`, `--text-disabled` (now exported to native/Tailwind); promoted `.chip`
  and `.kbd` to the shared layer (removed inline duplicates).

[1.0.0]: https://github.com/onebrain-ai/onebrain-design-system/releases/tag/v1.0.0
