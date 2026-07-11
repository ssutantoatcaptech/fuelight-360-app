# Fuelight 360

A high-density data analytics workspace for performance analysis, ledger grids, and budget allocation matrices.

## Tech Stack

- **Framework:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4 with `@theme` blocks
- **Tokens:** DTCG standard (`theme.tokens.json`)

## Design System

The design system lives entirely within this repository — no external packages or cross-repo linking required.

```
src/design-system/
├── components/   # Foundational UI class-based CSS (.fl-btn, .fl-card, etc.)
├── icons/        # Custom SVG icon library
├── styles/       # Compiled token output (auto-generated)
└── index.css     # Single entry point (imported in main.tsx)
```

### Token Pipeline

Tokens are compiled from `theme.tokens.json` at the root:

```bash
node build-token.js    # Outputs src/design-system/styles/tokens.css
```

The Style Dictionary config (`sd.config.js`) can also be used for structured builds.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server
npm run build     # Production build
```

## Architecture

- `src/index.css` — Tailwind config, semantic aliases, dark mode overrides (DO NOT auto-generate into this file)
- `src/design-system/` — Self-contained design system (tokens + components + icons)
- `src/components/` — Application-specific view components
- `.claude/blueprints/` — Layout definitions per view
