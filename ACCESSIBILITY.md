# Accessibility

The accessibility commitments scattered through `DESIGN.md` and enforced in
`colors_and_type.css` / `components.css`, consolidated in one place. Target is
**WCAG 2.1 AA**. Every surface and preview honors these; new work must keep them.

---

## Color & contrast

- **Dark-first is the product.** Text on the near-black canvas (`--color-text #f0f0f2`
  on `--color-bg #050507`) is ~18:1. `--color-muted` stays ≥4.5:1 for body text.
- **Accents are signal, not body text.** Neon accents are used for strokes, glows, dots,
  borders, and small pill text — never as long-form reading text on the dark ground.
- **Light theme re-inks the accents.** Electric cyan and amber wash out on white, so under
  `[data-theme="light"]` the four accents become deeper "ink" variants, each verified on
  `#fff`: violet `#9500c7` (6.8:1) · cyan→teal `#007a90` (5.0:1) · magenta→rose `#c2186a`
  (5.8:1) · amber→ochre `#9a6400` (5.0:1) · success→moss `#5f7d00` (4.8:1). `--text-link`
  inherits these, so inline links stay AA on white.
- **UI-component contrast.** The light hairline `--color-border` is `rgba(8,8,16,.18)` so
  input outlines and panel edges stay perceivable on white (bumped from `.12`) while
  remaining subtle.
- **Never rely on color alone.** Status pills pair tint + accent text with a label/icon;
  table/log rows use a left bar + text weight in addition to the accent tint.

## Focus

- A global `*:focus-visible { outline: 2px solid var(--color-accent-2); outline-offset: 3px }`
  guarantees a visible keyboard ring on the dark ground; under light it inherits the inked
  accent. Interactive components add their own `:focus-visible` ring (`--focus-ring`).
- Focus is never removed without a replacement. Custom controls (switch, range, tabs,
  pagination, `.modal-x`, dropdown items) are all focusable and ringed.

## Touch targets & density

- Default control height is `--control-h: 44px` — the minimum touch target — applied to
  inputs, buttons, pagination, the modal close, and tab/nav hit areas.
- `[data-density="compact"]` tightens to `36px` for genuinely data-dense desktop/dashboard
  contexts only; it is opt-in per container, never the default.

## Motion

- **Every animation ships a reduced-motion fallback.** `@media (prefers-reduced-motion: reduce)`
  disables the boot/scanline/warp/pulse choreography, the synthwave grid scroll + window bob,
  the hero pointer-tilt, and flattens reveals to their resting state.
- Pointer-reactive effects (the centered hero tilt) are additionally gated to `pointer: fine`
  so touch devices keep the static resting state.
- Animations stay on `opacity`/`transform`; `filter`/`blur` are not animated on hot paths.

## Semantics & ARIA

- Icon-only controls carry an `aria-label` in markup (e.g. `.modal-x` → `aria-label="Close"`).
- Inputs use real `<label>`s; invalid fields set `aria-invalid` and surface the error text
  **below** the field (not color-only). Disabled controls drop to `--disabled-opacity` (0.42)
  and set `disabled` / `aria-disabled`.
- Icons are inline SVG (`currentColor`, Lucide line style) — never emoji as UI icons.
- Overlays (modal, drawer) use a `--scrim` backdrop and are dismissible by keyboard.

## Verifying a change

1. Tab through every interactive element — a visible ring must land on each.
2. Check contrast on **both** themes for any new accent/text pairing (AA ≥4.5:1 text,
   ≥3:1 UI). Use the re-inked tokens on light — don't hand-patch darker hex.
3. Confirm 44px hit targets (or compact 36px only where intended).
4. Toggle `prefers-reduced-motion` and confirm the surface is fully usable with motion off.
5. Verify no horizontal scroll at 360 / 600 / 768 / 1024 / 1280 / 1440 / 1920.
