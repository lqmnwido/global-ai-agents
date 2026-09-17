#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const index = require('../index.js');

function main() {
  const argv = process.argv.slice(2);
  const agents = index.getConfiguredAgents(argv);
  const targets = index.resolveTargetIds(argv);

  console.log('\n  @lqmnwido/global-ai-agents — Uninstaller');
  console.log('  Flags:       --codex  --claude  --cursor  --windsurf  --opencode  --gemini  --all');
  console.log('  ──────────────────────────────────────────────────────────────────────\n');

  if (targets.length !== index.AGENT_IDS.length) {
    console.log(`  Removing only from: ${targets.join(', ')}\n`);
  }

  try {
    let removed = 0;

    for (const agent of agents) {
      const agentsDir = path.join(agent.baseDir(), agent.moduleDir);
      const routerPath = path.join(agent.baseDir(), agent.routerFile);

      console.log(`  ${agent.name} (${agent.id})`);

      if (fs.existsSync(agentsDir)) {
        fs.rmSync(agentsDir, { recursive: true, force: true });
        log('✓', `Removed: ${agentsDir}`);
        removed++;
      } else {
        log('–', 'no module directory found');
      }

      if (fs.existsSync(routerPath)) {
        const existing = fs.readFileSync(routerPath, 'utf8');
        if (index.isManagedRouter(existing)) {
          fs.copyFileSync(routerPath, routerPath + '.bak');
          fs.rmSync(routerPath, { force: true });
          log('✓', `Removed router, backup kept at ${routerPath}.bak`);
          removed++;
        } else {
          log('→', `Skipped ${agent.routerFile}: not managed by this package`);
        }
      }

      console.log('');
    }

    if (removed === 0) {
      console.log('  No global AI agent installation found. Nothing to do.\n');
    } else {
      console.log('  Done.\n');
    }
  } catch (err) {
    console.error('\n  ✗ Uninstall failed:', err.message);
    process.exit(1);
  }
}

function log(icon, message) {
  console.log(`  ${icon} ${message}`);
}

main();