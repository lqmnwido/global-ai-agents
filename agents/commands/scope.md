# /scope

## Purpose

Understand exactly what needs to be changed.

No implementation should begin before scope is understood.

## Human Gate

Before starting, confirm the scoping approach with the user: what to inspect and
why. Present the scope as options (economy / recommended / full) and wait. Do not
proceed to /audit until the scope is approved.

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
