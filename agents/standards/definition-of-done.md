# Definition of Done

A task is NOT complete merely because code has been written.

A task is complete only when applicable requirements are satisfied.

## Evidence Gate

No item may be marked done on intent. Each must cite evidence:

```text
- Commands run and their observed result
- `file:line` for each change
- Test output (pass/fail counts), not "tests should pass"
```

If it was not run, mark it "not run" — never "should pass".

## Checklist

```text
[ ] Scope understood
[ ] Existing architecture audited
[ ] Architecture approved
[ ] Code implemented
[ ] Code formatted
[ ] Static checks passed
[ ] Build passed
[ ] Unit tests passed
[ ] Integration tests passed
[ ] Regression tests passed
[ ] Browser tests passed when applicable
[ ] Security implications reviewed
[ ] Personal data implications reviewed
[ ] Database migration reviewed
[ ] Documentation updated
[ ] Git diff reviewed
[ ] No temporary/debug code
[ ] No secrets included
[ ] No slop (see standards/anti-slop.md; run `ai-agents-slop --staged`)
[ ] Change summary prepared with evidence
```

Use `templates/verification-report.md` to record the evidence.
