#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const os = require('os');

const MARKER = '@lqmnwido/global-ai-agents';

function isManagedRouter(content) {
  return /(?:@2en\/|@lqmnwido\/)?global-ai-agents/i.test(content);
}

const AGENTS = [
  {
    id: 'codex',
    name: 'Codex',
    baseDir: () => path.join(os.homedir(), '.codex'),
    moduleDir: 'agents',
    routerFile: 'AGENTS.md',
    ref: (rel) => `~/.codex/agents/${rel}`,
    format: 'agents',
    required: true,
  },
  {
    id: 'claude',
    name: 'Claude Code',
    baseDir: () => path.join(os.homedir(), '.claude'),
    moduleDir: 'agents',
    routerFile: 'CLAUDE.md',
    ref: (rel) => `@agents/${rel}`,
    format: 'claude',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    baseDir: () => path.join(os.homedir(), '.cursor'),
    moduleDir: 'agents',
    routerFile: 'rules/global-ai-agents.mdc',
    ref: (rel) => `~/.cursor/agents/${rel}`,
    format: 'cursor',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    baseDir: () => path.join(os.homedir(), '.windsurf'),
    moduleDir: 'agents',
    routerFile: 'rules/global-ai-agents.md',
    ref: (rel) => `~/.windsurf/agents/${rel}`,
    format: 'windsurf',
  },
  {
    id: 'opencode',
    name: 'opencode',
    baseDir: () => path.join(os.homedir(), '.config', 'opencode'),
    moduleDir: 'agents',
    routerFile: 'AGENTS.md',
    ref: (rel) => `~/.config/opencode/agents/${rel}`,
    format: 'agents',
  },
  {
    id: 'gemini',
    name: 'Gemini CLI',
    baseDir: () => path.join(os.homedir(), '.gemini'),
    moduleDir: 'agents',
    routerFile: 'AGENTS.md',
    ref: (rel) => `~/.gemini/agents/${rel}`,
    format: 'agents',
  },
];

const AGENT_IDS = AGENTS.map((a) => a.id);

function resolveTargetIds(argv = []) {
  const envTargets = (process.env.GLOBAL_AGENTS_TARGETS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const npmFlagTargets = AGENT_IDS.filter((id) => {
    const v = (process.env[`npm_config_${id}`] || '').toLowerCase();
    return v === 'true' || v === '1';
  });

  const argvTargets = argv
    .map((a) => a.replace(/^--/, '').trim().toLowerCase())
    .filter((a) => AGENT_IDS.includes(a));

  const wantsAll = argv
    .map((a) => a.replace(/^--/, '').trim().toLowerCase())
    .includes('all');

  const explicit = envTargets.length > 0 || npmFlagTargets.length > 0 || argvTargets.length > 0 || wantsAll;

  if (!explicit) return AGENT_IDS;
  if (wantsAll) return AGENT_IDS;

  return [...new Set([...envTargets, ...npmFlagTargets, ...argvTargets])];
}

function getConfiguredAgents(argv = []) {
  const select = resolveTargetIds(argv);

  const agents = AGENTS.filter((a) => select.includes(a.id));

  const homeOverride = process.env.GLOBAL_AGENTS_HOME;
  if (homeOverride) {
    for (const agent of agents) {
      const base = agent.baseDir();
      agent.baseDir = () => path.join(homeOverride, agent.id);
    }
  }

  return agents;
}

function getAgentFiles() {
  const agentsDir = path.join(__dirname, 'agents');
  const files = {};

  function walkDir(dir, prefix = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        walkDir(fullPath, relativePath);
      } else if (entry.name.endsWith('.md')) {
        files[relativePath] = fullPath;
      }
    }
  }

  walkDir(agentsDir);
  return files;
}

function getTemplateFiles() {
  const templatesDir = path.join(__dirname, 'templates');
  const files = {};

  if (!fs.existsSync(templatesDir)) return files;

  const entries = fs.readdirSync(templatesDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      files[entry.name] = path.join(templatesDir, entry.name);
    }
  }

  return files;
}

function getRouterTemplate() {
  const p = path.join(__dirname, 'routers', 'AGENTS.template.md');
  if (!fs.existsSync(p)) {
    throw new Error(`Router template missing: ${p}`);
  }
  return fs.readFileSync(p, 'utf8');
}

function buildRouter(agent) {
  const template = getRouterTemplate();
  return template
    .replace(/{{AGENT_NAME}}/g, agent.name)
    .replace(/{{AGENT_ID}}/g, agent.id)
    .replace(/{{MOD}}/g, agent.ref(''));
}

module.exports = {
  MARKER,
  isManagedRouter,
  AGENTS,
  AGENT_IDS,
  resolveTargetIds,
  getConfiguredAgents,
  getAgentFiles,
  getTemplateFiles,
  getRouterTemplate,
  buildRouter,
};