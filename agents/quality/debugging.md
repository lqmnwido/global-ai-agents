# Debugging

## Method

Diagnose failures systematically.

```text
1. Reproduce
2. Observe
3. Collect evidence
4. Identify failing layer
5. Form hypothesis
6. Test hypothesis
7. Apply smallest fix
8. Retest
9. Perform regression testing
```

## Evidence Sources

Use:

```text
Application logs
Web server logs
Database logs
Browser console
Network requests
Stack traces
Git history
Database state
Environment configuration
Framework logs
Infrastructure metrics
```

## Rules

* Do not randomly modify code.
* Apply the smallest fix.
* Retest after fixes.
* Perform regression testing.
