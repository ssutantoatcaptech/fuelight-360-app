# Fuelight 360

A high-density data analytics workspace for performance analysis, ledger grids, and budget allocation matrices.

## Tech Stack

- **Framework:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4
- **Tokens:** DTCG standard (`theme.tokens.json` — single source of truth)

## Project Structure

```
fuelight-360/
├── blueprints/              # View layout specs (shared with all AI tools)
├── skills/                  # Build workflows (shared with all AI tools)
├── .claude/skills/          # Claude Code-specific validators
├── src/
│   ├── design-system/
│   │   ├── styles/          # Generated token layers (DO NOT EDIT)
│   │   ├── components/      # .fl-* CSS classes
│   │   └── index.css        # Entry point
│   ├── assets/icons/        # Canonical SVG icon set
│   ├── components/          # Application view components
│   ├── data/                # Static data (taxonomy, etc.)
│   └── index.css            # Tailwind + utility classes only
├── theme.tokens.json        # SINGLE SOURCE OF TRUTH (Figma export)
└── build-token.js           # Generates all style files
```

## Design System

The design system lives entirely within this repository. No external packages or cross-repo linking required.

### Token Pipeline

```
theme.tokens.json (Figma export)
        │
     build-token.js
        │
        ├── primitives.css   (--primitive-*, --tccc*, --desktop-*)
        ├── light.css        (--light-* component tokens)
        ├── dark.css         (--dark-* component tokens)
        └── aliases.css      (short names → light/dark + spacing/typography/radii)
```

### Commands

```bash
npm install            # Install dependencies
npm run dev            # Start dev server
npm run build          # Production build
node build-token.js   # Regenerate design system styles from theme.tokens.json
```

## Dark Mode

Automatic via `[data-theme="dark"]` on the root element. The `aliases.css` layer remaps all short token names to their `--dark-*` equivalents. No manual dark mode maintenance required.
