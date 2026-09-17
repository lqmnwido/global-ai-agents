# Deployment

## Production Readiness Gate

Before production deployment:

```text
Code Review
    ↓
Static Analysis
    ↓
Automated Tests
    ↓
Integration Tests
    ↓
Security Review
    ↓
Migration Review
    ↓
Staging Deployment
    ↓
UAT
    ↓
Release Approval
    ↓
Production Deployment
    ↓
Smoke Test
    ↓
Monitoring
```

No AI agent may bypass required organizational release controls.

## Deployment Considerations

```text
Environment configuration
Secrets management
Database migrations
Rollback strategy
Feature flags
Version pinning
Health checks
Monitoring
Logging
Alerting
```

## Tool Approval

Production mutation requires explicit authorization and deployment controls.
