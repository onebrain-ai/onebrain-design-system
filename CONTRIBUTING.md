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

**A guard enforces the hand-sync.** `npm test` (→ `node tokens/check.js`) fails if
`colors_and_type.css` and `tokens.json` disagree on any shared primitive (dark **or**
light theme), or if `dist/` is stale vs. `tokens.json`. Run it before every commit — it's
how you catch "changed one source, forgot the other" before it ships. When you add a brand
**new** primitive, also add its `tokens.json`-path → `--css-var` row to the `MAP` table in
`tokens/check.js` so the guard covers it.

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

Never claim done without evidence. First run the token guard, then serve and check the
real render:

```bash
npm test             # token drift check (css <-> json parity + dist freshness) + WCAG AA contrast guard
npm start            # or: npx serve .
```

`npm test` runs two guards: `tokens/check.js` (drift) and `tokens/a11y.js` (asserts the
documented text/accent pairs clear WCAG AA on both themes — re-ink a token below 4.5:1 and
it fails). Both must be green before you commit.

- Open the changed surface; confirm **0 console errors** (a root `/favicon.ico` 404 from
  the browser's auto-probe is the one allowed exception).
- Check computed values for the thing you changed, not just that "it looks fine."
- Run the `ACCESSIBILITY.md` "Verifying a change" checklist.
- No horizontal scroll at 360 / 600 / 768 / 1024 / 1280 / 1440 / 1920.

## Stability & deprecation

Every public token and component carries a maturity level so consumers know what they can
rely on. Mark new work in its `CHANGELOG.md` entry; default is **beta** until it's shipped on
a real surface.

| Level | Meaning | Change policy |
|---|---|---|
| **stable** | Used by ≥2 surfaces; API frozen. | No breaking change without a deprecation cycle + major bump. |
| **beta** | Shipped, but the name/shape may still move. | May change in a minor with a `CHANGELOG` note. |
| **experimental** | Preview-only, not on a product surface yet. | May change or be removed any release. |
| **deprecated** | Superseded; scheduled for removal. | Kept ≥1 minor with a documented replacement, removed on the next major. |

Current state: the token layer and the `components.css` kit (buttons, forms, nav, data,
feedback, overlays, primitives, icons, accordion / segmented / dropzone, command palette,
page states) are **stable**. New additions enter as **beta**.

### Deprecating a token or component (semver)

Never silently rename or delete a public token/class — consumers pin to them. Instead:

1. **Add the replacement** alongside the old one (don't mutate in place).
2. **Alias, don't orphan.** Point the old token at the new value (`--old: var(--new)`) or keep
   the old class as a thin shim, so existing surfaces keep working.
3. **Announce it.** Add a `### Deprecated` line to `CHANGELOG.md` naming the replacement and
   the removal version; mark it `@deprecated` in any TS/`dist` surface.
4. **Cycle then remove.** Keep the alias for at least one **minor**; remove only on the next
   **major** (per [SemVer](https://semver.org)). Removing or renaming a public token/class is a
   **major** change — a new additive token/component is a **minor**; a value/fix that doesn't
   change any API is a **patch**.
5. Run `npm test` after — the drift guard will catch a half-applied rename across the two
   token sources.

## Commit & release

- Small, focused commits; subject says what changed and why. No `Co-Authored-By` line.
- Bump `version` in `package.json` (+ `tokens/package.json` if the token API changed) and
  add a `CHANGELOG.md` entry following [Semantic Versioning](https://semver.org).
