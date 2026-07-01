# Waterfall View Specification

## Figma Source Nodes

- Light Mode:
  [Node 19227-32787](https://www.figma.com/design/AoKp9C6ecRX5NHaaNVsEsV?node-id=19227-32787&m=dev)
- Dark Mode:
  [Node 19561-74682](https://www.figma.com/design/AoKp9C6ecRX5NHaaNVsEsV?node-id=19561-74682&m=dev)

---

## 1. Global Shell Framework (DO NOT MODIFY)

- **Sidebar:** Left navigation sidebar persists unchanged.
- **Global Controls Header:** Persistent full-width control bar
  mapping global dropdown selectors on the left,
  and the segmented `View`/`Edit`/`Optimize` button group
  right-aligned.
- **Page Navigation Tabs:** Horizontal sub-navigation row.
  Active state on the `Waterfall` tab (index 1)
  mounts this contextual view container.

---

## 2. Content Canvas Architecture

The main layout wrapper mounts immediately below
the navigation tab row using strict `mt-0 pt-0` geometry
to sit flush.
The content area directly above the chart is built
as a stacked header block:

### Row 1: Primary Context Line

- **Left-Aligned Elements:**
  - **Page Title:** "All Drivers"
    — `text-[20px] font-medium text-text-header
    font-[family-name:var(--font-title)]`
  - **Primary Badge:** "7 Brand" capsule styled as
    an explicit design system tag component
    — `bg-container-sunken4 rounded-full text-[13px]
    font-medium px-[12px] h-[28px] flex items-center
    ml-[12px]`
- **Right-Aligned Elements:**
  - **Settings Trigger:** "Chart Settings" button
    — `h-[36px] px-[12px] border border-input-border
    rounded-[8px] bg-container-flat text-[13px] font-medium`
    hosting a `size-[14px]` utility gear icon.

### Row 2: Performance Summary Strip

- **Left-Aligned Aggregates:**
  Horizontal flex layout row detailing core delta metrics:
  - Primary Value: "Total Sell-out Volume" description
    stacked alongside bold text **"XX.XX MUC"**
    (`text-[14px] font-bold text-text-header`).
  - Comparison Pill: Inline context badge displaying
    **"+0.0% vs. Prior Year"** colored dynamically
    utilizing the success semantic indicator
    (`text-text-global-success-main` / `#000000`
    context depending on theme parameters).

### Row 3: Breadcrumb Row

- **Left-Aligned Elements:** Hierarchical navigation trail
  — `Activation Drivers > Consumer (Paid)
  > Digital Media > Social`
  (`text-[13px] text-text-caption`).
  Divider uses `>` with `mx-[4px]`.
  Final segment applies `font-medium text-text-header`.
- **Right-Aligned Elements:** "Figures in millions"
  unit indicator — `text-[13px] text-text-caption`.

---

## 3. Waterfall Chart Architecture

- **Bounding Plot Canvas:** Wide horizontal visualization area
  with theme-responsive background
  (`bg-chart-bg`: white in light, dark in dark mode)
  positioned flush beneath the utility header stack.
  Enforces `rounded-none` — no corner radius on any edge.
- **Vertical Axis (Y-Axis):** Placed on the far left edge
  of the chart canvas boundary,
  tracking numerical steps rising vertically from `0.00M`.
- **Horizontal Metric Segments (X-Axis Categories):**
  Split horizontally from left to right into distinct,
  sequenced category blocks:
  - **Base Segment:** Features a single, wide baseline column
    tracking "Constant sales and other factors".
  - **In Store Segment:** A sequential group of floating
    delta columns representing: "Weather", "Macroeconomics",
    "Holidays", "Competitor Media", "Competitor Execution",
    "Outlet", "Distribution", "Pricing".
  - **Activation Segment:** A sequential group of floating
    delta columns tracking: "Customer",
    "Consumer (Paid)", "Consumer (Owned)".
  - **Final Summary Segment:** A single, full-height
    baseline summary column locking in the final
    aggregate total ("2025").
- **Data Pillar Rules:**
  - All bars use sharp square edges exclusively
    (`rounded-none`).
    No corner-rounding variables allowed.
  - Positive delta columns: Green fill (`bg-success`)
    with `+0.00` value labels in `text-success`.
  - Negative delta columns: Red fill
    (`bg-chart-bar-negative`)
    with `-0.00` value labels in `text-error`.
  - Baseline/Summary columns: Warm gray fill
    (`bg-chart-bar-baseline`)
    with value labels in `text-text-caption`.
  - Connecting step-lines: Thin horizontal paths
    (`1px`, `bg-chart-divider`) linking the cumulative edge
    of each pillar to the next pillar's start offset.

---

## 4. Design System Styling Tokens

### Color Matrix

| UI Element | Token | Light Mode | Dark Mode |
| :--- | :--- | :--- | :--- |
| **Chart Canvas Background** | `bg-chart-bg` | `#FFFFFF` | `#1A1A1A` |
| **Positive Pillars** | `bg-success` | `#19B07A` (green) | `#19B07A` |
| **Negative Pillars** | `bg-chart-bar-negative` | `#F40000` | `#F40000` |
| **Baseline/Summary Pillars** | `bg-chart-bar-baseline` | `#E5E3DF` (warm gray) | `#393939` |
| **Segment Dividers** | `border-chart-divider` | `#C7C4C1` | `#585250` |
| **Positive Value Labels** | `text-success` | `#19B07A` | `#19B07A` |
| **Negative Value Labels** | `text-error` | `#C10A00` | `#C10A00` |
| **Baseline Value Labels** | `text-text-caption` | `#4D4846` | `#8E8781` |

---

## 5. Layout Geometry & Safety Guardrails

- **Full Viewport Height Scaling:**
  The outer view wrapper must use `flex-1 min-h-0`
  to fill all remaining vertical space
  in the parent content body.
  The chart canvas container must likewise use `flex-1`
  to expand its white background flush
  to the bottom boundary of the workspace.
- **Contour Rules:** Every component inside the chart canvas
  — including structural panel borders, bounding grids,
  connecting alignment gridlines,
  and vertical data pillars —
  must enforce sharp square edges exclusively
  (`rounded-none`).
  No corner-rounding variables allowed.
- **Anchor vs. Floating Blocks:**
  The "Constant sales" (Base) and "2025" (Summary) columns
  anchor the chart as solid vertical pillars
  rising from the `0.00M` baseline.
  All internal delta columns float suspended
  in the grid space showing incremental step-by-step changes,
  bound together by thin horizontal tracking connectors.
- **No External Legend:** Color-coded legend labels
  (Positive, Negative, Baseline) are strictly prohibited
  outside the plot area.
  All performance signifiers (green `+0.00`, red `-0.00`,
  solid baseline fills) must live directly inline
  within the chart data pillars and floating steps.
  No separate key, legend row, or floating label group
  beneath or beside the chart.
