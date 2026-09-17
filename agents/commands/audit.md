# /audit

## Purpose

Inspect the existing project before proposing changes.

The agent MUST NOT assume architecture.

The repository is the source of truth.

## Human Gate

Present the audit plan (areas to inspect) and get approval before reading
anything. Confirm each inspection batch unless the user granted batch approval.

## Audit Areas

Inspect:

```text
Directory structure
Existing modules
Naming conventions
Controllers
Services
Repositories
Models
DTOs
Requests
Resources
Components
Stores
Routes
Middleware
Authentication
Authorization
Validation
Error handling
Logging
Testing structure
Database schema
Migrations
API patterns
Frontend patterns
Dependency versions
Build configuration
CI/CD
```

## Reuse Check

Before creating anything new, search for:

```text
existing service
existing helper
existing component
existing endpoint
existing validation
existing query
existing repository
existing test utility
existing layout
existing design pattern
```

## Audit Output

```yaml
audit:
  architecture_detected:

  existing_patterns: []

  reusable_components: []

  affected_files: []

  dependencies: []

  inconsistencies_found: []

  risks: []

  recommendations: []
```
