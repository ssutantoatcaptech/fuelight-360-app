# Curves View Blueprint

## Figma Source Nodes

- Light Mode:
  [Node 19790-335779](https://www.figma.com/design/AoKp9C6ecRX5NHaaNVsEsV?node-id=19790-335779&m=dev)
- Dark Mode:
  [Node 19746-305226](https://www.figma.com/design/AoKp9C6ecRX5NHaaNVsEsV?node-id=19746-305226&m=dev)

---

## 1. Global Framework (DO NOT MODIFY)

- Left Navigation Sidebar: Persists unchanged per core rules.
- Global Controls Header Row: Filter dropdowns and
  View/Edit/Optimize button group remain persistent.
- Page Navigation Tab Row: `Curves` tab active (index 4)
  — click handler mounts this view contextually.

---

## 2. Curves Content Canvas Layout

### Context Header Row

Left-aligned horizontal row with:

1. **Title:** "Saturation Curves"
   — `text-[20px]` medium weight, `text-text-header`,
   `font-[family-name:var(--font-title)]`
2. **Context Badge:** Inline pill showing brand count
   — Light: "7 Brand", Dark: "1 Brand".
   Style: `bg-container-sunken4`, `rounded-full`,
   `text-[13px]`, `px-[12px] h-[28px]`
3. **Right Actions:** "Investment Source" toggle
   + "Marginal ROI" toggle
   + "Chart Settings" button
   (`border border-input-border rounded-[8px] h-[36px]
   px-[12px]`, icon + text)

### Breadcrumb Row

- Full-width row below context header.
- Left side: Grid icon + breadcrumb trail:
  `Activation Drivers > Consumer (Paid)
  > Digital Media > Social`
- Right side:
  "Scroll to zoom • Drag to pan • Double-click to reset"
  hint + "Figures in millions" caption
- Text: `text-[13px] text-text-caption`

### Chart Legend Row

- Centered above chart area.
- Two legend entries with square color swatches
  (`size-[12px] rounded-none`):
  - Gold swatch (`#776737`) + "Marginal ROI"
  - Aqua swatch (`#144758`)
    + "Driver Contribution – Sell-Out Volume (MUC)"
- Text: `text-[12px] text-text-body`

---

## 3. Chart Canvas Structure (Marginal ROI Diminishing Returns Curve)

### Axis Layout

- **Left Y-axis:**
  "Driver Contribution – Sell-Out Volume (MUC)"
  — label rotated 90° CCW
- **Right Y-axis:**
  "Marginal ROI (Based on Sell-out Volume)"
  — label rotated 90° CW
- **X-axis:** "Spend in £" — centered label below axis
- All tick values display as `[x]` placeholder format
- Tick labels: `text-[11px] text-text-caption`

### Regression Curves

- Two smooth non-linear data path plots
  (bezier/cubic curves):
  - **Curve 1 (Marginal ROI):**
    Logarithmic descending trend
    — starts high-left, flattens rightward.
    Stroke `_TCCC Gold/700` (`#776737`).
    Stroke width `2px`.
  - **Curve 2 (Contribution):**
    S-curve rising from bottom-left,
    flattens with diminishing returns.
    Stroke `_TCCC Aqua/900` (`#144758`).
    Stroke width `2px`.

### Vertical Intercept Lines

- Two vertical dashed lines marking "Prior Year"
  and "Current" investment positions.
- "Prior Year" line: Heavy dashed
  (`stroke-dasharray: 8 4`), color `border-input-border`.
- "Current" line: Fine dashed
  (`stroke-dasharray: 4 4`), color `border-input-border`.

### Horizontal Dotted Baseline

- A horizontal dotted line runs across the chart
  at the "Point of diminishing return" level.
- Style: `stroke-dasharray: 2 4`,
  color `--color-tccc-aqua-500` (`#6AC9CE`), `opacity-50`.

### Data Intercept Flags

- Floating rectangular tooltip markers
  at curve intersection points:
  - Gold flag: displays "£xx.xx" value,
    `bg-chart-line-investment text-white rounded-[4px]
    px-[6px] h-[20px] text-[11px]`
  - Aqua flag: displays "xx.xx MUC" value,
    `bg-chart-line-contribution text-white rounded-[4px]
    px-[6px] h-[20px] text-[11px]`
- Circle dot markers (`r="6"`)
  at flag anchor points on each curve.

---

## 4. Bottom Legend Panel

Three-column layout below the chart:

| Column | Header | Content |
|:---|:---|:---|
| Left | "Prior Year [Time period]" | `£[x] Spend`, `[x] [Metric]`, `[x] [Metric] per £ invested` |
| Center | "Current [Time period]" | `£[x] Spend`, `[x] [Metric]`, `[x] [Metric] per £ invested` |
| Right | Legend keys | Solid orange line = "Marginal ROI (Based on Sell-out Volume)", Solid aqua line = "Sell-out Volume", Dotted aqua with circle = "Point of diminishing return" |

- Line style legend: Solid `2px` stroke for Marginal ROI,
  solid `2px` for Sell-out,
  dotted with open circle for diminishing return point.
- Text: `text-[12px] text-text-body`

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
| Curve 1 (Marginal ROI) | `_TCCC Gold/700` (`#776737`) | `_TCCC Gold/700` (`#776737`) |
| Curve 2 (Contribution) | `_TCCC Aqua/900` (`#144758`) | `_TCCC Aqua/900` (`#144758`) |
| Diminishing return line | `#6AC9CE` at 50% opacity | `#6AC9CE` at 50% opacity |
| Intercept verticals | `#C7C4C1` | `#2D2D2D` |
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
  The inner chart flex row (Y-axes + SVG plot)
  must use `flex-1 min-h-0`
  with `min-h-[400px]` as a floor.
- Zero top margin: Content sits flush against sub-nav tabs
  (`mt-0 pt-0`).
- All containers: Sharp square edges (`rounded-none`).
  No rounding on structural wrappers.
- Chart container: Full-width within `px-[64px]`
  content padding.
- No layout shifting when toggling investment source
  or ROI overlay.
- Scroll: Content scrolls vertically
  within main content area.
  No horizontal scroll leak.
