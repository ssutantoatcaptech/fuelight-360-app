# Fuelight 360 Workspace Configuration

## 🛠️ 1. Core Engineering Guardrails

### Markdown Optimization & Git Diffs
- Maintain a practical line length range of 80–120 characters per line for written prose blocks.
- Keep text lines significantly shorter for list arrays and structural token lookup tables.
- Author all markdown prose content using exactly one complete sentence per text line.
- This ensures clean, hyper-targeted line diff tracking during pull request reviews.

### Mandatory UI Self-Audit
- Audit styles against design system tokens and structural rules before modifying layout code.
- Never invent padding, margins, sizes, scales, colors, or properties outside specification sheets.
- Flag any architectural token or grid layout conflict immediately instead of guessing.

### Iconography & Bounding Boxes
- Match exact Figma bounding box dimensions for all icon wrappers and asset layout slots.
- Maintain strict width, height, and padding adherence to defined layout metrics.
- Never downscale, pad, or guess fallback container boundaries for missing vector assets.

### Interactive Line-Weights
- Apply a strict `1.5px` layout border rule for all active interactive states with no exceptions.
- Strip borders completely (`border-0`) for all inactive interaction states.
- Enforce this binary border rule across all button groups, sub-nav tabs, and toggle controls.

---

## 💻 2. Tech Stack & Token Rules

### Technology Specifications
- **Framework:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4 featuring `@theme` blocks for CSS custom properties
- **Token Source:** `./theme.tokens.json` (DTCG format standard compliant)
- **Typography:** DM Sans (Body via Google Fonts), TCCC Unity / Avenir Next (Page titles)

### Token Application (Strict Mode)
- All color implementations must reference semantic CSS variables defined in `src/index.css`.
- Raw hex codes are strictly prohibited within application frontend component files.
- Enforce explicit pixel values matching Figma design layout rules (e.g., `px-[16px]`, `h-[36px]`).
- Match named radius token values directly from the configured system `@theme` block.
- Examples include explicit utilities like `rounded-[8px]` or utility arrays like `rounded-[16px]`.
- Use `text-success` (`#19B07A`) and `text-error` (`#C10A00`) tokens exclusively for validation states.

---

## 🚫 3. Global Structural Anti-Patterns

### Component Layout Constraints
- Do NOT apply border-radius utilities (`rounded-*`) to full-height split side panel frames.
- Column wrappers like the right performance data table must use sharp square edges (`rounded-none`).
- Right-side panels require zero top margin (`mt-0`) and zero top padding (`pt-0`) to sit flush.
- Isolate multi-card horizontal slider tracks (e.g., Brand Snapshot) locally using `overflow-x-auto`.
- Specialized inner slider blocks must never leak layout scroll behaviors to the app shell.
- Enforce a pure white background surface (`#FFFFFF`) on the left sidebar in Light Mode.
- Light Mode active nav links must use a solid red container fill (`#DA4C00`) with white text.
- Active sidebar navigation links must enforce zero left border tracking indicators (`border-l-0`).
- Keep inactive link strings configured to high-contrast dark color variables across states.
- Inactive Light Mode theme toggle chips must explicitly render a `#F6F5F3` background canvas fill.
- Inactive segmented buttons and sub-navigation header items must use zero layout borders (`border-0`).
- Active items apply a 1.5px border (`TCCCRainbowAngled` for controls, `#FC7244` for sub-nav tabs).
- Maintain uniform corner radii and exact icon bounding frames across all button states.

---

## 🎨 4. Theme Architecture

### Core Framework Mechanics
- Theme states are distributed globally across component layers via React Context (`ThemeContext.tsx`).
- Active layout modes inject a standard `data-theme` attribute directly onto the root `<html>` tag.
- Custom CSS property overrides are evaluated contextually inside the `[data-theme="dark"]` selector.
- The sidebar container background updates dynamically between light gray and solid true black.
- Sidebars and workspace windows switch matching token blocks contextually when values change.

### Semantic Token Pairs
| Token | Light | Dark |
| :--- | :--- | :--- |
| `--color-container-flat` | `#FFFFFF` | `#000000` |
| `--color-container-sunken6` | `#F8F7F5` | `#101010` |
| `--color-container-sunken4` | `#EDEEF1` | `#313131` |
| `--color-text-header` | `#443F3F` | `#E2E1DF` |
| `--color-text-body` | `#443F3F` | `#C7C4C1` |
| `--color-text-caption` | `#4D4846` | `#8E8781` |
| `--color-input-bg` | `#F7F8F8` | `#1E1E1E` |
| `--color-input-border` | `#C7C4C1` | `#2D2D2D` |
| `--color-table-row-raised` | `#EDEEF1` | `#212121` |
| `--color-sidebar-bg` | `#EFEFEF` | `#000000` |
| `--color-sidebar-item-selected` | `#FFFFFF` | `#212121` |
| `--color-sidebar-text` | `#666666` | `#8E8781` |
| `--color-button-inactive-border` | `#D1D1D1` | `#2D2D2D` |

---

## 🏗️ 5. Application Shell Structure

### Workspace Vertical Layout Stack
1. **Root Layout Container:** `flex h-screen w-full overflow-hidden font-body`
2. **Sidebar (320px Fixed Width):** Hardcoded dark token configurations (`bg-sidebar-bg`).
   - Houses logo assets, drawer toggles, a top menu tracking a `border-b` grid divider, and historical logs.
   - Wraps lower AI assistant trigger entries, release tabs, toggle slots, and profile frames.
3. **Main Content Workspace Wrapper:** Layout sub-panel (`flex-1 pt-[16px] pr-[16px]`).
   - *Inner Workspace Panel:* `rounded-tl-[16px] rounded-tr-[16px] bg-container-sunken6`
   - *Header Section Area:* `px-[64px] pt-[24px]` mounting control blocks and filter capsule rows.
   - *Sub-Navigation Track:* Horizontal layout panel mounting the core `ViewNavigationLayer`.
   - *Content Body Viewport:* Full scrolling canvas (`overflow-x-auto overflow-y-auto h-full px-[64px] pt-[40px]`).

### Global Shell Interactivity & Core Elements
- **Persistent Left Sidebar Rails:**
  - Enforces a fixed 320px width footprint when fully expanded to anchor core application routing.
  - The manual sidebar drawer toggle shifts panel width cleanly between expanded (320px) and collapsed (64px) states.
  - Collapsing the sidebar transitions text labels to hidden while maintaining centered icon vector slots.
  - Icons MUST persist in both expanded and collapsed sidebar states — never hide icons on collapse.
  - Theme mode toggle icon (current active mode) and user avatar circle persist in collapsed state.
  - Collapsed sidebar uses reduced horizontal padding (`px-[8px]`) to center icons within the 64px rail.
- **Unified Global Filter Ribbon:**
  - Standardized configuration strip mounted at the peak interface layout position across all views.
  - Houses scoped select dropdown selectors for Market region parameters, active currency symbols, and date horizons.
  - Any user alteration within this filter strip triggers a synchronized data-reload sweep across active pages.
- **Strategic Global Action Controls:**
  - Right-aligned core button group governing the top-level application operating parameters.
  - **View Mode Trigger:** Sets workspace to read-only analytical view plotting layout metrics and charts.
  - **Edit Mode Trigger:** Swaps analytical layers out to load high-density override matrices and ledger input grids.
  - **Optimize Engine Trigger:** Fires the AI processing pipeline to evaluate optimal budget allocation distribution.

---

## ⚙️ 6. System Conventions & Commands

### Coding Conventions
- Component file naming paths must map directly to Figma layout module names.
- Do NOT inject manual `useTheme()` hooks inside component logic.
- Rely on automatic semantic global CSS custom property definitions for theme parsing.
- Sidebar sub-components bypass reactive tokens and utilize hardcoded dark values.
- Disabled elements parse to `opacity-70`, while live actionable elements track at `opacity-100`.

### Build Commands
- **Development Environment:** `npm run dev`
- **Production Compilation:** `npm run build`

---

## 📦 7. Design System Library

- **Source:** `git+https://github.com/ssutantoatcaptech/Fuelight-DS-Library.git`
- **Icons location:** `src/assets/icons/` (37 SVGs copied from library)
- **Icon component:** `src/components/ui/Icon.tsx` — usage: `<Icon name="settings" size={20} className="text-text-caption" />`
- **Available icons:** add-circle, arrow-forward, block, chevron-left, chevron-right, controls, download, edit, ellipsis-horiz, feedback, folder, globe, help, info, loader, logo-360, logo-cxp, logo-data-explorer, logo-data-quality, logo-fuelight, logo-media, logo-model-observer, logo-territories, nexus-ai, notification, opt-settings, optimize-fill, optimize-outline, plus, redo, remove, scenario, settings, table-eye, undo, view, warning
- **SVG theming:** Icons use `var(--fill-0)` / `var(--stroke-0)` — the Icon component maps these to `currentColor` so they inherit text color
- **Rule:** Do NOT replace existing inline SVGs in current pages. Use the Icon component only in new work or deliberate refactors.

---

## 🧭 8. Page Blueprint Registry

- **[01-summary-view.md](.claude/blueprints/01-summary-view.md)** — Summary View: KPI summary ribbons, 4-column investment grids, and brand cards.
- **[02-waterfall-view.md](.claude/blueprints/02-waterfall-view.md)** — Waterfall View: Multi-line header grid, localized metric aggregate rows, and square-edge columns.
- **[03-comparison-view.md](.claude/blueprints/03-comparison-view.md)** — Comparison View: Dual-axis grouped bar charts and cross-theme primitive color variables.
- **[04-trends-view.md](.claude/blueprints/04-trends-view.md)** — Trend View: Dual-axis timeline charts featuring custom circular data point nodes.
- **[05-curves-view.md](.claude/blueprints/05-curves-view.md)** — Curves View: Custom routing paths, diminishing returns regression models, and optimization flag tags.
- **[06-details-view.md](.claude/blueprints/06-details-view.md)** — Details View: Table cell semantic variables, input tracking overrides, and spreadsheet grids.