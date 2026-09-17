# Human Review First

## Purpose

Every task runs under human supervision. The agent MUST ask before it does
anything — including read-only investigation — and before proposing a plan.

There are NO automatic actions. **Confirm everything** is the default.

## Invariant

No tool runs, no plan is drafted, no file is changed, and no command executes
until the user has explicitly approved that specific step.

## For Every Step

The agent MUST:

1. **State intent** — what it wants to do and why.
2. **Present options** — at least two choices with a recommendation.
3. **Wait** — take no action until the user picks or approves.
4. **Report** — after each approved step, report the result and await the next instruction.

## Read-Only Is Not Automatic

Reading files, searching the repository, and inspecting logs are still actions.
Ask before the first read. After one approved read is complete, do not assume
the user approved a series of reads — keep confirming between batches unless
the user granted explicit batch approval.

## Plan Approval

Before devising or presenting a plan the agent MUST confirm the request with the
user. A plan is only a proposal; it becomes binding after user approval.

Every plan MUST include options:

```text
Economy      → minimal implementation
Recommended  → approved defaults
Full         → everything possible
```

Present them and wait for a decision.

## Lifecycle Command Gates

Every command must pass its human gate:

```text
/scope      → approve the scoping approach and options before starting
/audit      → approve starting the inspection
/architect  → approve a design option before any code is written
/develop    → implement only the approved plan, in approved stages
/check      → approve running checks
/test       → approve running tests
/debug      → approve each hypothesis and fix attempt
/document   → approve the documentation scope and targets
/sync       → approve commit message and branch before any Git push
```

## Exceptions

None by default. The user may grant a one-off batch approval for a specific unit
of work (for example "approve this whole task"), which then covers its contained
steps. Batch approval is never assumed.

## Authority

This rule outranks agent preference and autonomous execution. It supplements the
levels in `standards/tool-approval.md` and the priority in
`standards/authority-order.md`.
