# Global Edit

## Figma Source Nodes

- Light Mode:
  [Node 19746-308560](https://www.figma.com/design/AoKp9C6ecRX5NHaaNVsEsV?node-id=19746-308560&m=dev)
- Dark Mode:
  [Node 19561-167199](https://www.figma.com/design/AoKp9C6ecRX5NHaaNVsEsV?node-id=19561-167199&m=dev)

---

## 1. Content Canvas Architecture

The global edit workspace is accessed by clicking
the "Edit" button in the ScenarioControlStrip.
When active, the tab navigation row is hidden
and this view replaces the entire content body.
The workspace initializes immediately below
the persistent control strip header row.

### Context Header Row

- **Left-Aligned Elements:**
  - Grid icon (16px, `text-text-caption`)
  - Page title: "Activation Drivers"
    — `text-[14px] text-text-header`
- **Right-Aligned Elements (gap-24px):**
  - "Values in Millions" — `text-[12px] text-text-caption`
  - Calendar icon + "Selected timeframe" — `text-[12px] text-text-caption`
  - Lock icon + "View-only" — `text-[12px] text-text-caption`
  - "Table Settings" button — `h-[36px] px-[12px] rounded-[8px]
    bg-container-sunken3 text-[14px] text-text-header`
    with gear icon (13px)

---

## 2. High-Density Input Ledger Grid

The table fills the remaining vertical space
using `flex-1 min-h-0` on the outer wrapper.
Border color is provided by `bg-table-border` on
the 1px-padded container, with `gap-x-px gap-y-px`
revealing the border lines between cells.

### Grid Template

- Columns: `224px repeat(10, minmax(0, 1fr)) 15px`
- Rows: `56px 56px 56px repeat(3, 56px) minmax(0, 1fr) 15px`

### Header Rows

- Row 1 col 2–11: "Coca-Cola" (`text-[14px] font-semibold text-text-header`)
- Row 2 col 2–11: "2025" (`text-[14px] font-semibold text-text-header`)
- Row 3: Column headers with lock/calendar icons
  — Full Year, 🔒YTD, YTG, 🔒6/1–6/7📅, 🔒6/8–6/14📅,
  🔒6/15–6/21📅, 🔒6/22–6/28📅, 🔒6/29–7/5📅,
  🔒7/6–7/12📅, 🔒7/13–7/19📅
- Row 1 col 1 spans all 3 header rows (empty).

### Data Rows

- Customer, Consumer (Paid), Consumer (Owned)
- All values: "0.00" — `text-[14px]`
- First 3 columns: `text-text-body`
- Remaining columns: `text-text-disabled`

### Scroll Indicators

- Vertical: 7×44px rounded pill in column 12 (scroll track)
  — `bg-container-sunken5`
- Horizontal: 44×7px rounded pill in bottom row (cols 2–11)
  — `bg-container-sunken5`

---

## 3. Bottom Action Bar

Positioned below the table with `pt-[8px]`.

- **Left:** Undo + Redo icon buttons (36×36px, opacity 0.7)
- **Right:** "Cancel" text button + "Save" disabled button
  — Save: `bg-container-sunken4 text-text-disabled opacity-70`
  — Both: `h-[36px] min-w-[80px] px-[12px] rounded-[8px]`

---

## 4. Layout Geometry & Safety Guardrails

- NO filter dropdown row.
- NO "Edit Mode Active" pill.
- NO "Scenario Overwrite Matrix" title.
- NO "Cancel Modifications" / "Commit Overwrites" buttons.
- The outer wrapper uses `gap-[8px]` between header, table, and action bar.
- Corner rounding is banned from all table cells and headers.
