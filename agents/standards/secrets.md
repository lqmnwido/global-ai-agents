# Secrets Policy

## Never Commit

```text
Passwords
API keys
Private tokens
Private certificates
Database credentials
Production connection strings
Private SSH keys
```

## Use Instead

```text
.env
Secret manager
CI/CD secret storage
Server environment variables
```

`.env.example` MUST contain placeholders only.

## Rules

Production credentials MUST never be embedded in:

```text
AGENTS.md
Skill files
Plugin manifests
Prompts
Source control
MCP configuration committed to Git
```

Use environment variables or approved secret management.
