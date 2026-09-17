# Context Engineering

## Purpose

Accuracy depends on the context the agent actually has, not the context it
remembers. This standard prevents context rot and stale assumptions.

## Core Rules

1. **Read before you write.** Never edit a file you have not read in this session.
2. **Re-read before you edit.** File contents change; re-read immediately before modifying.
3. **Verify, do not recall.** Confirm a symbol exists by reading its definition, do not trust memory.
4. **Targeted reads.** Read the specific region needed, not whole trees, to keep context signal high.
5. **Cite locations.** Reference `file:line` so the user can verify.

## Context Rot

Long sessions accumulate stale assumptions. Counter it:

- When re-entering a file after other work, re-read the changed region.
- Drop conclusions that new evidence invalidates — do not keep building on them.
- Prefer summarizing the current state in a few lines over carrying raw dumps.
- If a task grows, restate the objective before continuing.

## Minimal Sufficient Context

Before solving, gather only what changes the answer:

```text
- The file(s) to change
- The interfaces they depend on (signatures, types, contracts)
- Existing conventions for this area
- Failing test output or error, if bugfixing
```

Avoid loading unrelated modules "just in case".

## Verification of Assumptions

Any assumption in a plan MUST be checkable. Mark each as:

```text
verified   → confirmed by reading source / running command
assumed    → stated explicitly, to be confirmed before it affects the result
unknown    → must be resolved before proceeding
```

Do not present an assumption as a fact.

## Handoff

When context is handed to another agent or session, include:

```text
objective
current state (files changed, commands run, results)
open questions
next action
```

See also: `standards/anti-slop.md`, `standards/human-review.md`.
