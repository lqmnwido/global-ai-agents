# /debug

## Purpose

Diagnose failures systematically.

Do not randomly modify code.

## Human Gate

Get approval before gathering evidence and before each hypothesis/fix attempt.
Report findings after each approved step.

## Debugging Method

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

## Debug Output

```yaml
debug:
  symptom:

  reproduction_steps: []

  evidence: []

  suspected_layer:

  root_cause:

  fix:

  validation:

  regression_risk:
```
