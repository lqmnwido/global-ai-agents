# Performance Engineering

## Purpose

Performance work is measurement-driven. Never optimize on a hunch.

## Rule Zero

Measure before changing. Measure after. Report both numbers.

## Method

```text
1. Define the metric (latency p50/p95, throughput, memory, query count, payload size)
2. Establish a baseline with a real measurement
3. Find the dominant cost (profile or trace, do not guess)
4. Change one thing
5. Re-measure and compare
6. Keep the change only if the metric improves without harm
```

## Common Wins (check in this order)

```text
- N+1 queries → eager-load / join
- Missing or unused indexes → add/replace with evidence (EXPLAIN)
- Over-fetching → select only needed columns/relations
- Repeated work → cache with correct invalidation
- Unbounded results → paginate / stream
- Large payloads → compress, trim, prune
- Chatty network calls → batch or parallelize
- Blocking work on request path → queue it
```

## Guardrails

- No optimization without a baseline number.
- Do not cache before correctness is proven — caching bugs are invisible.
- Every cache needs an invalidation strategy and a TTL rationale.
- Do not trade correctness, security, or readability for unmeasured speed.
- Do not micro-optimize code that is not on a measured hot path.

## Budgets

Where a project defines budgets, treat them as gates:

```text
p95 latency ≤ budget
query count per request ≤ budget
JS bundle / page weight ≤ budget
memory growth over time ≤ budget
```

## Performance Output

```yaml
performance:
  metric:
  baseline:
  change:
  result:
  method:        # profiler/trace tool used
  regression_risk:
  budget_impact:
```

See also: `frameworks/*` profile for stack-specific profiling,
`databases/*` for index guidance.
