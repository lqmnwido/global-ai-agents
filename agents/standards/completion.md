# Completion Requirement

An AI agent MUST NOT state that work is complete until it can identify:

```text
What changed
Why it changed
Which files changed
Which architecture was followed
What was tested
What passed
What failed
What remains unverified
Whether database changes exist
Whether deployment action is required
```

## Evidence Requirement

Every claim of success MUST be backed by observed evidence:

```text
- The command that was run
- Its actual output (pass/fail counts, exit code)
- `file:line` references for changes
```

Forbidden: "tests should pass", "this should work", "probably fixed",
"I have completed" with no run output.

If a check was not performed, state "not run". Never imply verification that
did not happen. See `standards/anti-slop.md` and `standards/context-engineering.md`.

Record evidence with `templates/verification-report.md`.

A successful implementation must be **understandable, reproducible, testable, and maintainable by another developer**.
