import fs from 'fs';

const tokensRaw = JSON.parse(fs.readFileSync('./theme.tokens.json', 'utf8'));

const primitives = [];
const lightVars = [];
const darkVars = [];

function parseTokens(obj, currentPath = []) {
  for (const key in obj) {
    if (key === '$extensions') continue;
    const current = obj[key];
    const newPath = [...currentPath, key];

    if (current && current.hasOwnProperty('$value')) {
      const varName = newPath
        .join('-')
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '')
        .replace(/^primitive-tccc/, 'tccc')
        .replace(/^brand-palette-tccc/, 'tccc');

      let finalValue = current.$value;
      if (current.$type === 'color' && typeof finalValue === 'object') {
        finalValue = finalValue.hex || '#000000';
      }
      if (typeof finalValue === 'string' && finalValue.startsWith('{') && finalValue.endsWith('}')) {
        return;
      }
      if (current.$type === 'number' && typeof finalValue === 'number') {
        if (!newPath.includes('opacity')) {
          finalValue = `${finalValue}px`;
        }
      }

      const line = `  --${varName}: ${finalValue};`;

      if (varName.startsWith('light-')) {
        lightVars.push(line);
      } else if (varName.startsWith('dark-')) {
        darkVars.push(line);
      } else {
        primitives.push(line);
      }
    } else if (typeof current === 'object' && current !== null) {
      parseTokens(current, newPath);
    }
  }
}

parseTokens(tokensRaw);

// --- Generate alias mappings ---
// Maps short names consumed by DS components and app code → light/dark token references

const ALIAS_MAP = {
  // Containers — light values defined in @theme (index.css), only dark mapped here

  // Brand
  'color-brand-primary': 'light-brand-primary-main',
  'color-brand-primary-dim': 'light-brand-primary-dim',
  'color-brand-primary-dim-low': 'light-brand-primary-dim-low',
  'color-tccc-orange-600': 'light-border-tabs-selected',
  'color-tccc-orange-400': 'light-border-tabs-selected',
  'color-tccc-red-500': 'light-system-error-lit',

  // Text
  'color-text-header': 'light-text-global-header',
  'color-text-disabled': 'light-text-global-disabled',
  'color-text-contrast': 'light-text-global-contrast',
  'color-text-tab-selected': 'light-text-tabs-selected',
  'color-text-tab-default': 'light-text-tabs-default',

  // Tabs
  'color-tab-active-text': 'light-text-tabs-selected',
  'color-tab-active-border': 'light-border-tabs-selected',

  // Buttons
  'color-button-accent-bg': 'light-background-button-accent-default',
  'color-button-accent-text': 'light-text-button-accent-default',
  'color-button-default-bg': 'light-background-button-secondary-default',
  'color-button-default-text': 'light-text-button-secondary-default',
  'color-button-inactive-border': 'light-border-container-weak',

  // Table
  'color-table-surface': 'light-background-table-cellflat',
  'color-table-header': 'light-text-table-header',
  'color-table-cell': 'light-text-table-cell',
  'color-table-border': 'light-border-table-cell',
  'color-table-row-raised': 'light-background-table-cellraised',
  'color-table-header-raised': 'light-background-table-headerraised',
  'color-table-header-raised-highest': 'light-background-table-headerraised-highest',
  'color-table-cell-raised-high': 'light-background-table-cellraised-high',
  'color-table-cell-raised': 'light-background-table-cellraised',

  // Error
  'color-error': 'light-system-error-main',

  // Surfaces
  'color-bg-card': 'light-background-container-flat',
  'color-bg-default': 'light-background-container-flat',
  'color-bg-elevated': 'light-background-container-raised',
  'color-bg-hover': 'light-background-menu-hover',
  'color-bg-hover-alt': 'light-background-input-hover',
  'color-bg-muted': 'light-background-container-disabled',
  'color-bg-nav': 'light-background-sidebar-default',
  'color-bg-page': 'light-background-container-sunken1',
  'color-bg-pressed': 'light-background-input-focus',
  'color-bg-subtle': 'light-background-button-secondary-default',
  'color-page-bg': 'light-background-container-sunken1',
  'color-modal-bg': 'light-background-modal-default',
  'color-modal-border': 'light-border-modal-default',
  'color-filter-bar-bg': 'light-background-container-sunken1',
  'color-data-grid-bg': 'light-background-table-cellflat',
  'color-data-grid-header-bg': 'light-background-table-headerflat',
  'color-data-grid-locked-bg': 'light-background-table-cellraised',
  'color-data-grid-row-hover': 'light-background-menu-hover',
  'color-snapshot-card-bg': 'light-background-container-flat',
  'color-tooltip-bg-dark': 'light-background-container-contrast',
  'color-mode-active-bg': 'light-background-toggle-on',
  'color-disabled-bg': 'light-background-container-disabled',
  'color-card-hover-bg': 'light-background-menu-hover',
  'color-card-selected-bg': 'light-background-menu-selected',
  'color-filter-apply-hover': 'light-background-button-primary-hover',

  // Sidebar
  'color-sidebar-bg': 'light-background-sidebar-default',
  'color-sidebar-hover-bg': 'light-background-sidebar-hover',
  'color-sidebar-selected-bg': 'light-background-sidebar-selected',
  'color-sidebar-border': 'light-border-sidebar-default',
  'color-sidebar-text': 'light-text-sidebar-default',
  'color-sidebar-text-selected': 'light-text-sidebar-selected',
  'color-sidebar-icon': 'light-icon-sidebar-default',
  'color-sidebar-item-selected': 'light-background-sidebar-selected',
  'color-sidebar-toggle-bg': 'light-background-container-sunken1',
  'color-sidebar-toggle-active': 'light-background-container-flat',
  'color-sidebar-notification': 'light-icon-sidebar-notification',
  'color-sidebar-badge-text': 'light-text-badge-default',

  // Buttons / CTA
  'color-cta': 'light-background-button-primary-default',
  'color-cta-hover': 'light-background-button-primary-hover',
  'color-cta-border': 'light-border-button-primary-default',
  'color-primary': 'light-brand-primary-main',
  'color-primary-bg': 'light-background-button-primary-default',
  'color-primary-dark': 'light-brand-primary-dim',
  'color-button-primary-bg': 'light-background-button-primary-default',
  'color-button-primary-border': 'light-border-button-primary-default',
  'color-button-primary-text': 'light-text-button-primary-default',

  // Borders
  'color-border-default': 'light-border-container-weak',
  'color-border-subtle': 'light-border-container-weak',
  'color-border-normal': 'light-border-container-normal',
  'color-border-strong': 'light-border-container-strong',
  'color-border-weak': 'light-border-container-weak',
  'color-border-active': 'light-border-input-selected',
  'color-border-button': 'light-border-button-secondary-default',
  'color-border-card-hover': 'light-border-menu-selected',
  'color-border-container-contrast': 'light-border-container-contrast',
  'color-border-dark': 'light-border-container-normal',
  'color-border-dark-subtle': 'light-border-container-weak',
  'color-border-disabled': 'light-border-container-disabled',
  'color-border-hover-dark': 'light-border-input-hover',
  'color-border-input': 'light-border-input-default',
  'color-border-input-hover': 'light-border-input-hover',
  'color-border-input-selected': 'light-border-input-selected',
  'color-disabled-border': 'light-border-container-disabled',

  // Input
  'color-input-bg': 'light-background-input-default',
  'color-input-hover-bg': 'light-background-input-hover',
  'color-input-focus-bg': 'light-background-input-focus',
  'color-input-focus-alt-bg': 'light-background-input-focus-alt',
  'color-input-filled-bg': 'light-background-input-filled',
  'color-input-disabled-bg': 'light-background-input-disabled',
  'color-input-dark-bg': 'light-background-input-default',
  'color-input-success-bg': 'light-background-input-success',
  'color-input-error-bg': 'light-background-input-error',
  'color-input-upload-bg': 'light-background-input-upload',

  // Radio
  'color-radio-bg': 'light-background-input-default',
  'color-radio-border': 'light-border-input-default',
  'color-radio-border-hover': 'light-border-input-hover',
  'color-radio-dot': 'light-brand-primary-main',
  'color-radio-dot-disabled': 'light-background-container-disabled',

  // Datepicker / Calendar
  'color-datepicker-hover': 'light-background-datepicker-hover',
  'color-datepicker-selected': 'light-background-datepicker-selected',
  'color-datepicker-range': 'light-background-datepicker-range',
  'color-datepicker-range-bg': 'light-background-datepicker-range',
  'color-calendar-hover': 'light-background-datepicker-hover',
  'color-calendar-range': 'light-background-datepicker-range',

  // Text
  'color-text-body': 'light-text-global-body',
  'color-text-default': 'light-text-global-body',
  'color-text-strong': 'light-text-global-header',
  'color-text-muted': 'light-text-global-disabled',
  'color-text-muted-dark': 'light-text-global-caption',
  'color-text-caption': 'light-text-global-caption',
  'color-text-disabled-dark': 'light-text-global-disabled',
  'color-text-placeholder': 'light-text-global-placeholder',
  'color-text-primary': 'light-brand-primary-main',
  'color-text-secondary': 'light-text-global-caption',
  'color-text-inverse': 'light-text-global-contrast',
  'color-text-inverted': 'light-text-global-contrast',
  'color-text-component': 'light-text-global-body',
  'color-text-error-value': 'light-system-error-main',
  'color-text-success-value': 'light-system-success-main',
  'color-modal-header-text': 'light-text-modal-header',
  'color-modal-description-text': 'light-text-modal-description',

  // Status / Semantic
  'color-success': 'light-system-success-main',
  'color-success-bg': 'light-background-container-success-lit',
  'color-success-bg-alt': 'light-background-container-success-dim',
  'color-success-border': 'light-border-input-success',
  'color-success-dark': 'light-system-success-dim',
  'color-success-text': 'light-system-success-main',
  'color-danger': 'light-system-error-main',
  'color-danger-bg': 'light-background-container-error-lit',
  'color-danger-bg-strong': 'light-background-container-error-dim',
  'color-danger-dark': 'light-system-error-dim',
  'color-danger-text': 'light-system-error-main',
  'color-warning': 'light-system-warning-main',
  'color-warning-bg': 'light-background-container-warning-lit',
  'color-info': 'light-background-container-info-dim',
  'color-info-bg': 'light-background-container-success-lit',
  'color-delta-positive': 'light-system-success-main',
  'color-delta-negative': 'light-system-error-main',

  // Charts
  'color-chart-bar-primary': 'light-brand-primary-main',
  'color-chart-bar-secondary': 'light-brand-accent-main',
  'color-chart-positive': 'light-system-success-main',
  'color-chart-negative': 'light-system-error-main',
  'color-chart-neutral': 'light-background-charts-default',
  'color-chart-bg': 'light-background-container-flat',
  'color-chart-bar-baseline': 'light-background-charts-default',
  'color-chart-bar-negative': 'light-system-error-lit',
  'color-chart-bar-investment': 'light-brand-accent-dim',
  'color-chart-bar-contribution': 'light-brand-primary-dim',
  'color-chart-comparison-investment': 'light-brand-accent-lit',
  'color-chart-comparison-contribution': 'light-brand-primary-lit-high',

  // Tags
  'color-tag-primary-bg': 'light-background-tag-primary',
  'color-tag-secondary-bg': 'light-background-tag-secondary',
  'color-tag-tertiary-bg': 'light-background-tag-tertiary',
  'color-tag-chip-bg': 'light-background-tag-primary',
  'color-tag-chip-secondary-bg': 'light-background-tag-tertiary',
  'color-tag-selected-bg': 'light-background-tag-secondary',
  'color-tag-text': 'light-text-tag-default',
  'color-status-default-bg': 'light-background-tag-tertiary',
  'color-status-default-text': 'light-text-tag-default',
  'color-status-edited-bg': 'light-background-tag-secondary',
  'color-status-edited-text': 'light-text-tag-secondary',
};

// Non-color aliases (spacing, typography, sizing, effects)
const STATIC_ALIASES = `
  /* Typography */
  --font-family-primary: var(--desktop-font-family-body);
  --font-body: var(--desktop-font-family-body);
  --font-title: var(--desktop-font-family-title);
  --font-size-micro: 8px;
  --font-size-xs: 10px;
  --font-size-caption: var(--desktop-font-size-sm);
  --font-size-body-sm: var(--desktop-font-size-sm);
  --font-size-body: var(--desktop-font-size-base);
  --font-size-body-lg: var(--desktop-font-size-lg);
  --font-size-sm: var(--desktop-font-size-sm);
  --font-size-lg: var(--desktop-font-size-lg);
  --font-size-title: var(--desktop-font-size-xl);
  --font-size-xl: var(--desktop-font-size-2xl);
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --line-height-tight: 1.25;
  --line-height-body: 1.5;
  --line-height-caption: 1.4;
  --line-height-title: 1.2;
  --letter-spacing-tight: -0.01em;
  --letter-spacing-wide: 0.02em;
  --letter-spacing-wider: 0.04em;

  /* Spacing */
  --space-1: var(--primitive-padding-spacing-size-1);
  --space-2: var(--primitive-padding-spacing-size-2);
  --space-3: var(--primitive-padding-spacing-size-3);
  --space-4: var(--primitive-padding-spacing-size-4);
  --space-5: var(--primitive-padding-spacing-size-5);
  --space-6: var(--primitive-padding-spacing-size-6);
  --space-7: var(--primitive-padding-spacing-size-7);
  --space-10: var(--primitive-padding-spacing-size-10);
  --spacing-1: var(--primitive-padding-spacing-size-1);
  --spacing-2: var(--primitive-padding-spacing-size-2);
  --spacing-3: var(--primitive-padding-spacing-size-3);
  --spacing-4: var(--primitive-padding-spacing-size-4);
  --spacing-5: var(--primitive-padding-spacing-size-5);
  --spacing-6: var(--primitive-padding-spacing-size-6);
  --spacing-8: var(--primitive-padding-spacing-size-8);
  --spacing-badge-horizontal: var(--desktop-padding-badge-horizontal-sm);
  --spacing-button-horizontal: var(--desktop-padding-button-horizontal-md);
  --spacing-button-horizontal-sm: var(--desktop-padding-button-horizontal-sm);
  --spacing-input-horizontal: var(--desktop-padding-input-horizontal-sm);
  --spacing-input-horizontal-md: var(--desktop-padding-input-horizontal-md);
  --spacing-input-between: var(--desktop-padding-input-horizontal-between-sm);
  --spacing-menu-vertical: var(--desktop-padding-menu-vertical-sm);
  --spacing-modal-horizontal: var(--desktop-padding-modal-horizontal);
  --spacing-modal-vertical: var(--desktop-padding-modal-vertical);
  --spacing-sidebar-horizontal: var(--desktop-padding-sidebar-horizontal-md);
  --spacing-sidebar-between: var(--desktop-padding-sidebar-horizontal-between-md);
  --spacing-sidebar-vertical: var(--desktop-padding-sidebar-vertical-md);
  --spacing-sidebar-vertical-xl: var(--desktop-padding-sidebar-vertical-xl);
  --spacing-tag-horizontal: var(--desktop-padding-tag-horizontal);
  --spacing-tag-between: var(--desktop-padding-tag-horizontal-between);
  --spacing-toggle-vertical: var(--desktop-padding-toggle-vertical-between-sm);

  /* Radii */
  --radius-xs: 2px;
  --radius-sm: var(--primitive-border-radius-rounded);
  --radius-md: var(--primitive-border-radius-rounded-md);
  --radius-lg: var(--primitive-border-radius-rounded-lg);
  --radius-xl: var(--primitive-border-radius-rounded-xl);
  --radius-full: var(--primitive-border-radius-rounded-full);
  --radius-badge: var(--desktop-border-radius-badge-rounded);
  --radius-button-sm: var(--desktop-border-radius-button-sm);
  --radius-button-md: var(--desktop-border-radius-button-md);
  --radius-container: var(--desktop-border-radius-container-rounded-sm);
  --radius-input: var(--desktop-border-radius-input-sm);
  --radius-input-xs: var(--desktop-border-radius-input-xs);
  --radius-input-md: var(--desktop-border-radius-input-md);
  --radius-modal: var(--desktop-border-radius-modal-default);
  --radius-pill: var(--primitive-border-radius-rounded-full);
  --radius-sidebar: var(--desktop-border-radius-sidebar-rounded-lg);

  /* Sizing */
  --size-radio: var(--desktop-size-radio-height);
  --size-tag-sm: var(--desktop-size-tag-height-sm);
  --size-tag-md: var(--desktop-size-tag-height-md);

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --duration-fast: 100ms;
  --duration-normal: 150ms;
  --duration-medium: 200ms;
  --duration-slow: 300ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);

  /* Effects */
  --effect-tcccrainbowangled: linear-gradient(135deg, #F40008, #FFA000, #6ED578, #64BEC2);
  --color-rainbow-stop-1: #F40008;
  --color-rainbow-stop-2: #FFA000;
  --color-rainbow-stop-3: #6ED578;
  --color-rainbow-stop-4: #64BEC2;

  /* Chart (app-specific, not in Figma token export) */
  --color-chart-divider: #C7C4C1;
  --color-chart-line-investment: #C48300;
  --color-chart-line-contribution: #2E93A4;
  --color-input-border: var(--light-border-input-default);
`;

// Build the aliases.css content
function buildAliases() {
  let lightAliases = [];
  let darkAliases = [];

  for (const [shortName, lightRef] of Object.entries(ALIAS_MAP)) {
    lightAliases.push(`  --${shortName}: var(--${lightRef});`);
    const darkRef = lightRef.replace(/^light-/, 'dark-');
    darkAliases.push(`  --${shortName}: var(--${darkRef});`);
  }

  return `/* AUTO-GENERATED — DO NOT EDIT MANUALLY */
/* Alias layer: maps short token names to the light/dark token layers */

:root {
${lightAliases.join('\n')}

${STATIC_ALIASES}
}

[data-theme="dark"] {
${darkAliases.join('\n')}

  /* ═══ TRUE DARK MODE OVERRIDES ═══
     Figma dark tokens use white/light values for interactive surfaces (buttons, sidebar, inputs, tables).
     These overrides enforce a consistent dark theme across all UI elements. */

  /* Containers */
  --color-container-flat: #1A1A1A;
  --color-container-sunken1: #141414;
  --color-container-sunken2: #111111;
  --color-container-sunken3: #0E0E0E;
  --color-container-sunken4: #1F1F1F;
  --color-container-sunken5: #0A0A0A;
  --color-container-sunken6: #0A0A0A;
  --color-container-contrast: #E2E1DF;

  /* Sidebar — mirrors light mode structure: bg is base, selected uses brand accent */
  --color-sidebar-bg: #141414;
  --color-sidebar-hover-bg: #1F1F1F;
  --color-sidebar-selected-bg: #DA4C00;
  --color-sidebar-border: #2A2A2A;
  --color-sidebar-text: #B3B0AB;
  --color-sidebar-text-selected: #FFFFFF;
  --color-sidebar-icon: #B3B0AB;
  --color-sidebar-item-selected: #DA4C00;
  --color-sidebar-toggle-bg: #1A1A1A;
  --color-sidebar-toggle-active: #252525;
  --color-sidebar-notification: #6AC9CE;
  --color-sidebar-badge-text: #FFFFFF;

  /* Text */
  --color-text-body: #C7C4C1;
  --color-text-header: #E8E6E3;
  --color-text-caption: #8E8781;
  --color-text-disabled: #5A5550;
  --color-text-contrast: #111111;
  --color-text-placeholder: #5A5550;
  --color-text-default: #C7C4C1;
  --color-text-strong: #E8E6E3;
  --color-text-muted: #5A5550;
  --color-text-muted-dark: #8E8781;
  --color-text-primary: #40B8C5;
  --color-text-secondary: #8E8781;
  --color-text-inverse: #111111;
  --color-text-inverted: #111111;
  --color-text-component: #C7C4C1;
  --color-text-error-value: #F87171;
  --color-text-success-value: #6EE7B7;
  --color-text-tab-selected: #FFFFFF;
  --color-text-tab-default: #8E8781;
  --color-modal-header-text: #E8E6E3;
  --color-modal-description-text: #A0A0A0;

  /* Inputs */
  --color-input-bg: #1F1F1F;
  --color-input-border: #3A3A3A;
  --color-input-hover-bg: #252525;
  --color-input-focus-bg: #252525;
  --color-input-filled-bg: #1F1F1F;
  --color-input-disabled-bg: #141414;
  --color-input-dark-bg: #141414;
  --color-input-success-bg: #0F2922;
  --color-input-error-bg: #2D1414;
  --color-input-upload-bg: #141E2E;

  /* Borders */
  --color-border-default: #2A2A2A;
  --color-border-subtle: #222222;
  --color-border-normal: #3A3A3A;
  --color-border-strong: #555555;
  --color-border-weak: #222222;
  --color-border-active: #40B8C5;
  --color-border-button: #3A3A3A;
  --color-border-card-hover: #40B8C5;
  --color-border-container-contrast: #555555;
  --color-border-dark: #3A3A3A;
  --color-border-dark-subtle: #222222;
  --color-border-disabled: #1A1A1A;
  --color-border-hover-dark: #4A4A4A;
  --color-border-input: #3A3A3A;
  --color-border-input-hover: #4A4A4A;
  --color-border-input-selected: #40B8C5;
  --color-disabled-border: #1A1A1A;

  /* Buttons */
  --color-button-accent-bg: #1F1F1F;
  --color-button-accent-text: #E8E6E3;
  --color-button-default-bg: #1A1A1A;
  --color-button-default-text: #A0A0A0;
  --color-button-inactive-border: #2A2A2A;
  --color-button-primary-bg: #40B8C5;
  --color-button-primary-border: #40B8C5;
  --color-button-primary-text: #FFFFFF;
  --color-cta: #40B8C5;
  --color-cta-hover: #6AC9CE;
  --color-cta-border: #40B8C5;
  --color-primary: #40B8C5;
  --color-primary-bg: #40B8C5;
  --color-primary-dark: #2E93A4;

  /* Tabs */
  --color-tab-active-text: #FFFFFF;
  --color-tab-active-border: #40B8C5;

  /* Table */
  --color-table-surface: #141414;
  --color-table-header: #A0A0A0;
  --color-table-cell: #C7C4C1;
  --color-table-border: #2A2A2A;
  --color-table-row-raised: #1A1A1A;
  --color-table-header-raised: #1F1F1F;
  --color-table-header-raised-highest: #252525;
  --color-table-cell-raised-high: #1F1F1F;
  --color-table-cell-raised: #1A1A1A;
  --color-data-grid-bg: #141414;
  --color-data-grid-header-bg: #1A1A1A;
  --color-data-grid-locked-bg: #1F1F1F;
  --color-data-grid-row-hover: #252525;

  /* Surfaces */
  --color-bg-card: #1A1A1A;
  --color-bg-default: #111111;
  --color-bg-page: #0A0A0A;
  --color-page-bg: #0A0A0A;
  --color-bg-elevated: #1F1F1F;
  --color-bg-hover: #252525;
  --color-bg-hover-alt: #1F1F1F;
  --color-bg-muted: #141414;
  --color-bg-nav: #111111;
  --color-bg-pressed: #2A2A2A;
  --color-bg-subtle: #1A1A1A;
  --color-filter-bar-bg: #141414;
  --color-modal-bg: #1A1A1A;
  --color-modal-border: #2A2A2A;
  --color-snapshot-card-bg: #1A1A1A;
  --color-tooltip-bg-dark: #E2E1DF;
  --color-disabled-bg: #141414;
  --color-card-hover-bg: #252525;
  --color-card-selected-bg: #2A2A2A;

  /* Radio */
  --color-radio-bg: #1F1F1F;
  --color-radio-border: #3A3A3A;
  --color-radio-border-hover: #4A4A4A;
  --color-radio-dot: #40B8C5;
  --color-radio-dot-disabled: #2A2A2A;

  /* Datepicker */
  --color-datepicker-hover: #252525;
  --color-datepicker-selected: #1A3A3A;
  --color-datepicker-range: #1A2E2E;
  --color-datepicker-range-bg: #1A2E2E;
  --color-calendar-hover: #252525;
  --color-calendar-range: #1A2E2E;

  /* Status */
  --color-success: #6EE7B7;
  --color-success-bg: #0F2922;
  --color-success-bg-alt: #0A1F19;
  --color-success-border: #1A4A3A;
  --color-success-dark: #34D399;
  --color-success-text: #6EE7B7;
  --color-error: #F87171;
  --color-danger: #F87171;
  --color-danger-bg: #2D1414;
  --color-danger-bg-strong: #3D1A1A;
  --color-danger-dark: #EF4444;
  --color-danger-text: #F87171;
  --color-warning: #FBBF24;
  --color-warning-bg: #2D2205;
  --color-delta-positive: #6EE7B7;
  --color-delta-negative: #F87171;

  /* Tags */
  --color-tag-primary-bg: #1A2E2E;
  --color-tag-secondary-bg: #252525;
  --color-tag-tertiary-bg: #1F1F1F;
  --color-tag-chip-bg: #1A2E2E;
  --color-tag-chip-secondary-bg: #1F1F1F;
  --color-tag-selected-bg: #252525;
  --color-tag-text: #C7C4C1;
  --color-status-default-bg: #1F1F1F;
  --color-status-default-text: #A0A0A0;
  --color-status-edited-bg: #252525;
  --color-status-edited-text: #C7C4C1;

  /* Misc overrides */
  --color-info-bg: #0F2922;
  --color-info: #1A3A3A;
  --color-input-focus-alt-bg: #252525;
  --color-mode-active-bg: #40B8C5;

  /* Charts */
  --color-chart-bg: #141414;
  --color-chart-bar-primary: #40B8C5;
  --color-chart-bar-secondary: #C48300;
  --color-chart-positive: #6EE7B7;
  --color-chart-negative: #F87171;
  --color-chart-neutral: #3A3A3A;
  --color-chart-bar-baseline: #3A3A3A;
  --color-chart-bar-negative: #7F1D1D;
  --color-chart-bar-investment: #5A3E00;
  --color-chart-bar-contribution: #1A4A50;
  --color-chart-comparison-investment: #3D2A00;
  --color-chart-comparison-contribution: #0F3A40;
  --color-chart-divider: #3A3A3A;
  --color-chart-line-investment: #C48300;
  --color-chart-line-contribution: #40B8C5;
}
`;
}

// Write all 4 files
const outputDir = './src/design-system/styles';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(`${outputDir}/primitives.css`,
  `/* AUTO-GENERATED — DO NOT EDIT MANUALLY */\n/* Primitive tokens from theme.tokens.json */\n\n:root {\n${primitives.join('\n')}\n}\n`
);

fs.writeFileSync(`${outputDir}/light.css`,
  `/* AUTO-GENERATED — DO NOT EDIT MANUALLY */\n/* Light mode component tokens from theme.tokens.json */\n\n:root {\n${lightVars.join('\n')}\n}\n`
);

fs.writeFileSync(`${outputDir}/dark.css`,
  `/* AUTO-GENERATED — DO NOT EDIT MANUALLY */\n/* Dark mode component tokens from theme.tokens.json */\n\n:root {\n${darkVars.join('\n')}\n}\n`
);

fs.writeFileSync(`${outputDir}/aliases.css`, buildAliases());

console.log(` Done! Generated 4 files in ${outputDir}/`);
console.log(`   primitives.css — ${primitives.length} vars`);
console.log(`   light.css      — ${lightVars.length} vars`);
console.log(`   dark.css       — ${darkVars.length} vars`);
console.log(`   aliases.css    — ${Object.keys(ALIAS_MAP).length} color aliases + static aliases`);
