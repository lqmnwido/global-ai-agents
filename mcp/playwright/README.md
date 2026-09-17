# Playwright MCP — Blackbox (E2E) Testing

Playwright MCP (`@playwright/mcp`) is the approved browser automation server for
blackbox / end-to-end testing. It exposes tools like `browser_navigate`,
`browser_click`, `browser_fill`, `browser_snapshot`, and `browser_take_screenshot`
to the AI agent.

## Install

```bash
npm install -g @playwright/mcp
```

The `@lqmnwido/global-ai-agents` installer can do this for you:

- Run **`ai-agents`** (or `ai-agents --playwright` to auto-confirm).
- If Playwright MCP is not detected, it asks: *"Should we install and configure it for blackbox testing?"*
- Answer `y` to install the package and write the MCP server config into each agent.

## Per-Agent Configuration

### Codex — `~/.codex/config.toml`

Append (see `codex.toml` in this directory):

```toml
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest"]
```

### opencode — `~/.config/opencode/opencode.json`

Merge (see `opencode.json` in this directory):

```json
{
  "mcp": {
    "playwright": {
      "type": "local",
      "command": ["npx", "@playwright/mcp@latest"],
      "enabled": true
    }
  }
}
```

### Cursor — `~/.cursor/mcp.json`

Merge (see `cursor.mcp.json` in this directory):

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

### Claude Code

```bash
claude mcp add playwright -- npx @playwright/mcp@latest
```

### Windsurf — `~/.windsurf/mcp_config.json`

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

### Gemini CLI — `~/.gemini/settings.json`

Add `playwright` under `mcpServers` with `command: "npx"` and
`args: ["@playwright/mcp@latest"]`.

## First-Run Browsers

Playwright downloads browsers on first launch. If needed:

```bash
npx playwright install
```

The installer is browser-aware: if Firefox is the primary browser (and no
Chromium browser is installed), the Playwright MCP server is configured with
`--browser=firefox`. You can preview the choice with `ai-agents-mcp --browsers`.

After configuration, restart the AI agent so the new MCP server is picked up.