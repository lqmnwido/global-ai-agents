# Anti-Slop Standard

## Purpose

"Slop" is output that looks like work but is not: filler prose, invented APIs,
placeholder code, fabricated results, and speculative abstraction. This standard
makes slop unacceptable.

**Zero slop is the target.** If a sentence or line adds no value, delete it.

## Slop Output (prose)

Never produce:

```text
- Filler openings: "Certainly!", "Great question!", "I'd be happy to help"
- Filler closings: "I hope this helps", "Let me know if you need anything else"
- Hedging without data: "might", "probably", "should work" when it can be verified
- Restating the request back as an answer
- Summarizing work that was just shown in full
- Decorative emojis (unless the user explicitly asks)
- Marketing language: "seamless", "robust", "powerful", "cutting-edge", "leverage"
- Invented certainty about code that was not read or run
- "As an AI" / apology loops
```

Prefer: direct, specific, evidence-backed. Cite `file:line`. Show the command
and its real output. State uncertainty only as a concrete open question.

## Slop Code

Never commit:

```text
- Placeholder bodies: return null; // TODO, throw new Error("Not implemented")
- Stub functions presented as finished work
- Commented-out code (delete it; Git remembers)
- Decorative comments that restate the code ("// increment i")
- Unused imports, variables, parameters, dead branches
- Speculative abstractions for a single use case
- Copy-pasted blocks with minor edits instead of a shared helper
- Silent catch blocks that swallow errors
- `any` types to silence the type checker
- Debug output left in: console.log, debugger, var_dump, print
- Hardcoded secrets, tokens, passwords, or credentials
- Fake tests: assertions that cannot fail, or no assertions at all
- TODO/FIXME/HACK without an owner and an issue reference
```

## Grounding Rules (no invented APIs)

- Do not write a library call you have not verified.
- Verify signatures against the installed version, official docs, or a
  Context7/docs MCP lookup. Never guess a method name or parameter order.
- If a dependency's API is unknown, stop and verify before writing code.
- Do not assume a function exists because the name sounds plausible.

## Evidence Rules (no fabricated success)

- Never claim "tests pass", "build works", or "fixed" without the real output.
- Every completion claim cites the command run and the observed result.
- If something was not run, say "not run", not "should pass".
- If verification failed, report the failure verbatim.

## Response Economy

- Answer the question first; no preamble or postamble.
- Match length to the task. Short tasks get short answers.
- Use the smallest response that fully solves the problem.

## Enforcement

Automated scanning is provided by `ai-agents-slop` (see `bin/anti-slop.js`).
The scanner flags TODO stubs, placeholder returns, empty catches, `any`,
debug output, commented-out code, and slop phrases in staged diffs.

Run before every commit:

```bash
ai-agents-slop --staged
```

See also: `standards/human-review.md`, `standards/completion.md`,
`standards/context-engineering.md`.
