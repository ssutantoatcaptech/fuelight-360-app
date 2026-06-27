# Project Overview: Fuelight 360 Workspace

## Project Overview
Implementing high-fidelity workspace layouts using the unified Fuelight 360 Design System variable library. Every component must be built as a deterministic representation of the keys defined in the local token architecture to achieve a 1:1 match with the production design.

---

## Tech Stack & Limitations
* **Framework:** React 19, TypeScript, Vite.
* **Styling:** Tailwind CSS v4.
* **Token Configuration Target:** Read directly from `./theme.tokens.json`.
* **Token Application Guardrails (Strict Mode):**
  * **Colors:** Do **NOT** use raw hex codes or base primitives (e.g., do not use `bg-blue-500`). You must use the functional semantic mapping keys located under `semantic.light.brand.*` (e.g., `primary-main`, `secondary-main`) or container layers under `semantic.light.background.container.*` (e.g., `flat`, `raised`, `sunken1`).
  * **Spacing & Sizing:** Always prioritize scoped component tokens found under `typography.padding.[component]` and `typography.size.[component]`. If a structural layout needs global primitive scales, map them strictly to the integer keys inside `primitive.scale.padding-spacing-size` (e.g., key `4` = 16px, key `2` = 8px).
  * **Borders & Radii:** Match the named keys under `primitive.scale.border-radius` (e.g., `rounded-xl` = 12px) and component-scoped properties under `typography.border-radius.[component]`.

---

## Layout Structural Blueprint (Figma 1:1 Screen Matching)
To maintain exact visual fidelity with the viewport, enforce this strict top-to-bottom layout hierarchy:

1. **Global App Shell Container (`<div className="flex h-screen w-full overflow-hidden bg-black text-white font-sans">`):**
   * **`LeftNavigationSidebar` (Fixed Width, Pure Black Backdrop, Flex Column Layout):**
     * *Top Branding:* Top-left decorative interlocking orange/cyan icon token. Flat list navigation items for `Launchpad` and `My Scenarios` (featuring an accordion arrow and a trailing horizontal sliding toggle switch).
     * *Active Scenario Sub-Group:* Indented navigation tree tracking active scenarios. `Coca-Cola Brands High Inflation` is active (highlighted with a lighter gray rounded background fill container). Inactive links follow: `Coca-Cola Brands Low Inflation`, `Sprite Holiday 2025`, and `Coke Zero Q126 Spring Campaign`. All inactive entries display a trailing right-aligned selection box indicator.
     * *Secondary List Section:* Fixed utility links positioned toward the bottom base (`Nexus AI` featuring a sharp teal variant tag badge with 'New' labeling text, `New Fuelight Handbook`, `Release Notes`, `Feedback & Support`).
     * *Sidebar Footer:* Split grid horizontal theme toggle buttons (`Light`, `Dark`, `Auto`) resting cleanly over the `UserProfileCard` block (`Firstname Lastname`, `Position Title`, and a trailing vertical ellipsis menu).
   * **`MainContentWorkspace` (Flex-1, Scrollable Viewport, Background: Pure Black `bg-black`, Padding: `p-6 flex flex-col gap-5`):**
     * Houses the system headers, filter rows, and data grids stacked vertically.

2. **Workspace Header & Filtering Layers (Top-Down Inside Workspace):**
   * **`ScenarioControlStrip` (Flex Row, Items-Center, Justify-Between, Width-Full):**
     * *Left Side:* Primary context header string (`Default [Market] Scenario`) stacked cleanly over a select dropdown selector menu (`Default View` with a trailing dropdown arrow icon).
     * *Center Side:* Muted text properties tracking model metrics (`Latest model as of: --` and `Outcomes actualized through: < 4 days`).
     * *Right Side:* Button layout matrix (`View` is active with an inner white background and dark text, `Edit`, `Optimize` with a blue background, alongside a tray download icon button).
   * **`MetaFilterCapsuleRow` (Flex Row, Gap-3, Margin-Y-2):** Independent flat row housing capsule dropdown pills with trailing chevron indicators (`GB v`, `£ GBP v`, `Market v`, Date Range Picker `Jun 4, 2025 – Nov 4, 2025 🗓️`, `All Brands v`).
   * **`ViewNavigationLayer` (Horizontal Tab Ribbon, Flex Row, Items-Center, Gap-8, Border-Bottom):** Tab controllers (`Summary`, `Waterfall`, `Comparison`, `Trend`, `Details`). The active item (`Summary`) applies a distinct white bottom-border accent highlight bar.

3. **Active Summary Content Canvas Blocks:**
   * **`Business Performance Section` (Card Wrapper Container, Width-Full):**
     * *Header Row:* Title text string `"Business Performance"` balanced by a right-aligned sliding status pill toggle switch.
     * *KPI Summary Ribbon (5-Column Layout Grid Row):** Horizontal data cards tracking key metrics:
       * `Sell-out Volume` (Value: Muted green string, subtext: `vs same period last year`)
       * `0.00 MUC` (Value: Muted green string, subtext: `+0.00 MUC`)
       * `System NSR` (Value: Muted red string, subtext: `vs same period last year`)
       * `£0.00M` (Value: Muted red string, subtext: `-£0.00M`)
       * `System GP` (Value: Muted green string, subtext: `vs same period last year`)
     * *Nested Table Containers (Grid Grid-Cols-1 lg:Grid-Cols-2 Gap-6):** Detailed multi-column matrices:
       * *Left Table Panel (`Consumer Investment`):* Rows for `Sell-out Volume`, `System NSR`, `System GP`, `Consumer Investment`, `Customer Investment`, and `Total`. Columns map currency numbers (`£357.28`), volume indicators, and dynamic metrics.
       * *Right Table Panel:* Grid layout tracking channels including `Digital Media`, `Traditional Media`, `Digital Media (Sub-branch: Imorand Media)`, `Internal Media`, `Others`, `Tenoles`, and `Total`. Columns cleanly align Volume, NSP, and ROI (`+0.0x`) properties.
   * **`Brand Performance Snapshot Section` (Card Wrapper Container, Width-Full):**
     * *Header Row:* Section label `"Brand Performance Snapshot"` balanced against a right-aligned filter layout dropdown box (`Largest Variance v`).
     * *Variant Card Flexible Track:* A horizontal row of modular layout cards (`Coca-Cola`, `Coca-Cola Zero`, `Fanta`, `Sprite`). Each card outlines localized volume metrics, inline percentage values, and specific color-coded variance badges (`-0.02%`, `+0.07%`).
     * *Track Scroll Utility:* A full-width horizontal light-grey track bar running directly beneath the brand cards to indicate carousel indexing.

---

## Coding Conventions and Style Preferences
* **Nomenclature:** Component files and prop interfaces must map cleanly to Figma layout modules:
  * Dropdown Filters / Pill Capsules: Use properties matching `typography.padding.tag` and `typography.border-radius.tag.filter`.
  * Dashboard Layout Grid: Use standard Flex/Grid items snapping padding values strictly to `typography.padding.container`.
* **State Management:** Interactivity must enforce opacity modifiers found under `typography.opacity.button.disabled` (70%) and `typography.opacity.button.active` (100%).

---

## Specific Commands
* **Dev Compilation Engine:** `npm run dev`
* **Production Distribution Build:** `npm run build`