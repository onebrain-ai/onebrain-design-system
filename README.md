# OneBrain is an AI Design System

A reusable Open Design **design-system package**, extracted from the real OneBrain
product code. It captures the futuristic, minimal, professional **cyberpunk / Tron
"operator console"** look so any future project can generate OneBrain-branded artifacts
that are instantly recognizable as a serious AI developer tool.

> **Visual direction:** dark-first near-black canvas, four neon signal accents, italic
> uppercase display type, monospace HUD, corner-cut geometry, neon-glow elevation.
> Tokens in [`colors_and_type.css`](colors_and_type.css) · rules in [`DESIGN.md`](DESIGN.md)
> · provenance in [`PROVENANCE.md`](PROVENANCE.md).

---

## Product Overview

**OneBrain — "Your AI Thinking Partner."** The product this design system is extracted
from is an **AI operating system layer built on top of Obsidian**. It provides any AI
harness (Claude Code, Gemini CLI, Codex, Qwen) with **persistent memory, a structured
knowledge vault, and 29+ pre-built skills**, so every session resumes exactly where the
last one ended. It doesn't compete with harnesses — it *extends* them. As a developer
tool, everything lives in plain Markdown you own forever: no cloud sync, no proprietary
format. (Product Context for the design system: the surfaces below are what it dresses.)

*Evidenced by:* `onebrain-ai/onebrain` `README.md`, `marketplace.json`,
`plugin.json` (v3.1.6, requires CLI ≥3.1.0, AGPL-3.0), and `INSTRUCTIONS.md`.

**Core capabilities (source-backed):**
- **Persistent memory** — `MEMORY.md` + a `memory/` store loaded at session start; the
  agent "remembers who you are, what you're working on, and how you like to work."
- **29+ skills** — composable workflows under `skills/*/SKILL.md`: capture, braindump,
  bookmark, summarize, research, reading-notes, import, consolidate, connect, distill,
  daily, weekly, recap, learn, memory-review, moc, tasks, doctor, qmd, pause, resume,
  schedule, onboarding, update, help, clone …
- **5 sub-agents** — Inbox Classifier (orange), Knowledge Linker (blue), Link Suggester
  (green), Tag Suggester (yellow), Task Extractor (red) (`agents/*.md`).
- **PARA vault** — `00-inbox` · `01-projects` · `02-areas` · `03-knowledge` ·
  `04-resources` · `05-agent` · `06-archive` · `07-logs` (`INSTRUCTIONS.md`).
- **Harness OS, 4 layers** — OneBrain (plugin + CLI) → Harness → LLM → Obsidian Vault
  (source of truth); the **co-evolution loop** is CAPTURE → EVOLVE → WRAPUP
  (`public/diagrams/*.svg`).

**Primary UI surfaces this system dresses:**
1. **Marketing / landing** — the cinematic cyber-console site (hero, features, commands,
   cloud waitlist). Built with Astro + Tailwind CSS v4 (`onebrain-ai/website`).
2. **Vault operator console** — sidebar of PARA folders, a rail of skills, a session/
   activity stream, and a command composer (modelled in [`ui_kits/app/`](ui_kits/app/)).
3. **Branded technical diagrams** — architecture stack, co-evolution loop, vault hub.

### Source references
| Source | What it provided | Evidence |
|---|---|---|
| [`onebrain-ai/website`](https://github.com/onebrain-ai/website) | The visual system — `src/styles/global.css` tokens + component classes, brand SVGs, icons | `context/github/onebrain-ai-website.md` + `…/files/` |
| [`onebrain-ai/onebrain`](https://github.com/onebrain-ai/onebrain) | The product domain — skills, sub-agents, vault structure, version, voice | `context/github/onebrain-ai-onebrain.md` + `…/files/` |
| Uploaded fonts | Chakra Petch ×10, JetBrains Mono ×2 | `fonts/` |

Both repos were read with the bounded `github-design-context` intake (this-device
`git clone`). See [`PROVENANCE.md`](PROVENANCE.md) for the per-value trail.

---

## Package contents

```
.
├── DESIGN.md                  Canonical rules (read first)
├── README.md                  This guide
├── SKILL.md                   Agent-usable skill entry (YAML frontmatter)
├── PROVENANCE.md              Where every token/asset/rule came from
├── colors_and_type.css        Primitives + semantic intent tokens + @font-face bindings
├── components.css             Reusable component layer (buttons, forms, nav, data, feedback, overlays)
├── assets/                    Preserved brand marks
│   ├── brain.svg              Logo (gradient neural-network mark)
│   ├── apple-touch-icon.png   App icon (180px)
│   ├── favicon.ico            Multi-size 16·32·48 — rebuilt from brain.svg
│   └── diagrams/              Live architecture SVGs
│       ├── harness-os-stack.svg
│       ├── coevo-loop.svg
│       └── vault-hub.svg
├── build/                     Runtime icons (runtime filenames)
│   ├── icon.png               byte-for-byte from source
│   ├── favicon.ico            rebuilt from brain.svg (source had a framework default)
│   └── logo.svg               byte-for-byte from source
├── fonts/                     12 brand font files, bound in colors_and_type.css
├── source_examples/           High-signal originals (outside context/)
│   ├── styles/global.css      The real theme + component CSS
│   ├── agents/                inbox-classifier.md · task-extractor.md
│   └── src/                   Astro build-time libs (lib/, middleware.ts, api/)
├── preview/                   Reviewable cards (see Preview Manifest below)
│   ├── _preview.css           Shared atmosphere: section orb + boot reveal (linked by every card)
│   ├── components-forms.html      Full form kit (consumes components.css) — inputs, select, checkbox/radio/switch/range, validation, composer, buttons
│   ├── components-feedback.html   Alerts, toasts, badges, progress, skeleton, spinner, empty-state, modal/tooltip/dropdown
│   ├── components-data.html       Table, list, tabs, breadcrumb, pagination, avatars, stats, density toggle
│   ├── hero-split.html            .ob-synthwave hero · VARIANT 1 (split) — recessed pink 3D grid + floating frosted-glass terminal on the right
│   └── hero-centered.html         .ob-synthwave hero · VARIANT 2 (centered) — same grid + terminal floating below, with pointer-reactive 3D tilt
├── ui_kits/app/               Runnable operator-console UI kit (React + Babel)
│   ├── index.html
│   ├── README.md
│   └── components/            App · Sidebar · AssistantsList · ChatArea · MessageBubble · InputBar
└── context/                   Raw intake evidence (notes + file snapshots)
```

---

## Preview Manifest

Open these in the **Design System** tab. Each is a small, self-contained card that links
`../colors_and_type.css` (the component cards below also link `../components.css`) and
demonstrates real, source-backed tokens/components/assets.
Every card also links `preview/_preview.css` — the shared atmosphere layer that adds the
blurred section **orb** (DESIGN.md §1) and a one-shot **boot reveal** (§7), both with a
`prefers-reduced-motion` fallback. It layers depth/motion only; it never restyles a card.

| Preview card | Inspect | Demonstrates (source-backed) |
|---|---|---|
| [`preview/colors-primary.html`](preview/colors-primary.html) | The four neon accents, the two brand gradients, and the surface/text neutrals | `--color-accent{,-2,-3,-4}`, `--grad-brand` (brain.svg), `--grad-button` (.btn-tech), `--color-bg/surface/...` |
| [`preview/colors-theme-dark.html`](preview/colors-theme-dark.html) | Default dark theme applied to a real console panel + token map | Dark `--color-*` tokens, `--section-accent`, glow dot |
| [`preview/colors-theme-light.html`](preview/colors-theme-light.html) | The optional light scale for spec/print; accents re-inked deeper for the white ground (AA ≥4.5:1) | `[data-theme="light"]` inverted neutrals + inked accents |
| [`preview/typography-specimens.html`](preview/typography-specimens.html) | The three families rendering from the bound fonts + the full type scale + stroke headline | `--font-display` (Chakra Petch), `--font-sans` (Inter), `--font-mono` (JetBrains Mono), `--text-*`, `@font-face` |
| [`preview/spacing-tokens.html`](preview/spacing-tokens.html) | The 4px scale, layout constants, and `--card-pad` applied to cards | `--space-1…9`, `--nav-height`, `--content-max`, `--prose-max`, `--grid-size` |
| [`preview/spacing-radius.html`](preview/spacing-radius.html) | Why corners are sharp; the angled CTA corner-cut | `--radius-0…pill`, `--clip-tech`, `.btn-tech` frame |
| [`preview/spacing-shadows.html`](preview/spacing-shadows.html) | Neon-glow "elevation" vs the single overlay shadow | `--glow-accent/cta/sm/cyan/brand`, `--shadow-overlay` |
| [`preview/components-buttons.html`](preview/components-buttons.html) | Primary/secondary/quiet buttons, nav-link bracket reveal, state + eyebrow pills (hover them) | `.btn-tech`, `.nav-glass a`, semantic state colors, `.cyber-pill` |
| [`preview/components-inputs.html`](preview/components-inputs.html) | Text fields, error state, the command composer + slash suggestions, focus rings | input focus ring (cyan), composer = mono field + `.btn-tech` |
| [`preview/components-cards.html`](preview/components-cards.html) | `.cyber-card` hover (accent border + left bar), stat modules, the 5 sub-agents with their colors | `.cyber-card`, `--section-accent`, stat type, agent color tags |
| [`preview/components-forms.html`](preview/components-forms.html) | **Consumes `components.css`.** The full form kit — text/textarea/select, checkbox/radio/switch/range, required + helper + on-blur validation + disabled, the command composer, and all button variants. Click in for focus rings; blur the email with bad input | `.cyber-input`, `.cyber-select`, `.cyber-check/-radio/-switch/-range`, `.composer`, `.btn-tech/-ghost/-quiet/-danger`, semantic intent tokens |
| [`preview/components-feedback.html`](preview/components-feedback.html) | **Consumes `components.css`.** Semantic alerts (success/info/warning/danger), toasts, badges + tags, progress, skeleton, spinner, empty-state, and live modal/tooltip/dropdown (open them) | `.alert-*`, `.toast`, `.badge-*`, `.progress`, `.skeleton`, `.spinner`, `.empty-state`, `.modal`+`.scrim`, `--fb-*`, `--elev-3` |
| [`preview/components-data.html`](preview/components-data.html) | **Consumes `components.css`.** `.cyber-table` (tabular nums, sticky header, hover rows) with a live density toggle, session list, tabs, breadcrumb, pagination, sub-agent avatars, stats, cards | `.cyber-table`, `.cyber-list`, `.cyber-tabs`, `.breadcrumb`, `.pagination`, `.avatar`, `.stat`, `data-density` |
| [`preview/brand-assets.html`](preview/brand-assets.html) | The real preserved files loaded via `<img>`/`<object>` — logo, app icon, favicon, the 3 live diagrams, font specimens | `assets/brain.svg`, `build/icon.png`, `build/favicon.ico`, `assets/diagrams/*.svg`, `fonts/*.ttf` |
| [`preview/hero-split.html`](preview/hero-split.html) | The `.ob-synthwave` **hero section — variant 1 (split)** — the perspective grid is dialed back + scrimmed so it recedes, while **one** OneBrain operator-console terminal floats out of it on the right as a single **iOS-style frosted-glass** window (translucent + `backdrop-filter` blur/saturate, inset top highlight, brand-glow shadow, cast glow beneath) tilted in 3D so the pink grid glows *through* it. Window bar uses brand-tinted state-color "traffic lights"; body runs the real `brew install …` → `capture` session transcript with a frosted input pill + `NODE · NETWORK :: ONLINE · LAT` status line. Hero accent re-keyed to brand **pink** via one variable (`--ha`). Confirm the backdrop never out-shouts the window and the grid reads through the glass; mobile flattens the tilt and stacks copy over the window | `--ha`→`--color-accent-3` (pink grid/UI), `--color-bg/-deep`, `backdrop-filter` frosted glass, `--color-danger/-warning/-success` window lights, `--grad-hero-btn` (pink→violet), `--clip-tech` CTA, `--font-display` stroke headline, wikilink `[[…]]` |
| [`preview/hero-centered.html`](preview/hero-centered.html) | The `.ob-synthwave` **hero section — variant 2 (centered)** — same recessed pink grid + frosted-glass terminal, re-composed center-aligned (pill → `UNIFIED / INTELLIGENCE` → centered sub → CTAs → meta) with the terminal floating **below** the copy. Signature motion is a **pointer-reactive 3D tilt**: the window leans toward the cursor (`rotateX`/`rotateY` via `--rx`/`--ry`, glow tracking it), plus a load-rise + gentle bob. Headline `INTELLIGENCE` uses a pink→violet gradient text fill (vs. variant 1's stroke). Confirm the headline is fully visible on load, the tilt follows the cursor on desktop, and ≤560px flattens the tilt with no horizontal scroll | `--ha`→`--color-accent-3`, `backdrop-filter` frosted glass, `--rx`/`--ry` pointer tilt, `--grad-hero-btn`, `--clip-tech` CTA, `--font-display` gradient headline, `prefers-reduced-motion` / `pointer:fine` gates |

The applied screen lives separately at [`ui_kits/app/index.html`](ui_kits/app/index.html)
(runnable React console) — see [`ui_kits/app/README.md`](ui_kits/app/README.md).

---

## Reuse workflow

1. **Read the rules.** Start with `DESIGN.md`; skim `PROVENANCE.md` to know what's real
   vs. derived. Agents should also load `colors_and_type.css`, `components.css`, `preview/`,
   `assets/`, `build/`, `fonts/`, `source_examples/`, and `ui_kits/app/` before generating.
2. **Bind the foundation, then the components.** `<link rel="stylesheet" href="colors_and_type.css">`
   then `<link rel="stylesheet" href="components.css">` (fix the relative paths for your
   file's location), or paste their contents into your first `<style>`. The token file binds
   the brand fonts too — never substitute fonts. Components reference the semantic intent
   tokens, so re-skin by remapping `--action-primary` / `--fb-*` / `--bg-*`, not by editing
   component rules.
3. **Compose from the component layer.** Assemble surfaces from `components.css` — `.btn-tech`,
   `.cyber-card`, `.cyber-pill`, the form controls, `.cyber-table`, `.alert`/`.toast`,
   `.modal`/`.drawer`, etc. — plus the 56px HUD grid and corner-cut geometry. Cross-check
   against `preview/components-*.html` and `source_examples/styles/global.css`.
4. **Use real assets + vocabulary.** Pull marks from `assets/`/`build/`; use real skill
   names, vault folders, the co-evolution loop, and the real version `3.1.6`. No invented
   stats; use honest placeholders when a value is unknown.
5. **Model real screens** on `ui_kits/app/` for product/console work.
6. **Stay on-system.** One accent per surface (twice max), sharp corners, glow over
   shadow, dark-first, always ship a `prefers-reduced-motion` fallback. Honor `DESIGN.md`
   §9 anti-patterns.

---

## Notes

- **Dark-first.** The product ships dark; the light theme is a secondary spec/print
  surface only.
- **Honest gaps** (see `PROVENANCE.md`): the website's `.astro` section components and the
  `onebrain` README header PNGs were outside the bounded snapshot, so the `ui_kits/app/`
  console is an applied interpretation built from the source's real CSS vocabulary, and
  Inter ships as a system/Google fallback (not a file).
- This is a draft package until published; publishing makes it selectable by other
  Open Design projects.
