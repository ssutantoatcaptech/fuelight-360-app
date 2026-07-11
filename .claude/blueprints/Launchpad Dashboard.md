# Launchpad Dashboard

Home page for Fuelight 360 — the first screen shown on load, before entering a
scenario workspace. A welcome header plus two rows of navigation cards.
Implemented from Figma node `4:1513` ("New Scenario View — Expanded Sidebar").

- **Component:** `src/components/LaunchpadView.tsx`
- **Figma:** [Main — Fuelight](https://www.figma.com/design/HOleEnisiIyraMb0cR5AXv/?node-id=4-1513)

## Structure

```
LaunchpadView (max-w-1136px, centered, gap-80)
├── Welcome header (centered, gap-16)
│     ├── h1  "Welcome back, {username}."          30px TCCC Unity Medium
│     └── p   "Insights to evaluate and optimize…" 20px DM Sans
├── Primary CardRow ── 3 cards, equal width, gap-16
│     Market · Channel x Customer x Pack · Media
└── Supporting Tools (gap-32)
      ├── h2  "Supporting Tools"                    20px TCCC Unity Medium
      └── CardRow (centered) ── 2 cards
            Data Quality · Model Observer
```

## Card anatomy

Each card: `rounded-[16px] bg-container-sunken4`, `px-32 py-32`, column layout,
`justify-between` so the CTA sticks to the bottom regardless of description length
(per Figma annotation: all cards match the tallest card's height).

- **Icon** — 40px, via `<Icon>` painted with the TCCCRainbowAngled gradient (see below)
- **Title** — 20px, TCCC Unity Medium, `text-text-header`
- **Description** — 14px / 1.6, DM Sans, `text-text-body`, centered
- **Launch button** — text-only, `text-text-caption` → `text-text-header` on hover, trailing arrow (inline SVG)

## Token alignment with base.css

The Figma variables map 1:1 onto `project/tokens/base.css`. In code we use the
**Tailwind-registered aliases** from `src/index.css` (what Tailwind v4 actually
compiles), which resolve to the same values. Both columns are listed so the mapping
is auditable end-to-end.

| Figma variable | base.css token | value (dark) | Tailwind utility used |
|---|---|---|---|
| `background/container/sunken4` | `--dark-background-container-sunken4` | #212121 | `bg-container-sunken4` |
| `text/global/header` | `--dark-text-global-header` | #E2E1DF | `text-text-header` |
| `text/global/body` | `--dark-text-global-body` | #C7C4C1 | `text-text-body` |
| Launch CTA color | *(see note)* | #8E8781 | `text-text-caption` |
| `border-radius/container/rounded-md` | `--desktop-border-radius-container-rounded-md` | 16px | `rounded-[16px]` |
| `padding/container/horizontal-xl` | `--desktop-padding-container-horizontal-xl` | 32px | `px-[32px]` |
| `padding/container/vertical-between-xl` | `--desktop-padding-container-vertical-between-xl` | 32px | `py-[32px]` |
| `padding/container/…-between-md` | `--desktop-padding-container-vertical-between-md` | 16px | `gap-[16px]` |
| `font/family/title` | `--desktop-font-family-title` | TCCC Unity | `var(--font-title)` |
| `font/family/body` | `--desktop-font-family-body` | DM Sans | `var(--font-body)` (inherited) |
| `font/size/3xl` (h1) | `--desktop-font-size-3xl` | 30px | `text-[30px]` |
| `font/size/xl` (titles/subtitle) | `--desktop-font-size-xl` | 20px | `text-[20px]` |
| `font/size/base` (body/CTA) | `--desktop-font-size-base` | 14px | `text-[14px]` |
| row max width | `--primitive-padding-spacing-size-…` | 1136px | `max-w-[1136px]` |

All colors resolve through semantic tokens, so the view is theme-responsive
(light + dark) automatically — no hardcoded hex (passes `token-compliance-checker`).

**Note — Launch CTA color:** Figma renders the Launch label at `#8E8781`, which is the
global *caption* tone (`--dark-text-caption` → `text-text-caption`), **not** the DS
button token `--dark-text-button-textonly-default` (#443F3F). We follow the Figma pixel
value via `text-text-caption`. If DS button semantics are preferred later, switch to a
`text-button-textonly-*` token instead.

## Icon mapping

Cards map to approved SVGs in `src/assets/icons/` (passes `icon-asset-auditor`):

| Card | Icon name |
|---|---|
| Market | `logo-360` |
| Channel x Customer x Pack | `logo-cxp` |
| Media | `logo-media` |
| Data Quality | `logo-data-quality` |
| Model Observer | `logo-model-observer` |

### Icon coloring — TCCCRainbowAngled gradient

The repo's approved SVGs are monochrome (`currentColor`), but Figma shows these marks
multi-colored. They're painted with the **TCCCRainbowAngled** gradient — the same effect
used on the active segmented-control button border (View / Edit / Optimize).

An SVG `linear-gradient` can't be applied via `currentColor`, so:

1. **`Icon.tsx`** gained an optional `gradientId` prop. When set, it points its
   `--fill-0` / `--stroke-0` vars at `url(#<id>)` instead of `currentColor`
   (backward-compatible — all other `<Icon>` usages are unchanged).
2. **`LaunchpadView`** renders a shared `<linearGradient id="tccc-rainbow-angled">`
   def once (135°, top-left → bottom-right) and passes `gradientId="tccc-rainbow-angled"`
   to each card icon.
3. **`src/index.css`** defines the four stop colors as tokens
   (`--color-rainbow-stop-1..4`), matching `--effect-tcccrainbowangled`. The SVG
   `<stop>`s reference them via `var()` — raw hex isn't allowed in component files,
   and SVG `stopColor` can't consume a CSS `linear-gradient()` directly.

Gradient stops are theme-constant, so icons look identical in light and dark.

## Props

```ts
interface Props {
  username?: string;                    // default "[username]"
  onLaunch?: (title: string) => void;   // fired by each card's Launch button
}
```

## Routing / integration

`App.tsx` holds a top-level `page` state (`"launchpad" | "scenario"`), defaulting to
**`launchpad`** so the dashboard is the first screen on load. It renders full-bleed
(no scenario header or view tabs).

- **Launchpad → scenario:** clicking a scenario in the sidebar, or a card's **Launch**
  button (`onLaunch`), sets `page = "scenario"` and opens the workspace.
- **Scenario → Launchpad:** the sidebar **Launchpad** item returns home.

`LeftNavigationSidebar` takes `activePage` + `onNavigate` props; the Launchpad item and
scenario rows highlight based on `activePage`.

```tsx
<LaunchpadView username="Steve" onLaunch={() => setPage("scenario")} />
```

## Verification

- `token-compliance-checker` ✓ (no raw hex) · `icon-asset-auditor` ✓ (valid names)
- `npm run build` ✓ · rendered + screenshot-checked in light and dark themes
