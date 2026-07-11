---
name: layout-anti-patterns
description: Prevent common layout mistakes — no rounded panels, flush top edges, isolated scroll containers, hardcoded sidebar tokens.
---

# Layout Anti-Patterns & Component Edge Cases

Structural rules that prevent recurring layout bugs.

## Rules

- Do NOT apply `rounded-*` utilities to full-height split side panels or data table column wrappers. Use `rounded-none`.
- Right-side workspace panels must sit flush: zero top margin (`mt-0`) and zero top padding (`pt-0`).
- Isolate horizontal multi-card sliders with `overflow-x-auto` locally. Inner slider scroll must never leak to the application shell.
- **Theme Exception:** The left sidebar uses hardcoded dark token variables (`bg-sidebar-bg`) in both light and dark themes. Do not inject `useTheme()` hooks inside sidebar sub-components.

## How to apply

Before merging any layout change:
1. Check that no panel-level container gained a border-radius.
2. Verify right panels have no top spacing pushing them below the header edge.
3. Confirm any new scrollable region is isolated with `overflow-hidden` on the parent.
4. Confirm sidebar components reference hardcoded tokens, not dynamic theme values.
