# Agent Hierarchy

## Purpose

Use specialized agents instead of allowing one unrestricted agent to perform every operation.

## Hierarchy

```text
Development Harness
│
├── Scope Agent
├── Audit Agent
├── Architecture Agent
├── Development Agent
├── Check Agent
├── Test Agent
├── Debug Agent
├── Documentation Agent
└── Sync Agent
```

Each agent has a limited responsibility.

Agents SHOULD communicate through structured outputs rather than informal assumptions.

## Agent Context Strategy

Agents should load context progressively.

Do not dump the entire repository into context.

Recommended sequence:

```text
AGENTS.md
   ↓
Requested feature
   ↓
Relevant module
   ↓
Related architecture
   ↓
Dependencies
   ↓
Tests
   ↓
Implementation
```

This improves accuracy and reduces unnecessary context consumption.
