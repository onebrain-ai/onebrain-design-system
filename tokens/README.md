# OneBrain Tokens — cross-platform export

The design system's color, type, spacing, radius, shadow, and motion values, exported
from **one source of truth** to every platform you might build a OneBrain surface on:
slide deck, website, web-app UI, dashboard, desktop app, mobile app.

```
tokens/
├── tokens.json              ← SOURCE OF TRUTH (W3C DTCG). Edit values HERE only.
├── build.js                 ← zero-dependency generator (Node >= 14, no npm install)
├── package.json             ← lets consumers `require('@onebrain/tokens')`
└── dist/                    ← GENERATED — do not hand-edit
    ├── tokens.css               namespaced --ob-* vars + [data-theme="light"]
    ├── tokens.js                CommonJS { dark, light } nested values
    ├── tokens.d.ts              TypeScript types for tokens.js
    ├── onebrain.tailwind.js     Tailwind preset (theme-aware via the --ob-* vars)
    ├── ios/OneBrainTokens.swift SwiftUI Color / CGFloat constants (dark + light)
    └── android/
        ├── colors.xml           dark color resources  (#AARRGGBB)
        ├── colors-light.xml     light color resources
        └── dimens.xml           spacing / radius / size / font dimens (dp · sp)
```

## Regenerate

After editing `tokens.json`:

```bash
node tokens/build.js        # rewrites everything in dist/
```

`tokens.json` is **dark-first**: each token's `$value` is the near-black operator-console
value; the light/spec override lives in `$extensions["com.onebrain.light"]`. Semantic
tokens (`state.info`, `intent.actionPrimary`, …) are **aliases** (`{color.accent2}`) so
they inherit the light re-inking automatically. The build resolves aliases and light
overrides for every platform.

**Coverage parity.** The **intent layer** (`intent.actionPrimary`, `bgElevated`, `textLink`,
`borderStrong`, …) exports to every target, not just web — so native + Tailwind consumers
theme against intents, never raw palette: Swift `OneBrain.ColorsDark.actionPrimary`, Android
`@color/ob_intent_actionPrimary`, Tailwind `text-actionPrimary`. **Breakpoints** ship as
Tailwind `screens` (`sm`…`ultra`), `OneBrain.Breakpoint`, and `@dimen/ob_bp_*`; **brand
gradients** as Tailwind `bg-ob-brand` / `bg-ob-button`; **font weights** as
`OneBrain.FontWeight`.

## Which file do I use per surface?

| Surface | Use | How |
|---|---|---|
| **Website · landing** (Astro/HTML) | `dist/tokens.css` **or** the canonical `../colors_and_type.css` | `<link rel="stylesheet" href="…/tokens.css">`, then `background: var(--ob-color-bg)` |
| **Web-app UI · dashboard** (React/Vue/Svelte) | `dist/onebrain.tailwind.js` (+ `tokens.css`) | `presets: [require('@onebrain/tokens/dist/onebrain.tailwind.js')]` → `class="bg-bg text-accent2 p-ob-5"` |
| **Slide deck** (HTML canvas) | `../colors_and_type.css` or `dist/tokens.css` | bind into the deck `:root`; use `--ob-*` / `--color-*` in slide styles |
| **Desktop app** (Electron) | `dist/tokens.js` + `dist/tokens.css` | `const { dark } = require('@onebrain/tokens')` for JS logic; ship `tokens.css` for the renderer |
| **Mobile — iOS** (SwiftUI) | `dist/ios/OneBrainTokens.swift` | `Color(OneBrain.ColorsDark.accent2)`, `OneBrain.Space.s5` |
| **Mobile — Android** (Views/Compose) | `dist/android/*.xml` | `colors.xml` → `res/values/`, `colors-light.xml` → `res/values-night/`, `dimens.xml` → `res/values/` |
| **React Native** | `dist/tokens.js` | `import { dark, light } from '@onebrain/tokens'` — `parseInt(dark.space['5'])` for numeric spacing |

### Theme switching

- **CSS / Tailwind:** set `data-theme="light"` on a root element — the `--ob-*` vars (and
  every Tailwind color / elevation that references them) flip automatically. Default = dark.
- **JS / RN:** pick `dark` or `light` from the export.
- **iOS:** `OneBrain.ColorsDark` vs `OneBrain.ColorsLight`.
- **Android:** `values/` (dark, the product default) vs `values-night/` — or invert per your
  app's convention; both sets are generated.

## Figma / Tokens Studio bridge

`tokens.json` is valid **W3C DTCG**, which is exactly the format the
[**Tokens Studio**](https://tokens.studio) Figma plugin imports and exports — so the same
source of truth round-trips between code and design without a converter.

**Code → Figma (recommended direction).** Code stays the source of truth:

1. In Figma, open **Tokens Studio → Tools → Import**, choose **Single file**, and load
   `tokens/tokens.json` (or paste its contents).
2. The plugin reads each group as a token set — `color.*`, `space.*`, `radius.*`,
   `font.*`, `shadow.*`, `breakpoint.*`. Apply the set to your Figma styles/variables.
3. Re-import after each `node build.js`/`tokens.json` change to pull the latest values.

**Light theme.** Our dark value lives in `$value` and the light override in
`$extensions["com.onebrain.light"]`. Tokens Studio reads the base `$value`; to drive a second
Figma theme, maintain a **light** token set (or a Figma variable mode) whose values map to the
`com.onebrain.light` overrides. The build already resolves both, so the CSS/native exports stay
the contract — Figma is a mirror, not a second source.

**Figma → code.** If a designer changes values in Tokens Studio, export the set and **diff it
into `tokens.json`** (don't commit the plugin's file verbatim — it may reorder keys or drop our
`$extensions`/`web` clamp metadata). Then `node tokens/build.js` and `npm test` to regenerate
`dist/` and re-assert css↔json parity. Treat Figma edits as a PR against `tokens.json`, never a
direct write to `dist/`.

**Style Dictionary.** Because the source is DTCG, [Style Dictionary](https://styledictionary.com)
or any DTCG-aware pipeline can also consume `tokens.json` directly if you'd rather generate
platform files with an industry tool than our zero-dependency `build.js`.

## Notes

- `dist/tokens.css` is a **generated, namespaced mirror** (`--ob-*`). The **canonical,
  hand-authored product sheet remains `../colors_and_type.css`** (`--color-*` + the semantic
  intent layer + `@font-face` font bindings). Web surfaces should normally bind
  `colors_and_type.css` (it also loads the brand fonts); use `dist/tokens.css` when a build
  pipeline wants a flat, generated var set or the `--ob-*` namespace.
- Fonts are **not** re-exported here — bind them via `@font-face` from `../fonts/` (see
  `colors_and_type.css`). Native targets must add the Chakra Petch / JetBrains Mono `.ttf`
  files to the app bundle.
- `font.size.h2` / `hero` carry a responsive `clamp()` for the web (in `$extensions.web`)
  and a static px fallback for native.
- Want iOS/Android regenerated by an industry tool instead? `tokens.json` is valid DTCG, so
  Style Dictionary or any DTCG-aware pipeline can consume it directly.
