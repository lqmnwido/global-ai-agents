# AGENTS.md

## Company

**lqmnwido**

This file is the master entry point for the global AI development harness
installed by the `@lqmnwido/global-ai-agents` npm package.

It is the **router**: every rule lives in its own standalone `.md` module.
This file does not duplicate rules. Read the referenced modules before making any
decision, exactly as if the content were inline.

**Active agent:** {{AGENT_NAME}} (id: `{{AGENT_ID}}`)

---

## A. Master Entry Point — Load Order

The agent MUST process this unless the request is trivial.

```text
0.  If `.doc/agents.md` exists, read it and load ONLY the modules it lists for
    this project (project manifest); otherwise continue with the load order below.
1.  Read AGENTS.md (this file)
2.  Read {{MOD}}INDEX.md                           # full file inventory
3.  Read {{MOD}}standards/core.md                  # core engineering principles
4.  Read {{MOD}}standards/hierarchy.md             # agent hierarchy
5.  Read {{MOD}}standards/philosophy.md            # core philosophy + golden rule
6.  Read {{MOD}}standards/human-review.md          # human review first — confirm everything
7.  Read {{MOD}}standards/anti-slop.md             # zero-slop output standard
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
{{MOD}}commands/scope.md
{{MOD}}commands/audit.md
{{MOD}}commands/architect.md
{{MOD}}commands/develop.md
{{MOD}}commands/check.md
{{MOD}}commands/test.md
{{MOD}}commands/debug.md
{{MOD}}commands/document.md
{{MOD}}commands/sync.md
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
{{MOD}}frameworks/laravel.md
{{MOD}}frameworks/symfony.md
{{MOD}}frameworks/wordpress.md
```

Node.js / JavaScript / TypeScript:
```text
{{MOD}}frameworks/express.md
{{MOD}}frameworks/nestjs.md
{{MOD}}frameworks/fastify.md
{{MOD}}frameworks/nextjs.md
```

Python:
```text
{{MOD}}frameworks/django.md
{{MOD}}frameworks/flask.md
{{MOD}}frameworks/fastapi.md
```

Java:
```text
{{MOD}}frameworks/spring-boot.md
{{MOD}}frameworks/quarkus.md
```

.NET / C#:
```text
{{MOD}}frameworks/aspnet-core.md
{{MOD}}frameworks/blazor.md
```

Go:
```text
{{MOD}}frameworks/gin.md
{{MOD}}frameworks/echo.md
{{MOD}}frameworks/fiber.md
```

Ruby:
```text
{{MOD}}frameworks/rails.md
```

Kotlin:
```text
{{MOD}}frameworks/ktor.md
```

Rust:
```text
{{MOD}}frameworks/axum.md
{{MOD}}frameworks/actix-web.md
```

Frontend libraries:
```text
{{MOD}}frameworks/react.md
{{MOD}}frameworks/vue.md
{{MOD}}frameworks/angular.md
{{MOD}}frameworks/svelte.md
{{MOD}}frameworks/nuxt.md
{{MOD}}frameworks/sveltekit.md
```

Mobile:
```text
{{MOD}}frameworks/flutter.md
{{MOD}}frameworks/react-native.md
```

### Databases

```text
{{MOD}}databases/mysql.md
{{MOD}}databases/postgresql.md
{{MOD}}databases/mariadb.md
{{MOD}}databases/mongodb.md
{{MOD}}databases/microsoft-sql-server.md
{{MOD}}databases/sqlite.md
{{MOD}}databases/redis.md
{{MOD}}databases/elasticsearch.md
```

### Tooling

```text
{{MOD}}tooling/docker.md
{{MOD}}tooling/kubernetes.md
{{MOD}}tooling/terraform.md
{{MOD}}tooling/aws.md
{{MOD}}tooling/azure.md
{{MOD}}tooling/github-actions.md
```

---

## D. Application Skills

```text
{{MOD}}architecture/system.md
{{MOD}}architecture/backend-patterns.md
{{MOD}}architecture/frontend-patterns.md
{{MOD}}architecture/database-rules.md
{{MOD}}backend/api-design.md
{{MOD}}backend/authentication.md
{{MOD}}backend/authorization.md
{{MOD}}backend/database.md
```

Frontend skills:

```text
{{MOD}}frontend/component-design.md
{{MOD}}frontend/forms.md
{{MOD}}frontend/state-management.md
{{MOD}}frontend/accessibility.md
{{MOD}}frontend/css.md
{{MOD}}frontend/testing.md
```

---

## E. Cross-Cutting Skills

Quality, security, and operations. Read matching modules before work in those areas.

```text
{{MOD}}quality/testing.md
{{MOD}}quality/debugging.md
{{MOD}}quality/code-review.md
{{MOD}}quality/security-review.md
{{MOD}}quality/browser-testing.md
{{MOD}}quality/refactoring.md
{{MOD}}quality/performance.md
{{MOD}}operations/git.md
{{MOD}}operations/deployment.md
{{MOD}}operations/nginx.md
{{MOD}}operations/database-migration.md
{{MOD}}operations/incident-response.md
```

---

## F. Rules, Standards and Conventions

Mandatory reading for all development. Not optional.

```text
{{MOD}}standards/secrets.md
{{MOD}}standards/logging.md
{{MOD}}standards/error-handling.md
{{MOD}}standards/observability.md
{{MOD}}standards/naming.md
{{MOD}}standards/dependencies.md
{{MOD}}standards/security.md
{{MOD}}standards/testing.md
{{MOD}}standards/definition-of-done.md
{{MOD}}standards/agent-rules.md
{{MOD}}standards/architecture.md
{{MOD}}standards/tool-approval.md
{{MOD}}standards/human-review.md
{{MOD}}standards/anti-slop.md
{{MOD}}standards/context-engineering.md
{{MOD}}standards/agent-security.md
{{MOD}}standards/data-privacy.md
{{MOD}}standards/mcp.md
{{MOD}}standards/plugins.md
{{MOD}}standards/skills.md
{{MOD}}standards/design-system.md
{{MOD}}standards/decisions.md
{{MOD}}standards/impact-classification.md
{{MOD}}standards/response-format.md
{{MOD}}standards/production-gate.md
{{MOD}}standards/authority-order.md
{{MOD}}standards/completion.md
{{MOD}}standards/harness.md
{{MOD}}standards/frontend.md
{{MOD}}standards/backend.md
{{MOD}}standards/api.md
```

---

## G. Configuration

Project-level configuration lives in `.doc/config.yaml`.

Global harness config lives at `{{MOD}}config.yaml`.

Templates for reports and ADRs live at `{{MOD}}templates/`.

---

## H. Minimum Viable Compliance

At minimum, before ANY code change the agent MUST read:

```text
{{MOD}}standards/core.md
{{MOD}}standards/agent-rules.md
{{MOD}}standards/definition-of-done.md
{{MOD}}standards/architecture.md
{{MOD}}standards/authority-order.md
{{MOD}}standards/human-review.md
{{MOD}}standards/anti-slop.md
{{MOD}}standards/agent-security.md
```

For command-driven work, also read the command's module from `{{MOD}}commands/`.

---

## I. Reference Without Inline Duplication

If a referenced module's content is already present elsewhere, do not paste it here.

Update the module file instead. This router holds only loading instructions.