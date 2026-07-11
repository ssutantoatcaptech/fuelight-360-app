# Fuelight 360 Workspace Configuration

## 1. Project Overview
- **Product:** A high-density data analytics workspace (Fuelight 360) optimized for performance analysis, ledger grids, and budget allocation matrices.
- **Design Philosophy:** Strict adherence to spec boundaries. Rely strictly on layout metrics. No guessing or inventing arbitrary values.
- **Key UX Constraints:** Highly interactive states. Dark mode is automatic via `[data-theme="dark"]` on the root element.

## 2. Tech Stack & Token Rules
- **Framework:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4
- **Tokens Source:** `./theme.tokens.json` (DTCG standard) — single source of truth
- **Token Pipeline:** `node build-token.js` generates 4 files into `src/design-system/styles/`
- **Typography:** DM Sans (Body), TCCC Unity / Avenir Next (Titles)

### Strict Styling Rules
- **No Hardcoded Hexes:** Never inject raw hex codes in components. Always use CSS variables via Tailwind arbitrary values (e.g., `bg-[var(--token-name)]`).
- **Interaction Weights:** Active interactive states use a strict `1.5px` layout border (`TCCCRainbowAngled` or `#FC7244`). Inactive states are completely borderless (`border-0`).
- **Asset Dimensions:** Vector assets and icons must precisely mirror Figma bounding box constraints.

## 3. Global Structural Anti-Patterns
- **No Rounded Edges on Rails:** Do not apply `rounded-*` utilities to full-height split panel frames or data table column wrappers (`rounded-none` only).
- **Sidebar Padding:** Left sidebar alternates between 320px (expanded) and 64px (collapsed). Icons must remain visible and centered in both states (`px-[8px]` when collapsed). Never hide icons on collapse.
- **Prototyping:** When introducing external components/code templates, extract *only* structural layout/logic. Strip and re-skin aesthetics entirely using base theme variables.

## 4. System Conventions & Commands
- **Naming:** Component files must map explicitly to Figma layout module names.
- **Theme Hooks:** Do not manually inject `useTheme()`. Rely on global automatic CSS property evaluation via the root `<html data-theme="...">` attribute.

### Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Build tokens: `node build-token.js`

## 5. Design System Architecture
- **Single source of truth:** `theme.tokens.json` (Figma export, DTCG standard)
- **Token pipeline output:** `src/design-system/styles/`
  - `primitives.css` — raw palette (`--primitive-*`, `--tccc*`, `--desktop-*`)
  - `light.css` — light mode component tokens (`--light-*`)
  - `dark.css` — dark mode component tokens (`--dark-*`)
  - `aliases.css` — short names mapped to light/dark layers + static aliases
- **Component CSS:** `src/design-system/components/` — `.fl-*` class-based styles
- **Icons:** `src/assets/icons/` — single canonical SVG set
- **Entry point:** `src/design-system/index.css` (imported in `src/main.tsx`)
- **Icon Component:** `src/components/ui/Icon.tsx`
  - Usage: `<Icon name="settings" size={20} className="text-text-caption" />`

## 6. Page Blueprint Registry
See `blueprints/` at project root for explicit layout definitions per view:
- `01-summary-view.md` — KPI summary ribbons & 4-column grids
- `02-waterfall-view.md` — Multi-line header grids & localized aggregate rows
- `03-comparison-view.md` — Dual-axis grouped bar charts
- `04-trends-view.md` — Timeline charts with circular data nodes
- `05-curves-view.md` — Diminishing returns regression models
- `06-details-view.md` — Table cells and high-density spreadsheet matrices
- `07-global-edit-view.md` — Editable ledger grid workspace
- `08-chart-settings.md` — Side panel drawer specification
- `09-launchpad-dashboard.md` — Home page card layout

## 7. Shared Resources (Root-Level)
- `blueprints/` — View specs readable by all AI tools (Claude, Figma Make, Lovable, Cursor)
- `skills/` — Build workflows and component recipes (shared)
- `.claude/skills/` — Claude Code-specific executable validators (border auditor, token checker, etc.)
