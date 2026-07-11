import fs from 'fs';

// Load your repository tokens file
const tokensRaw = JSON.parse(fs.readFileSync('./theme.tokens.json', 'utf8'));

let cssVariables = [];

function parseTokens(obj, currentPath = []) {
  for (const key in obj) {
    if (key === '$extensions') continue; 

    const current = obj[key];
    const newPath = [...currentPath, key];

    if (current && current.hasOwnProperty('$value')) {
      // Create a clean, lowercase CSS variable name matching your CLAUDE.md naming structure
      const varName = newPath
        .join('-')
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '')
        // Clean up formatting remnants from the underscore-prefixed objects
        .replace(/^primitive-tccc/, 'tccc')
        .replace(/^brand-palette-tccc/, 'tccc');

      let finalValue = current.$value;

      // FIX: Deep dive into the DTCG color object to pull the hex property explicitly
      if (current.$type === 'color' && typeof finalValue === 'object') {
        finalValue = finalValue.hex || '#000000';
      }

      // Skip unresolved DTCG references (e.g., "{brand-palette._TCCC Aqua.600}")
      if (typeof finalValue === 'string' && finalValue.startsWith('{') && finalValue.endsWith('}')) {
        continue;
      }

      // Format dimensions with px units matching your 4px baseline scale rules
      if (current.$type === 'number' && typeof finalValue === 'number') {
        if (!newPath.includes('opacity')) {
          finalValue = `${finalValue}px`;
        }
      }

      cssVariables.push(`  --${varName}: ${finalValue};`);
    } else if (typeof current === 'object' && current !== null) {
      parseTokens(current, newPath);
    }
  }
}

parseTokens(tokensRaw);

// Parse src/index.css to extract semantic alias tokens
const indexCSS = fs.readFileSync('./src/index.css', 'utf8');

function extractBlock(css, startMarker, endMarker) {
  const startIdx = css.indexOf(startMarker);
  if (startIdx === -1) return '';
  const searchFrom = startIdx + startMarker.length;
  let braceDepth = 0;
  let blockStart = -1;
  for (let i = searchFrom; i < css.length; i++) {
    if (css[i] === '{') {
      if (braceDepth === 0) blockStart = i + 1;
      braceDepth++;
    } else if (css[i] === '}') {
      braceDepth--;
      if (braceDepth === 0) {
        return css.slice(blockStart, i).trim();
      }
    }
  }
  return '';
}

function extractVars(block) {
  const lines = [];
  const varRegex = /^\s*(--[a-z][a-z0-9-]*)\s*:\s*(.+?)\s*;/gm;
  let match;
  while ((match = varRegex.exec(block)) !== null) {
    lines.push(`  ${match[1]}: ${match[2]};`);
  }
  return lines;
}

const themeBlock = extractBlock(indexCSS, '@theme', '');
const darkBlock = extractBlock(indexCSS, '[data-theme="dark"]', '');

const themeVars = extractVars(themeBlock);
const darkVars = extractVars(darkBlock);

let semanticSection = '';
if (themeVars.length > 0) {
  semanticSection += `\n/* ─── SEMANTIC ALIASES (blueprint-compatible) ─── */\n:root {\n${themeVars.join('\n')}\n}\n`;
}
if (darkVars.length > 0) {
  semanticSection += `\n[data-theme="dark"] {\n${darkVars.join('\n')}\n}\n`;
}

// Also extract utility classes (gradient-border, scrollbar) as-is
const utilityStart = indexCSS.indexOf('.gradient-border');
const utilityEnd = indexCSS.indexOf('[data-theme="dark"]');
let utilitySection = '';
if (utilityStart !== -1 && utilityEnd !== -1) {
  utilitySection = `\n/* ─── UTILITY CLASSES ─── */\n${indexCSS.slice(utilityStart, utilityEnd).trim()}\n`;
}

const outputCSS = `/* AUTO-GENERATED FROM REPO TOKENS - DO NOT EDIT MANUALLY */
:root {
${cssVariables.join('\n')}
}
${semanticSection}${utilitySection}`;

const outputDir = './project/tokens';
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}
fs.writeFileSync(`${outputDir}/base.css`, outputCSS);
console.log(` Done! Successfully compiled tokens to ${outputDir}/base.css`);