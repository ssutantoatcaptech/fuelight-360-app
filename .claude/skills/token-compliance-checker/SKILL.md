---
name: check-tokens
description: Scan component files for raw hex codes that violate the semantic token rule (CLAUDE.md §2).
---

# Token Compliance Checker

Enforces the rule: "Raw hex codes are strictly prohibited within application frontend component files."

## Usage

```bash
node .claude/skills/token-compliance-checker/check-tokens.mjs
```

## What it checks

- Scans all `.tsx`, `.ts`, `.jsx`, and `.css` files under `src/`
- Skips `src/index.css` (token definitions) and `ThemeContext.tsx` (theme wiring)
- Skips hex values inside comments
- Allows `#fff`/`#000` (universal values)
- Reports line number, column, the offending hex, and suggests the correct token

## Exit codes

- `0` — No violations found
- `1` — One or more raw hex violations detected

## When to run

- Before committing component changes
- As part of a pre-commit hook
- When reviewing PRs that touch `src/components/`
