#!/usr/bin/env node

const index = require('../index.js');
const mcp = require('./mcp.js');
const VERSION = require('../package.json').version;

async function main() {
  const argv = process.argv.slice(2);
  const agents = index.getConfiguredAgents(argv);

  console.log(`\n  @lqmnwido/global-ai-agents v${VERSION} — Playwright MCP Setup`);
  console.log('  Blackbox testing via browser automation MCP');
  console.log('  ─────────────────────────────────────────────────────\n');

  if (argv.includes('--no-playwright') || argv.includes('--no-mcp')) {
    console.log('  Skipped.\n');
    return;
  }

  const forwarded = argv.filter(
    (a) => !a.startsWith('--mcp=') && a !== '--all-mcp' && a !== 'playwright'
  );
  await mcp.setupMcps(agents, ['--mcp=playwright', ...forwarded]);
}

main().catch((err) => {
  console.error('\n  ✗ Playwright MCP setup failed:', err.message);
  process.exit(1);
});