# AGENTS.md

## Company

**lqmnwido**

This file is the master entry point for the global AI development harness
installed by the `@lqmnwido/global-ai-agents` npm package.

It is the **router**: every rule lives in its own standalone `.md` module.
This file does not duplicate rules. Read the referenced modules before making any
decision, exactly as if the content were inline.

**Active agent:** Codex (id: `codex`)

---

## A. Master Entry Point — Load Order

The agent MUST process this unless the request is trivial.

```text
1.  Read AGENTS.md (this file)
2.  Read ~/.codex/agents/INDEX.md                           # full file inventory
3.  Read ~/.codex/agents/standards/core.md                  # core engineering principles
4.  Read ~/.codex/agents/standards/hierarchy.md             # agent hierarchy
5.  Read ~/.codex/agents/standards/philosophy.md            # core philosophy + golden rule
6.  Read ~/.codex/agents/standards/human-review.md          # human review first — confirm everything
7.  Read ~/.codex/agents/standards/anti-slop.md             # zero-slop output standard
```

---

## B. Commands and Workflow

All lifecycle commands are defined as modules in the `commands/` category.

Commands available:

```text
/scope  /audit  /architect  /develop  /check  /test  /debug  /document  /sync
```

Read the module for the command you are about to run:

```text
~/.codex/agents/commands/scope.md
~/.codex/agents/commands/audit.md
~/.codex/agents/commands/architect.md
~/.codex/agents/commands/develop.md
~/.codex/agents/commands/check.md
~/.codex/agents/commands/test.md
~/.codex/agents/commands/debug.md
~/.codex/agents/commands/document.md
~/.codex/agents/commands/sync.md
```

Standard lifecycle flow:

```text
/scope → /audit → /architect → /develop → /check → /test → /document → /sync
```

On failure:

```text
/test → /debug → /develop → /check → /test
```

---

## C. Stack Profiles — Languages, Frameworks, Databases, Tooling

For the project's stack, read the matching profile module.

### Frameworks

PHP:
```text
~/.codex/agents/frameworks/laravel.md
~/.codex/agents/frameworks/symfony.md
~/.codex/agents/frameworks/wordpress.md
```

Node.js / JavaScript / TypeScript:
```text
~/.codex/agents/frameworks/express.md
~/.codex/agents/frameworks/nestjs.md
~/.codex/agents/frameworks/fastify.md
~/.codex/agents/frameworks/nextjs.md
```

Python:
```text
~/.codex/agents/frameworks/django.md
~/.codex/agents/frameworks/flask.md
~/.codex/agents/frameworks/fastapi.md
```

Java:
```text
~/.codex/agents/frameworks/spring-boot.md
~/.codex/agents/frameworks/quarkus.md
```

.NET / C#:
```text
~/.codex/agents/frameworks/aspnet-core.md
~/.codex/agents/frameworks/blazor.md
```

Go:
```text
~/.codex/agents/frameworks/gin.md
~/.codex/agents/frameworks/echo.md
~/.codex/agents/frameworks/fiber.md
```

Ruby:
```text
~/.codex/agents/frameworks/rails.md
```

Kotlin:
```text
~/.codex/agents/frameworks/ktor.md
```

Rust:
```text
~/.codex/agents/frameworks/axum.md
~/.codex/agents/frameworks/actix-web.md
```

Frontend libraries:
```text
~/.codex/agents/frameworks/react.md
~/.codex/agents/frameworks/vue.md
~/.codex/agents/frameworks/angular.md
~/.codex/agents/frameworks/svelte.md
~/.codex/agents/frameworks/nuxt.md
~/.codex/agents/frameworks/sveltekit.md
```

Mobile:
```text
~/.codex/agents/frameworks/flutter.md
~/.codex/agents/frameworks/react-native.md
```

### Databases

```text
~/.codex/agents/databases/mysql.md
~/.codex/agents/databases/postgresql.md
~/.codex/agents/databases/mariadb.md
~/.codex/agents/databases/mongodb.md
~/.codex/agents/databases/microsoft-sql-server.md
~/.codex/agents/databases/sqlite.md
~/.codex/agents/databases/redis.md
~/.codex/agents/databases/elasticsearch.md
```

### Tooling

```text
~/.codex/agents/tooling/docker.md
~/.codex/agents/tooling/kubernetes.md
~/.codex/agents/tooling/terraform.md
~/.codex/agents/tooling/aws.md
~/.codex/agents/tooling/azure.md
~/.codex/agents/tooling/github-actions.md
```

---

## D. Application Skills

```text
~/.codex/agents/architecture/system.md
~/.codex/agents/architecture/backend-patterns.md
~/.codex/agents/architecture/frontend-patterns.md
~/.codex/agents/architecture/database-rules.md
~/.codex/agents/backend/api-design.md
~/.codex/agents/backend/authentication.md
~/.codex/agents/backend/authorization.md
~/.codex/agents/backend/database.md
```

Frontend skills:

```text
~/.codex/agents/frontend/component-design.md
~/.codex/agents/frontend/forms.md
~/.codex/agents/frontend/state-management.md
~/.codex/agents/frontend/accessibility.md
~/.codex/agents/frontend/css.md
~/.codex/agents/frontend/testing.md
```

---

## E. Cross-Cutting Skills

Quality, security, and operations. Read matching modules before work in those areas.

```text
~/.codex/agents/quality/testing.md
~/.codex/agents/quality/debugging.md
~/.codex/agents/quality/code-review.md
~/.codex/agents/quality/security-review.md
~/.codex/agents/quality/browser-testing.md
~/.codex/agents/quality/refactoring.md
~/.codex/agents/quality/performance.md
~/.codex/agents/operations/git.md
~/.codex/agents/operations/deployment.md
~/.codex/agents/operations/nginx.md
~/.codex/agents/operations/database-migration.md
~/.codex/agents/operations/incident-response.md
```

---

## F. Rules, Standards and Conventions

Mandatory reading for all development. Not optional.

```text
~/.codex/agents/standards/secrets.md
~/.codex/agents/standards/logging.md
~/.codex/agents/standards/error-handling.md
~/.codex/agents/standards/observability.md
~/.codex/agents/standards/naming.md
~/.codex/agents/standards/dependencies.md
~/.codex/agents/standards/security.md
~/.codex/agents/standards/testing.md
~/.codex/agents/standards/definition-of-done.md
~/.codex/agents/standards/agent-rules.md
~/.codex/agents/standards/architecture.md
~/.codex/agents/standards/tool-approval.md
~/.codex/agents/standards/human-review.md
~/.codex/agents/standards/anti-slop.md
~/.codex/agents/standards/context-engineering.md
~/.codex/agents/standards/agent-security.md
~/.codex/agents/standards/data-privacy.md
~/.codex/agents/standards/mcp.md
~/.codex/agents/standards/plugins.md
~/.codex/agents/standards/skills.md
~/.codex/agents/standards/design-system.md
~/.codex/agents/standards/decisions.md
~/.codex/agents/standards/impact-classification.md
~/.codex/agents/standards/response-format.md
~/.codex/agents/standards/production-gate.md
~/.codex/agents/standards/authority-order.md
~/.codex/agents/standards/completion.md
~/.codex/agents/standards/harness.md
~/.codex/agents/standards/frontend.md
~/.codex/agents/standards/backend.md
~/.codex/agents/standards/api.md
```

---

## G. Configuration

Project-level configuration lives in `.ai/config.yaml`.

Global harness config lives at `~/.codex/agents/config.yaml`.

Templates for reports and ADRs live at `~/.codex/agents/templates/`.

---

## H. Minimum Viable Compliance

At minimum, before ANY code change the agent MUST read:

```text
~/.codex/agents/standards/core.md
~/.codex/agents/standards/agent-rules.md
~/.codex/agents/standards/definition-of-done.md
~/.codex/agents/standards/architecture.md
~/.codex/agents/standards/authority-order.md
~/.codex/agents/standards/human-review.md
~/.codex/agents/standards/anti-slop.md
~/.codex/agents/standards/agent-security.md
```

For command-driven work, also read the command's module from `~/.codex/agents/commands/`.

---

## I. Reference Without Inline Duplication

If a referenced module's content is already present elsewhere, do not paste it here.

Update the module file instead. This router holds only loading instructions.