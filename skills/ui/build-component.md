---
name: build-component
description: Build layout modules using exact Figma variables and strict self-audit rules
steps:
  - Run mandatory UI self-audit — verify tokens before writing code
  - Parse theme.tokens.json for brand accents (Red #DA4C00, Orange #FC7244)
  - Match icon slots and bounding box dimensions exactly to spec
  - Enforce 1.5px active line-weights, border-0 inactive states
  - Output clean React functional primitives in strict TypeScript
---

# Build Component Workflow

Construct pixel-perfect structural containers using the Fuelight 360 token system.

## 1. Mandatory UI Self-Audit

- Audit proposed classes against existing design tokens before writing code.
- Never invent padding, margins, sizes, colors, or properties not in specs.
- If a conflict arises, flag it — don't guess.

## 2. Color & State Matrix

- **Active nav container & badges:** `#DA4C00` red fill, white text. No left border line.
- **Inactive sidebar text:** Dark charcoal (`#333333`) on pure white (`#FFFFFF`) background.
- **Theme toggles (Light/Dark/Auto):** `#F6F5F3` background, dark charcoal text/icons.
- **Sidebar background (Light Mode):** Pure white `#FFFFFF` exclusively.

## 3. Iconography & Bounding Boxes

- Match exact Figma bounding box dimensions for all icon wrappers.
- Never downscale or guess fallback sizes for missing vectors.
- Build the exact layout slot wrapper to preserve alignment if SVG is missing.

## 4. Borders, Radius & Line-Weights

- **Structural panels:** Square-edged (`rounded-none`). No rounded corners on full-height side panels or split containers.
- **Active controls:** `1.5px` border — `#FC7244` for tabs, gradient for button groups.
- **Inactive controls:** `border-0` — completely stripped.
- **Uniform corners:** All buttons in a control group share the same `rounded-[8px]`.
