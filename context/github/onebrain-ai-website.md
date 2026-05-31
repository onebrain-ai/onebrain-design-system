# GitHub Design Evidence: onebrain-ai/website

Source: https://github.com/onebrain-ai/website
Read method: git-clone
Local clone method: git clone
Ref: default branch
Repository paths discovered: 45
Snapshot files written: 18

## Intake Status

- This-device intake was used through local git or GitHub CLI.

## README (README.md)

```md
# onebrain-ai/website

Marketing site for [OneBrain](https://github.com/onebrain-ai/onebrain) — deployed at [onebrain.run](https://onebrain.run).

Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com).

## Develop

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

Output goes to `./dist`. Deployed via Cloudflare Pages.

## Structure

```
src/
  components/   Section components (Hero, Features, Cloud, ...)
  layouts/      Layout.astro
  pages/        index.astro
  styles/       global.css (Tailwind theme)
```

```

## Source Evidence Inventory

### Product docs and manifests

Use these to understand product purpose, dependency stack, scripts, and public naming.

- package.json -> `context/github/onebrain-ai-website/files/package.json` (source)

### Brand assets and icons

Preserve source build/runtime paths: files under `build/` should be copied back into root `build/` with their original filenames, while non-build logos, avatars, or wordmarks can be copied into `assets/`. Reflect the preserved files in `preview/brand-assets.html`.

- public/apple-touch-icon.png -> `context/github/onebrain-ai-website/files/public/apple-touch-icon.png` (binary asset)
- public/favicon.ico -> `context/github/onebrain-ai-website/files/public/favicon.ico` (binary asset)

### Theme, tokens, and styling

Extract concrete color, typography, spacing, radius, shadow, and theme-variable values from these files.

- src/styles/global.css -> `context/github/onebrain-ai-website/files/src/styles/global.css` (source)

### Other design evidence

Inspect these only after the primary design evidence above has been used.

- .vscode/extensions.json -> `context/github/onebrain-ai-website/files/.vscode/extensions.json` (source)
- .vscode/launch.json -> `context/github/onebrain-ai-website/files/.vscode/launch.json` (source)
- docs/waitlist-setup.md -> `context/github/onebrain-ai-website/files/docs/waitlist-setup.md` (source)
- public/brain.svg -> `context/github/onebrain-ai-website/files/public/brain.svg` (source)
- public/diagrams/coevo-loop.svg -> `context/github/onebrain-ai-website/files/public/diagrams/coevo-loop.svg` (source)
- public/diagrams/harness-os-stack.svg -> `context/github/onebrain-ai-website/files/public/diagrams/harness-os-stack.svg` (source)
- public/diagrams/vault-hub.svg -> `context/github/onebrain-ai-website/files/public/diagrams/vault-hub.svg` (source)
- src/lib/brain-id.ts -> `context/github/onebrain-ai-website/files/src/lib/brain-id.ts` (source)
- src/lib/disposable-domains.ts -> `context/github/onebrain-ai-website/files/src/lib/disposable-domains.ts` (source)
- src/lib/gh-stars.ts -> `context/github/onebrain-ai-website/files/src/lib/gh-stars.ts` (source)
- src/lib/version.ts -> `context/github/onebrain-ai-website/files/src/lib/version.ts` (source)
- src/middleware.ts -> `context/github/onebrain-ai-website/files/src/middleware.ts` (source)
- src/pages/api/waitlist.ts -> `context/github/onebrain-ai-website/files/src/pages/api/waitlist.ts` (source)
- tsconfig.json -> `context/github/onebrain-ai-website/files/tsconfig.json` (source)


## Files Inspected

- src/styles/global.css -> `context/github/onebrain-ai-website/files/src/styles/global.css` (34120 bytes, git-clone)
- public/apple-touch-icon.png -> `context/github/onebrain-ai-website/files/public/apple-touch-icon.png` (29338 bytes, git-clone, binary asset)
- public/favicon.ico -> `context/github/onebrain-ai-website/files/public/favicon.ico` (655 bytes, git-clone, binary asset)
- package.json -> `context/github/onebrain-ai-website/files/package.json` (592 bytes, git-clone)
- .vscode/extensions.json -> `context/github/onebrain-ai-website/files/.vscode/extensions.json` (87 bytes, git-clone)
- .vscode/launch.json -> `context/github/onebrain-ai-website/files/.vscode/launch.json` (207 bytes, git-clone)
- docs/waitlist-setup.md -> `context/github/onebrain-ai-website/files/docs/waitlist-setup.md` (2187 bytes, git-clone)
- public/brain.svg -> `context/github/onebrain-ai-website/files/public/brain.svg` (7734 bytes, git-clone)
- public/diagrams/coevo-loop.svg -> `context/github/onebrain-ai-website/files/public/diagrams/coevo-loop.svg` (7660 bytes, git-clone)
- public/diagrams/harness-os-stack.svg -> `context/github/onebrain-ai-website/files/public/diagrams/harness-os-stack.svg` (8246 bytes, git-clone)
- public/diagrams/vault-hub.svg -> `context/github/onebrain-ai-website/files/public/diagrams/vault-hub.svg` (11242 bytes, git-clone)
- src/lib/brain-id.ts -> `context/github/onebrain-ai-website/files/src/lib/brain-id.ts` (341 bytes, git-clone)
- src/lib/disposable-domains.ts -> `context/github/onebrain-ai-website/files/src/lib/disposable-domains.ts` (4494 bytes, git-clone)
- src/lib/gh-stars.ts -> `context/github/onebrain-ai-website/files/src/lib/gh-stars.ts` (1765 bytes, git-clone)
- src/lib/version.ts -> `context/github/onebrain-ai-website/files/src/lib/version.ts` (2720 bytes, git-clone)
- src/middleware.ts -> `context/github/onebrain-ai-website/files/src/middleware.ts` (2576 bytes, git-clone)
- src/pages/api/waitlist.ts -> `context/github/onebrain-ai-website/files/src/pages/api/waitlist.ts` (15519 bytes, git-clone)
- tsconfig.json -> `context/github/onebrain-ai-website/files/tsconfig.json` (167 bytes, git-clone)

## Binary Assets Preserved

- public/apple-touch-icon.png -> `context/github/onebrain-ai-website/files/public/apple-touch-icon.png`
- public/favicon.ico -> `context/github/onebrain-ai-website/files/public/favicon.ico`

## Design-Relevant Excerpts

### src/styles/global.css

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --font-display: "Chakra Petch", "Inter", ui-sans-serif, system-ui, sans-serif;

  /* Cyber Palette — Operator Console */
  --color-bg: #050507;
  --color-surface: #0a0a12;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-text: #f0f0f2;
  --color-muted: #a1a1aa;

  --color-accent: #bc13fe;
  --color-accent-2: #00f3ff;
  --color-accent-3: #ff2d92;
  --color-accent-4: #ffb000;
}

/* Visually hide content while keeping it readable to screen readers and
   search engines. Used inside the Hero h1 so Google indexes a keyword-
   rich version (`OneBrain — AI thinking partner for Obsidian`) while
   the visible h1 keeps the cinematic "UNIFIED INTELLIGENCE" phrase. */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Base keyboard focus indicator — Tailwind preflight removes outlines, so
   we add a global default for :focus-visible. More specific rules
   (e.g. .page-spine-dots li:focus-visible, .skip-to-content:focus-visible)
   win by specificity. */
:focus-visible {
  outline: 2px solid var(--color-accent-2, #00f3ff);
  outline-offset: 3px;
}

@layer base {
  html {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: 16px; /* Balanced font size */
    -webkit-font-smoothing: antialiased;
    /* Note: deliberately NOT scroll-behavior: smooth.
       smooth + scroll-snap-type: mandatory has a known browser quirk
       — during the smooth transition after a click, the mouse pointer
       hangs at its old screen position while the page moves under it,
       so the cursor reverts to default until the user nudges the mouse.
       Instant snap eliminates the lag entirely. Programmatic smooth
       scroll (e.g. spine-dot clicks) still opts in via scrollIntoView. */
    scroll-snap-type: y mandatory;
    /* Reserve the sticky nav's height so a snapped section's top edge
       lands just below the nav, not behind it. */
    scroll-padding-top: 64px;
  }

  body {
    background-color: var(--color-bg);
    min-height: 100vh;
    overflow-x: hidden;
    line-height: 1.5;
  }

  /* Just pin pointer on the in
...
```

### package.json

```json
{
  "name": "onebrain-website",
  "type": "module",
  "version": "0.0.1",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "bun run build && wrangler dev",
    "astro": "astro",
    "generate-types": "wrangler types",
    "deploy": "bun run build && wrangler deploy"
  },
  "dependencies": {
    "@astrojs/cloudflare": "^13.3.0",
    "@tailwindcss/vite": "^4.2.4",
    "astro": "^6.2.0",
    "tailwindcss": "^4.2.4"
  },
  "devDependencies": {
    "wrangler": "^4.86.0"
  },
  "overrides": {
    "vite": "^7"
  }
}

```

### .vscode/extensions.json

```json
{
  "recommendations": ["astro-build.astro-vscode"],
  "unwantedRecommendations": []
}

```

### .vscode/launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "command": "./node_modules/.bin/astro dev",
      "name": "Development server",
      "request": "launch",
      "type": "node-terminal"
    }
  ]
}

```

### docs/waitlist-setup.md

```
# Waitlist Setup (Cloudflare D1)

The waitlist form on the Cloud section POSTs to `/api/waitlist` and stores
emails in a Cloudflare D1 database. This file documents the one-time setup.

## 1. Authenticate

```bash
wrangler login
```

## 2. Create the D1 database

```bash
wrangler d1 create onebrain-waitlist
```

Wrangler will print a `database_id`. Copy it and paste it into
[`wrangler.jsonc`](../wrangler.jsonc) replacing `PASTE_DATABASE_ID_HERE`.

## 3. Apply the schema

```bash
# Local (creates a SQLite file under .wrangler/ for `wrangler dev`)
bunx wrangler d1 migrations apply onebrain-waitlist --local

# Remote (applies to the real Cloudflare D1)
bunx wrangler d1 migrations apply onebrain-waitlist --remote
```

## 4. Test locally

```bash
bun run preview          # builds + runs `wrangler dev`
# then in another shell:
curl -X POST http://localhost:8787/api/waitlist \
  -H 'Content-Type: application/json' \
  -d '{"email":"hello@onebrain.run"}'
# → { "ok": true }
```

Check the local DB:

```bash
bunx wrangler d1 execute onebrain-waitlist --local \
  --command 'SELECT * FROM waitlist'
```

## 5. Deploy

```bash
bun run deploy
```

The endpoint is automatically picked up by the Cloudflare adapter because
`src/pages/api/waitlist.ts` exports `prerender = false`.

## 6. View signups in production

```bash
bunx wrangler d1 execute onebrain-waitlist --remote \
  --command 'SELECT email, created_at FROM waitlist ORDER BY created_at DESC LIMIT 50'
```

## Notes

- The endpoint validates email format and stores a privacy-preserving SHA-256
  hash of the client IP (first 12 bytes), never the raw IP.
- Duplicate emails are silently ignored (`ON CONFLICT DO NOTHING`), so the form
  is idempotent.
- If the `WAITLIST_DB` binding is missing at runtime (e.g. local dev without
  setup), the endpoint logs the email to the worker console and returns
  `{ok:true, note:"received_no_persistence"}` so the UI still shows success.
- To export all signups to CSV:
  ```bash
  bunx wrangler d1 execute onebrain-waitlist --remote --json \
    --command 'SELECT email, created_at FROM waitlist' \
    | jq -r '.[0].results[] | [.email, .created_at] | @csv' > waitlist.csv
  ```

```

### public/brain.svg

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 433 466" role="img" aria-label="OneBrain neural network logo">
  <defs>
    <linearGradient id="ob-brain-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff2d92"/>
      <stop offset="55%" stop-color="#ff5aa3"/>
      <stop offset="100%" stop-color="#00f3ff"/>
    </linearGradient>
  </defs>
  <g transform="translate(433,466) scale(-0.1,-0.1)" fill="url(#ob-brain-grad)" stroke="none">
    <path d="M1774 4637 c-19 -17 -29 -37 -33 -67 -6 -43 -7 -45 -149 -141 l-143 -97 -54 5 c-50 5 -56 4 -84 -25 -21 -20 -31 -40 -31 -60 l0 -29 -247 -78 c-238 -75 -247 -77 -274 -61 -56 33 -114 -4 -112 -71 2 -36 -9 -53 -123 -201 -103 -133 -130 -162 -150 -162 -58 0 -103 -45 -104 -105 -1 -37 -6 -45 -79 -107 -65 -56 -85 -68 -114 -68 -73 0 -105 -97 -47 -142 28 -22 31 -32 47 -139 l17 -117 -28 -33 c-39 -46 -33 -111 13 -150 l31 -25 0 -237 c0 -224 -1 -238 -20 -257 -64 -64 15 -176 88 -124 22 15 125 -6 515 -107 21 -6 37 -16 37 -25 0 -16 56 -54 82 -54 9 0 50 -41 92 -91 66 -78 76 -96 76 -129 0 -73 68 -102 120 -51 28 27 37 29 146 35 64 4 120 4 125 -1 5 -5 -32 -144 -86 -320 -52 -172 -95 -317 -95 -322 0 -29 42 7 266 229 215 213 246 240 274 240 19 0 43 10 60 24 42 35 151 45 187 16 52 -41 105 -11 109 62 3 58 99 241 129 246 11 2 31 14 45 27 l25 23 160 -14 c88 -7 177 -13 197 -14 24 0 47 -9 66 -25 50 -42 105 -29 120 30 12 43 255 219 291 210 32 -8 76 11 89 39 8 18 25 26 89 39 43 9 182 39 308 67 172 38 241 49 273 44 60 -9 92 13 92 65 0 56 196 301 250 312 18 4 40 15 47 25 20 28 16 88 -7 109 -31 28 -31 432 0 460 43 39 21 119 -39 139 -22 8 -79 64 -186 185 -145 164 -153 175 -148 207 16 99 -91 160 -163 93 l-23 -21 -103 21 c-200 42 -197 41 -213 72 -10 18 -27 32 -48 37 -28 7 -35 16 -53 68 -15 39 -19 65 -13 76 14 26 11 71 -7 96 -16 24 -81 31 -100 12 -15 -15 -288 139 -292 165 -10 66 -42 95 -103 95 -40 0 -89 -48 -89 -87 0 -27 -7 -32 -91 -68 -88 -38 -91 -38 -119 -22 -35 21 -74 22 -103 2 -33 -21 -426 157 -427 193 -1 87 -101 135 -166 79z m26 -184 c28 -14 38 -14 64 -4 59 24 71 21 260 -68 187 -88 190 -89 201 -128 l11 -38 -181 -229 -181 -229 -48 -1 -48 -1 -199 210 -198 210 -1 50 0 51 142 97 c78 53 143 97 144 97 0 0 16 -7 34 -17z m929 -107 c9 -10 2 -63 -29 -222 -23 -115 -49 -249 -57 -299 -9 -49 -19 -93 -23 -98 -4 -4 -37 98 -74 226 -59 204 -67 237 -56 257 7 13 16 35 19 48 5 18 27 33 91 62 94 43 112 46 129 26z m266 -63 c91 -52 140 -86 146 -101 5 -
...
```

### public/diagrams/coevo-loop.svg

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-225 -200 450 395" width="450" height="395" role="img" aria-labelledby="title desc" font-family="'Chakra Petch', 'Inter', ui-sans-serif, system-ui, sans-serif">
  <title id="title">The Path to Co-Evolution — three-step loop</title>
  <desc id="desc">Three nodes arranged in a triangle: 01 CAPTURE at top, 02 EVOLVE at bottom-right, 03 WRAPUP at bottom-left. Curved arrows flow clockwise between them, visualizing the recurring co-evolution loop.</desc>

  <style>
    .leg { animation: leg-pulse 4.5s linear infinite; }
    .leg-2 { animation-delay: 1.5s; }
    .leg-3 { animation-delay: 3s; }
    @keyframes leg-pulse {
      0%, 33%, 100% { opacity: 0.6; }
      10%           { opacity: 1; }
    }

    .core-1 { animation: core-breathe 6s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
    .core-2 { animation: core-breathe 6s ease-in-out infinite; animation-delay: 2s; transform-origin: center; transform-box: fill-box; }
    .core-3 { animation: core-breathe 6s ease-in-out infinite; animation-delay: 4s; transform-origin: center; transform-box: fill-box; }
    @keyframes core-breathe {
      0%, 100% { transform: scale(1); }
      50%      { transform: scale(1.04); }
    }

    @media (prefers-reduced-motion: reduce) {
      .leg, .core-1, .core-2, .core-3 { animation: none; opacity: 1; }
    }
  </style>

  <defs>
    <marker id="ah-node" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#a8d000"/>
    </marker>
    <radialGradient id="g-node-fill" cx="0.32" cy="0.32" r="0.85">
      <stop offset="0%"   stop-color="#d4ff45" stop-opacity="1"/>
      <stop offset="100%" stop-color="#a8d000" stop-opacity="1"/>
    </radialGradient>
  </defs>


  <!-- Legs: straight lines from edge to edge of each circle, pointing
       directly at the destination's center so the arrow vector is radial. -->
  <!-- 01→02 leg (top → bottom-right) -->
  <g class="leg">
    <path id="leg-1" d="M 27 -83.2 L 85.6 18.2" fill="none" stroke="#a8d000" stroke-width="1.6" marker-end="url(#ah-node)"/>
  </g>

  <!-- 02→03 leg (bottom-right → bottom-left) -->
  <g class="leg leg-2">
    <path id="leg-2" d="M 58.6 65 L -58.6 65" fill="none" stroke="#a8d000" stroke-width="1.6" marker-end="url(#ah-node)"/>
  </g>

  <!-- 03→01 leg (bo
...
```

### public/diagrams/harness-os-stack.svg

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="55 105 790 585" width="790" height="585" role="img" aria-labelledby="title desc" font-family="'Chakra Petch', 'Inter', ui-sans-serif, system-ui, sans-serif">
  <title id="title">OneBrain Harness OS — 4-Layer Architecture</title>
  <desc id="desc">Four stacked layers from top to bottom: OneBrain (plugin and CLI — skills, hooks, vault sync, indexing, checkpoints), Harness (Claude Code, Gemini CLI, Codex, Qwen), LLM (local, cloud, or API), and Obsidian Vault as the source of truth (plain Markdown notes, memory, decisions, knowledge graph).</desc>

  <style>
    .flow { stroke: #ffffff; stroke-width: 2; stroke-linecap: round; stroke-dasharray: 3 5; fill: none; }
    .flow-down { animation: flow-down 0.9s linear infinite; }
    .flow-up   { animation: flow-up   0.9s linear infinite; }
    @keyframes flow-down { to { stroke-dashoffset: -8; } }
    @keyframes flow-up   { to { stroke-dashoffset:  8; } }

    .icon-pulse {
      transform-box: fill-box;
      transform-origin: center;
      animation: icon-pulse 2.6s ease-in-out infinite;
    }
    @keyframes icon-pulse {
      0%, 100% { transform: scale(1);    }
      50%      { transform: scale(1.08); }
    }

    @media (prefers-reduced-motion: reduce) {
      .icon-pulse, .flow-down, .flow-up { animation: none; transform: none; }
    }
  </style>

  <defs>
    <linearGradient id="g-layer" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#00cce0" stop-opacity="1"/>
      <stop offset="100%" stop-color="#00646e" stop-opacity="1"/>
    </linearGradient>
  </defs>

  <line x1="48" y1="110" x2="48" y2="690" stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="2 4"/>

  <!-- ════════ LAYER 01 — ONEBRAIN ════════ -->
  <g transform="translate(60, 110)">
    <rect width="780" height="130" fill="url(#g-layer)"/>
    <text class="icon-pulse" x="38" y="78" font-size="32" text-anchor="middle" dominant-baseline="central" aria-hidden="true">🧠</text>
    <text x="74" y="42" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="rgba(255,255,255,0.85)" letter-spacing="0.08em">LAYER_01</text>
    <text x="74" y="82" font-family="'Chakra Petch', sans-serif" font-style="italic" font-weight="700" font-size="24" fill="#ffffff" letter-spacing="0.04em">ONEBRAIN</text>
    <text x="74" y="112" font-family="'JetBrains Mono', monos
...
```

### public/diagrams/vault-hub.svg

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-280 -210 560 420" width="640" role="img" aria-labelledby="title desc" font-family="'JetBrains Mono', ui-monospace, monospace">
  <title id="title">Obsidian as Command Center</title>
  <desc id="desc">Hub-and-spoke diagram. Obsidian vault sits at the center, with eight spokes radiating outward to CLI/repo, website, cloud infra, social media, office docs, project notes, research, and MCP server.</desc>

  <style>
    .spoke       { stroke: #7c3aed; stroke-opacity: 0.45; stroke-width: 1.3; }
    .node        { fill: #7c3aed; }
    .node-label  { fill: #a78bfa; font-size: 11px; font-weight: 600; letter-spacing: 0.18em; }
    .particle    { fill: #7c3aed; }
    .ping        { fill: none; stroke: #7c3aed; stroke-width: 2; }
    .core        { transform-origin: center; transform-box: fill-box; }
    .core-label  { fill: #ffffff; font-size: 11.5px; font-weight: 700; letter-spacing: 0.16em; }
    .core-sub    { fill: rgba(255,255,255,0.85); font-size: 9px; letter-spacing: 0.32em; }
    .core-logo-shell { fill: rgba(255,255,255,0.25); stroke: #ffffff; stroke-width: 1.3; stroke-linejoin: round; }
    .core-logo-cut   { fill: none; stroke: rgba(255,255,255,0.85); stroke-width: 0.9; stroke-linecap: round; }

    @keyframes core-breathe {
      0%, 100% { transform: scale(1); }
      50%      { transform: scale(1.03); }
    }
    .core { animation: core-breathe 9s ease-in-out infinite; }

    @media (prefers-reduced-motion: reduce) {
      .core { animation: none; }
      .particle, .ping { display: none; }
    }
  </style>

  <defs>
    <radialGradient id="g-core-fill" cx="0.32" cy="0.32" r="0.85">
      <stop offset="0%"   stop-color="#a78bfa" stop-opacity="1"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="1"/>
    </radialGradient>
  </defs>

  <!-- 8 spokes — all outbound from vault → outer node.
       cycle dur=6s, begin offsets staggered 0.75s apart so exactly
       one spoke fires every 0.75s. Particle keyTimes 0.05–0.92 (travel),
       0.92–0.95 (fade out at node). Ring at outer node bursts 0.92–0.99
       with peak opacity at 0.95 — exact sync with arrival. Text label
       flashes brighter purple 0.92–0.96 in tandem. -->

  <!-- N — CLI / REPO (begin 0s) -->
  <line class="spoke" x1="0" y1="0" x2="0" y2="-150"/>
  <circle class="node" cx="0" cy="-150" r="5"/>
  <text class="node-label" x="0" 
...
```

### src/lib/brain-id.ts

```ts
// Per-instance counter shared by all <Brain /> renders. Module state lives for
// the lifetime of one SSR pass, so two <Brain /> on the same page get distinct
// gradient/filter ids without using Math.random (which would byte-shift HTML
// every request and break edge caching).
let counter = 0;
export const nextBrainId = () => ++counter;

```

### src/lib/disposable-domains.ts

```ts
// Disposable / throwaway email domain blocklist.
//
// Curated subset of the disposable/disposable-email-domains list
// (https://github.com/disposable/disposable-email-domains) — kept
// inline rather than pulled at build time to (a) avoid an outbound
// HTTP at every build, (b) keep the bundle deterministic, (c) avoid
// shipping a 50KB-list when ~150 domains catch the long tail.
//
// Maintenance: review yearly. Adding a domain is cheap; removing one
// is risky (someone's actual email could be at @example.com).
//
// On match the server returns 200 OK with no D1 write — the bot can't
// distinguish "blocked" from "accepted", so it stops retrying and we
// keep our sender reputation clean at launch.

const RAW = [
  // mailinator family
  '10minutemail.com', '10minutemail.net', '10minutemail.org', '10minutemail.us',
  '10minutemail.co.uk', '10minutemail.de',
  'mailinator.com', 'mailinator.net', 'mailinator.org', 'mailinator2.com',
  // guerrilla mail
  'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org', 'guerrillamail.biz',
  'guerrillamail.de', 'guerrillamailblock.com', 'sharklasers.com', 'grr.la',
  // temp-mail
  'temp-mail.org', 'tempmail.com', 'tempmailo.com', 'tempmail.net', 'tempmailaddress.com',
  'temp-mail.io', 'tempm.com', 'tempinbox.com', 'tempemail.net',
  // throwaway
  'throwawaymail.com', 'throwawayemailaddresses.com', 'throwam.com',
  'fakeinbox.com', 'fakemail.fr', 'fakemailgenerator.com', 'fakebox.org',
  // YOPmail
  'yopmail.com', 'yopmail.fr', 'yopmail.net', 'cool.fr.nf', 'jetable.fr.nf', 'nospam.ze.tc',
  'speed.1s.fr', 'courriel.fr.nf', 'moncourrier.fr.nf', 'monemail.fr.nf', 'monmail.fr.nf',
  // dispostable
  'dispostable.com', 'discard.email', 'discardmail.com', 'discardmail.de',
  // emailondeck / spamgourmet
  'emailondeck.com', 'spamgourmet.com', 'spamgourmet.net', 'spamgourmet.org',
  // mvrht / nada / getairmail
  'mvrht.com', 'nada.email', 'nada.ltd', 'getairmail.com', 'getnada.com',
  // maildrop
  'maildrop.cc', 'maildrop.cf', 'maildrop.ga', 'maildrop.gq', 'maildrop.ml',
  // mohmal / harakirimail / trashmail
  'mohmal.com', 'mohmal.in', 'mohmal.tech',
  'harakirimail.com', 'trashmail.com', 'trashmail.de', 'trashmail.io', 'trashmail.me',
  'trashmail.net', 'trashmail.ws', 'trash-mail.com', 'trash-mail.de',
  // sneakemail / inboxbear
  'sneakemail.com', 'inboxbear.com', 'inboxalias.com', 'inbox.lv',
  // mint
...
```

### src/lib/gh-stars.ts

```ts
/**
 * Build-time fetch of the GitHub star count for onebrain-ai/onebrain.
 * Astro evaluates this in component frontmatter during prerender, so
 * the count is baked into the static HTML — no runtime cost, no
 * client-side fetch.
 *
 * Returns 0 on any failure (offline build, rate limit, schema break).
 * The Cloud component must hide the badge on 0 — rendering "0 stars"
 * as social proof is worse than rendering no proof at all.
 *
 * Unauthenticated `api.github.com` is 60 req/hr per IP; CI runners
 * share IP pools and hit that ceiling on busy days. If a `GITHUB_TOKEN`
 * env var is present at build time we send it (5000 req/hr authenticated).
 */
const REPO_API = 'https://api.github.com/repos/onebrain-ai/onebrain';
const FETCH_TIMEOUT_MS = 5000;

export async function getGitHubStars(): Promise<number> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'onebrain-website-build',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(REPO_API, {
      headers,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.warn(`[gh-stars] GitHub API returned ${res.status} — falling back to 0; badge will be hidden`);
      return 0;
    }
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === 'number' ? data.stargazers_count : 0;
  } catch (err) {
    console.warn('[gh-stars] fetch failed — falling back to 0; badge will be hidden:', err);
    return 0;
  }
}

export function formatStars(n: number): string {
  if (n < 1000) return String(n);
  return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
}

```


## Package Files Materialized

- `source_examples/src/lib/brain-id.ts`
- `source_examples/src/lib/disposable-domains.ts`
- `source_examples/src/lib/gh-stars.ts`
- `source_examples/src/lib/version.ts`
- `source_examples/src/middleware.ts`
- `source_examples/src/pages/api/waitlist.ts`

## Next Design-System Work

- Use these source paths and snapshots as evidence before writing `DESIGN.md`.
- Convert the inventory above into a Claude Design-style package: `README.md`, `SKILL.md`, `colors_and_type.css`, `preview/colors-*`, `preview/typography-specimens.html`, `preview/spacing-*`, `preview/components-*`, `preview/brand-assets.html`, `ui_kits/app/`, and preserved `assets/`, `build/`, or `fonts/` when evidence exists.
- `ui_kits/app/index.html` must be a browser-reviewable component entry: load `../../colors_and_type.css`, load or import at least three files from `ui_kits/app/components/`, and mount the composed UI through ReactDOM/Babel or compiled browser-ready JavaScript. Do not duplicate a static HTML mock when modular component files exist.
- `ui_kits/app/components/App.jsx` (or equivalent app shell) must compose source-backed role components such as Sidebar, AssistantsList, ChatArea, InputBar, and MessageBubble, not merely list their filenames.
- Claude-style UI-kit entry skeleton for direct JSX kits:
  - `<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>`
  - `<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>`
  - `<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>`
  - `<link rel="stylesheet" href="../../colors_and_type.css">`
  - `<div id="root"></div>`
  - Load role components from `components/*.jsx` with `<script type="text/babel" src="components/ComponentName.jsx"></script>`.
  - Mount with `const { App } = window; const root = ReactDOM.createRoot(document.getElementById("root")); root.render(<App />);`.
- Preserve at least three high-signal source examples outside `context/` under `source_examples/` when reusable component snapshots exist, so future agents can compare generated components against original source structure.
- When a captured asset path begins with `build/`, copy the snapshot back into a root `build/` path with its original filename, such as `context/.../files/build/icon.png` -> `build/icon.png`. Do not satisfy build/runtime icon evidence by only renaming those files into `assets/`.
- Make `preview/brand-assets.html` visibly load preserved asset files from `assets/` or `build/`; do not redraw captured logos/icons as inline placeholders.
- Extract concrete colors, typography, spacing, radius, component behavior, assets, and product tone only when supported by inspected files.
- If evidence is missing or ambiguous, mark that uncertainty instead of inventing tokens.
