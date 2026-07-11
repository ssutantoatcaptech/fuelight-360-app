---
name: prototype-logic-extraction
description: When absorbing external templates, keep only structural layout and interaction logic — strip all foreign styling and re-skin with base.css tokens.
---

# Prototype Logic Extraction

External code enters the project stripped of its visual identity.

## Rules

- When introducing external boilerplate or template code, absorb *only* the structural HTML/DOM layout and interactive JS/TS logic.
- Strip out the source template's look-and-feel completely (colors, fonts, spacing, shadows, borders).
- Immediately re-skin using CSS variables from `project/tokens/base.css`.
- No remnant classes from external frameworks (Bootstrap, Material, Chakra, etc.) should survive integration.

## How to apply

When integrating third-party code:
1. Copy the component structure and event handling logic.
2. Remove all inline styles, external CSS classes, and theme references.
3. Replace every visual property with the corresponding `var(--*)` token wrapped in Tailwind arbitrary values.
4. Verify the result renders identically to the Figma spec, not the source template.
