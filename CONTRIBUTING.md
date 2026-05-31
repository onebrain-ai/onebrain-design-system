# Contributing

How to extend **OneBrain Design System** without drifting off-system.
Read `DESIGN.md` (rules) and `PROVENANCE.md` (what's real vs. derived) first.

Golden rule: **derive, don't invent.** New colors come from `oklch()` / `color-mix()` on
existing tokens; new components reference the semantic intents, not raw hex. If you find
yourself typing a hex value or a font name into a component rule, stop — use a token.

---

## Architecture at a glance

```
tokens.json ──build.js──▶ tokens/dist/*   (cross-platform: CSS/JS/TS/Tailwind/iOS/Android)
colors_and_type.css      (canonical WEB sheet: primitives + intents + @font-face)
components.css           (reusable components — reference intents from the sheet above)
preview/*.html           (review cards + surface scaffolds — link the two sheets above)
ui_kits/app/             (applied React console)
```

**Two token sources, kept in sync by hand.** `colors_and_type.css` is the canonical sheet
every preview/surface links; `tokens/tokens.json` is the DTCG source the cross-platform
`dist/` is generated from. They overlap deliberately. When you change a shared value
(a color, spacing, breakpoint, radius), update **both**, then rebuild dist:

```bash
node tokens/build.js      # or: npm run build:tokens
```

`tokens/dist/` is committed so consumers don't need Node — never hand-edit files in
`dist/`; regenerate them.

---

## Add or change a token

1. Edit `colors_and_type.css` (`:root` primitives, the §2.5 intent layer, or the
   `[data-theme="light"]` overrides). Keep the light value AA on white.
2. Mirror the value in `tokens/tokens.json` (with its `$extensions["com.onebrain.light"]`
   light value where it differs). Semantic tokens should be DTCG **aliases** so they
   inherit the light re-ink automatically.
3. `node tokens/build.js` and sanity-check the generated CSS/Swift/Android values.
4. If it's a new public token, note it in `DESIGN.md` and (if reviewer-facing) a preview.

## Add a component

1. Add it to `components.css`. Reference **intents** (`--action-primary`, `--fb-*`,
   `--bg-elevated`, `--border-strong`, `--elev-*`, `--control-h`) — never palette hex.
2. Include the full state set: `:hover`, `:focus-visible` ring, `[disabled]` /
   `aria-invalid`, ≥44px target, and a `prefers-reduced-motion` path for any motion.
3. Icon-only controls get an `aria-label` in the demo markup.
4. Demonstrate it in a `preview/components-*.html` card (link `../colors_and_type.css`
   **and** `../components.css`) with working interaction.

## Add a surface / preview

1. Name it `<section>-<variant>.html` (e.g. `hero-split.html`, `surface-dashboard.html`)
   so siblings group in the list. Link `../colors_and_type.css`, `../components.css`, and
   `_preview.css` (the shared orb + boot atmosphere).
2. Compose from `components.css`; don't re-derive button/card/table CSS. App-shell chrome
   used by only one surface may stay inline; anything reused across surfaces graduates to
   `components.css`.
3. Add the runtime accent picker at the surface's natural settings home
   (`.accent-dots` + `preview/accent-picker.js`).
4. Product surfaces must look like real product UI — no designer/demo controls, viewport
   pickers, or generated-design metadata exposed as app chrome (see `DESIGN.md` §9).

---

## Keep the package in sync (required)

A change isn't done until these point at the real file structure:

- **`README.md`** — package tree + **Preview Manifest** row for any new/renamed preview.
- **`index.html`** — the root launcher card for any new preview/surface.
- **`DESIGN.md`** — any new rule, pattern, or token.
- **`SKILL.md`** — the read-list / "What's inside" if you added a top-level file.
- **`CHANGELOG.md`** — an entry under the current version.

## Verify before you commit

Never claim done without evidence. Serve the package and check the real render:

```bash
npm start            # or: npx serve .
```

- Open the changed surface; confirm **0 console errors** (a root `/favicon.ico` 404 from
  the browser's auto-probe is the one allowed exception).
- Check computed values for the thing you changed, not just that "it looks fine."
- Run the `ACCESSIBILITY.md` "Verifying a change" checklist.
- No horizontal scroll at 360 / 600 / 768 / 1024 / 1280 / 1440 / 1920.

## Commit & release

- Small, focused commits; subject says what changed and why. No `Co-Authored-By` line.
- Bump `version` in `package.json` (+ `tokens/package.json` if the token API changed) and
  add a `CHANGELOG.md` entry following [Semantic Versioning](https://semver.org).
