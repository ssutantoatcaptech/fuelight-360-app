# Scenario Summary View

## Light Theme Configuration

Figma nodes: 19227-32701 / 19227-32702.

- Global backdrop: `#F8F7F5`
  (`var(--color-whitesmoke-100)` / `--color-container-sunken6`)
- Primary text: `#443F3F`
  (`var(--color-darkslategray-100)` / `--color-text-body`)
- Card containers: Pure white `#FFFFFF` (`--color-container-flat`)
  over whitesmoke backdrop for elevation contrast
- Sidebar panel: `#EFEFEF` (`--color-sidebar-bg`) light gray surface
- Sidebar active item: White `#FFFFFF` card container
  (`--color-sidebar-item-selected`),
  text `#DA4C00` (`--color-tccc-orange-600`)
- Sidebar inactive text: Muted slate `#666666`
  (`--color-sidebar-text`)
- Sidebar badges/notifications: `#FC7244`
  (`--color-tccc-orange-400`) solid fill

## Dark Theme Configuration

- Sidebar reverts to black `#000000` with `#212121` active item,
  `#8E8781` inactive text
- MetaFilterCapsuleRow: Deep dark container fill `#1E1E1E`
  (`--color-input-bg`) with subtle border `#2D2D2D`
  (`--color-input-border`)
- Filter text: High-contrast silver-white
  (`--color-text-header` → `#E2E1DF`)

## Button State Borders (ScenarioControlStrip)

- Active button (View): `TCCCRainbowAngled` gradient border
  (`var(--effect-tcccrainbowangled)`) — 1.5px, solid accent fill
- Inactive buttons (Edit, Optimize): Subtle border line
  via `--color-button-inactive-border`
  - Light: `#D1D1D1`
  - Dark: `#2D2D2D`

## Tab Navigation Active States (ViewNavigationLayer)

- Active tab text: `#DA4C00` (`--color-tccc-orange-600`)
- Active tab bottom border: `1.5px` solid `#FC7244`
  (`--color-tccc-orange-400`)
- Inactive tab text: `--color-text-tab-default`

## Scroll Architecture

- Brand card track uses `w-max` — no inner `overflow-x-auto`
- Parent `MainContentWorkspace` (`<main>`) carries
  `overflow-x-auto` for full-viewport horizontal scrolling
- Content body uses `overflow-y-auto` for vertical scroll only

## Workspace Header and Filtering Layers

### ScenarioControlStrip

- Layout: Flex Row, H-56px, Items-Center, Gap-16px, Width-Full
- Left Side:
  - Settings gear icon (24px container, 19.5px icon)
  - Primary title: `Default [Market] Scenario`
    — font-title 20px medium, text-header
  - Tag pill: `Default View`
    — bg-container-contrast, text-brand-primary-dim,
    rounded-full, h-20px, px-8px, text-10px
- Right Side:
  - Info block (gap-8px):
    - Info icon 16px
    - Two lines at 10px/1.6:
      `Latest model as of: 00/00/0000` and
      `Outcomes actualized through: 00/00/0000`
  - Button group
    (bg-container-flat, rounded-10px, p-2px, h-40px):
    - `View` — active: bg-button-accent-bg,
      border-1.5px tccc-red-500,
      text-button-accent-text, rounded-8px, h-36px
    - `Edit` — bg-button-default-bg, text-button-default-text
    - `Optimize` — bg-button-default-bg,
      text-button-default-text
  - Download icon button: 44px square, 24px icon container

### MetaFilterCapsuleRow

- Layout: Flex Row, bg-container-flat, rounded-10px,
  p-8px, gap-20px, Width-Full
- Input select dropdowns
  (h-36px, px-12px, rounded-8px, bg-input-bg,
  border-1px input-border):
  1. `GB`
  2. `£ GBP`
  3. `Market`
  4. `Jun 4, 2025 - Nov 4, 2025` (date range)
  5. `All Brands`
- Right spacer: 184px empty container

### ViewNavigationLayer

- Layout: Flex Row, H-44px, Items-Center, px-24px, Gap-8px
- Left nav arrow: 36px button, chevron-left 13.5px, opacity-70
- Vertical divider: 1px wide, h-20px, bg-input-border
- Tab controllers (flex-1, gap-16px):
  1. `Summary` — active: border-b-1.5px text-tab-selected,
     font-title medium 14px
  2. `Waterfall` — text-tab-default
  3. `Comparison` — text-tab-default
  4. `Trend` — text-tab-default
  5. `Details` — text-tab-default
- Vertical divider
- Right nav arrow: 36px button, chevron-right 13.5px

---

## Active Summary Content Canvas Blocks

### Business Performance Section

- Container: Width-Full, flex-col, gap-24px
- Header Row:
  - Title: `"Business Performance"`
    — font-title 20px medium, text-header
  - Right: Toggle switch
    (w-40px, h-20px, bg-input-bg, knob 16px bg-brand-primary)

### KPI Summary Ribbon

- Layout: Flex row, justify-between,
  border-t/b border-input-border, px-8px, py-16px
- Cards (3 equal-width, px-24px, py-16px each):
  - Grid: 2-col [auto, 1fr], 2-row [28px, 22px], gap-x-16px
  - Row 1: Metric label
    (font-title 20px medium text-table-header)
    + Value (same, text-right)
  - Row 2: Sub-label (14px text-success/error)
    + Delta value (14px text-right success/error)
- Card data:
  1. Label: `Sell-out Volume` | Value: `0.00 MUC`
     | Sub: `vs same period last year`
     | Delta: `+0.00 MUC` | Color: success
  2. Label: `System NSR` | Value: `£0.00M`
     | Sub: `vs same period last year`
     | Delta: `-£0.00M` | Color: error
  3. Label: `System GP` | Value: `£0.00M`
     | Sub: `vs same period last year`
     | Delta: `+£0.00M` | Color: success

### Consumer Investment Table

- Layout: 4-column grid [1fr, 1fr, 1fr, 1fr], gap-y-8px
- Header row (per column):
  - Col 1: `Consumer Investment`
    — 16px semibold text-table-header
  - Col 2: `£0.00M  (+0.00)`
    — 16px semibold, delta in text-success
    + sub-text `Total (vs same period last year)`
    12px text-caption
  - Col 3: `0.0x In-Period Sell-out Volume ROI`
    — 16px semibold text-success
    + sub-text `per £ invested`
  - Col 4: `0.0x Long-Term Sell-out Volume ROI`
    — 16px semibold text-success
    + sub-text `per £ invested`
- Data rows (h-24px, px-8px, indent 16px on col 1):
  1. `Digital Media` | `£0.00M  (+0.00)` success
     | `0.0x` | `0.0x`
  2. `Traditional Media` | `£0.00M  (-0.00)` error
     | `0.0x` | `0.0x` | bg-table-row-raised
  3. `Retail Media` | `£0.00M  (+0.00)` success
     | `0.0x` | `0.0x`
  4. `Other Media` | `£0.00M  (-0.00)` error
     | `0.0x` | `0.0x` | bg-table-row-raised

### Customer Investment Table

- Same 4-column grid structure as Consumer Investment
- Header row:
  - Col 1: `Customer Investment`
  - Col 2: `£0.00M  (+0.00)` success
    + sub-text `Total (vs same period last year)`
  - Col 3: `0.0x In-Period Sell-out Volume ROI` success
    + `per £ invested`
  - Col 4: `0.0x Long-Term Sell-out Volume ROI` success
    + `per £ invested`
- Data rows:
  1. `Promotions & Shopper Marketing`
     | `£0.00M  (+0.00)` success | `0.0x` | `0.0x`
  2. `Outlet Equipment` | `£0.00M  (-0.00)` error
     | `0.0x` | `0.0x` | bg-table-row-raised

---

## Brand Performance Snapshot Section

- Container: Width-Full, flex-col, gap-24px
- Header Row:
  - Title: `"Brand Performance Snapshot"`
    — font-title 24px medium, text-header
  - Right: Input select dropdown `Largest Variance`
    (same style as filter row inputs)

### Brand Card Track

- Layout: Flex row, gap-16px, w-max
  inside locally isolated `overflow-x-auto` wrapper
- Overflow handling: Isolated within BrandPerformanceSnapshot
  (not leaked to parent)
- Horizontal Card Track: Hide default scrollbar footprint
  by default; display smoothly on container hover interaction
  to preserve clean visual layout states
- Cards (shrink-0, px-16px, py-16px, rounded-xl,
  bg-container-flat — white over #F8F7F5 backdrop):
  - Internal grid: 2-col, gap-y-8px, w-416px
  - Row 1: Brand name
    (font-title 14px medium text-header)
    | `Total (vs same period last year)`
    (12px text-table-cell)
  - Row 2: `Sell-out Volume` (12px text-table-cell)
    | Volume + delta
    (12px, volume in text-input-border,
    delta in success/error)
  - Row 3: `System NSR`
    (12px text-table-cell, bg-table-row-raised)
    | NSR value + delta (bg-table-row-raised)
- Card data:
  1. `Coca-Cola`
     | Volume: `1.20 MUC (+0.00 MUC)` success
     | NSR: `£0.40M (+0.00)` success
  2. `Coca-Cola Zero`
     | Volume: `1.20 MUC (+0.00 MUC)` success
     | NSR: `$0.20M (+0.00)` success
  3. `Fanta`
     | Volume: `0.10 MUC (-0.00 MUC)` error
     | NSR: `£0.05M (+0.00)` error
  4. `Sprite`
     | Volume: `0.50 MUC (+ 0.00 MUC)` success
     | NSR: `$0.10M (+ 0.00)` success
