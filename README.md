# Global AI Agents

Global AI Development Harness for **lqmnwido**.

Install via **npm** — one command configures **all major AI coding agents** at once.

## What It Does

- Installs **112 modular `.md` skill files** (one concept per file) into the global config directory of every supported AI agent.
- The root `AGENTS.md` is a **router**: it only references modules. Each rule/standard/command lives in its own file.
- Supports **all popular languages and frameworks** (Laravel, Spring Boot, Django, Rails, ASP.NET Core, Go, Rust, Kotlin, FastAPI, Next.js, NestJS, React, Vue, Angular, Flutter, and 25+ more).
- Supports **every major AI coding agent** through the same shared modules.

## Supported Agents

| Agent | Global file installed | Modules installed to |
|---|---|---|
| **Codex** | `~/.codex/AGENTS.md` | `~/.codex/agents/` |
| **Claude Code** | `~/.claude/CLAUDE.md` | `~/.claude/agents/` |
| **Cursor** | `~/.cursor/rules/global-ai-agents.mdc` | `~/.cursor/agents/` |
| **Windsurf** | `~/.windsurf/rules/global-ai-agents.md` | `~/.windsurf/agents/` |
| **opencode** | `~/.config/opencode/AGENTS.md` | `~/.config/opencode/agents/` |
| **Gemini CLI** | `~/.gemini/AGENTS.md` | `~/.gemini/agents/` |

Each agent's router is generated from a single template with paths rendered for that agent
(e.g. Claude Code uses `@agents/...` relative imports; Cursor gets a `.mdc` global rule).

## Installation

### Global install (recommended)

```bash
npm install -g @lqmnwido/global-ai-agents
```

The postinstall script runs automatically and installs everything for all supported agents.

Updating is the same command — never uninstall:

```bash
npm update -g @lqmnwido/global-ai-agents
```

Every install/update refreshes all agents in place (managed files are always overwritten to the latest version).

Or install per project:

```bash
npm install -D @lqmnwido/global-ai-agents
```

### CLI

```bash
ai-agents              # install / refresh all agents (idempotent)
ai-agents-install
ai-agents-uninstall    # removes modules + routers, keeps original files backed up
ai-agents-mcp          # configure MCP servers (--list, --browsers, --all-mcp, --mcp=id,id)
ai-agents-slop         # scan code/diffs for AI slop (--staged, --json, --strict)
ai-agents-playwright   # legacy: Playwright MCP only (alias for ai-agents-mcp --mcp=playwright)
ai-agents-check        # harness integrity check (router refs, gates, markers, slop)
```

Run `npm test` (same as `ai-agents-check`) in the package directory to verify
the harness end-to-end: router references resolve for all 6 agents, module
inventory matches the router, every command module has its **Human Gate**, marker
detection works, bins + packaged files exist, no legacy branding remains, and the
anti-slop scanner passes over every module. Exit code 0 = healthy.

### Selecting specific agents

```bash
GLOBAL_AGENTS_TARGETS=codex,claude ai-agents   # only Codex + Claude Code
```

### Testing with a scratch home

```bash
GLOBAL_AGENTS_HOME=/tmp/fake-home ai-agents
```

## What Gets Installed

```text
~/.codex/agents/                        (and equivalent for other agents)
│
├── INDEX.md          # auto-generated inventory of all 112 modules
├── config.yaml       # harness configuration
├── AGENTS.md         # router for that agent
│
├── standards/        # 34 rules modules (core, human-review, anti-slop, agent-security, ...)
├── commands/         # 9 lifecycle commands (/scope /audit /develop ...)
├── frameworks/       # 29 stack profiles (laravel, spring-boot, django, ...)
├── databases/        # 8 database profiles (mysql, postgresql, mongodb, ...)
├── tooling/          # 6 tooling profiles (docker, kubernetes, terraform, ...)
├── architecture/     # 4 architecture standards
├── backend/          # 4 backend patterns
├── frontend/         # 6 frontend skills
├── quality/          # 7 quality skills (testing, browser-testing, refactoring, performance, ...)
├── operations/       # 5 operations skills (git, deployment, incident-response, ...)
└── templates/        # report, ADR + verification templates
```

Every agent also gets the lifecycle commands as **native slash commands**,
written to each tool's own command directory:

```text
codex     → ~/.codex/skills/                    (skills, invoked as $test-gag, ...)
claude    → ~/.claude/commands/
cursor    → ~/.cursor/commands/
windsurf  → ~/.codeium/windsurf/global_workflows/
opencode  → ~/.config/opencode/command/
gemini    → ~/.gemini/commands/                (TOML)
```

The command name differs per harness — use the native syntax:

| Harness    | Example            | Notes |
|------------|--------------------|-------|
| Codex      | `$test-gag`        | Skills. Custom `/` prompts were removed upstream. Or use `/skills` to browse. |
| Claude Code | `/test`            | Native command directory |
| Cursor     | `/test`            | Native command directory |
| Windsurf   | `/test`            | Global workflows (Cascade) |
| opencode   | `/test`            | Native command directory |
| Gemini CLI | `/test`            | TOML commands; subfolders namespace as `/git:commit` |

Files this package owns carry an `@lqmnwido/global-ai-agents` marker;
pre-existing commands with the same name are never overwritten, and
`ai-agents-uninstall` removes only the marked ones.

### Available `/` Commands

The harness registers the lifecycle as slash commands in every agent:

| Command      | What it does |
|--------------|--------------|
| `/scope`     | Understand exactly what needs to change; approve the approach before work starts |
| `/audit`     | Inspect the codebase and report findings before designing anything |
| `/architect` | Present design options (economy / recommended / full) and approve one before any code |
| `/develop`   | Implement only the approved plan, in approved stages |
| `/check`     | Run the project's lint / type / format checks (`npm run lint`, `npm run typecheck`, ...) |
| `/test`      | Run the test plan, including development blackbox tests (positive / negative / bug-error) |
| `/debug`     | Reproduce the issue, hypothesize, and fix step by step — each step approved |
| `/document`  | Update documentation for the change, at the approved scope |
| `/sync`      | Anti-slop scan, stage, commit and push with an approved message |

Per-agent invocation:

- Claude, Cursor, Windsurf, opencode, Gemini: type `/test` directly.
- Gemini namespaces subfolders: `commands/git/commit.toml` → `/git:commit`.
- Codex: custom prompts were removed upstream, so `/test` is not accepted
  (that is expected). Use the installed **skills** instead — every lifecycle
  gate ships as a Codex skill named `<command>-gag`:

  - Type `$test-gag`, `$develop-gag`, `$sync-gag`, ... to invoke one, or
  - Type `/skills` and pick one from the menu.

  The skills live in `~/.codex/skills/<command>-gag/SKILL.md` with an
  `agents/openai.yaml` (manual invocation only — the harness gates are
  human-triggered by design). The modules also still auto-load through
  `AGENTS.md` regardless.
- Each agent also keeps its own built-in `/` commands (`/help`, `/agents`,
  `/compact`, ...) alongside these.

## Human Review First

The harness runs under **human supervision**. No action — including read-only
investigation — runs without the user's explicit approval.

- `standards/human-review.md` is loaded at startup (Section A load order) and is
  part of the mandatory minimum compliance set.
- Every step: state intent → present options → wait for approval → execute → report.
- Every planning step must offer options (economy / recommended / full) and wait.
- Read-only actions are **not** exempt: confirm everything.
- Every lifecycle command (`/scope` … `/sync`) has its own human gate.
- `config.yaml` ships with `human_review.required: true` and
  `human_review.read_only_exempt: false`.
- Users may grant a one-off batch approval for a specific task; it is never assumed.

## MCP Servers

Efficient, grounded tooling. See `mcp/README.md` for the full catalog.

| id | Purpose | Credentials |
|---|---|---|
| `playwright` | Browser automation for blackbox / E2E testing (Chrome, Firefox, WebKit, Edge) | none |
| `context7` | Up-to-date library docs (anti-hallucination grounding) | optional |
| `chrome-devtools` | Console, network, DOM, performance traces (Chrome-family) | none |
| `firefox-dev-tools` | Firefox DevTools (WebDriver BiDi, auto-selected for Firefox) | none |
| `memory` | Persistent cross-session knowledge graph | optional |
| `github` | Issues, PRs, code search, Actions | token |
| `sentry` | Production errors and stack traces | token |
| `database` | Read-only schema/query inspection (PostgreSQL) | connection string |

```bash
ai-agents-mcp --list                    # show catalog
ai-agents-mcp --browsers                # show detected browsers + devtools choice
ai-agents-mcp                           # configure recommended set (prompts)
ai-agents-mcp --mcp=context7,memory     # pick servers
ai-agents-mcp --all-mcp --yes           # everything configurable
ai-agents --no-mcp                      # skip MCP setup at install
```

- The devtools server is **browser-aware**: the installer detects installed
  browsers (Chrome family → `chrome-devtools`, Firefox → `firefox-dev-tools`,
  Safari/WebKit → Playwright `--browser=webkit`) and configures accordingly.
  Playwright MCP switches to `--browser=firefox` when Firefox is the primary browser.
- During `npm install -g`, the harness checks which MCP servers are missing and
  asks to install them (answering `y` installs everything available). npm hides
  postinstall output by default, so use `--foreground-scripts` to see and
  answer that prompt:

  ```bash
  npm install -g @lqmnwido/global-ai-agents@<version> --foreground-scripts
  ```

  Or skip the prompt and install missing servers non-interactively with
  `ai-agents-mcp --all-mcp --yes`.
- Servers needing credentials are **never auto-configured** — the installer prints
  the exact env var to set.
- Configs are written to each agent (Codex `config.toml`, opencode `opencode.json`,
  Cursor `mcp.json`, Claude `~/.claude.json`, Windsurf `mcp_config.json`, Gemini
  `settings.json`). All run via `npx -y` — no global install.
- `GLOBAL_AGENTS_HOME` test mode redirects config writes into the scratch home.

## Zero Slop

Slop is output that looks like work but is not. The harness enforces against it:

- `standards/anti-slop.md` — banned prose and code patterns, grounding rules
  (never invent APIs), evidence rules (never fabricate success). Loaded at startup.
- `standards/context-engineering.md` — read-before-write, re-read-before-edit,
  verify-don't-recall; prevents stale-context errors.
- **`ai-agents-slop`** — a real scanner, because rules alone don't enforce:

```bash
ai-agents-slop --staged     # scan added lines in staged changes
ai-agents-slop src/         # scan paths
ai-agents-slop --strict     # fail on warnings too
```

Flags TODO stubs, placeholder text, empty catches, `any`, debug output,
commented-out code, hardcoded secrets/localhost URLs, and slop prose phrases.
Configure via `.ai/slopignore` and `.ai/slop.json`.

- `standards/data-privacy.md` (PDPA/GDPR) and `standards/agent-security.md`
  (prompt-injection / untrusted-input defense) close the remaining gaps.
- `templates/verification-report.md` forces evidence for every "done" claim.

## How the Router Works

`AGENTS.md` (per agent) is the master router:

```text
Commands    →  {{MOD}}commands/*.md        e.g. ~/.codex/agents/commands/scope.md
Standards   →  {{MOD}}standards/*.md
Frameworks  →  {{MOD}}frameworks/*.md      e.g. ~/.codex/agents/frameworks/laravel.md
Databases   →  {{MOD}}databases/*.md
Tooling     →  {{MOD}}tooling/*.md
```

**Rule of thumb:** the router routes, module files contain the rules.