# MCP Architecture

## Purpose

MCP provides access to external capabilities.

MCP servers are **tools**, not architecture.

Business logic MUST NOT depend directly on MCP implementation details.

## Recommended MCP Categories

```text
Filesystem MCP
Git MCP
Database MCP
Browser MCP
API MCP
Documentation MCP
Issue Tracker MCP
Design MCP
Container MCP
Observability MCP
```

## Flow

```text
Agent
   │
   ▼
Skill
   │
   ▼
Tool Policy
   │
   ▼
MCP Client
   │
   ▼
MCP Server
   │
   ▼
External System
```

## MCP Security Model

MCP servers MUST follow least privilege.

Recommended permissions:

```text
filesystem:
  default: read
  write: project-directory-only

database:
  development: read-write
  staging: restricted
  production: read-only

git:
  read: allowed
  commit: controlled
  push: controlled

browser:
  localhost: allowed
  staging: allowed
  production: restricted

infrastructure:
  read: allowed
  mutation: approval-required
```

Production credentials MUST never be embedded in MCP configuration committed to Git.

Use environment variables or approved secret management.
