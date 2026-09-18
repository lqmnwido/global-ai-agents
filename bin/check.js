#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const index = require('../index.js');

const ROOT = path.join(__dirname, '..');
const AGENTS_DIR = path.join(ROOT, 'agents');
const VERSION = require('../package.json').version;

let checks = 0;
let failures = 0;
const issues = [];

function ok(label) {
  checks++;
  console.log(`  ✓ ${label}`);
}

function bad(label, detail) {
  checks++;
  failures++;
  console.log(`  ✗ ${label}${detail ? ` — ${detail}` : ''}`);
}

function note(label) {
  console.log(`  · ${label}`);
}

function refsFrom(routerBody) {
  const refs = new Set();
  for (const line of routerBody.split(/\r?\n/)) {
    const m = line.match(/(?:@agents\/|agents\/)([\w./-]+\.md)/);
    if (m) refs.add(m[1]);
  }
  return refs;
}

function walk(dir, acc, base) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc, base);
    else if (entry.name.endsWith('.md')) acc.push(path.relative(base, full).replace(/\\/g, '/'));
  }
  return acc;
}

console.log(`\n  @lqmnwido/global-ai-agents v${VERSION} — harness check\n`);

const modules = walk(AGENTS_DIR, [], AGENTS_DIR).sort();
note(`${modules.length} module files under agents/`);

const empty = [];
const badEol = [];
const noTitle = [];
for (const rel of modules) {
  const full = path.join(AGENTS_DIR, rel);
  const raw = fs.readFileSync(full, 'utf8');
  if (!raw.trim()) empty.push(rel);
  if (!raw.endsWith('\n') && !raw.endsWith('\r')) badEol.push(rel);
  if (!raw.trimStart().startsWith('#')) noTitle.push(rel);
}
if (empty.length) bad('all modules non-empty', empty.join(', '));
else ok(`all ${modules.length} modules non-empty`);
if (badEol.length) bad('modules end with a trailing newline', badEol.join(', '));
else ok('modules end with a trailing newline');
if (noTitle.length) bad('modules start with a title (#)', noTitle.join(', '));
else ok('modules start with a title (#)');

const expectedCategories = {
  standards: (f) => true,
  commands: (f) => true,
  frameworks: (f) => true,
  databases: (f) => true,
  tooling: (f) => true,
  architecture: (f) => true,
  backend: (f) => true,
  frontend: (f) => true,
  quality: (f) => true,
  operations: (f) => true,
};
const categoryCounts = {};
for (const rel of modules) {
  const cat = rel.split('/')[0];
  categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
}
for (const cat of Object.keys(expectedCategories)) {
  const n = categoryCounts[cat] || 0;
  note(`${cat}/ has ${n} module(s)`);
}

for (const agent of index.AGENTS) {
  const body = index.buildRouter(agent);
  const placeholder = /\{\{/.test(body) || /\}\}/.test(body);
  if (placeholder) bad(`${agent.name} router has unresolved placeholders`);
  else ok(`${agent.name} router renders (no placeholders)`);

  const refs = refsFrom(body);
  const missing = [...refs].filter((r) => r !== 'INDEX.md' && !fs.existsSync(path.join(AGENTS_DIR, r)));
  if (missing.length) bad(`${agent.name} router references missing files`, missing.join(', '));
  else ok(`${agent.name}: ${refs.size} router references resolve (INDEX.md is generated at install)`);

  const unreferenced = modules.filter((m) => !body.includes(m));
  if (unreferenced.length && agent.id === 'codex') {
    bad('every module is referenced by the router', unreferenced.join(', '));
  } else if (agent.id === 'codex') {
    ok(`all ${modules.length} modules referenced by router`);
  }
}

const commandsDir = path.join(AGENTS_DIR, 'commands');
const commandsFiles = fs.readdirSync(commandsDir).filter((f) => f.endsWith('.md'));
const noGate = commandsFiles.filter((f) => !/## Human Gate/.test(fs.readFileSync(path.join(commandsDir, f), 'utf8')));
if (noGate.length) bad('every command module has a Human Gate', noGate.join(', '));
else ok(`all ${commandsFiles.length} command modules have a Human Gate`);

const commandsRegistered =
  index.COMMAND_IDS.length === commandsFiles.length && index.COMMAND_IDS.every((c) => fs.existsSync(path.join(commandsDir, `${c}.md`)));
if (commandsRegistered) ok(`all ${index.COMMAND_IDS.length} lifecycle commands registered as slash commands`);
else bad('lifecycle command list matches commands/ modules', `expected ${index.COMMAND_IDS.join(', ')}`);

for (const agent of index.AGENTS) {
  const files = index.COMMAND_IDS.map((n) => index.buildCommandFile(agent, n));
  const valid = files.every((f) => f.content.includes(index.MARKER) && f.content.trim() && /^(md|toml)$/.test(f.ext));
  const geminiOk = agent.id !== 'gemini' || files.every((f) => f.content.includes('prompt = """') && f.content.split('"""').length === 3);
  if (!valid || !geminiOk) bad(`${agent.name} slash-command generator`, 'marker/content/format issue');
  else ok(`${agent.name}: ${files.length} slash commands generated (${index.commandDirFor(agent)})`);
}

const codexAgent = index.AGENTS.find((a) => a.id === 'codex');
const codexSkills = index.COMMAND_IDS.map((n) => index.buildCodexSkill(codexAgent, n));
const codexSkillsOk = codexSkills.every(
  (s, i) =>
    s.skill.includes(index.MARKER) &&
    s.skill.includes(`name: ${index.COMMAND_IDS[i]}-gag`) &&
    s.skillPath.replace(/\\/g, '/').endsWith(`${index.COMMAND_IDS[i]}-gag/SKILL.md`) &&
    s.policy.includes('allow_implicit_invocation: false')
);
if (codexSkillsOk) ok(`codex: ${codexSkills.length} skills generated (${index.codexSkillDir()})`);
else bad('codex skill generator', 'SKILL.md / policy / -gag naming issue');

const template = index.getRouterTemplate();
if (template.includes('{{MOD}}') && template.includes('INDEX.md')) ok('router template carries per-agent placeholders');
else bad('router template structure', 'expected {{MOD}} + INDEX.md reference');

const markerCases = [
  ['@2en/global-ai-agents legacy marker', true],
  ['@lqmnwido/global-ai-agents current marker', true],
  ['plain user text without marker', false],
  ['Auto-generated by @lqmnwido/global-ai-agents v1.4.4', true],
];
for (const [sample, expected] of markerCases) {
  const got = index.isManagedRouter(sample);
  if (got === expected) ok(`marker detection: "${sample.slice(0, 40)}..." -> ${got}`);
  else bad(`marker detection: "${sample.slice(0, 40)}..."`, `expected ${expected}, got ${got}`);
}

const bins = require('../package.json').bin || {};
for (const [name, script] of Object.entries(bins)) {
  if (fs.existsSync(path.join(ROOT, script))) ok(`bin ${name} -> ${script}`);
  else bad(`bin ${name} -> ${script}`, 'not found');
}

const pkgFiles = require('../package.json').files || [];
for (const entry of pkgFiles) {
  if (fs.existsSync(path.join(ROOT, entry))) ok(`packaged: ${entry}`);
  else bad(`packaged: ${entry}`, 'not found');
}

const legacy = [];
function scanLegacy(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
    if (entry.isDirectory()) {
      scanLegacy(full);
    } else if (/\.(md)$/.test(entry.name)) {
      if (/2en/i.test(fs.readFileSync(full, 'utf8'))) legacy.push(path.relative(ROOT, full).replace(/\\/g, '/'));
    }
  }
}
scanLegacy(ROOT);
if (legacy.length) bad('no legacy "2en" branding remains', legacy.join(', '));
else ok('no legacy "2en" branding remains');

const slop = spawnSync(process.execPath, ['bin/anti-slop.js', 'agents', 'routers', 'templates', 'index.js', 'bin', 'mcp'], {
  encoding: 'utf8',
  cwd: ROOT,
});
if (slop.status !== 0) {
  bad('anti-slop scan over package passes', (slop.stdout || '').split(/\r?\n/).filter((l) => l.includes('✗')).join(' | ') || `exit ${slop.status}`);
} else {
  ok('anti-slop scan over package passes');
}

if (failures) {
  console.log(`\n  ✗ ${failures} of ${checks} checks failed\n`);
  process.exit(1);
}
console.log(`\n  ✓ all ${checks} checks passed\n`);