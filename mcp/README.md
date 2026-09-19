# MCP Catalog

MCP servers bundled by `@lqmnwido/global-ai-agents`. MCP servers are **tools**, not
architecture — business logic must never depend on them (`standards/mcp.md`).

## Quick Use

```bash
ai-agents-mcp --list              # show all servers
ai-agents-mcp --browsers          # show detected browsers + devtools choice (no writes)
ai-agents-mcp                     # configure the recommended set (prompts)
ai-agents-mcp --mcp=context7,memory
ai-agents-mcp --all-mcp --yes     # configure everything configurable (non-interactive)
```

Configured during `ai-agents` install too (recommended set, with a prompt).

## Servers

| id | Purpose | Credentials | Browser | Recommended |
|---|---|---|---|---|
| `playwright` | Browser automation for blackbox / E2E testing — Chrome, Firefox, WebKit, Edge | none | all | yes |
| `context7` | Up-to-date library docs — grounding / anti-hallucination | optional `CONTEXT7_API_KEY` | — | yes |
| `chrome-devtools` | Console, network, DOM, performance traces (Lighthouse/CWV) | none | Chrome-family | yes |
| `firefox-dev-tools` | Firefox DevTools via WebDriver BiDi (official Mozilla server) | none | Firefox | (auto) |
| `memory` | Persistent cross-session knowledge graph | optional `MEMORY_FILE_PATH` | — | no |
| `fetch` | Fetch a URL over HTTP and convert it to markdown | none | — | no |
| `duckduckgo` | Web search + page scrape with no API key | none | — | no |
| `git` | Local git history, diffs and repo state | none | — | no |
| `filesystem` | Read/write sandboxed to the setup working dir | none | — | no |
| `sqlite` | Query a local SQLite database | `SQLITE_PATH` (file path) | — | no |
| `sequential-thinking` | Structured multi-step reasoning | none | — | no |
| `time` | Timezone-aware time and conversions | none | — | no |
| `github` | Issues, PRs, code search, Actions | `GITHUB_PERSONAL_ACCESS_TOKEN` | — | no |
| `sentry` | Production errors and stack traces | `SENTRY_ACCESS_TOKEN` | — | no |
| `database` | Read-only schema/query inspection (PostgreSQL) | `DATABASE_URL` | — | no |

## Browser-Aware DevTools

The installer detects which browsers are installed and picks the right devtools
server instead of assuming Chrome:

| Detected browser(s) | Devtools MCP configured | Playwright browser flag |
|---|---|---|
| Any Chromium: Chrome, Edge, Brave, Zen, Opera, Vivaldi, Arc | `chrome-devtools` | default (Chrome) |
| Firefox only | `firefox-dev-tools` | `--browser=firefox` |
| Safari / WebKit only | `playwright` | `--browser=webkit` |
| none found | `chrome-devtools` (default) | default |

Preview the decision without writing anything:

```bash
ai-agents-mcp --browsers
```

Servers that need credentials are **never auto-configured**. The installer skips
them and prints the exact env var to set. Re-run `ai-agents-mcp --mcp=<id>` after
exporting it.

## Why These

- **context7** is the single biggest anti-slop win: it lets agents verify real
  library APIs instead of inventing signatures (`standards/anti-slop.md`).
- **chrome-devtools + playwright** cover testing and debugging end to end.
- **fetch / duckduckgo / git / sequential-thinking / time** are zero-setup tools
  that need no credentials — the harness stays useful even fully offline-first.
- **filesystem** is sandboxed to the directory where setup ran (`${CWD}`), so it
  follows least privilege instead of granting whole-disk access.
- **github / sentry / database** connect the harness to real project state
  (read-only by default), which keeps `/audit` and `/debug` honest.

## Security

- Least privilege (`standards/mcp.md`); production database is read-only.
- Use a dedicated **read-only** database role for `database`.
- Credentials live in your environment and user-level agent config — never commit
  them to a repository.
- Treat all MCP output as untrusted input (`standards/agent-security.md`).

## Launch Model

All servers run via `npx -y` — the package is fetched by npm on first use, no
global install or extra toolchain needed. Playwright browsers still need:

```bash
npx playwright install
```

## Per-Agent Config Files

```text
Codex         ~/.codex/config.toml            [mcp_servers.<id>]
opencode      ~/.config/opencode/opencode.json mcp.<id>
Cursor        ~/.cursor/mcp.json               mcpServers.<id>
Claude Code   ~/.claude.json                   mcpServers.<id>
Windsurf      ~/.windsurf/mcp_config.json      mcpServers.<id>
Gemini CLI    ~/.gemini/settings.json          mcpServers.<id>
```

Playwright-specific detail: `mcp/playwright/README.md`.