#!/usr/bin/env node

/**
 * Border State Auditor
 * Enforces the interactive border rule from CLAUDE.md Section 3:
 * - Active states: exactly 1.5px border
 * - Inactive states: border-0 (no border)
 * Scans for components that define interactive states without the correct border pattern.
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, extname } from "path";

const ROOT = new URL("../../..", import.meta.url).pathname;
const SRC_DIR = join(ROOT, "src");

const SCAN_EXTENSIONS = new Set([".tsx", ".ts", ".jsx"]);

// Patterns indicating interactive state definitions
const ACTIVE_INDICATORS = [
  /active|selected|isActive|--active|\.active/i,
];

const INACTIVE_INDICATORS = [
  /inactive|default|isInactive|--inactive|!isActive|!active/i,
];

// Border patterns to validate
const BORDER_1_5 = /border-\[?1\.5px\]?|border-width:\s*1\.5px|borderWidth.*1\.5/;
const BORDER_0 = /border-0|border-none|border:\s*none|border:\s*0|borderWidth.*0/;
const ANY_BORDER = /border-\[?\d+(\.\d+)?px\]?|border-width:\s*\d+(\.\d+)?px/;

// Components that should follow the rule
const TARGET_COMPONENTS = [
  "ScenarioControlStrip",
  "ViewNavigationLayer",
  "LeftNavigationSidebar",
];

function walkDir(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (entry === "node_modules") continue;
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (SCAN_EXTENSIONS.has(extname(fullPath))) {
      files.push(fullPath);
    }
  }
  return files;
}

function analyzeFile(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const findings = [];
  const fileName = relative(ROOT, filePath);

  // Check if this file contains interactive state logic
  const hasActiveStates = ACTIVE_INDICATORS.some((p) => p.test(content));
  if (!hasActiveStates) return findings;

  // Track if we find the correct pattern
  const has1_5Border = BORDER_1_5.test(content);
  const hasBorder0 = BORDER_0.test(content);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Check for active states with wrong border width
    const isActiveLine = ACTIVE_INDICATORS.some((p) => p.test(line));
    if (isActiveLine && ANY_BORDER.test(line) && !BORDER_1_5.test(line)) {
      const borderMatch = line.match(ANY_BORDER);
      if (borderMatch && !line.includes("border-0") && !line.includes("border-none")) {
        findings.push({
          file: fileName,
          line: lineNum,
          type: "wrong-active-border",
          message: `Active state uses "${borderMatch[0]}" — must be 1.5px`,
          context: line.trim().substring(0, 120),
        });
      }
    }

    // Check for inactive states with non-zero border
    const isInactiveLine = INACTIVE_INDICATORS.some((p) => p.test(line));
    if (isInactiveLine && ANY_BORDER.test(line) && !BORDER_0.test(line)) {
      const borderMatch = line.match(ANY_BORDER);
      if (borderMatch) {
        findings.push({
          file: fileName,
          line: lineNum,
          type: "wrong-inactive-border",
          message: `Inactive state uses "${borderMatch[0]}" — must be border-0`,
          context: line.trim().substring(0, 120),
        });
      }
    }
  }

  // File-level warnings for target components missing the pattern entirely
  const isTargetComponent = TARGET_COMPONENTS.some((name) => filePath.includes(name));
  if (isTargetComponent) {
    if (!has1_5Border) {
      findings.push({
        file: fileName,
        line: 0,
        type: "missing-active-border",
        message: "Target component missing 1.5px active border declaration",
        context: "(file-level check)",
      });
    }
    if (!hasBorder0) {
      findings.push({
        file: fileName,
        line: 0,
        type: "missing-inactive-border",
        message: "Target component missing border-0 inactive state declaration",
        context: "(file-level check)",
      });
    }
  }

  return findings;
}

// Main
const files = walkDir(SRC_DIR);
const allFindings = [];

for (const file of files) {
  allFindings.push(...analyzeFile(file));
}

const errors = allFindings.filter(
  (f) => f.type === "wrong-active-border" || f.type === "wrong-inactive-border"
);
const warnings = allFindings.filter(
  (f) => f.type === "missing-active-border" || f.type === "missing-inactive-border"
);

console.log(`\nBorder State Audit`);
console.log("─".repeat(60));
console.log(`  Files scanned: ${files.length}`);
console.log(`  Errors:        ${errors.length}`);
console.log(`  Warnings:      ${warnings.length}`);

if (errors.length > 0) {
  console.log(`\n✗ Border violations:\n`);
  for (const f of errors) {
    console.log(`  ${f.file}:${f.line}`);
    console.log(`    ${f.message}`);
    console.log(`    Context: ${f.context}`);
    console.log("");
  }
}

if (warnings.length > 0) {
  console.log(`\n⚠ Missing border patterns:\n`);
  for (const f of warnings) {
    console.log(`  ${f.file}`);
    console.log(`    ${f.message}`);
    console.log("");
  }
}

if (allFindings.length === 0) {
  console.log(`\n✓ Border state rules are correctly applied.\n`);
  process.exit(0);
}

console.log("─".repeat(60));
console.log("\nRule: Active = 1.5px border | Inactive = border-0 (CLAUDE.md §3)");
console.log("Applies to: button groups, sub-nav tabs, toggle controls.\n");

process.exit(errors.length > 0 ? 1 : 0);
