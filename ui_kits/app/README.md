# OneBrain — Operator Console UI Kit

An applied, runnable interface example for the **OneBrain is an AI Design System**.
It composes modular React components into one product-like surface — the OneBrain
*operator console*: a vault-navigation sidebar, a rail of the 29+ skills, a live
session/activity stream, and a command composer.

This is the canonical "what does a real screen look like in this system" reference.
Open `index.html` directly in a browser — it is a self-contained, runnable entry
(no build step).

> **Role naming.** The component files use the conventional chat/workspace role names
> so they're easy to recognize, but each is OneBrain-specific:
> `AssistantsList` = the **skill rail**, `ChatArea` = the **session console**,
> `MessageBubble` = a **session/agent log entry**, `InputBar` = the **command composer**.

## Usage

```
ui_kits/app/index.html
```

`index.html` loads React 18.3.1 + ReactDOM + Babel standalone (pinned, with integrity
hashes), links the design-system tokens from `../../colors_and_type.css`, loads each
component from `components/`, then mounts the composed `<App />` into `#root`. Open it
directly to review, or **copy / compose** these components into your own project and
**use** the same tokens. Each component file assigns itself to `window.<Name>` so the
isolated Babel script scopes can compose (each `<script type="text/babel">` gets its own
scope — globals are how they share).

## Structure

```
ui_kits/app/
├── index.html                 Runnable entry — tokens + kit CSS, loads & mounts App
├── README.md                  This file
└── components/
    ├── App.jsx                App shell — composes all roles, holds shared state
    ├── Sidebar.jsx            Navigation rail — brand + PARA vault folders + status
    ├── AssistantsList.jsx     List rail — the 29+ skills (filterable, selectable)
    ├── ChatArea.jsx           Main workspace — section header + MessageBubble stream
    ├── MessageBubble.jsx      A single session/activity entry (role-based variants)
    └── InputBar.jsx           Command composer (slash field + .btn-tech submit)
```

## Components

| File | Role | What it does |
|---|---|---|
| `App.jsx` | App shell | Composes Sidebar · AssistantsList · ChatArea · InputBar; owns `activeFolder`, `activeSkill`, and the `entries` log; wires the run flow. Exposes `window.App`. |
| `Sidebar.jsx` | Navigation | Brand wordmark (`assets/brain.svg`) + the real PARA vault folders (`00-inbox` … `07-logs`) + a live status footer. |
| `AssistantsList.jsx` | List rail | The 29+ real skills (`/capture`, `/distill`, `/connect`, `/doctor` …) grouped by category, with search + category filters. Selecting one lifts state. |
| `ChatArea.jsx` | Workspace | A `.cyber-pill` eyebrow + italic stroke headline, then the live activity stream rendered from `MessageBubble` children. Auto-scrolls to newest (no `scrollIntoView`). |
| `MessageBubble.jsx` | Entry / message | One log line with role variants — `command` (a `/skill` the user ran), `agent` (a sub-agent reply, tinted with the agent's source color), `memory`, `system`. |
| `InputBar.jsx` | Composer | Slash-prefixed mono field + corner-cut `.btn-tech` submit; pre-fills from the selected skill; submitting appends entries to the console. |

## Interaction flow (real, no backend)

1. Pick a skill in **AssistantsList** → its `/command` pre-fills the **InputBar**.
2. Edit and submit (⏎ or **Run →**) → **App** appends a `command` `MessageBubble` plus a
   synthesized `agent`/`system` response keyed to that skill (responses mirror the real
   sub-agents: Inbox Classifier, Knowledge Linker, Link Suggester, …).
3. **ChatArea** scrolls to the newest entry.

## Design notes

- **Tokens only.** All color, type, spacing, radius, glow, and motion come from
  `../../colors_and_type.css`. The kit's `index.html` `<style>` block defines only the
  `.ob-*` layout/component classes built on those tokens — change a token and the whole
  console re-skins.
- **Aesthetic source.** Layout and component treatments trace to `onebrain-ai/website`
  `src/styles/global.css`: `.nav-glass` sidebar, `.cyber-pill` eyebrow,
  `.cyber-h2`/`.cyber-h2-stroke` headline, `.cyber-card` rows, `.btn-tech` composer
  button, the 56px HUD grid, and neon-glow elevation.
- **Sharp, dark, restrained.** Radius 0 on panels; the only rounded things are dots and
  the slash; one accent per region via `--section-accent`/`--row-accent`/`--log-accent`;
  glow replaces drop-shadow. Built on the same colors and typography as the rest of the package.
- **Responsive.** Three columns ≥1080px; the skill rail drops below 1080px and the sidebar
  below 720px so there's never a horizontal scrollbar.
- **Accessible.** Cyan `:focus-visible` rings, `prefers-reduced-motion` disables the
  pulsing dots, real `<button>`/`<form>` semantics.

## Source basis

- **Visual system:** `onebrain-ai/website` → `src/styles/global.css` (preserved at
  `source_examples/styles/global.css`).
- **Product domain:** `onebrain-ai/onebrain` plugin — vault structure + skill names from
  `INSTRUCTIONS.md` and `skills/*/SKILL.md`; sub-agent names/colors from `agents/*.md`
  (preserved at `source_examples/agents/`).
- Before extending this kit, read the package `README.md`, `DESIGN.md`, and
  `colors_and_type.css` at the project root.
