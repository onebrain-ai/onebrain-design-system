# Changelog

All notable changes to **@onebrain/design-system** are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the
package uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> This is the design system's **own** version, independent of the OneBrain product
> (plugin `3.1.6` / CLI `≥3.1.0`).

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
