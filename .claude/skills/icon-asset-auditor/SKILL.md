---
name: check-icons
description: Verify all Icon component usages reference approved SVG filenames from the design system library.
---

# Icon Asset Auditor

Validates that every `<Icon name="...">` in the codebase maps to an actual SVG in `src/assets/icons/`.

## Usage

```bash
node .claude/skills/icon-asset-auditor/check-icons.mjs
```

## What it checks

- Scans all `.tsx`/`.ts`/`.jsx` files under `src/`
- Extracts icon names from `<Icon name="...">` JSX patterns
- Cross-references against the 37 approved SVGs in `src/assets/icons/`
- Reports invalid names with Levenshtein-based "did you mean?" suggestions
- Lists unused icons (available but not referenced anywhere)

## Exit codes

- `0` — All icon references are valid
- `1` — Invalid icon name(s) detected
- `2` — Icons directory not found
