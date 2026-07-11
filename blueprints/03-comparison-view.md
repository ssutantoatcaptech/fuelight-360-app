# Comparison View Blueprint

## Figma Source Nodes

- Light Mode:
  [Node 19227-32976](https://www.figma.com/design/AoKp9C6ecRX5NHaaNVsEsV?node-id=19227-32976&m=dev)
- Dark Mode:
  [Node 19730-280421](https://www.figma.com/design/AoKp9C6ecRX5NHaaNVsEsV?node-id=19730-280421&m=dev)

---

## 1. Global Framework (DO NOT MODIFY)

- Left Navigation Sidebar: Persists unchanged per core rules.
- Global Controls Header Row:
  ScenarioControlStrip + MetaFilterCapsuleRow persist.
- Page Navigation Tab Row: `Comparison` tab active (index 2)
  — click handler mounts this view.

---

## 2. Content Canvas Architecture

The outer view wrapper uses `flex flex-col flex-1 min-h-0`
to fill all remaining vertical space below the tab row.
Content is organized as a 2-row stacked layout
above the chart canvas container.

### Row 1: Context Header

- **Left-Aligned Elements:**
  - **Title:** "Scenario Comparison"
    — `text-[20px] font-medium text-text-header
    font-[family-name:var(--font-title)]`
  - **Filter Capsules:** Inline pills
    — "Brand" (with count badge `7`) in light mode;
    "Brand" + "Territory" (both with `7` badge)
    in dark mode.
    Capsule style: `bg-container-sunken4`, `rounded-full`,
    `text-[13px]`, `px-[12px] h-[28px]`
- **Right-Aligned Elements:**
  - "Temperature" toggle (disabled/muted)
  - "Chart Settings" button
    (`border border-input-border rounded-[8px] h-[36px]
    px-[12px]`, icon + text)

### Row 2: Breadcrumb Row

- Full-width row below context header (`py-[8px]`).
- Left side: Breadcrumb trail:
  `Activation Drivers > Consumer (Paid)
  > Digital Media > Social`
- Right side: "Figures in millions" caption
- Text: `text-[13px] text-text-caption`
- Separator: `>` character with `mx-[4px]`

### Row 3: Chart Canvas Container

The chart canvas mounts as a `flex-1 min-h-0` child
using `bg-chart-bg rounded-[8px]` with `mt-[16px]`
vertical gap separating it from the content canvas above.
It stretches to fill 100% of remaining vertical depth
down to the workspace baseline.

### Chart Legend Row

- Centered above chart area.
- Two legend entries with square color swatches
  (`size-[12px] rounded-none`):
  - Orange swatch + "Driver Input – Investment ($M)"
  - Teal/dark swatch
    + "Driver Contribution – Sell-Out Volume (MUC)"
- Text: `text-[12px] text-text-body`

### ROI Value Row

- Horizontal row aligned with chart X-axis groups.
- Left label: "ROI:"
  in `text-[12px] font-medium text-text-header`
- Values: one per brand cluster
  — e.g., `2.63`, `1.53`, `2.45`, `1.23`, `0.73`,
  `1.02`, `2.18`, `1.86`, `1.19`
- Text: `text-[12px] text-text-body`

---

## 3. Chart Canvas Structure

### Dual-Axis Grouped Bar Chart

- **Left Y-axis:** "Driver Input – Investment ($M)"
  — scale 0 → 3.0, increments 0.5
- **Right Y-axis:**
  "Driver Contribution – Sell-Out Volume (MUC)"
  — same scale 0 → 3.0
- **X-axis brands:** Coca-Cola, Coca-Cola Zero, Dr. Pepper,
  Diet Dr. Pepper, Fanta, Fanta Zero, Schweppes,
  Sprite, Sprite Zero
- **Bar groups:** Each brand has 2 bars side-by-side:
  - Bar 1 (Investment): Orange fill
    — Light: `#FC7244` / Dark: muted gold `#B8A44C`
  - Bar 2 (Contribution): Teal fill
    — Light: `#6AC9CE` / Dark: dark olive `#5C6B4A`
- **Bar geometry:** `rounded-none` (square-edge tops).
  Fixed width per bar, uniform gap between groups.
- **Bar value labels:** White text centered inside each bar
  — "XXM" placeholder format,
  `text-[11px] font-medium text-white`

### Axis Typography

- Y-axis labels: `text-[11px] text-text-caption`
- X-axis brand labels:
  `text-[12px] text-text-body font-medium`
- Y-axis title (rotated):
  `text-[11px] text-text-caption`, 90° CCW rotation

### Grid Lines

- Horizontal dashed grid lines at each Y increment
  (0.5, 1.0, 1.5, 2.0, 2.5, 3.0)
- Color: `border-input-border`
  (light `#C7C4C1`, dark `#2D2D2D`)
- Style: `border-dashed`

---

## 4. Design System Styling

### Canvas Surfaces

- Light Mode: Content area `bg-container-sunken6`
  (`#F8F7F5`).
  Chart background white `bg-container-flat`.
- Dark Mode: Content area `bg-container-sunken6`
  (`#101010`).
  Chart background black `bg-container-flat`.

### Interactive Borders & Controls

- Control Strip: Inactive buttons `border-0`.
  Active "View" button applies `1.5px` border
  `border-tccc-orange-400`.
- Sub-Nav Tabs: Active tab `1.5px` bottom border
  `border-tccc-orange-400`, text `text-tccc-orange-600`.
- Inactive tabs: `text-text-tab-default`, no border.

### Color Tokens (Chart-Specific)

| Token | Light | Dark |
|:---|:---|:---|
| Bar 1 (Investment) | `#FC7244` (orange) | `_TCCC Gold/700` (`#776737`) |
| Bar 2 (Contribution) | `--color-tccc-aqua-500` (`#6AC9CE`) | `_TCCC Aqua/900` (`#144758`) |
| Grid lines | `#C7C4C1` | `#2D2D2D` |
| Chart background | `#FFFFFF` | `#000000` |

---

## 5. Layout Geometry & Safety Guardrails

- **Full Viewport Height Scaling:**
  The outer view wrapper must use
  `flex flex-col flex-1 min-h-0`
  to fill all remaining vertical space.
  The chart container (`bg-chart-bg rounded-[8px]`)
  must also use `flex-1 min-h-0`
  so its background extends flush
  to the workspace bottom boundary.
  The inner chart flex row (Y-axes + bars)
  must use `flex-1 min-h-0`
  with `min-h-[320px]` as a floor.
- Zero top margin: Content sits flush against sub-nav tabs
  (`mt-0 pt-0`).
- All containers: Sharp square edges (`rounded-none`).
  No rounding on structural wrappers.
- Chart container: Full-width within `px-[64px]`
  content padding.
- No layout shifting when toggling filter capsules
  or changing brand selections.
- Scroll: Content scrolls vertically
  within main content area.
  No horizontal scroll leak.
- Bar chart width: Fills available width
  minus axis label space.
  Bars scale proportionally.
