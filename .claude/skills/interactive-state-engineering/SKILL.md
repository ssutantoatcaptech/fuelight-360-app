---
name: interactive-state-engineering
description: Enforce the binary border rule (1.5px active, border-0 inactive) and consistent bounding geometry across states.
---

# Interactive State Engineering

Controls must follow a strict binary border system with zero geometry shift between states.

## Rules

- **Active States:** Apply a strict `1.5px` layout border.
  - Use `TCCCRainbowAngled` gradient for segmented button controls.
  - Use `#FC7244` (via token) for sub-navigation tabs.
- **Inactive States:** Completely strip borders using `border-0`.
- **Disabled States:** Set `opacity-70` on disabled elements, `opacity-100` on live actionable elements.
- Maintain identical corner radii and bounding boxes across active, inactive, and disabled states to prevent UI shifting.

## How to apply

When building any interactive component (buttons, tabs, toggles, nav items):
1. Define the shared geometry (radius, padding, height) once.
2. Toggle only border-width and border-color between states.
3. Never change padding or dimensions to compensate for border changes.
