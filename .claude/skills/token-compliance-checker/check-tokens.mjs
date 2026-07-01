#!/usr/bin/env node

/**
 * Token Compliance Checker
 * Scans component files for raw hex codes that should use semantic CSS variables.
 * Enforces CLAUDE.md Section 2: "Raw hex codes are strictly prohibited within
 * application frontend component files."
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, extname } from "path";

const SRC_DIR = new URL("../../../src", import.meta.url).pathname;

// Files to scan (React components and CSS)
const SCAN_EXTENSIONS = new Set([".tsx", ".ts", ".jsx", ".css"]);

// Files/dirs to skip
const SKIP_PATTERNS = [
  /node_modules/,
  /\.d\.ts$/,
  /index\.css$/, // Token definition file — hex is expected here
  /ThemeContext\.tsx$/, // Theme wiring — may reference hex for context setup
];

// Hex pattern: matches #RGB, #RRGGBB, #RRGGBBAA (case-insensitive)
const HEX_REGEX = /(?<![&\w])#(?:[0-9a-fA-F]{3}){1,2}(?:[0-9a-fA-F]{2})?\b/g;

// Known exceptions: hex values that are allowed (e.g., in comments, SVG currentColor refs)
const ALLOWED_HEX = new Set([
  "#fff", "#FFF", "#ffffff", "#FFFFFF",
  "#000", "#000000",
]);

// Context patterns where hex is acceptable
const ALLOWED_CONTEXT_PATTERNS = [
  /\/\/.*#[0-9a-fA-F]/, // Single-line comments
  /\/\*[\s\S]*?\*\//, // Multi-line comments (handled per-line below)
  /mask:/, // CSS mask property uses hex in gradients legitimately
  /-webkit-mask/, // Same for webkit prefix
];

function shouldSkip(filePath) {
  return SKIP_PATTERNS.some((pattern) => pattern.test(filePath));
}

function isInComment(line) {
  const trimmed = line.trim();
  return trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*");
}

function isInAllowedContext(line) {
  return ALLOWED_CONTEXT_PATTERNS.some((pattern) => pattern.test(line));
}

function scanFile(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const violations = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (isInComment(line) || isInAllowedContext(line)) continue;

    let match;
    HEX_REGEX.lastIndex = 0;
    while ((match = HEX_REGEX.exec(line)) !== null) {
      const hex = match[0].toLowerCase();
      if (ALLOWED_HEX.has(hex)) continue;

      // Skip if inside a template literal comment or import
      if (line.includes("import ") || line.includes("require(")) continue;

      violations.push({
        file: relative(join(SRC_DIR, ".."), filePath),
        line: i + 1,
        column: match.index + 1,
        hex: match[0],
        context: line.trim().substring(0, 100),
      });
    }
  }

  return violations;
}

function walkDir(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (SCAN_EXTENSIONS.has(extname(fullPath))) {
      files.push(fullPath);
    }
  }
  return files;
}

// Suggested replacements mapping common hex to token names
const HEX_TO_TOKEN = {
  "#f8f7f5": "var(--color-container-sunken6)",
  "#443f3f": "var(--color-text-body) or var(--color-text-header)",
  "#4d4846": "var(--color-text-caption)",
  "#edeef1": "var(--color-container-sunken4)",
  "#c7c4c1": "var(--color-input-border)",
  "#585250": "var(--color-brand-secondary-lit)",
  "#da4c00": "var(--color-tccc-orange-600)",
  "#fc7244": "var(--color-tccc-orange-400)",
  "#f40008": "var(--color-tccc-red-500)",
  "#19b07a": "var(--color-success)",
  "#c10a00": "var(--color-error)",
  "#e2e1df": "var(--color-text-contrast)",
  "#8e8781": "var(--color-text-caption) [dark]",
  "#25272c": "var(--color-container-contrast)",
  "#f7f8f8": "var(--color-input-bg)",
  "#6ac9ce": "var(--color-tccc-aqua-500)",
  "#40b8c5": "var(--color-brand-primary)",
  "#78716c": "var(--color-text-disabled)",
  "#d1d1d1": "var(--color-button-inactive-border)",
  "#f40000": "var(--color-chart-bar-negative)",
  "#e5e3df": "var(--color-chart-bar-baseline)",
  "#1a1a1a": "var(--color-chart-bg) [dark]",
  "#101010": "var(--color-container-sunken6) [dark]",
  "#212121": "var(--color-container-sunken2) [dark]",
  "#313131": "var(--color-container-sunken4) [dark]",
  "#2d2d2d": "var(--color-input-border) [dark]",
};

function getSuggestion(hex) {
  return HEX_TO_TOKEN[hex.toLowerCase()] || null;
}

// Main
const files = walkDir(SRC_DIR).filter((f) => !shouldSkip(f));
const allViolations = [];

for (const file of files) {
  allViolations.push(...scanFile(file));
}

// Output
if (allViolations.length === 0) {
  console.log("✓ Token compliance check passed — no raw hex violations found.");
  process.exit(0);
}

console.log(`\n✗ Found ${allViolations.length} raw hex violation(s):\n`);
console.log("─".repeat(80));

for (const v of allViolations) {
  const suggestion = getSuggestion(v.hex);
  console.log(`  ${v.file}:${v.line}:${v.column}`);
  console.log(`    Hex: ${v.hex}`);
  if (suggestion) {
    console.log(`    Fix: Replace with ${suggestion}`);
  }
  console.log(`    Context: ${v.context}`);
  console.log("");
}

console.log("─".repeat(80));
console.log(`\n${allViolations.length} violation(s) in ${new Set(allViolations.map((v) => v.file)).size} file(s).`);
console.log("Rule: Raw hex codes are prohibited in component files (CLAUDE.md §2).");
console.log("Use semantic CSS variables from src/index.css instead.\n");

process.exit(1);
