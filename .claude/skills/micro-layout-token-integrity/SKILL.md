---
name: micro-layout-token-integrity
description: Enforce that every color, radius, and spacing value maps to a CSS variable from project/tokens/base.css with no hardcoded hex.
---

# Micro-Layout & Token Integrity

Every visual property must trace back to a design token.

## Rules

- All color, border-radius, and spacing values must map to a CSS variable from `project/tokens/base.css`.
- Wrap tokens in Tailwind arbitrary values: `bg-[var(--primitive-blue-500)]` or `rounded-[var(--primitive-border-radius-lg)]`.
- Never invent hardcoded hex values or arbitrary pixels outside the design tokens.
- Vector assets and icons must precisely mirror Figma bounding box dimensions (e.g., `w-[36px] h-[36px]`).
- Do not downscale or guess fallback padding for icon containers.

## How to apply

Before writing or reviewing any component code:
1. Confirm every color class references a `var(--*)` token.
2. Confirm every spacing/sizing value exists in `project/tokens/base.css`.
3. Cross-check icon wrapper dimensions against the Figma source frame.
