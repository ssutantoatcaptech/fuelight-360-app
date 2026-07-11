---
name: responsive-navigation-rails
description: Enforce sidebar expand/collapse behavior — 320px/64px states, persistent icons, compact padding.
---

# Responsive Navigation Rails

The global sidebar transitions between exactly two fixed-width states.

## Rules

- **Expanded:** `w-[320px]` — full labels, standard padding.
- **Collapsed:** `w-[64px]` — icons only, compact padding (`px-[8px]`), text labels hidden.
- Icons must stay visible and centered in both states. Never hide layout icons on collapse.
- The active theme mode toggle chip and user avatar circle must persist in the collapsed footer.
- Transition between states must be smooth (CSS transition on width).

## How to apply

When modifying sidebar or navigation rail components:
1. Verify both width states render correctly.
2. Confirm all nav icons remain visible and centered at 64px.
3. Confirm text labels are hidden (not removed) in collapsed state.
4. Confirm footer elements (theme toggle, avatar) persist in both states.
