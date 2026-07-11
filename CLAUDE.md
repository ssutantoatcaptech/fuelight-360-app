# Fuelight 360 Workspace Configuration

## 🛠️ 1. Project Overview
- **Product:** A high-density data analytics workspace (Fuelight 360) optimized for performance analysis, ledger grids, and budget allocation matrices.
- **Design Philosophy:** Strict adherence to spec boundaries. Rely strictly on layout metrics. No guessing or inventing arbitrary values.
- **Key UX Constraints:** Highly interactive states. Dark Mode treats sidebar elements differently (retains hardcoded dark styling).

## 💻 2. Tech Stack & Token Rules
- **Framework:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4 featuring `@theme` blocks
- **Tokens Source:** `./theme.tokens.json` (DTCG standard) & `src/index.css`
- **Typography:** DM Sans (Body), TCCC Unity / Avenir Next (Titles)

### Strict Styling Rules
- **No Hardcoded Hexes:** Never inject raw hex codes in components. Always map styles to CSS variables via `src/index.css` or Tailwind arbitrary values mapping to variables (e.g., `bg-[var(--token-name)]`).
- **Interaction Weights:** Active interactive states use a strict `1.5px` layout border (`TCCCRainbowAngled` or `#FC7244`). Inactive states are completely borderless (`border-0`).
- **Asset Dimensions:** Vector assets and icons must precisely mirror Figma bounding box constraints.

## 🚫 3. Global Structural Anti-Patterns
- **No Rounded Edges on Rails:** Do not apply `rounded-*` utilities to full-height split panel frames or data table column wrappers (`rounded-none` only).
- **Sidebar Padding:** Left sidebar alternates between 320px (expanded) and 64px (collapsed). Icons must remain visible and centered in both states (`px-[8px]` when collapsed). Never hide icons on collapse.
- **Prototyping:** When introducing external components/code templates, extract *only* structural layout/logic. Strip and re-skin aesthetics entirely using base theme variables.

## ⚙️ 4. System Conventions & Commands
- **Naming:** Component files must map explicitly to Figma layout module names.
- **Theme Hooks:** Do not manually inject `useTheme()`. Rely on global automatic CSS property evaluation via the root `<html data-theme="...">` attribute.

### Commands
- Dev: `npm run dev`
- Build: `npm run build`

## 📦 5. Core Integration Libraries
- **Design System Repository:** `git+https://github.com/ssutantoatcaptech/Fuelight-DS-Library.git`
- **Icon Component:** `src/components/ui/Icon.tsx`
  - Usage: `<Icon name="settings" size={20} className="text-text-caption" />`
  - Rule: Do not swap out existing inline SVGs on stable views. Restrict component usage to fresh development or intentional layout refactors.

## 🧭 6. Page Blueprint Registry
See files in `.claude/blueprints/` for explicit layout definitions per view:
- `01-summary-view.md` — KPI summary ribbons & 4-column grids.
- `02-waterfall-view.md` — Multi-line header grids & localized aggregate rows.
- `03-comparison-view.md` — Dual-axis grouped bar charts.
- `04-trends-view.md` — Timeline charts with circular data nodes.
- `05-curves-view.md` — Diminishing returns regression models.
- `06-details-view.md` — Table cells and high-density spreadsheet matrices.