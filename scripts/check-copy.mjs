#!/usr/bin/env node
/**
 * Copy guard. Fails the build when banned constructions reach user-facing text.
 * Mirrors the standing writing rules: no em dashes, no filler intensifiers,
 * no corporate-register verbs.
 *
 * Code comments are exempt (they are not published prose).
 * Run: npm run check:copy
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = 'src';
const EXTS = new Set(['.ts', '.tsx']);

const RULES = [
  { name: 'em dash', re: /—/, hint: 'use a full stop, comma, colon, or "·" for label separators' },
  {
    name: 'filler intensifier',
    re: /\b(genuinely|really|truly|actually)\b/i,
    hint: 'delete it; the sentence is stronger without',
  },
  {
    name: 'corporate-register verb',
    re: /\b(leverages?|leveraging|underscores?|underscored)\b/i,
    hint: 'use a plain verb',
  },
];

/** Lines that are purely code comments carry no published prose. */
function isComment(line) {
  const t = line.trim();
  return t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('{/*');
}

/**
 * The matchmaker uses a bare '—' as an empty-state glyph in a numeric slot.
 * That is typography, not prose, so it is allowed explicitly.
 */
function isAllowedGlyph(line) {
  return /:\s*'—'/.test(line);
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (EXTS.has(extname(full))) out.push(full);
  }
  return out;
}

const failures = [];
for (const file of walk(ROOT)) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (isComment(line) || isAllowedGlyph(line)) return;
    for (const rule of RULES) {
      if (rule.re.test(line)) {
        failures.push({ file, line: i + 1, rule: rule.name, hint: rule.hint, text: line.trim() });
      }
    }
  });
}

if (failures.length) {
  console.error(`\n✗ Copy guard found ${failures.length} issue(s):\n`);
  for (const f of failures) {
    console.error(`  ${f.file}:${f.line}  [${f.rule}]`);
    console.error(`    ${f.text}`);
    console.error(`    → ${f.hint}\n`);
  }
  process.exit(1);
}

console.log('✓ Copy guard passed.');
