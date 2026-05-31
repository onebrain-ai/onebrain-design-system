# OneBrain is an AI Design System

> Category: Custom · Surface: web (dark-first) · Aesthetic: cyberpunk / Tron "operator console"
> Source of truth for color, type, spacing, layout, components, motion, voice.
> Tokens live in [`colors_and_type.css`](colors_and_type.css) (primitives + a semantic
> intent layer). Reusable component classes live in [`components.css`](components.css).
> Provenance in [`PROVENANCE.md`](PROVENANCE.md).

This system is **extracted from real source**, not invented. Every color, font, and
component rule below traces to the OneBrain product code:
- **`onebrain-ai/website`** — the marketing site (`onebrain.run`), Astro + Tailwind CSS v4.
  Its `src/styles/global.css` is the authoritative token + component source.
- **`onebrain-ai/onebrain`** — the product itself: a Claude Code / AI-harness plugin
  (v3.1.6, AGPL-3.0) with 29+ skills, 5 sub-agents, and an Obsidian-vault knowledge layer.

When extending the system, derive new values with `oklch()` / `color-mix()` from the
tokens below — do not introduce colors or fonts outside this palette.

---

## Product context

**OneBrain — "Your AI Thinking Partner."** An AI operating system layer built on top of
Obsidian. It gives any AI harness (Claude Code, Gemini CLI, Codex, Qwen) **persistent
memory, a structured knowledge vault, and 29+ pre-built skills**, so every session picks
up exactly where the last one left off.

- **It extends harnesses, it doesn't replace them.** "Same harness; suddenly it remembers
  who you are, what you're working on, and how you like to work."
- **Plain Markdown, owned forever.** No cloud sync, no proprietary format — your agent,
  your vault, your data, version-controlled.
- **Obsidian is the dispatch hub.** Code lives in repos; orchestration lives in the vault.
  Markdown replaces Slack / Linear / Notion.
- **The Harness OS is a 4-layer stack** (from the `harness-os-stack` diagram):
  `OneBrain (plugin + CLI)` → `Harness (Claude Code · Gemini CLI · Codex · Qwen)` →
  `LLM (local · cloud · API)` → `Obsidian Vault (source of truth)`.
- **The product persona is a "personal chief of staff"** operating inside the vault —
  proactive, surfaces connections, flags stale tasks.

**Primary surfaces this system dresses:**
1. Marketing / landing (hero, features, commands, cloud waitlist) — the cinematic
   cyber-console look.
2. The vault **operator console** — sidebar of PARA folders, a rail of 29+ skills, an
   activity/session log, and a command composer (modelled in `ui_kits/app/`).
3. Branded technical diagrams (architecture, loops, hub-and-spoke).

**Atmosphere.** Futuristic, minimal, professional. A user should recognize "this is an
AI product, and it's serious" within one glance: a near-black operator canvas, a faint
56px HUD lattice, neon signal accents used sparingly, italic uppercase display type, and
monospace status lines. Restraint is the rule — the darkness and one decisive neon glow
do the work; this is **not** a rainbow gradient playground.

---

## 1. Visual theme & atmosphere

- **Dark-first operator console.** Canvas is `#050507` (near-black), panels `#0a0a12`.
  Light theme exists only for spec sheets / print (`[data-theme="light"]`); its accents are
  re-inked for legibility on white (see §2 "Light-theme accents").
- **HUD scaffolding.** A faint 56×56px gridline lattice (`--grid-line`) with a radial
  mask fades to black at the edges; a soft blurred accent "orb" sits behind section
  content at ~9% opacity. Both are atmosphere, never foreground.
- **Synthwave grid backdrop (hero only).** For a full-bleed cinematic moment there is a
  second background — `.ob-synthwave` (shipped in two hero variants:
  `preview/hero-split.html`, variant 1 — a split hero with the window on the right, and
  `preview/hero-centered.html`, variant 2 — a centered hero with the window floating below):
  a near-black sky lifting to a faint violet wash, dark mountain ridges with a pink rim,
  a single pink→violet horizon bloom (the brand gradient, used once), and a pink
  perspective grid (`perspective()` + `rotateX`) receding to the vanishing point and
  scrolling forward. **It is deliberately recessed: the grid lines, bloom, stars, and
  horizon glow are kept low-contrast, and a `.sw-scrim` dims the field — the backdrop
  must never out-shout the content.** A **single product window floats *out of* the grid
  in 3D** — a `perspective` stage holds one OneBrain operator-console terminal tilted on
  `rotateY`/`rotateX` with a gentle bob and a blurred accent glow cast beneath it (so it
  reads as hovering *above* the floor). The window is **iOS-style frosted glass**:
  translucent fill + heavy `backdrop-filter: blur() saturate()`, a bright inset top
  highlight, and a soft ambient + brand-glow shadow, so the pink grid glows *through* it
  rather than being blocked while the content still owns the eye. The window bar carries
  brand-tinted "traffic lights" reusing the semantic state colors (danger magenta /
  warning amber / success lime), and the body runs a real session transcript (the
  `brew install …` line + `capture` → vault routing → `[[wikilinks]]` →
  CAPTURE→EVOLVE→WRAPUP) with a frosted input pill and the `NODE · NETWORK :: ONLINE ·
  LAT` status line lifted from the live site. *This frosted window is a **deliberate
  exception** to the system's sharp-corner rule* — glass only reads as iOS glass when
  softly rounded (~18px), so the hero window rounds while the rest of the system stays
  cut. The hero accent is set by one variable (`--ha`, here the brand **pink**
  `--color-accent-3`): swap it to re-key the grid, horizon line, ridge rim, glass glow,
  pills, and CTAs in a single edit. Restraint still rules — violet is the lone secondary,
  the bloom appears once, and the grid scroll + window bob honor `prefers-reduced-motion`.
  The **centered variant** (`hero-centered.html`) adds one extra flourish: a
  pointer-reactive 3D tilt — the floating window leans toward the cursor (`rotateX`/
  `rotateY` driven by `--rx`/`--ry`, with the cast glow tracking it), gated to fine
  pointers and motion-allowed so touch / reduced-motion keep the resting tilt.
  Use it behind a hero — never under dense data or as the default section ground (that
  stays the flat lattice + orb above).
- **Neon as signal, not decoration.** Four accents only. One accent owns a given section
  (`--section-accent`), used at most twice. Glow (`box-shadow`/`drop-shadow`) replaces
  drop-shadow elevation almost everywhere.
- **Corner-cut geometry.** Primary CTAs and framed elements use an angled `clip-path`
  (`--clip-tech`) rather than rounded corners. Pills carry small L-bracket corner ticks.
- **Cinematic reveals.** Sections "boot": a one-shot scanline sweep, a pill rise, an
  italic headline that slides in and color-drains its stroke, a sub-paragraph lift.

---

## 2. Color

Palette name from source: **"Cyber Palette — Operator Console."** Hex values are verbatim
from `global.css @theme`. Tokens: see `colors_and_type.css`.

### Surfaces & text
| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#050507` | App canvas (near-black) |
| `--color-bg-deep` | `#020204` | Sticky nav base (`rgba(2,2,4,.92)`) |
| `--color-surface` | `#0a0a12` | Raised panel / surface |
| `--color-surface-2` | `#08080e` | Card fill (`rgba(8,8,14,.78)`) |
| `--color-border` | `rgba(255,255,255,.08)` | Hairline border |
| `--color-border-2` | `rgba(255,255,255,.06)` | Card hairline |
| `--color-text` | `#f0f0f2` | Primary text |
| `--color-muted` | `#a1a1aa` | Secondary text |
| `--color-faint` | `rgba(255,255,255,.62)` | Sub-paragraph / mono body |
| `--color-ghost` | `rgba(255,255,255,.18)` | Tiny meta labels |
| `--color-white` | `#ffffff` | Headlines + brand emphasis |

### Accents — the four neon signals
| Token | Value | Name | Primary use |
|---|---|---|---|
| `--color-accent`   | `#bc13fe` | Neon violet | Primary, gradient start, button frame |
| `--color-accent-2` | `#00f3ff` | Electric cyan | **Default section accent**, focus ring |
| `--color-accent-3` | `#ff2d92` | Hot magenta | Brand glow, status dot, CTA glow |
| `--color-accent-4` | `#ffb000` | Amber | Warnings, occasional highlight |

### Semantic states
`--color-success` = lime `#a8d000` · `--color-info` = cyan `#00f3ff` ·
`--color-warning` = amber `#ffb000` · `--color-danger` = magenta `#ff2d92`.

### Domain / diagram accents (from the real brand SVGs)
`--color-vault` `#7c3aed` + `--color-vault-2` `#a78bfa` (Obsidian hub) ·
`--color-harness` `#00cce0` / `#00646e` (harness layer) ·
`--color-loop` `#a8d000` / `#d4ff45` (co-evolution loop). Use these only in
architecture/diagram contexts so each subsystem keeps its identity.

### Light-theme accents (re-inked for white ground)
The neon accents above are tuned for the near-black canvas. On the light theme
(`[data-theme="light"]`, for spec sheets / print) electric cyan and amber wash out
and the rest glare, so `colors_and_type.css` overrides the four accents with deeper,
slightly-desaturated **ink** variants that stay subtle yet clear text-contrast on white
(all ≥4.5:1 / AA). Use the tokens — don't hand-patch darker hexes in light layouts.

| Token | Dark (neon) | Light (ink) | Contrast on `#fff` |
|---|---|---|---|
| `--color-accent`   | `#bc13fe` | `#9500c7` | 6.8:1 |
| `--color-accent-2` | `#00f3ff` | `#007a90` | 5.0:1 |
| `--color-accent-3` | `#ff2d92` | `#c2186a` | 5.8:1 |
| `--color-accent-4` | `#ffb000` | `#9a6400` | 5.0:1 |
| `--color-success`  | `#a8d000` | `#5f7d00` | 4.8:1 |

`--section-accent`, `--color-info`, `--color-warning`, and `--color-danger` reference the
accent tokens, so they inherit the inked values automatically under `data-theme="light"`.
The dark-first product surfaces are untouched.

### Gradients
- **Brand gradient** (`--grad-brand`, from `brain.svg` logo): `#ff2d92 → #ff5aa3 → #00f3ff`.
- **Button frame** (`--grad-button`, from `.btn-tech`): `135deg, accent → accent-2`.

### Rules
- **One accent per surface, twice max.** Set `--section-accent` to re-tint a region.
- Never put an accent on a large fill — accents are strokes, glows, 1–2px bars, dots,
  and small pill text/borders. Bodies stay on the neutral scale.
- Brand-emphasise literal "OneBrain" mentions in prose with `--color-white` + bold +
  a soft white text-shadow halo (source `.brand`).

---

## 3. Typography

Three families (source `global.css @theme`); two are shipped as `fonts/*.ttf` and bound
via `@font-face` in `colors_and_type.css`.

| Role | Family | Token | Notes |
|---|---|---|---|
| Display | **Chakra Petch** | `--font-display` | Italic + uppercase for headlines/titles/wordmark. 300–700 incl. italics shipped. |
| Body / sans | **Inter** | `--font-sans` | System/Google fallback (not shipped as a file). |
| Mono | **JetBrains Mono** | `--font-mono` | Eyebrows, metadata, code, IDs; body in dense console contexts. Variable 100–800. |

**Never** pair body and display as the same family. Inter is body; Chakra Petch is display;
JetBrains Mono is the HUD/code voice. Inter/Roboto/Arial must never be a *display* face.

### Scale (base 16px / line-height 1.5)
| Token | Size | Use |
|---|---|---|
| `--text-hero` | `clamp(3rem, 9vw, 8rem)` | Hero display |
| `--text-h2` | `clamp(2.4rem, 5.6vw, 5rem)` | Section headline (line-height `.95`, tracking `-.02em`) |
| `--text-2xl` | 32px | Large stat |
| `--text-xl` | 24px | Subsection |
| `--text-lg` | 20px | Lead |
| `--text-md` | 17px | Card title |
| `--text-base` | 16px | Body |
| `--text-sm` | 13px | Mono metadata |
| `--text-xs` | 11px | Card description, fine print |
| `--eyebrow-size` | 10px | Pill / kicker (mono, uppercase, tracking `.4em`) |

### Patterns
- **Display headline** (`.cyber-h2`): Chakra Petch, italic, 700, uppercase, line-height
  `0.95`, letter-spacing `-0.02em`, color `#fff`. Optional stroke variant: transparent
  fill + `1.5px` accent `-webkit-text-stroke` + accent glow.
- **Eyebrow / pill**: JetBrains Mono, 10px, uppercase, letter-spacing `0.4em`, accent
  color, with corner brackets + a pulsing accent dot.
- **Body**: Inter, 16px, line-height 1.5. **Mono sub-paragraphs** (`.cyber-sub`):
  JetBrains Mono `~0.95rem`, line-height 1.65, `--color-faint`, max-width 640px.
- Inline `<code>`: cyan text on `rgba(0,243,255,.08)`, 2px radius.

---

## 4. Spacing

4px base scale (`--space-1`…`--space-9` = 4→96px). Density is **comfortable-dense**:
generous around hero/headlines, tight inside data cards.

- **Section padding**: `2.5rem 1.5rem 2rem` mobile → `4rem 4rem 3rem` ≥1024px.
- **Card padding**: `1.4rem 1.5rem`.
- **Content max-width**: `1280px` shell; prose/sub max-width `640px`.
- **Nav height / scroll-padding**: `64px`.
- **Card grid gap / stack rhythm**: `18–24px`.

### Radius — deliberately sharp
This is a cyber system: corners are **cut, not rounded**.
`--radius-0` (0) is the default for panels/cards. `--radius-xs` (2px) for inline code/chips,
`--radius-sm` (4px) for small controls, `--radius-pill` (999px) only for the nav counter
and status dots. Framed CTAs use the angled `--clip-tech` clip-path instead of any radius.

### Elevation / shadow
There is essentially **no soft drop-shadow elevation**. "Raised" reads as either a hairline
border or a neon glow:
- `--glow-cta` `0 0 14px rgba(255,45,146,.5)` (button hover),
- `--glow-accent` (active dots/markers), `--glow-brand` (logo halo).
- The only true shadow is `--shadow-overlay` for dropdowns/modals.

---

## 5. Layout & composition

- **Full-viewport sections.** Each section fills `100dvh − 64px`, flex-centered, with the
  56px HUD grid + blurred orb behind a `max-width:1280px` content shell.
- **Right-edge page spine (HUD).** A fixed vertical track of dots marks scroll progress;
  the active dot glows in the section's accent. Hidden < 1024px.
- **Scroll-snap on desktop, free-scroll on mobile.** `scroll-snap-type: y mandatory` ≥1024px;
  disabled below (sections get a hairline divider instead). Honor this — don't force snap
  on mobile.
- **Sticky glass nav** at 64px, `rgba(2,2,4,.92)` (color carries the glass; avoid live
  `backdrop-filter` on the sticky nav — it's a Safari paint hot path in the source).
- **Console layout** (`ui_kits/app/`): three columns — left **Sidebar** (brand + PARA
  vault folders + status), an **AssistantsList** skill rail (the 29+ skills/commands), a
  main **ChatArea** session console (an activity log of **MessageBubble** entries), and a
  docked **InputBar** command composer.
- **Responsive**: verify no horizontal scroll at 360 / 390 / 430 / 768 / 1024 / 1280 / 1440 /
  1920. Collapse the spine and multi-column console to a stacked layout under 1024px.

---

## 6. Components

**The reusable component layer ships in [`components.css`](components.css)** — a drop-in
stylesheet you load after `colors_and_type.css`. It consolidates the canonical source
classes below (no more copy-pasting them per file) and adds the full kit needed to assemble
real surfaces: **forms** (input, textarea, select, checkbox, radio, switch, range, validation
+ helper + disabled states, the command composer), **navigation** (`.nav-glass`, `.cyber-tabs`,
`.breadcrumb`, `.pagination`), **data display** (`.cyber-table` with tabular numerics + sticky
header, `.cyber-list`, `.avatar`, `.stat`, `.empty-state`), **feedback** (`.alert`, `.toast`,
`.progress`, `.skeleton`, `.spinner`), and **overlays** (`.modal` + `.scrim`, `.drawer`,
`.tooltip`, `.dropdown`). Every class references the **semantic intent tokens** in
`colors_and_type.css` (`--action-primary`, `--fb-danger`, `--bg-elevated`, `--elev-2`,
`--text-on-accent`, …) rather than raw palette hexes, so a re-skin or light/dark flip flows
through automatically; controls honor focus-visible, `[disabled]`/`aria-invalid`, the
`data-density` contract (comfortable ↔ compact), and `prefers-reduced-motion`. See
`preview/components-forms.html`, `components-feedback.html`, `components-data.html`.

The canonical classes below all exist in the source `global.css`; `components.css`, the
previews, and the UI kit reproduce them.

- **`.btn-tech` (primary CTA).** Angled `clip-path` frame filled with the `135deg accent→
  accent-2` gradient (1.5px padding), dark inner panel. Hover: inner → white (so inner text
  reads black) + magenta glow. Use `box-shadow`, not `filter`, for the glow.
- **Secondary / ghost button.** Hairline border, transparent fill, accent text; border
  brightens to the section accent on hover.
- **`.cyber-card`.** Solid dark fill `rgba(8,8,14,.78)`, 1px `rgba(255,255,255,.06)` border,
  `1.4rem 1.5rem` padding. Hover: border → accent + a 2px accent bar slides in on the left
  (`::before`). Top-right mono meta label (`--color-ghost`) turns accent on hover. Card
  title = Chakra Petch italic uppercase; desc = mono 11.5px `--color-faint`.
- **`.cyber-pill` (eyebrow/status).** Mono 10px uppercase, tracking `.4em`, accent text on
  4%-accent fill with a 30%-accent border, L-bracket corner ticks, pulsing dot. Optional
  typewriter caret.
- **Inputs / composer.** Dark surface, hairline border, mono placeholder in `--color-muted`;
  focus ring = `2px solid cyan, offset 3px`. The command composer pairs a mono text field
  with a `.btn-tech` submit and a `/`-prefixed slash-command affordance.
- **Nav links.** Muted by default; hover/active reveals `[ ]` brackets and brightens to
  white. Active section is tracked and highlighted.
- **Page spine dots, counter, status line** — mono, pill-shaped chrome, glow on active.
- **Status / state pills.** Tinted background + accent text using the semantic state colors
  (`success` lime, `info` cyan, `warning` amber, `danger` magenta).
- **Diagrams** are first-class brand components (`assets/diagrams/*.svg`): layered stack,
  three-step loop, hub-and-spoke — each keyed to its domain accent.

---

## 7. Motion & interaction

- **Section boot choreography** (easing `--ease-boot` / `--ease-out-expo`):
  scanline sweep `1.1s` → pill rise `0.4s @ .1s` → headline slide `0.45s @ .25s` →
  stroke color-drain `0.75s @ .7s` (`--ease-drain`) → sub-paragraph lift `0.45s @ .5s` →
  cards fade-rise staggered from `0.75s`.
- **Reveal**: opacity 0 + `translateY(20px)` → in, `1.2s` `--ease-out-expo`. (The hero H1
  opts out so it isn't an LCP penalty.)
- **Hover**: border-color / background transitions `0.2–0.25s`; CTA glow via `box-shadow`.
- **Pulsing dot / caret**: `cyber-pulse` 1.5s; caret blink `0.55s steps(2)`.
- **Warp transition** between sections: a monochrome scanline sweeps up, a blackout holds
  ~700ms with the brain mark + mono status line, then the new section boots.
- **Performance discipline (from source):** animate only opacity + transform; avoid
  animating `filter`/`blur` on hot paths; release offscreen animations (`data-vis="off"`).
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` disables boot/scanline/
  warp/pulse and flattens reveals. Always include it.

---

## 8. Voice & brand

- **Product name**: always `OneBrain` (one word, camel-cased B). Never title anything from
  a URL/protocol string.
- **Tone**: confident, technical, minimal — a "personal chief of staff." Concise and
  proactive; no marketing fluff, no invented metrics.
- **Eyebrows & status lines**: uppercase mono, wide-tracked (`LAYER_01`, `SYSTEM ONLINE`,
  `// CAPTURE`). Headlines: italic uppercase, cinematic ("UNIFIED INTELLIGENCE").
- **Product vocabulary** (use the real terms): vault, skills, harness, memory, persistent
  memory, wikilinks `[[Note]]`, PARA folders (`00-inbox` … `07-logs`), the co-evolution loop
  (**CAPTURE → EVOLVE → WRAPUP**), `onebrain.yml`, `/skill` slash-commands.
- **Real skills** (sample of 29+): capture, braindump, bookmark, consolidate, connect,
  distill, daily, weekly, recap, learn, memory-review, moc, research, summarize, import,
  reading-notes, doctor, qmd, pause, resume, schedule, tasks, onboarding, update.
- **Sub-agents** (with their source colors): Inbox Classifier (orange), Knowledge Linker
  (blue), Link Suggester (green), Tag Suggester (yellow), Task Extractor (red).
- **Tasks** use Obsidian syntax: `- [ ] Action 📅 YYYY-MM-DD`.

---

## 9. Anti-patterns

Do **not**:
- Use warm beige / cream / peach / pink-brown "AI canvas" washes. The ground is near-black.
- Reach for the generic AI purple→blue full-bleed gradient. Accents are strokes/glows/dots,
  never large fills. One accent per surface, twice max.
- Round everything. This system is sharp — default radius is 0; CTAs are corner-cut.
- Use Inter/Roboto/Arial as a **display** face, or make body and display the same family.
- Add an emoji next to every heading, or a gradient on every background.
- Animate `filter`/`blur` on scroll/hover hot paths, or ship motion without a
  `prefers-reduced-motion` fallback.
- Force `scroll-snap` on mobile (source disables it < 1024px).
- Invent stats, fake skill names, or fake version numbers. Real version: plugin `3.1.6`,
  CLI `≥3.1.0`. If a value is unknown, use an honest placeholder.
- Expose designer/demo controls (viewport pickers, theme knobs, target-count badges) inside
  product UI. Navigation must be real product navigation.
- Recolor the brand logo or redraw it — use the preserved `assets/brain.svg`.
