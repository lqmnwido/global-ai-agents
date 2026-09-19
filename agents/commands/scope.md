# /scope

## Purpose

Understand exactly what needs to be changed.

No implementation should begin before scope is understood.

## Human Gate

Before starting, confirm the scoping approach with the user: what to inspect and
why. Present the scope as a numbered menu (economy / recommended / full, per
`standards/human-review.md` → Decision Format) and wait for a single-digit
reply. Do not proceed to /audit until the scope is approved.

## Responsibilities

The agent MUST identify:

* Requested feature or bug.
* Business requirement.
* Acceptance criteria.
* Affected modules.
* Affected APIs.
* Affected database tables.
* Affected frontend pages.
* Authentication/authorization implications.
* Backward compatibility concerns.
* Possible migration requirements.
* External integrations.
* Deployment impact.

## Output

```yaml
scope:
  objective:
  type:
    - feature
    - bugfix
    - refactor
    - security
    - performance
    - maintenance

  affected_modules: []

  affected_files: []

  possible_database_changes: false

  possible_api_changes: false

  possible_ui_changes: false

  possible_security_changes: false

  constraints: []

  acceptance_criteria: []

  risks: []
```

## Project Harness Bootstrap

After the scope is approved, if `.doc/agents.md` does not exist, generate it once
so later work loads only the modules this project actually uses.

1. Detect the stack from the repository (`package.json`, `composer.json`,
   `go.mod`, `pyproject.toml`, `pom.xml`, etc.).
2. Read the global load order (`AGENTS.md`) and only the matching stack profile.
3. Emit `.doc/agents.md` from the `project-harness` template.
4. List the global modules in use; mark everything else under "Do Not Load".
5. Seed the Components (Reuse Registry) from the project's existing component
   directory so new modules reuse instead of duplicating.
6. Leave the project `AGENTS.md` untouched, or append a short pointer to
   `.doc/agents.md`.
7. Ensure `.gitignore` follows `operations/git.md` → "What to Commit vs Ignore":
   commit `.doc/`, ignore `.playwright-mcp/` and other ephemeral tool output.

Rules:

- Reference module paths only; never copy global rule bodies into `.doc/agents.md`.
- Use relative module names (no absolute harness paths) so every agent resolves
  them against its own module directory.
- Do not invent modules; list only files that exist in the global harness.
- This step is skipped when `.doc/agents.md` already exists.
