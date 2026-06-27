---
name: build-component
description: Extract component dimensions and semantic colors out of theme.tokens.json to construct layout modules
steps:
  - Parse the semantic block for target background properties (e.g., semantic.light.background.container.flat)
  - Interrogate typography properties for the specific module spacing bounds (e.g., typography.padding.container or typography.padding.input)
  - Verify layout sizing parameters from the component height configurations (e.g., typography.size.input.height-md)
  - Output clean React functional primitives wrapped in strict TypeScript contract interfaces
---

# Build Component Workflow
Follow the token mapping boundaries of the Fuelight 360 Design System to construct pixel-perfect structural containers.

### 1. Color Extraction Map
Locate visual values by chaining properties down to their native primitive mapping:
* Main Branding Accent: `semantic.light.brand.primary-main` -> maps to primitives `_TCCC Aqua/600` (`#40B8C5`)
* Core Structural Gray Text: `semantic.light.brand.secondary-main` -> maps to primitives `gray-stone/900` (`#443F3F`)
* Page Fill Containers: `semantic.light.background.container.flat` (`#FFFFFF`) or `sunken1` (`#F6F5F3`)

### 2. Spatial Grid Alignment
* Component Layout Bounds: Read horizontal/vertical keys directly from `typography.padding.[component_name]` (e.g., `typography.padding.button.horizontal-md` = 12px).
* Raw Spacing Grid: If building custom structural grid gaps, match the pixel values to the primitive index keys:
  * `gap-1` -> 4px (Key `1`)
  * `gap-2` -> 8px (Key `2`)
  * `gap-3` -> 12px (Key `3`)
  * `gap-4` -> 16px (Key `4`)

### 3. Structural Radius & Borders
* Outer Card Modules: Sync border radius values with `primitive.scale.border-radius` variables (e.g., `rounded-xl` = 12px, `rounded-2xl` = 16px).
* Interactive Borders: Input and Button strokes must leverage properties found under `typography.border-width.[component]`.
