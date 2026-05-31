# Provenance — OneBrain Design System

This package was extracted from real OneBrain source code, not authored from a brief.
This file records exactly where each token, asset, and rule came from so future agents
can trust and re-verify the system.

## Sources

| Source | Type | Read method | Evidence note |
|---|---|---|---|
| `https://github.com/onebrain-ai/website` | GitHub repo (marketing site, Astro + Tailwind v4) | **git-clone** (this-device) | `context/github/onebrain-ai-website.md` |
| `https://github.com/onebrain-ai/onebrain` | GitHub repo (the product: AI-harness plugin, 29+ skills) | **git-clone** (this-device) | `context/github/onebrain-ai-onebrain.md` |
| ChakraPetch (10 files) + JetBrainsMono (2 files) | Uploaded brand fonts | provided at setup | uploaded as `assets_*.ttf` at root → canonical home `fonts/`; the redundant root copies were removed in a later cleanup, `fonts/` is the single source bound in `colors_and_type.css` |

Both repositories were read with the bounded `github-design-context` intake command
(this-device `git clone`), per the source-context runbook — not via direct connector
tree/content/raw calls. Snapshots live under `context/github/<repo>/files/`.

## Color — every value is verbatim from source

From `onebrain-ai/website` `src/styles/global.css` `@theme` (palette named in source
**"Cyber Palette — Operator Console"**):

```
--color-bg #050507 · --color-surface #0a0a12 · --color-border rgba(255,255,255,.08)
--color-text #f0f0f2 · --color-muted #a1a1aa
--color-accent #bc13fe · --color-accent-2 #00f3ff · --color-accent-3 #ff2d92 · --color-accent-4 #ffb000
```

Additional values observed in the same file / brand SVGs:
- `--color-bg-deep #020204` — sticky nav base `rgba(2,2,4,.92)` (`.nav-glass`).
- `--color-surface-2 #08080e` — card fill `rgba(8,8,14,.78)` (`.cyber-card`).
- Brand gradient `#ff2d92 → #ff5aa3 → #00f3ff` — `assets/brain.svg` `linearGradient`.
- Button gradient `135deg accent → accent-2` — `.btn-tech`.
- Domain accents from the diagram SVGs: vault-hub `#7c3aed`/`#a78bfa`,
  harness-os-stack `#00cce0`/`#00646e`, coevo-loop `#a8d000`/`#d4ff45`.

No color in `colors_and_type.css` was invented. The optional `[data-theme="light"]`
scale is the one derived addition (for spec/print) and is labelled as such; accents
are carried over unchanged.

## Typography — from `global.css @theme`

```
--font-sans:    "Inter", ui-sans-serif, system-ui, sans-serif
--font-mono:    "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace
--font-display: "Chakra Petch", "Inter", ui-sans-serif, system-ui, sans-serif
```

Chakra Petch and JetBrains Mono are the uploaded brand fonts; they are preserved in
`fonts/` and bound via `@font-face` in `colors_and_type.css`. Inter is the source's
declared body fallback and is not shipped as a file.

## Components, layout, motion — from `global.css`

Class names reproduced in `preview/` and `ui_kits/app/` exist in the source stylesheet:
`.btn-tech` (+ `.btn-tech-inner`), `.cyber-card`, `.cyber-pill`, `.cyber-h2` /
`.cyber-h2-stroke`, `.cyber-section` (+ `-grid` / `-orb` / `-shell`), `.page-spine`,
`.nav-glass`, `.warp-overlay` / `.warp-blackout`, `.reveal`, `.brand`. Motion timings,
easings, the 56px HUD grid, the `--clip-tech` corner cut, and the cyan `:focus-visible`
ring are all lifted from that file.

## Product facts — from `onebrain-ai/onebrain`

- Name/tagline: "OneBrain — Your AI Thinking Partner" / "Your personal AI OS"
  (`.claude-plugin/marketplace.json`, `README.md`).
- Version: plugin `3.1.6`, requires CLI `≥3.1.0`, license AGPL-3.0
  (`.claude/plugins/onebrain/.claude-plugin/plugin.json`).
- Vault structure (PARA: `00-inbox` … `07-logs`) and the "personal chief of staff"
  persona (`INSTRUCTIONS.md`).
- Skill names (`skills/*/SKILL.md`) and the 5 sub-agents with their colors —
  Inbox Classifier (orange), Knowledge Linker (blue), Link Suggester (green),
  Tag Suggester (yellow), Task Extractor (red) (`agents/*.md`).
- Harness OS 4-layer stack + co-evolution loop (`public/diagrams/*.svg`).

## Preserved binary / source files

- `assets/brain.svg`, `assets/apple-touch-icon.png`,
  `assets/diagrams/{harness-os-stack,coevo-loop,vault-hub}.svg` — copied byte-for-byte
  from `context/github/onebrain-ai-website/files/public/…`.
- `build/icon.png`, `build/logo.svg` — the same runtime icons preserved with
  runtime-style filenames (byte-for-byte; not redrawn or re-encoded).
- `assets/favicon.ico` + `build/favicon.ico` — **rebuilt from `brain.svg`**, NOT
  byte-for-byte. The captured source favicon
  (`context/github/onebrain-ai-website/files/public/favicon.ico`, 655 B, 32×32 PNG)
  is the Astro framework's default starter mark (white "A" on a dark square) — the
  source site never replaced it. Per explicit user feedback ("favicon need to sync
  with brand logo") it was regenerated from the real brand logo: the gradient brain
  mark centered on the `#050507` brand canvas, exported as a true multi-size ICO
  (16·32·48, 32-bit). The original Astro favicon is retained untouched under
  `context/…/files/public/favicon.ico` as captured evidence.
- `fonts/*.ttf` — the 12 uploaded brand font files, clean-named.
- `source_examples/` — high-signal originals kept outside `context/`:
  `styles/global.css` (the full theme + component CSS), `agents/inbox-classifier.md`,
  `agents/task-extractor.md`, and the Astro build-time libs materialized by intake
  (`src/lib/*`, `src/middleware.ts`, `src/pages/api/waitlist.ts`).

## Uncertainty / honest gaps

- The website's `.astro` section components (Hero, Features, Cloud) were not part of
  the bounded snapshot, so the `ui_kits/app/` console is an **applied interpretation**
  of the product domain using the source's real CSS vocabulary — not a 1:1 copy of an
  existing screen.
- `onebrain-ai/onebrain`'s `README.md` references `assets/header-{dark,light}.png`;
  those header images were not in the captured file set, so they are not preserved.
- Inter is referenced by the source but not provided as a file (system/Google fallback).
