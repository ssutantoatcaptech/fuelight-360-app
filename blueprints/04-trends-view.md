# Trends View Blueprint

## Figma Source Nodes

- Light Mode:
  [Node 19613-232029](https://www.figma.com/design/AoKp9C6ecRX5NHaaNVsEsV?node-id=19613-232029&m=dev)
- Dark Mode:
  [Node 19561-87579](https://www.figma.com/design/AoKp9C6ecRX5NHaaNVsEsV?node-id=19561-87579&m=dev)

---

## 1. Global Framework (DO NOT MODIFY)

- Left Navigation Sidebar: Persists unchanged per core rules.
- Global Controls Header Row: Filter dropdowns and
  View/Edit/Optimize button group remain persistent.
- Page Navigation Tab Row: `Trend` tab active (index 3)
  — click handler mounts this view contextually.

---

## 2. Trends Content Canvas Layout

### Context Header Row

Left-aligned horizontal row with:

1. **Title:** "Performance Trends"
   — `text-[20px]` medium weight, `text-text-header`,
   `font-[family-name:var(--font-title)]`
2. **Context Badges:** Inline pill "Brand"
   (with count badge `7`).
   Capsule style: `bg-container-sunken4`, `rounded-full`,
   `text-[13px]`, `px-[12px] h-[28px]`
3. **Right Actions:** "Temperature" toggle
   (enabled, not muted)
   + "Chart Settings" button
   (`border border-input-border rounded-[8px] h-[36px]
   px-[12px]`, icon + text)

### Breadcrumb Row

- Full-width row below context header.
- Left side: Grid icon + breadcrumb trail:
  `Activation Drivers > Consumer (Paid)
  > Digital Media > Social`
- Right side: "Figures in millions" caption
- Text: `text-[13px] text-text-caption`
- Separator: `>` character with `mx-[2px]`

### Chart Legend Row

- Centered above chart area.
- Two legend entries with square color swatches
  (`size-[12px] rounded-none`):
  - Investment swatch (light `#C48300`, dark `#776737`)
    + "Driver Input – Investment (£M)"
  - Contribution swatch (`#144758`)
    + "Driver Contribution – Sell-Out Volume (MUC)"
- Text: `text-[12px] text-text-body`

---

## 3. Chart Canvas Structure (Dual-Axis Time Series Line Chart)

### Y-Axis Layout (Asymmetric Scales)

- **Left Y-axis:** "Driver Input – Investment (£M)"
  — scale `0.00` to `0.35`, increments `0.05`
- **Right Y-axis:**
  "Driver Contribution – Sell-Out Volume (MUC)"
  — scale `0.00` to `1.20`, increments `0.20`
- Left axis label: Rotated 90° CCW
- Right axis label: Rotated 90° CW
- Tick labels: `text-[11px] text-text-caption`

### X-Axis Layout

- Weekly intervals: `7/7/25`, `7/14/25`, `7/21/25`,
  `7/28/25`, `8/4/25`, `8/11/25`, `8/18/25`, `8/25/25`,
  `9/1/25`, `9/8/25`, `9/15/25`, `9/22/25`, `9/29/25`,
  `10/6/25`
- Labels: `text-[11px] text-text-caption`

### Trend Lines

- Two connected line plots with circle dot markers
  at each data point:
  - **Line 1 (Investment):**
    Light stroke `_TCCC Sunset/600` (`#C48300`),
    dark stroke `_TCCC Gold/700` (`#776737`).
    Stroke width `2px`. Dot radius `4px`.
  - **Line 2 (Contribution):**
    Stroke `_TCCC Aqua/900` (`#144758`) in both themes.
    Stroke width `2px`. Dot radius `4px`.
- Lines are angular (straight segments between points),
  NOT smooth/bezier curves.

### Vertical Dashed Divider

- A single vertical dashed line bisects the chart canvas
  (appears around week `8/4/25`).
- Style: `stroke-dasharray: 6 4`,
  color `border-input-border`.

### Grid Lines

- Horizontal dashed grid lines at every left Y-axis
  increment (0.05 steps from 0.00 to 0.35)
- Color: `border-input-border`
  (light `#C7C4C1`, dark `#2D2D2D`)
- Style: `border-dashed`

---

## 4. Timeframe View Toggle (Bottom)

- Centered row below the X-axis labels.
- Left label: "Timeframe View"
  — `text-[13px] text-text-body`
- Toggle group: "Week" (active) | "Month" | "Quarter"
- Active state: `bg-container-sunken4 rounded-[8px]
  text-text-header font-medium`
- Inactive state: `text-text-caption`
- Each button: `h-[32px] px-[16px] text-[13px]`

---

## 5. Design System Styling Tokens

### Canvas Surfaces

- Light Mode: Content area `bg-container-sunken6`
  (`#F8F7F5`).
  Chart background white `bg-container-flat`.
- Dark Mode: Content area `bg-container-sunken6`
  (`#101010`).
  Chart background black `bg-container-flat`.

### Color Tokens (Chart-Specific)

| Token | Light | Dark |
|:---|:---|:---|
| Line 1 (Investment) | `_TCCC Sunset/600` (`#C48300`) | `_TCCC Gold/700` (`#776737`) |
| Line 2 (Contribution) | `_TCCC Aqua/900` (`#144758`) | `_TCCC Aqua/900` (`#144758`) |
| Grid lines | `#C7C4C1` | `#2D2D2D` |
| Chart background | `#FFFFFF` | `#000000` |

### Interactive Borders & Controls

- Control Strip: Inactive buttons `border-0`.
  Active "View" button applies `1.5px` border
  `border-tccc-orange-400`.
- Sub-Nav Tabs: Active tab `1.5px` bottom border
  `border-tccc-orange-400`, text `text-tccc-orange-600`.
- Inactive tabs: `text-text-tab-default`, no border.

---

## 6. Layout Geometry & Safety Guardrails

- **Full Viewport Height Scaling:**
  The outer view wrapper must use
  `flex flex-col flex-1 min-h-0`
  to fill all remaining vertical space.
  The chart container (`bg-chart-bg rounded-[8px]`)
  must also use `flex-1 min-h-0`
  so its background extends flush
  to the workspace bottom boundary.
  The inner chart flex row (Y-axes + plot area)
  must use `flex-1 min-h-0`
  with `min-h-[380px]` as a floor.
- Zero top margin: Content sits flush against sub-nav tabs
  (`mt-0 pt-0`).
- All containers: Sharp square edges (`rounded-none`).
  No rounding on structural wrappers.
- Chart container: Full-width within `px-[64px]`
  content padding.
- No layout shifting when toggling timeframe
  or changing filters.
- Scroll: Content scrolls vertically
  within main content area.
  No horizontal scroll leak.
