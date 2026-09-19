# Development Harness Architecture

## Purpose

The development harness consists of five main layers.

## Diagram

```text
Developer / AI Coding Agent
          │
          ▼
┌─────────────────────────────┐
│ Development Commands        │
│                             │
│ /scope                      │
│ /audit                      │
│ /architect                  │
│ /develop                    │
│ /check                      │
│ /test                       │
│ /document                   │
│ /sync                       │
│ /debug                      │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│ Agent Harness               │
│                             │
│ AGENTS.md                   │
│ Rules                       │
│ Context                     │
│ Skills                      │
│ Guardrails                  │
│ Workflow                    │
└─────────────┬───────────────┘
              │
       ┌──────┼───────┐
       ▼      ▼       ▼
   Skills   Plugins   MCP
       │      │       │
       └──────┼───────┘
              ▼
┌─────────────────────────────┐
│ Development Environment     │
│                             │
│ Source Code                 │
│ Git                         │
│ Database                    │
│ Browser                     │
│ API                         │
│ CI/CD                       │
│ Documentation               │
│ Infrastructure              │
└─────────────────────────────┘
```

## Harness Responsibilities

The harness is responsible for enforcing:

```text
Architecture
Coding standards
Directory structure
Design patterns
Naming conventions
Testing strategy
Security requirements
Documentation
Git workflow
Dependency management
Database safety
API consistency
Frontend consistency
Deployment readiness
Agent behavior
Tool permissions
```

The harness MUST act as the source of engineering rules for AI-assisted development.

## Repository Structure

Recommended company standard:

```text
project/
│
├── AGENTS.md
│
├── README.md
│
├── CHANGELOG.md
│
├── .doc/
│   │
│   ├── config.yaml
│   │
│   ├── architecture/
│   │   ├── system.md
│   │   ├── backend.md
│   │   ├── frontend.md
│   │   └── database.md
│   │
│   ├── commands/
│   │   ├── scope.md
│   │   ├── audit.md
│   │   ├── architect.md
│   │   ├── develop.md
│   │   ├── check.md
│   │   ├── test.md
│   │   ├── debug.md
│   │   ├── document.md
│   │   └── sync.md
│   │
│   ├── skills/
│   │
│   ├── plugins/
│   │
│   ├── rules/
│   │   ├── security.md
│   │   ├── database.md
│   │   ├── git.md
│   │   └── coding.md
│   │
│   └── templates/
│       ├── architecture-decision.md
│       ├── bug-report.md
│       ├── feature-plan.md
│       └── test-report.md
│
├── .mcp/
│   ├── README.md
│   └── example.config.json
│
├── docs/
├── src/
└── tests/
```

## Company-Level Harness

Company-wide standards SHOULD live outside individual repositories.

Recommended:

```text
lqmnwido-development-harness/
│
├── AGENTS.base.md
│
├── skills/
├── plugins/
├── commands/
├── rules/
├── templates/
├── mcp/
└── versions/
```

Each project can then extend it.

Example:

```text
Company Standards
       │
       ▼
Project AGENTS.md
       │
       ▼
Project Architecture
       │
       ▼
Module Rules
```

Company standards should not be copied and manually changed across dozens of repositories where possible.

Prefer versioned shared standards.

## Configuration

Example `.doc/config.yaml`:

```yaml
company: lqmnwido

harness_version: "1.0"

architecture:
  enforce_existing_structure: true
  allow_new_patterns: review-required

development:
  require_scope: true
  require_audit: true
  require_tests: true
  require_git_diff_review: true

security:
  production_mutation: approval-required
  secret_detection: enabled

git:
  conventional_commits: true

database:
  destructive_operations: approval-required
  production_access: read-only

browser:
  localhost_testing: enabled
  staging_testing: enabled
  production_testing: restricted
```
