# Details View Blueprint

## Figma Source Nodes

- Light Mode:
  [Node 19561-167194](https://www.figma.com/design/AoKp9C6ecRX5NHaaNVsEsV?node-id=19561-167194&m=dev)
- Dark Mode:
  [Node 19746-303312](https://www.figma.com/design/AoKp9C6ecRX5NHaaNVsEsV?node-id=19746-303312&m=dev)

---

## 1. Global Framework (DO NOT MODIFY)

- Left Navigation Sidebar: Persists unchanged per core rules.
- Global Controls Header Row: Filter dropdowns and
  View/Edit/Optimize button group persist.
  Note: "Edit" button is active in this view.
- Page Navigation Tab Row: NOT visible in this view
  — Details replaces the tab strip
  with the spreadsheet header directly.

---

## 2. Content Canvas Architecture

The outer view wrapper uses
`flex flex-col flex-1 h-full min-h-0 overflow-hidden`
to lock the spreadsheet layout flush
with the viewport floor.
Content is organized as a stacked layout:
a top header filtration ribbon followed immediately
by the main data spreadsheet panel stretching
to 100% height with localized vertical scroll isolation.

### Row 1: Context Header Ribbon

- **Left-Aligned Elements:**
  - Grid icon (`size-[16px] text-text-caption`)
  - "Data Details" title
    — `text-[14px] font-medium text-text-header`
- **Right-Aligned Elements:**
  - "Values in Millions" indicator label
    — `text-[13px] text-text-caption`
  - "Selected timeframe" indicator label
    — `text-[13px] text-text-caption`
  - "View-only" indicator label
    — `text-[13px] text-text-caption`
  - "Table Settings" button
    (`border border-input-border rounded-[8px] h-[36px]
    px-[12px]`, icon + text)
- Row spacing: `pb-[16px] shrink-0`
  to prevent header from collapsing during flex layout.

### Row 2: Spreadsheet Panel

The spreadsheet panel mounts as a `flex-1 h-full min-h-0`
child with `overflow-hidden` for scroll isolation.
It uses `bg-table-border p-px` as a border wrapper
around the CSS Grid table.

### Spreadsheet Header Block

Three stacked header rows within the frozen header zone:

1. **Brand row:** "Coca-Cola"
   — spans across all data columns.
   `text-[14px] font-semibold text-text-header`.
   Background: `bg-table-header-raised`.
2. **Year row:** "2025"
   — spans across all data columns.
   `text-[14px] font-semibold text-text-header`.
   Background: `bg-table-header-raised`.
3. **Column headers:** `Full Year` | `🔒 YTD` | `YTG`
   | `🔒 6/1 –6/7 📅` | `🔒 6/8 –6/14 📅`
   | `🔒 6/15 –6/21 📅` | `🔒 6/22 –6/28 📅`
   | `🔒 6/29 –7/5 📅` | `7/6 –7/12 📅`
   | `🔒 7/13 –7/19 📅`...
   - Text: `text-[14px] font-semibold text-text-header`
   - Lock icon: `size-[12px]` prefix on locked columns
   - Calendar icon: `size-[12px]` suffix
     on date range columns
   - Background: `bg-table-header-raised-highest`

### Frozen Left Column

- Width: ~200px sticky
- Category labels: "Customer", "Consumer (Paid)",
  "Consumer (Owned)"
- Text: `text-[14px] text-text-body`
- Background: `bg-table-header-raised-highest`
  (matches column header row)
- Border: `1px border-table-border`

### Data Grid Cells

- Cell height: `56px`
- Values: `0.00` placeholder format, right-aligned
- Text: `text-[14px] text-text-body`
- Cell background: `bg-table-cell-raised-high`
  (Light `#FFFFFF` / Dark `#212121`)
- Cell borders: `1px border-table-border`
  (`#585250` dark) on all sides (`rounded-none`)
- Editable cells: Standard appearance,
  no distinct input styling until focused

### Bottom Action Bar

- Fixed to bottom of viewport
- Left side: Undo + Redo icon buttons
  — `size-[36px]` with `text-text-disabled`
- Right side: "Cancel" text button
  (`text-[13px] text-text-caption`)
  + "Save" primary button
  (`h-[36px] px-[16px] rounded-[8px]
  bg-container-sunken4 text-text-disabled`)
- Full-width bottom border:
  `border-t border-input-border`

---

## 3. Design System Styling Tokens

> **Source of truth:** Figma Node
> [19746-308560](https://www.figma.com/design/AoKp9C6ecRX5NHaaNVsEsV?node-id=19746-308560&m=dev)
> — Selection Colors panel.
> All cells, rows, and dividers MUST use
> the following semantic variables.
> Do NOT fall back to generic container tokens.

### Canvas Surfaces

| Figma Variable | Tailwind Token | Light | Dark |
| :--- | :--- | :--- | :--- |
| `background/table/header-raised` | `bg-table-header-raised` | `#E8E6E3` | `#141a1a` |
| `background/table/header-raised-highest` | `bg-table-header-raised-highest` | `#DDDBD8` | `#1e2727` |
| `background/table/cell-raised-high` | `bg-table-cell-raised-high` | `#FFFFFF` | `#212121` |
| `background/table/cell-raised` | `bg-table-cell-raised` | `#F7F8F8` | `#191919` |

- Outer wrapper: `bg-container-sunken6`
  (Light `#F8F7F5` / Dark `#101010`)

### Cell Borders

| Figma Variable | Tailwind Token | Light | Dark |
| :--- | :--- | :--- | :--- |
| `border/table/cell` | `border-table-border` | `#585250` | `#585250` |

### Cell Text

| Figma Variable | Tailwind Token | Light | Dark |
| :--- | :--- | :--- | :--- |
| `text/table/cell` | `text-text-body` | `#443F3F` | `#C7C4C1` |
| `text/global/disabled` | `text-text-disabled` | `#78716C` | `#6D6561` |

### Interactive States

- Control Strip: "Edit" button active with `1.5px` border
  `border-tccc-orange-400`.
- No sub-nav tab row visible in this view.

---

## 4. Layout Geometry & Safety Guardrails

- **Full Viewport Height Scaling:**
  The Details view mounts inside a
  `flex flex-1 flex-col min-h-0 overflow-hidden` parent
  (no padding/gap).
  The outer grid wrapper must use `flex-1 h-full min-h-0`
  so the table panel stretches completely flush
  to the canvas floor.
  The CSS Grid must use `h-full`
  and its filler row (`minmax(0, 1fr)`)
  absorbs remaining vertical space.
  Vertical column dividers and scroll tracks
  must stretch the full grid height.
- Zero top margin: Content sits flush
  against the control strip (`mt-0 pt-0`).
- All cells, rows, headers, and containers:
  Sharp square edges (`rounded-none`).
  No rounding anywhere in the grid.
- Horizontal scroll: Grid scrolls horizontally
  for overflow columns.
  Left column stays frozen/sticky.
- Vertical scroll: Grid body scrolls vertically.
  Header rows stay frozen/sticky.
- Bottom action bar: Fixed position,
  does not scroll with content.
