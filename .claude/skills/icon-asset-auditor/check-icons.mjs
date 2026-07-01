#!/usr/bin/env node

/**
 * Icon Asset Auditor
 * Verifies that all <Icon name="..."> usages reference valid SVG filenames
 * from the approved set in src/assets/icons/.
 * Enforces CLAUDE.md Section 7 icon registry.
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, extname } from "path";

const ROOT = new URL("../../..", import.meta.url).pathname;
const SRC_DIR = join(ROOT, "src");
const ICONS_DIR = join(SRC_DIR, "assets/icons");

// Build the approved icon registry from filesystem
function getApprovedIcons() {
  try {
    return readdirSync(ICONS_DIR)
      .filter((f) => f.endsWith(".svg"))
      .map((f) => f.replace(".svg", ""));
  } catch {
    console.error(`✗ Icons directory not found at ${ICONS_DIR}`);
    process.exit(2);
  }
}

// Patterns that reference icon names in code
const ICON_PATTERNS = [
  /(?:<Icon\s[^>]*name=["'])([^"']+)["']/g, // <Icon name="xyz"
  /(?:<Icon\s[^>]*name=\{["'])([^"']+)["']\}/g, // <Icon name={"xyz"}
  /icon:\s*["']([^"']+)["']/g, // icon: "xyz" in config objects
];

function scanFile(filePath, approvedSet) {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const violations = [];
  const usages = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (const pattern of ICON_PATTERNS) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const iconName = match[1];
        usages.push(iconName);

        if (!approvedSet.has(iconName)) {
          violations.push({
            file: relative(ROOT, filePath),
            line: i + 1,
            column: match.index + 1,
            name: iconName,
            context: line.trim().substring(0, 120),
          });
        }
      }
    }
  }

  return { violations, usages };
}

function walkDir(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (entry === "node_modules" || entry === ".git") continue;
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if ([".tsx", ".ts", ".jsx"].includes(extname(fullPath))) {
      files.push(fullPath);
    }
  }
  return files;
}

function findClosestMatch(name, approved) {
  let best = null;
  let bestScore = Infinity;
  for (const candidate of approved) {
    const dist = levenshtein(name, candidate);
    if (dist < bestScore) {
      bestScore = dist;
      best = candidate;
    }
  }
  return bestScore <= 3 ? best : null;
}

function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] =
        a[i - 1] === b[j - 1]
          ? matrix[i - 1][j - 1]
          : 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
    }
  }
  return matrix[a.length][b.length];
}

// Main
const approvedIcons = getApprovedIcons();
const approvedSet = new Set(approvedIcons);
const files = walkDir(SRC_DIR);

const allViolations = [];
const allUsages = new Set();

for (const file of files) {
  const { violations, usages } = scanFile(file, approvedSet);
  allViolations.push(...violations);
  usages.forEach((u) => allUsages.add(u));
}

// Report
console.log(`\nIcon Asset Audit`);
console.log("─".repeat(60));
console.log(`  Approved icons:  ${approvedIcons.length}`);
console.log(`  Icons in use:    ${allUsages.size}`);
console.log(`  Files scanned:   ${files.length}`);

// Show unused icons
const unusedIcons = approvedIcons.filter((i) => !allUsages.has(i));
if (unusedIcons.length > 0) {
  console.log(`\n  Unused icons (${unusedIcons.length}):`);
  for (const icon of unusedIcons.sort()) {
    console.log(`    - ${icon}`);
  }
}

if (allViolations.length === 0) {
  console.log(`\n✓ All icon references are valid.\n`);
  process.exit(0);
}

console.log(`\n✗ Found ${allViolations.length} invalid icon reference(s):\n`);

for (const v of allViolations) {
  const suggestion = findClosestMatch(v.name, approvedIcons);
  console.log(`  ${v.file}:${v.line}:${v.column}`);
  console.log(`    Invalid: "${v.name}"`);
  if (suggestion) {
    console.log(`    Did you mean: "${suggestion}"?`);
  }
  console.log(`    Context: ${v.context}`);
  console.log("");
}

console.log("─".repeat(60));
console.log(`\nApproved icon names:`);
console.log(`  ${approvedIcons.sort().join(", ")}`);
console.log("");

process.exit(1);
