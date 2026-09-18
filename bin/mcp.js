#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline/promises');
const index = require('../index.js');
const { MCP_SERVERS, mcpById, recommendedMcpIds, detectBrowsers, chooseDevtoolsServer, playwrightArgsFor } = require('../mcp/registry.js');
const VERSION = require('../package.json').version;

function log(icon, message) {
  console.log(`  ${icon} ${message}`);
}

function configPathFor(agent) {
  const base = agent.baseDir();
  switch (agent.id) {
    case 'codex':
      return path.join(base, 'config.toml');
    case 'opencode':
      return path.join(base, 'opencode.json');
    case 'cursor':
      return path.join(base, 'mcp.json');
    case 'claude':
      return path.join(base, '..', '.claude.json');
    case 'windsurf':
      return path.join(base, 'mcp_config.json');
    case 'gemini':
      return path.join(base, 'settings.json');
    default:
      return null;
  }
}

function readJsonSafe(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return {};
  }
}

function writeJson(file, merger) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const obj = readJsonSafe(file);
  const changed = merger(obj);
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + '\n', 'utf8');
  return changed;
}

function escapeRe(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function resolveServer(server) {
  const missing = (server.requiredEnv || []).filter((key) => !process.env[key]);
  const env = {};
  for (const [key, value] of Object.entries(server.env || {})) {
    const match = /^\$\{([A-Z0-9_]+)\}$/.exec(value);
    if (match) {
      if (process.env[match[1]]) env[key] = process.env[match[1]];
    } else if (!value.startsWith('${')) {
      env[key] = value;
    }
  }
  const args = (server.args || []).map((a) => a.replace(/\$\{([A-Z0-9_]+)\}/g, (_, k) => process.env[k] || ''));
  return { env, args, missing };
}

function writeCodex(agent, server, args, env) {
  const file = configPathFor(agent);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (new RegExp(`\\[mcp_servers\\.${escapeRe(server.id)}\\]`).test(existing)) return false;
  const argsToml = '[' + args.map((a) => `"${a.replace(/"/g, '\\"')}"`).join(', ') + ']';
  let block = `\n[mcp_servers.${server.id}]\ncommand = "${server.command}"\nargs = ${argsToml}\n`;
  const keys = Object.keys(env);
  if (keys.length) {
    const envToml = keys.map((k) => `${k} = "${String(env[k]).replace(/"/g, '\\"')}"`).join(', ');
    block = block.replace(/\n$/, '') + `\nenv = { ${envToml} }\n`;
  }
  fs.appendFileSync(file, block);
  return true;
}

function writeOpencode(agent, server, args, env) {
  return writeJson(configPathFor(agent), (obj) => {
    obj.mcp = obj.mcp || {};
    if (obj.mcp[server.id]) return false;
    const entry = { type: 'local', command: [server.command, ...args], enabled: true };
    if (Object.keys(env).length) entry.environment = env;
    obj.mcp[server.id] = entry;
    return true;
  });
}

function writeMcpServersJson(agent, server, args, env) {
  return writeJson(configPathFor(agent), (obj) => {
    obj.mcpServers = obj.mcpServers || {};
    if (obj.mcpServers[server.id]) return false;
    const entry = { command: server.command, args };
    if (Object.keys(env).length) entry.env = env;
    obj.mcpServers[server.id] = entry;
    return true;
  });
}

function configureServerForAgent(agent, server, argsOverride) {
  const { env, args, missing } = resolveServer(server);
  const launchArgs = argsOverride || args;
  if (missing.length) {
    return { skipped: true, missing };
  }
  let changed;
  switch (agent.id) {
    case 'codex':
      changed = writeCodex(agent, server, launchArgs, env);
      break;
    case 'opencode':
      changed = writeOpencode(agent, server, launchArgs, env);
      break;
    default:
      changed = writeMcpServersJson(agent, server, launchArgs, env);
  }
  return { changed };
}

function isMcpConfiguredFor(agent, serverId) {
  const file = configPathFor(agent);
  if (!file || !fs.existsSync(file)) return false;
  try {
    return new RegExp(`\\b${escapeRe(serverId)}\\b`).test(fs.readFileSync(file, 'utf8'));
  } catch {
    return false;
  }
}

function configureMcps(agents, serverIds, browserArgs) {
  const summary = [];
  const overrides = browserArgs || {};
  for (const id of serverIds) {
    const server = mcpById(id);
    if (!server) continue;
    const agentsDone = [];
    const agentsSkipped = [];
    let missing = [];
    for (const agent of agents) {
      if (isMcpConfiguredFor(agent, server.id)) {
        continue;
      }
      const result = configureServerForAgent(agent, server, overrides[id]);
      if (result.skipped) {
        agentsSkipped.push(agent.name);
        missing = result.missing;
      } else {
        agentsDone.push(agent.name);
      }
    }
    summary.push({ server, agentsDone, agentsSkipped, missing });
  }
  return summary;
}

function printSummary(summary) {
  for (const item of summary) {
    const { server, agentsDone, agentsSkipped, missing } = item;
    if (agentsDone.length) {
      log('✓', `${server.name} MCP configured for ${agentsDone.join(', ')}`);
    } else if (!agentsSkipped.length) {
      log('→', `${server.name} MCP already configured`);
    }
    if (agentsSkipped.length) {
      log('!', `${server.name} needs ${missing.join(', ')} — export it and run: ai-agents-mcp --mcp=${server.id}`);
      if (server.note) log(' ', server.note);
    }
  }
}

async function askRecommended(ids) {
  const list = ids || recommendedMcpIds;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const names = list.map((id) => mcpById(id).name).join(', ');
    const answer = await rl.question(`  Configure recommended MCP servers (${names})? (y/N): `);
    return /^y(es)?$/i.test(answer.trim());
  } finally {
    rl.close();
  }
}

function parseSelection(argv) {
  const explicit = argv.find((a) => a.startsWith('--mcp='));
  if (explicit) return explicit.slice('--mcp='.length).split(',').map((s) => s.trim()).filter(Boolean);
  if (argv.includes('--all-mcp')) return MCP_SERVERS.map((s) => s.id);
  const positional = argv.filter((a) => !a.startsWith('-'));
  if (positional.length) return positional;
  return [];
}

function effectiveRecommendedIds(browsers) {
  const choice = chooseDevtoolsServer(browsers);
  if (choice.id === 'chrome-devtools') return recommendedMcpIds;
  return recommendedMcpIds.map((id) => (id === 'chrome-devtools' ? choice.id : id));
}

function logBrowsers(browsers) {
  if (!browsers.length) {
    log('i', 'No browser detected on this machine');
    return;
  }
  log('i', `Detected browsers: ${browsers.map((b) => b.name).join(', ')}`);
}

function printBrowsers() {
  const browsers = detectBrowsers();
  console.log('\n  Detected browsers:');
  if (!browsers.length) console.log('  - none found');
  for (const b of browsers) {
    console.log(`  - ${b.name} (${b.family}${b.path ? ' — ' + b.path : ''})`);
  }
  const devtools = chooseDevtoolsServer(browsers);
  console.log(`\n  Recommended devtools MCP: ${mcpById(devtools.id).name}\n  ${devtools.reason}\n`);
}

async function installMissingMcps(agents, argv) {
  if (argv.includes('--no-mcp') || argv.includes('--no-playwright')) {
    log('–', 'MCP setup skipped (--no-mcp)');
    console.log('');
    return;
  }
  if (argv.some((a) => a.startsWith('--mcp=')) || argv.includes('--all-mcp')) {
    await setupMcps(agents, argv);
    return;
  }

  const browsers = detectBrowsers();
  const browserArgs = {};
  const extra = playwrightArgsFor(browsers);
  if (extra.length) browserArgs.playwright = extra;

  const summary = configureMcps(agents, MCP_SERVERS.map((s) => s.id), browserArgs);
  printSummary(summary);

  const devtools = chooseDevtoolsServer(browsers);
  if (devtools.reason) console.log(`  ${devtools.reason}`);
  console.log('  Tip: restart your AI agent so the new MCP servers are picked up.\n');
}

async function setupMcps(agents, argv) {
  if (argv.includes('--no-mcp') || argv.includes('--no-playwright')) {
    log('–', 'MCP setup skipped (--no-mcp)');
    console.log('');
    return;
  }

  const browsers = detectBrowsers();
  logBrowsers(browsers);
  const devtools = chooseDevtoolsServer(browsers);
  const recommended = effectiveRecommendedIds(browsers);

  let selection = parseSelection(argv);
  const force = argv.includes('--yes') || argv.includes('--all-mcp') || selection.length > 0;

  if (!selection.length) {
    const allConfigured = recommended.every((id) => agents.every((a) => isMcpConfiguredFor(a, id)));
    if (allConfigured) {
      log('✓', 'recommended MCP servers already available');
      console.log('');
      return;
    }
    if (process.stdout.isTTY && !force) {
      const yes = await askRecommended(recommended);
      if (!yes) {
        log('–', 'skipped — run `ai-agents-mcp` or `ai-agents-mcp --all-mcp` later');
        console.log('');
        return;
      }
    } else {
      console.log('  Run `ai-agents-mcp` in a terminal to configure MCP servers.\n');
      return;
    }
    selection = recommended;
  }

  const browserArgs = {};
  if (selection.includes('playwright')) {
    const extra = playwrightArgsFor(browsers);
    if (extra.length) browserArgs.playwright = extra;
  }

  const summary = configureMcps(agents, selection, browserArgs);
  printSummary(summary);
  if (devtools.reason) console.log(`  ${devtools.reason}`);
  console.log('  Tip: restart your AI agent so the new MCP servers are picked up.\n');
}

function printCatalog() {
  console.log(`\n  @lqmnwido/global-ai-agents v${VERSION} — MCP catalog\n`);
  const browsers = detectBrowsers();
  logBrowsers(browsers);
  const devtools = chooseDevtoolsServer(browsers);
  console.log(`  Devtools for this machine: ${mcpById(devtools.id).name}\n  ${devtools.reason}\n`);
  for (const s of MCP_SERVERS) {
    const flags = [
      s.recommended ? 'recommended' : '',
      s.secrets ? 'needs credentials' : 'no credentials',
      s.browserSupport ? `browser: ${s.browserSupport}` : '',
    ]
      .filter(Boolean)
      .join(', ');
    console.log(`  ${s.id.padEnd(16)} ${s.name}`);
    console.log(`  ${''.padEnd(16)} ${s.description}`);
    console.log(`  ${''.padEnd(16)} [${flags}]  ${s.docs}\n`);
  }
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--browsers')) return printBrowsers();
  if (argv.includes('--list')) return printCatalog();

  const agents = index.getConfiguredAgents(argv);
  console.log(`\n  @lqmnwido/global-ai-agents v${VERSION} — MCP Setup`);
  console.log('  Grounded, efficient MCP servers for the harness');
  console.log('  ─────────────────────────────────────────────────────\n');

  await setupMcps(agents, argv);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('\n  ✗ MCP setup failed:', err.message);
    process.exit(1);
  });
}

module.exports = {
  setupMcps,
  installMissingMcps,
  configureMcps,
  configureServerForAgent,
  isMcpConfiguredFor,
  configPathFor,
  parseSelection,
  resolveServer,
  printBrowsers,
};