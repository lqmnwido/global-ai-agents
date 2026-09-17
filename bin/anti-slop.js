#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const VERSION = require('../package.json').version;

const SKIP_DIRS = new Set([
  'node_modules', 'vendor', '.git', 'dist', 'build', 'out', 'target',
  '.next', '.nuxt', 'coverage', '.venv', 'venv', '__pycache__', '.idea',
  '.vscode', 'tmp', 'cache', 'storage',
]);

const SKIP_FILES = [
  /\.min\.(js|css)$/i,
  /package-lock\.json$/i,
  /yarn\.lock$/i,
  /pnpm-lock\.yaml$/i,
  /composer\.lock$/i,
  /\.(png|jpe?g|gif|svg|ico|webp|pdf|zip|gz|woff2?|ttf|eot|mp4|mov)$/i,
];

const CODE_EXTS = new Set([
  '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.vue', '.svelte',
  '.php', '.py', '.rb', '.go', '.rs', '.java', '.kt', '.cs', '.fs',
  '.blade.php', '.sql', '.sh', '.bash', '.ps1', '.yml', '.yaml', '.toml',
]);

const TEXT_EXTS = new Set(['.md', '.mdx', '.txt', '.rst', '.adoc']);

const RULES = [
  {
    id: 'SLOP001', severity: 'warning',
    desc: 'TODO/FIXME/HACK/XXX left in code',
    re: /\b(TODO|FIXME|HACK|XXX)\b/,
    areas: ['code'],
  },
  {
    id: 'SLOP002', severity: 'error',
    desc: 'Placeholder text',
    re: /(your code here|lorem ipsum|insert .{0,20} here|replace me|placeholder text|<YOUR_[A-Z0-9_]+>)/i,
    areas: ['code'],
  },
  {
    id: 'SLOP003', severity: 'error',
    desc: 'Empty catch block (swallowed error)',
    re: /catch\s*(\([^)]*\))?\s*\{\s*\}/,
    areas: ['code'],
  },
  {
    id: 'SLOP004', severity: 'warning',
    desc: '`any` type to silence the type checker',
    re: /(:\s*any\b|<any>|as\s+any\b)/,
    exts: ['.ts', '.tsx'],
    areas: ['code'],
  },
  {
    id: 'SLOP005', severity: 'warning',
    desc: 'Debug output left in code',
    re: /(\bconsole\.(log|debug|warn|error)\b|\bdebugger\b|\bvar_dump\b|\bprint_r\b)/,
    skipDirs: ['bin', 'scripts', 'cli', 'tools', 'cmd', 'tasks', 'console'],
    areas: ['code'],
  },
  {
    id: 'SLOP006', severity: 'error',
    desc: 'Unimplemented stub presented as code',
    re: /(throw new Error\(\s*["'`](not implemented|todo)|raise NotImplementedError|NotImplementedException|return null;?\s*\/\/\s*todo)/i,
    areas: ['code'],
  },
  {
    id: 'SLOP007', severity: 'warning',
    desc: 'Commented-out code (delete it; Git remembers)',
    re: /^\s*\/\/\s*(function\b|const\b|let\b|var\b|return\b|if\s*\(|for\s*\(|import\b|class\b|<\w+>)/,
    areas: ['code'],
  },
  {
    id: 'SLOP008', severity: 'error',
    desc: 'Hardcoded secret/token assignment',
    re: /(api[_-]?key|secret|password|passwd|token|private[_-]?key)\s*[:=]\s*["'`][^"'`\s]{12,}["'`]/i,
    unless: /(\$\{[A-Z0-9_]+\}|process\.env|<[^>]+>|your[_-]|example|changeme|placeholder|dummy|xxxx)/i,
    areas: ['code'],
  },
  {
    id: 'SLOP009', severity: 'error',
    desc: 'Hardcoded localhost/example URLs in non-test code',
    re: /https?:\/\/(localhost|127\.0\.0\.1|example\.com)[:/]/i,
    areas: ['code'],
  },
  {
    id: 'SLOP010', severity: 'warning',
    desc: 'Slop prose phrase',
    re: /\b(as an ai|i cannot|i'?m sorry|certainly!|great question|in conclusion|it'?s important to note|delve|seamless|cutting-edge|game-?chang|let'?s dive in)\b/i,
    areas: ['text'],
  },
  {
    id: 'SLOP011', severity: 'warning',
    desc: 'Filler/hedging phrase',
    re: /\b(obviously|simply just|just simply|needless to say|at the end of the day)\b/i,
    areas: ['text'],
  },
];

function parseArgs(argv) {
  const opts = { paths: [], staged: false, json: false, quiet: false, help: false, strict: false };
  for (const arg of argv) {
    if (arg === '--staged' || arg === '--cached') opts.staged = true;
    else if (arg === '--json') opts.json = true;
    else if (arg === '--quiet' || arg === '-q') opts.quiet = true;
    else if (arg === '--strict') opts.strict = true;
    else if (arg === '--help' || arg === '-h') opts.help = true;
    else if (!arg.startsWith('-')) opts.paths.push(arg);
  }
  return opts;
}

function isGitRepo() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function areaForFile(file) {
  const lower = file.toLowerCase();
  if (TEXT_EXTS.has(path.extname(lower))) return 'text';
  if (lower.endsWith('.blade.php')) return 'code';
  if (CODE_EXTS.has(path.extname(lower))) return 'code';
  return null;
}

function loadConfig() {
  const cfg = { ignore: [], disable: new Set() };
  const ignoreFile = path.join('.ai', 'slopignore');
  if (fs.existsSync(ignoreFile)) {
    for (const line of fs.readFileSync(ignoreFile, 'utf8').split(/\r?\n/)) {
      const v = line.trim();
      if (v && !v.startsWith('#')) cfg.ignore.push(v);
    }
  }
  const jsonFile = path.join('.ai', 'slop.json');
  if (fs.existsSync(jsonFile)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
      if (Array.isArray(parsed.ignore)) cfg.ignore.push(...parsed.ignore);
      if (Array.isArray(parsed.disable)) parsed.disable.forEach((d) => cfg.disable.add(d));
    } catch {
      /* ignore malformed config */
    }
  }
  return cfg;
}

function isIgnored(file, cfg) {
  const norm = file.replace(/\\/g, '/');
  if (SKIP_FILES.some((re) => re.test(norm))) return true;
  if (norm.split('/').some((seg) => SKIP_DIRS.has(seg))) return true;
  return cfg.ignore.some((pat) => {
    if (pat.includes('*')) {
      const re = new RegExp('^' + pat.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$');
      return re.test(norm);
    }
    return norm.includes(pat);
  });
}

function ruleApplies(rule, file, area) {
  if (!rule.areas.includes(area)) return false;
  if (rule.exts && !rule.exts.includes(path.extname(file.toLowerCase()))) return false;
  return true;
}

function scanLine(line, content, file, cfg, lineNo) {
  const area = areaForFile(file);
  if (!area) return [];
  const findings = [];
  for (const rule of RULES) {
    if (cfg.disable.has(rule.id)) continue;
    if (!ruleApplies(rule, file, area)) continue;
    if (rule.skipDirs && file.replace(/\\/g, '/').split('/').some((seg) => rule.skipDirs.includes(seg))) continue;
    if (rule.unless && rule.unless.test(content)) continue;
    if (rule.re.test(content)) {
      findings.push({ rule: rule.id, severity: rule.severity, desc: rule.desc, file, line: lineNo, text: line.trim().slice(0, 160) });
    }
  }
  return findings;
}

function scanFile(file, cfg) {
  if (isIgnored(file, cfg)) return [];
  let content;
  try {
    content = fs.readFileSync(file, 'utf8');
  } catch {
    return [];
  }
  const findings = [];
  content.split(/\r?\n/).forEach((line, i) => {
    findings.push(...scanLine(line, line, file, cfg, i + 1));
  });
  return findings;
}

function walk(dir, cfg, acc) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(full, cfg, acc);
    } else if (entry.isFile()) {
      if (isIgnored(full, cfg)) continue;
      if (areaForFile(full)) acc.push(full);
    }
  }
  return acc;
}

function scanStaged(cfg) {
  let diff;
  try {
    diff = execSync('git diff --cached --unified=0 --no-color', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch {
    return null;
  }
  const findings = [];
  let current = null;
  let newLine = 0;
  for (const raw of diff.split(/\r?\n/)) {
    if (raw.startsWith('+++ ')) {
      const p = raw.slice(4).trim();
      current = p === '/dev/null' ? null : p.replace(/^b\//, '');
      continue;
    }
    const hunk = raw.match(/^@@ -\d+(?:,\d+)? \+(\d+)/);
    if (hunk) {
      newLine = parseInt(hunk[1], 10);
      continue;
    }
    if (!current) continue;
    if (raw.startsWith('+') && !raw.startsWith('+++')) {
      findings.push(...scanLine(raw.slice(1), raw.slice(1), current, cfg, newLine));
      newLine += 1;
    } else if (raw.startsWith(' ')) {
      newLine += 1;
    }
  }
  return findings;
}

function printHelp() {
  console.log(`\n  @lqmnwido/global-ai-agents v${VERSION} — anti-slop scanner\n`);
  console.log('  Usage:');
  console.log('    ai-agents-slop --staged         scan added lines in staged changes (default in a git repo)');
  console.log('    ai-agents-slop <paths...>       scan files/directories');
  console.log('    ai-agents-slop --staged --json  machine-readable output');
  console.log('    ai-agents-slop --strict         fail on warnings too\n');
  console.log('  Config: .ai/slopignore (path patterns), .ai/slop.json ({ ignore: [], disable: [] })\n');
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) return printHelp();

  const cfg = loadConfig();
  let findings = [];

  if (opts.staged || (!opts.paths.length && isGitRepo())) {
    findings = scanStaged(cfg);
    if (findings === null) {
      console.error('  ✗ could not read staged diff — run from inside a git repo with staged changes');
      process.exit(2);
    }
  } else if (opts.paths.length) {
    const files = [];
    for (const p of opts.paths) {
      if (!fs.existsSync(p)) continue;
      if (fs.statSync(p).isDirectory()) walk(p, cfg, files);
      else if (areaForFile(p) && !isIgnored(p, cfg)) files.push(p);
    }
    findings = files.flatMap((f) => scanFile(f, cfg));
  } else {
    console.log('  No paths and not a git repo. Nothing to scan.\n');
    return;
  }

  if (opts.json) {
    console.log(JSON.stringify({ findings, count: findings.length }, null, 2));
  } else if (!findings.length) {
    if (!opts.quiet) console.log('\n  ✓ no slop detected\n');
  } else {
    const errors = findings.filter((f) => f.severity === 'error');
    const warnings = findings.filter((f) => f.severity === 'warning');
    if (!opts.quiet) {
      console.log(`\n  Slop detected: ${errors.length} error(s), ${warnings.length} warning(s)\n`);
      for (const f of findings) {
        const mark = f.severity === 'error' ? '✗' : '!';
        console.log(`  ${mark} ${f.rule} ${f.file}:${f.line} — ${f.desc}`);
        console.log(`      ${f.text}`);
      }
      console.log('');
    }
  }

  const shouldFail = opts.strict ? findings.length > 0 : findings.some((f) => f.severity === 'error');
  process.exit(shouldFail ? 1 : 0);
}

main();