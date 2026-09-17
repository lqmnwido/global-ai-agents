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

const COMMAND_IDS = ['scope', 'audit', 'architect', 'develop', 'check', 'test', 'debug', 'document', 'sync'];

function commandDirFor(agent) {
  const override = process.env.GLOBAL_AGENTS_HOME;
  if (agent.id === 'windsurf') {
    const base = override ? path.join(override, 'windsurf') : path.join(os.homedir(), '.codeium', 'windsurf');
    return path.join(base, 'global_workflows');
  }
  const dirs = { codex: 'prompts', claude: 'commands', cursor: 'commands', opencode: 'command', gemini: 'commands' };
  return path.join(agent.baseDir(), dirs[agent.id] || 'commands');
}

function buildCommandFile(agent, name) {
  const moduleRef = agent.ref(`commands/${name}.md`);
  const hrRef = agent.ref('standards/human-review.md');
  const body = [
    `# /${name}`,
    '',
    `Run the lqmnwido harness lifecycle gate \`/${name}\`.`,
    '',
    `1. Read \`${moduleRef}\` and any modules it references, then execute exactly per that module.`,
    '2. Honor its Human Gate: state intent, present options, and wait for approval before any action, including reads.',
    `3. Follow the Decision Format in \`${hrRef}\`: numbered menus ending with the line "Reply with 1, 2, or 3".`,
    '4. Report concisely what you ran and the results, then stop and await the next instruction.',
  ].join('\n');

  if (agent.id === 'gemini') {
    return {
      ext: 'toml',
      content: `# @lqmnwido/global-ai-agents\n\ndescription = \"Run the lqmnwido harness lifecycle gate: ${name}.\"\n\nprompt = \"\"\"\n${body}\n\"\"\"\n`,
    };
  }

  const frontmatter = agent.id === 'cursor' ? '' : `---\ndescription: ${name} — lqmnwido harness lifecycle gate\n---\n\n`;
  return {
    ext: 'md',
    content: `${frontmatter}<!-- @lqmnwido/global-ai-agents -->\n\n${body}\n`,
  };
}

function codexSkillDir() {
  const override = process.env.GLOBAL_AGENTS_HOME;
  const base = override ? path.join(override, 'codex') : path.join(os.homedir(), '.codex');
  return path.join(base, 'skills');
}

function buildCodexSkill(agent, name) {
  const moduleRef = agent.ref(`commands/${name}.md`);
  const hrRef = agent.ref('standards/human-review.md');
  const body = [
    '# /' + name,
    '',
    'Run the lqmnwido harness lifecycle gate `/' + name + '`.',
    '',
    '1. Read `' + moduleRef + '` and any modules it references, then execute exactly per that module.',
    '2. Honor its Human Gate: state intent, present options, and wait for approval before any action, including reads.',
    '3. Follow the Decision Format in `' + hrRef + '`: numbered menus ending with the line "Reply with 1, 2, or 3".',
    '4. Report concisely what you ran and the results, then stop and await the next instruction.',
  ].join('\n');

  return {
    skillPath: path.join(codexSkillDir(), name, 'SKILL.md'),
    policyPath: path.join(codexSkillDir(), name, 'agents', 'openai.yaml'),
    skill: `---
name: ${name}
description: Run the lqmnwido harness lifecycle gate /${name}. Invoked explicitly via $${name} or /skills when the user asks for /${name} (scope, audit, architect, develop, check, test, debug, document, sync).
---

<!-- @lqmnwido/global-ai-agents -->

${body}
`,
    policy: `interface:
  display_name: "/${name} — lqmnwido harness lifecycle gate"

policy:
  allow_implicit_invocation: false
`,
  };
}

module.exports = {
  MARKER,
  isManagedRouter,
  AGENTS,
  AGENT_IDS,
  COMMAND_IDS,
  commandDirFor,
  buildCommandFile,
  codexSkillDir,
  buildCodexSkill,
  resolveTargetIds,
  getConfiguredAgents,
  getAgentFiles,
  getTemplateFiles,
  getRouterTemplate,
  buildRouter,
};