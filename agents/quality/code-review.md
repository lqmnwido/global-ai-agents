# Code Review

## Review Checklist

Before declaring work complete, review:

```text
Scope understood
Architecture audited
Design approved
Code implemented
Formatting applied
Static checks passed
Build passed
Unit tests passed
Integration tests passed
Regression tests passed
Browser tests passed when applicable
Security implications reviewed
Database migration reviewed
Documentation updated
Git diff reviewed
No temporary/debug code
No secrets included
Change summary prepared
```

## Change Impact Classification

```text
LOW

UI text
Minor styling
Small isolated fix

MEDIUM

Business logic
New API
New component
Database query modification

HIGH

Database schema
Authentication
Authorization
Infrastructure
External integration
Deployment
Data migration

CRITICAL

Production data mutation
Security model
Major architecture
Authentication provider
Disaster recovery
Infrastructure topology
```

Validation depth should increase with impact.
