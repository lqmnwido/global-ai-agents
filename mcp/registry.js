/**
 * MCP server registry — the single source of truth for servers the harness
 * can configure. Consumed by bin/mcp.js.
 *
 * Fields:
 *   id            unique key used in agent config
 *   name          display name
 *   description   one-line purpose
 *   recommended   included in the default interactive setup
 *   command/args  stdio launch command; args may contain ${ENV} placeholders
 *   env           environment variables to inject (values may be ${ENV})
 *   requiredEnv   if any of these are unset, configuration is skipped with instructions
 *   optionalEnv   injected only when set
 *   secrets       true if it needs credentials (never auto-enabled)
 *   docs          reference URL
 *   note          extra guidance
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MCP_SERVERS = [
  {
    id: 'playwright',
    name: 'Playwright',
    description: 'Browser automation for blackbox / E2E testing — works with Chrome, Firefox, WebKit and Edge.',
    recommended: true,
    browserSupport: 'all',
    command: 'npx',
    args: ['-y', '@playwright/mcp@latest'],
    env: {},
    docs: 'https://github.com/microsoft/playwright-mcp',
  },
  {
    id: 'context7',
    name: 'Context7',
    description: 'Up-to-date library/framework docs — grounds code in real APIs to prevent hallucination.',
    recommended: true,
    command: 'npx',
    args: ['-y', '@upstash/context7-mcp@latest'],
    env: { CONTEXT7_API_KEY: '${CONTEXT7_API_KEY}' },
    optionalEnv: ['CONTEXT7_API_KEY'],
    docs: 'https://github.com/upstash/context7',
  },
  {
    id: 'chrome-devtools',
    name: 'Chrome DevTools',
    description: 'Console, network, DOM inspection and performance traces (Lighthouse/Core Web Vitals).',
    recommended: true,
    browserFamily: 'chromium',
    browserSupport: 'Chrome + Chromium-based',
    command: 'npx',
    args: ['-y', 'chrome-devtools-mcp@latest'],
    env: {},
    docs: 'https://github.com/ChromeDevTools/chrome-devtools-mcp',
  },
  {
    id: 'firefox-dev-tools',
    name: 'Firefox DevTools',
    description: 'Inspect and control Firefox via WebDriver BiDi (official Mozilla server).',
    recommended: false,
    browserFamily: 'firefox',
    browserSupport: 'Firefox',
    command: 'npx',
    args: ['-y', '@mozilla/firefox-devtools-mcp@latest'],
    env: {},
    docs: 'https://github.com/mozilla/firefox-devtools-mcp',
    note: 'Requires Firefox (local install) and Node.js ≥ 20.19.',
  },
  {
    id: 'memory',
    name: 'Memory',
    description: 'Persistent knowledge graph across sessions (project conventions and facts).',
    recommended: false,
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-memory'],
    env: { MEMORY_FILE_PATH: '${MEMORY_FILE_PATH}' },
    optionalEnv: ['MEMORY_FILE_PATH'],
    docs: 'https://github.com/modelcontextprotocol/servers',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Issues, PRs, code search and Actions via the official GitHub MCP server.',
    recommended: false,
    secrets: true,
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-github'],
    env: { GITHUB_PERSONAL_ACCESS_TOKEN: '${GITHUB_PERSONAL_ACCESS_TOKEN}' },
    requiredEnv: ['GITHUB_PERSONAL_ACCESS_TOKEN'],
    docs: 'https://github.com/github/github-mcp-server',
  },
  {
    id: 'sentry',
    name: 'Sentry',
    description: 'Pull real production errors and stack traces for /debug.',
    recommended: false,
    secrets: true,
    command: 'npx',
    args: ['-y', '@sentry/mcp-server@latest'],
    env: { SENTRY_ACCESS_TOKEN: '${SENTRY_ACCESS_TOKEN}', SENTRY_HOST: '${SENTRY_HOST}' },
    requiredEnv: ['SENTRY_ACCESS_TOKEN'],
    optionalEnv: ['SENTRY_HOST'],
    docs: 'https://github.com/getsentry/sentry-mcp',
  },
  {
    id: 'database',
    name: 'Database (read-only)',
    description: 'Read-only schema inspection and safe queries (PostgreSQL reference server).',
    recommended: false,
    secrets: true,
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-postgres', '${DATABASE_URL}'],
    env: {},
    requiredEnv: ['DATABASE_URL'],
    docs: 'https://github.com/modelcontextprotocol/servers',
    note: 'Use a read-only database role. MySQL alternative: @benborla29/mcp-server-mysql.',
  },
];

function onPath(...names) {
  for (const name of names) {
    try {
      execSync(process.platform === 'win32' ? `where ${name}` : `which ${name}`, { stdio: 'ignore' });
      return true;
    } catch {
      /* not found */
    }
  }
  return false;
}

function detectBrowsers() {
  const found = [];
  const add = (name, family, p) => {
    if (p && fs.existsSync(p)) found.push({ name, family, path: p });
  };

  if (process.platform === 'win32') {
    const la = process.env.LOCALAPPDATA || '';
    const pf = process.env.PROGRAMFILES || '';
    const pfx = process.env['PROGRAMFILES(X86)'] || '';
    add('Google Chrome', 'chromium', path.join(la, 'Google', 'Chrome', 'Application', 'chrome.exe'));
    add('Google Chrome', 'chromium', path.join(pf, 'Google', 'Chrome', 'Application', 'chrome.exe'));
    add('Microsoft Edge', 'chromium', path.join(pf, 'Microsoft', 'Edge', 'Application', 'msedge.exe'));
    add('Microsoft Edge', 'chromium', path.join(pfx, 'Microsoft', 'Edge', 'Application', 'msedge.exe'));
    add('Brave', 'chromium', path.join(la, 'BraveSoftware', 'Brave-Browser', 'Application', 'brave.exe'));
    add('Brave', 'chromium', path.join(pfx, 'BraveSoftware', 'Brave-Browser', 'Application', 'brave.exe'));
    add('Zen Browser', 'chromium', path.join(la, 'Zen', 'Application', 'zen.exe'));
    add('Zen Browser', 'chromium', path.join(la, 'Zen Browser', 'Application', 'zen.exe'));
    add('Opera', 'chromium', path.join(la, 'Programs', 'Opera', 'opera.exe'));
    add('Opera', 'chromium', path.join(pf, 'Opera', 'opera.exe'));
    add('Vivaldi', 'chromium', path.join(la, 'Vivaldi', 'Application', 'vivaldi.exe'));
    add('Arc', 'chromium', path.join(la, 'Programs', 'Arc', 'Arc.exe'));
    add('Mozilla Firefox', 'firefox', path.join(pf, 'Mozilla Firefox', 'firefox.exe'));
    add('Mozilla Firefox', 'firefox', path.join(pfx, 'Mozilla Firefox', 'firefox.exe'));
    add('Mozilla Firefox', 'firefox', path.join(la, 'Mozilla Firefox', 'firefox.exe'));
    if (onPath('chrome')) add('Chrome (PATH)', 'chromium', null);
    if (onPath('firefox')) add('Firefox (PATH)', 'firefox', null);
  } else if (process.platform === 'darwin') {
    const apps = '/Applications';
    const candidates = [
      ['Google Chrome', 'chromium', path.join(apps, 'Google Chrome.app')],
      ['Brave Browser', 'chromium', path.join(apps, 'Brave Browser.app')],
      ['Microsoft Edge', 'chromium', path.join(apps, 'Microsoft Edge.app')],
      ['Zen Browser', 'chromium', path.join(apps, 'Zen Browser.app')],
      ['Arc', 'chromium', path.join(apps, 'Arc.app')],
      ['Opera', 'chromium', path.join(apps, 'Opera.app')],
      ['Vivaldi', 'chromium', path.join(apps, 'Vivaldi.app')],
      ['Mozilla Firefox', 'firefox', path.join(apps, 'Firefox.app')],
      ['Safari', 'webkit', path.join(apps, 'Safari.app')],
    ];
    for (const [name, family, p] of candidates) add(name, family, p);
  } else {
    const linux = [
      ['Google Chrome', 'chromium', ['google-chrome', 'google-chrome-stable']],
      ['Chromium', 'chromium', ['chromium', 'chromium-browser']],
      ['Brave', 'chromium', ['brave-browser']],
      ['Microsoft Edge', 'chromium', ['microsoft-edge', 'msedge']],
      ['Zen Browser', 'chromium', ['zen-browser']],
      ['Opera', 'chromium', ['opera']],
      ['Vivaldi', 'chromium', ['vivaldi']],
      ['Mozilla Firefox', 'firefox', ['firefox', 'zen-browser']],
    ];
    for (const [name, family, names] of linux) {
      if (onPath(...names)) found.push({ name, family, path: null });
    }
  }

  const seen = new Set();
  return found.filter((b) => {
    const key = `${b.family}|${b.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function browserFamiliesOf(browsers) {
  return [...new Set(browsers.map((b) => b.family))];
}

function chooseDevtoolsServer(browsers = []) {
  const fams = browserFamiliesOf(browsers);
  const names = browsers.map((b) => b.name).join(', ') || 'none detected';
  if (fams.includes('chromium')) {
    return { id: 'chrome-devtools', reason: `Chrome-family browser detected (${names}) → Chrome DevTools MCP` };
  }
  if (fams.includes('firefox')) {
    return { id: 'firefox-dev-tools', reason: `Firefox detected (${names}) → Firefox DevTools MCP` };
  }
  if (fams.includes('webkit')) {
    return { id: 'playwright', reason: `Only Safari/WebKit detected → Playwright MCP drives the WebKit engine` };
  }
  return { id: 'chrome-devtools', reason: 'No browser detected → defaulting to Chrome DevTools MCP' };
}

function playwrightArgsFor(browsers = []) {
  const fams = browserFamiliesOf(browsers);
  if (fams.includes('chromium')) return [];
  if (fams.includes('firefox')) return ['--browser=firefox'];
  if (fams.includes('webkit')) return ['--browser=webkit'];
  return [];
}

function mcpById(id) {
  return MCP_SERVERS.find((s) => s.id === id) || null;
}

const recommendedMcpIds = MCP_SERVERS.filter((s) => s.recommended).map((s) => s.id);

module.exports = {
  MCP_SERVERS,
  mcpById,
  recommendedMcpIds,
  detectBrowsers,
  browserFamiliesOf,
  chooseDevtoolsServer,
  playwrightArgsFor,
};