---
name: check-borders
description: Enforce the 1.5px active / border-0 inactive rule on interactive components.
---

# Border State Auditor

Enforces the binary border rule from CLAUDE.md Section 3:
- Active interactive states: exactly `1.5px` border
- Inactive interactive states: `border-0` (no border)

## Usage

```bash
node .claude/skills/border-state-auditor/check-borders.mjs
```

## What it checks

- Scans components that define active/inactive/selected states
- Verifies active states use `border-[1.5px]` (not 1px, 2px, etc.)
- Verifies inactive states use `border-0` or `border-none`
- Warns if target components (ScenarioControlStrip, ViewNavigationLayer, LeftNavigationSidebar) are missing the pattern entirely

## Exit codes

- `0` — No violations (warnings still print but don't fail)
- `1` — Active violations found (wrong border width on a state)
