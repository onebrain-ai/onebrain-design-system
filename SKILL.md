---
name: onebrain-design-system
description: >-
  Futuristic cyberpunk / Tron "operator console" design system extracted from the
  OneBrain product (onebrain-ai/website + onebrain-ai/onebrain). Use when generating
  any artifact for OneBrain — an AI operating-system layer on Obsidian (persistent
  memory, 29+ skills, local AI stack). Dark-first near-black canvas, four neon accents
  (violet/cyan/magenta/amber), Chakra Petch display + JetBrains Mono + Inter, corner-cut
  geometry, HUD grid, neon-glow elevation. Provides tokens (colors_and_type.css),
  rules (DESIGN.md), preview cards, preserved brand assets/fonts, source examples, and a
  runnable operator-console UI kit.
user-invocable: true
---

# OneBrain Design System

A reusable, source-backed design-system package. Everything here is extracted from real
OneBrain code — apply it whenever you build OneBrain landing pages, product/console
surfaces, decks, or diagrams so the output instantly reads as "futuristic, AI, OneBrain."

## What's inside

- **`DESIGN.md`** — canonical rules: product context, visual foundations, color, type,
  spacing, layout, components, motion, voice, anti-patterns. Read this first.
- **`colors_and_type.css`** — all design tokens (palette primitives + a **semantic intent
  layer**: `--action-primary`, `--fb-*`, `--bg-*`, `--elev-*`, `data-density`) + `@font-face`
  bindings to the preserved brand fonts. Paste its `:root` into a new artifact's first
  `<style>`, or `<link>` it.
- **`components.css`** — the **reusable component layer**: drop-in classes for buttons, full
  form controls, nav/tabs/breadcrumb/pagination, table/list/avatar/empty-state,
  alert/toast/progress/skeleton/spinner, and modal/drawer/tooltip/dropdown. Load it after
  `colors_and_type.css`; every class reads the semantic intents and ships accessible
  focus/validation/disabled + reduced-motion states. Compose surfaces from this, don't
  re-derive component CSS.
- **`tokens/`** — cross-platform token export. `tokens.json` (W3C DTCG) is the single
  source of truth; `node tokens/build.js` regenerates `tokens/dist/` → `tokens.css`,
  `tokens.js`/`.d.ts`, a Tailwind preset, iOS `*.swift`, and Android `*.xml`. Use these for
  desktop / mobile / RN surfaces; web stays on `colors_and_type.css`. See `tokens/README.md`.
- **`PROVENANCE.md`** — exactly where every token/asset/rule came from + honest gaps.
- **`preview/`** — focused, reviewable HTML cards (color, type, spacing, components,
  brand assets, two hero variants, and five full **surface scaffolds** —
  dashboard, slide deck, mobile, desktop, landing) for the Design System tab.
- **`assets/`** — preserved brand marks: `brain.svg` logo, `apple-touch-icon.png`,
  `favicon.ico` (rebuilt from `brain.svg` — see below), and three live architecture
  diagrams under `assets/diagrams/`.
- **`build/`** — runtime icons (`icon.png`, `logo.svg` byte-for-byte; `favicon.ico`
  rebuilt from the brand logo as a multi-size 16·32·48 ICO so the tab mark is the
  brand brain, not the source's leftover framework default) with runtime filenames.
- **`fonts/`** — the 12 brand font files (Chakra Petch ×10, JetBrains Mono ×2), bound
  in `colors_and_type.css`.
- **`source_examples/`** — high-signal originals: `styles/global.css` (the real theme +
  component CSS), `agents/*.md`, and the Astro build-time libs.
- **`ui_kits/app/`** — a runnable operator-console interface kit (React + Babel) that
  composes modular role components into one product surface.
- **`index.html`** — a HUD launcher that links every preview card + surface (open it first
  to review the whole system). Governance lives in `CONTRIBUTING.md` (how to extend in
  sync), `ACCESSIBILITY.md` (a11y commitments + verify checklist), `CHANGELOG.md`, and
  `LICENSE` (AGPL-3.0 + OFL font notices); `package.json` exposes `build:tokens` + `start`.

## Source context

- **Product:** OneBrain — "Your AI Thinking Partner." An AI OS layer on Obsidian:
  persistent memory, 29+ skills, a local stack (Claude Code + Obsidian + tmux + Telegram).
  Plain Markdown, owned forever; extends harnesses rather than replacing them.
- **Visual evidence:** `onebrain-ai/website` `src/styles/global.css` (the "Cyber Palette —
  Operator Console" tokens + component classes), brand SVGs, and uploaded fonts.
- **Domain evidence:** `onebrain-ai/onebrain` plugin — vault structure (`00-inbox` …
  `07-logs`), skill names, 5 sub-agents, the Harness OS stack, the co-evolution loop.
- Both repos read via the bounded `github-design-context` intake (this-device git-clone);
  the raw snapshots were pruned post-build and are re-pullable via the same intake command.

## When to use this skill

Use it for any OneBrain-branded surface: marketing/landing pages, the vault operator
console / dashboards, onboarding flows, pitch decks, architecture diagrams, docs. Also
use it as a reference for the broader aesthetic: a futuristic, minimal, professional
cyberpunk look for an AI developer-tool product. Do **not** use it for warm/editorial,
light-first, or rounded "friendly SaaS" briefs — it is intentionally dark, sharp, neon.

## How to use

1. **Read `DESIGN.md`** for the rules, then skim `PROVENANCE.md` for what's real vs. derived.
2. **Bind tokens + components:** `<link rel="stylesheet" href="colors_and_type.css">` then
   `<link rel="stylesheet" href="components.css">` (adjust the relative paths), or paste
   their contents into your first `<style>`. The token file also binds the brand fonts —
   don't substitute fonts. Re-skin by remapping the semantic intents, not the component rules.
3. **Compose from `components.css`** (`.btn-tech`, `.cyber-card`, `.cyber-pill`, the form
   controls, `.cyber-table`, `.alert`/`.toast`, `.modal`…); cross-check shapes against
   `preview/components-*.html` and the source classes in `source_examples/styles/global.css`.
4. **Use real assets** from `assets/` / `build/` — never redraw the logo or icons.
5. **Model real screens** on `ui_kits/app/` (sidebar · skill rail · console · composer)
   and its `components/`.
6. **Use real product vocabulary** (vault, skills, harness, memory, wikilinks, PARA
   folders, CAPTURE→EVOLVE→WRAPUP) and the real version (`3.1.6`). Don't invent stats.
7. **Honor the anti-patterns** in `DESIGN.md` §9 (no beige washes, no big AI gradients,
   no rounding everything, one accent per surface, always include reduced-motion).

Before generating, an agent should read: `README.md`, `DESIGN.md`, `colors_and_type.css`,
`components.css`, `tokens/` (DTCG source + `tokens/dist/` for non-web surfaces), `preview/`
(or open `index.html` to browse them all), `assets/`, `build/`, `fonts/`, `source_examples/`,
and `ui_kits/app/`. To extend the system, follow `CONTRIBUTING.md` + `ACCESSIBILITY.md`.

## Design system highlights

- **Palette:** near-black canvas `#050507` + 4 neon accents — violet `#bc13fe`, cyan
  `#00f3ff` (default), magenta `#ff2d92`, amber `#ffb000`. One per surface, twice max.
- **Type:** Chakra Petch (italic-uppercase display) · Inter (body) · JetBrains Mono (HUD/code).
- **Geometry:** sharp — radius 0 on panels; CTAs use the angled `--clip-tech` corner cut.
- **Elevation:** neon glow, not drop-shadow. 56px HUD grid + blurred accent orb as atmosphere.
- **Motion:** cinematic section "boot" (scanline → pill → headline drain → cards), always
  with a `prefers-reduced-motion` fallback.
- **Voice:** confident, technical, minimal — a "personal chief of staff." Mono uppercase
  HUD eyebrows; italic uppercase headlines.
