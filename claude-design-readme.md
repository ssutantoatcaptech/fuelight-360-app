# ⚡ Fuelight 360 Design System (TCCC Analytics Workspace)

Welcome to the Fuelight 360 Design System documentation. This framework serves as our single source of truth, anchoring the brand's Foundations, UI inventory, and layout parameters across our React 19 / Tailwind v4 production repo and this interactive prototyping canvas.

---

## 📕 Product & Behavioral Context

Fuelight is the internal codename for a Coca-Cola (TCCC) revenue-growth-management and trade-investment analytics workspace. It is a dark, data-dense, neutral decision-support tool focused completely on modeling marketing investments and ROI metrics. 

### Content & Voice Boundaries
* **Tone:** Precise, professional, neutral, and impersonal. No exclamations, no emojis, no hype.
* **Casing:** Title Case for view names and section headers ("Shopper Investment", "Add Driver Comparison"); sentence case for body and helper descriptions ("Outcomes actualized through...").
* **Terse Labels:** Keep wording ultra-short with zero trailing punctuation ("All Brands", "Default View").
* **Numbers First:** Currencies (£23.8M), ratios (ROI 2.6), and signed deltas (+12%, -5%) must feature unit labels in parentheses, e.g., "Investment (£M)".
* **Domain vocabulary:** Scenario, Driver, Investment, Contribution, Sell-Out Volume, ROI, Pack, Brand, Customer/Channel, Waterfall, Curve, Optimization, Actuals, Model.

---

## 📘 Visual Foundations & Token Pipeline

This workspace runs on a strict **Tokens First, Components Second** architecture to prevent layout drift.

### 1. Interactive States & Component Mapping

#### Forms & Buttons
* **Primary Buttons:** Default resting background must map to `var(--color-tccc-aqua-800)` (#206C7F)
* **Tertiary Buttons:** Resting background is `bg-transparent` | Hover maps to `var(--color-container-sunken3)`
* **Inputs & Dropdowns:** All text inputs, select dropdowns, and form backgrounds must use `var(--color-container-sunken2)` (#313131) for dark canvas contrast | Borders map to `var(--color-input-border)`
* **Disabled Elements:** Background maps to `var(--color-container-sunken4)` | Text maps to `var(--color-text-disabled)` | Apply `opacity-70`

#### Layout & Borders
* **Binary Border Rule:** Active interactive states get an exact 1.5px border (Gradient for controls, Solid #FC7244 for Navigation Tabs) | Inactive surfaces get `border-0` (no exceptions)
* **Special Effects:** Active segmented buttons use the `TCCCRainbowAngled` effect via an exact 1.5px border CSS mask technique: `linear-gradient(135deg, #F40008, #FFA000, #6ED578, #64BEC2)`
* **Geometry Constraints:** Bounding boxes and corner radii must remain completely identical across active, inactive, and disabled states to prevent UI shifting
* **Square Edges:** Full height side panels and data table column wrappers must use strict square edges (`rounded-none`)

#### Brand Accents & Status
* **Brand Accent:** Use brand orange `var(--color-tccc-orange-600)` (#DA4C00) for primary active indicators
* **Status Badges:** Active status pills must use a `tccc-orange-600` background with pure white (#FFFFFF) text (no muted or dark grays)

### 2. Navigation Components

#### Navigation Bars
* **Tabs:** Active underlines map to `var(--color-tab-active-text)` / `var(--color-tab-active-border)` | *Dark Mode:* Resolves to a light color | *Light Mode:* Brand orange (#DA4C00 text / #FC7244 1.5px underline) | *Layout:* Pass the `fill` property to stretch tabs evenly across the container
* **Breadcrumbs:** Standard trail links map to `var(--color-text-tab-default)` | Current location maps to `var(--color-text-header)`

#### Left Navigation Sidebar
* **Theming:** Surface, borders, text, and selections bind to theme aware `--color-sidebar-*` tokens driven by the root `data-theme`
* **Active Items:** *Dark Mode:* Subtle #212121 fill | *Light Mode:* Strict brand orange (#DA4C00 text and fill) to match page level navigation tabs
* **Structure Pipeline:** Follows fixed layout order: 1) Brand mark with collapse toggle, 2) Scrollable primary group, 3) Hairline divider at 60%, 4) Pinned utility links, 5) Appearance toggle, 6) User profile footer

### 3. Token Naming Conventions

| Pattern | Examples | Description |
| :--- | :--- | :--- |
| `--color-{domain}-{element}` | `--color-container-flat`, `--color-text-body` | Structural and typography surfaces |
| `--color-{element}-{variant}-{state}` | `--color-button-tertiary-hover`, `--color-text-button-primary` | Interactive state changes |
| `--color-brand-{variant}` | `--color-brand-primary`, `--color-brand-primary-dim` | Core application identity |
| `--color-tccc-{family}-{shade}` | `--color-tccc-aqua-700`, `--color-tccc-orange-600` | Strict brand color palette system |
| `--spacing-{scale}` | `--spacing-4` (= 16px) | 4px base grid unit, unitless in CSS, consumed via `calc()` |
| `--radius-{size}` | `sm` (4px), `md` (8px), `lg` (10px), `xl` (16px), `full` (9999px) | Component corner rounding controls |

### 4. Data Visualization & Chart Palettes

To isolate data visualization logic without cluttering our core architecture, chart settings are maintained in a distinct module (`chart-palettes.css`) that strictly inherits from our foundational base tokens.

#### Architecture Alignment
* **Base Inheritance:** Chart palettes do not invent new color scales. They explicitly map to the established `var(--color-tccc-*)` brand tokens defined in our base styles.
* **State Synchronization:** Colors are managed entirely within `chart-palettes.css` and synced automatically to the interface via `chart-tweaks.js`.
* **Implementation Rule:** Never hardcode hex values inside charting components. Always bind to the shared palette variables to guarantee synchronized updates across the Core Content View and individual chart cards.
---

## 🧩 Components

The UI inventory shipped in this design system:
* **Data display** — Avatar, Badge, Card, Tag, TableCell, DataTable
* **Forms** — AppearanceToggle, Button, Checkbox, Input, Radio, SegmentedControl, Select, Toggle
* **Navigation** — Breadcrumb, Sidebar, Tabs
* **Disclosure** — Accordion
* **Feedback** — Banner, Spinner, Tooltip
* **Overlay** — Menu
* **Icon** — Icon

---

## 🤖 Layout Rules & System Instructions (For Claude Engine)

*This section provides our layout engine with the exact rules required to map and render our existing canvas blocks correctly.*

### 1. Interactive States & Component Mapping
* **Forms & Buttons:** When generating or modifying interactive components, do not use generic colors. You must explicitly map states to their component-level tokens (e.g., map a tertiary button's hover state to `var(--color-button-tertiary-hover)` and its text to `var(--text-button-tertiary-default)`).
* **Binary Border Rule:** Active interactive states get an exact `1.5px` border (gradient for controls, `#FC7244` for navigation tabs). Inactive surfaces get `border-0` — absolutely no exceptions.
* **Special Effects Processing:** Active segmented buttons use the `TCCCRainbowAngled` effect: `linear-gradient(135deg, #F40008, #FFA000, #6ED578, #64BEC2)` styled via an exact 1.5px border CSS mask technique.

### 2. Geometry & Shell Constraints
* **No Rounded Corners:** Full-height side panels and data table column wrappers must use strict square edges (`rounded-none`).
* **Sidebar Theming:** The `Sidebar` component is theme-aware — its surface, borders, item text, and selected-item treatment all bind to `--color-sidebar-*` tokens that flip between Light and Dark. (This supersedes the earlier hardcoded-dark approach; the Light/Dark/Auto `AppearanceToggle` drives the `data-theme` root and the sidebar follows.)
* **Disabled state:** `opacity-70` for disabled elements, `opacity-100` for live.
* **Consistent Geometry:** Bounding boxes and corner radii must stay completely identical across active, inactive, and disabled states to prevent visual UI shifting.

---

## 🖋️ Typography

| Role | Family | Notes |
|------|--------|-------|
| Page titles, headings | TCCC Unity / Avenir Next | Brand typeface, `--font-title` |
| Body, labels, data | DM Sans | Google Fonts, `--font-body` |
| Mono | Menlo | Numeric & code contexts (values, deltas, IDs) |