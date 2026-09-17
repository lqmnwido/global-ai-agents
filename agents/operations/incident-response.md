# Incident Response

## Purpose

During a production incident, restoring service outranks finding the root cause.

## Priorities

```text
1. Stop the harm (mitigate)
2. Restore service
3. Communicate
4. Find root cause (after service is stable)
5. Prevent recurrence
```

## Severity

```text
SEV1  Full outage / data loss / security breach      → all hands, immediate
SEV2  Major feature down / significant degradation   → immediate
SEV3  Partial degradation / workaround exists        → same day
SEV4  Minor / cosmetic                               → scheduled
```

## Triage

```text
[ ] Confirm the impact and blast radius
[ ] Assign an incident lead and a comms owner
[ ] Start a timeline (UTC timestamps)
[ ] Prefer rollback / feature flag off over forward-fix
[ ] Preserve evidence before restarting/rebuilding
```

## Agent Rules During an Incident

- Human approval is mandatory for every production action (`standards/human-review.md`).
- Never run destructive remediation without explicit confirmation.
- Do not guess at root cause in comms; state facts and unknowns separately.
- Preserve logs before mutating systems.
- Rollback is the default mitigation when the cause is a recent change.

## Communication

```text
status updates at a fixed cadence
state: investigating | identified | monitoring | resolved
include: impact, current action, ETA or "unknown", next update time
no speculation presented as fact
```

## Postmortem (blameless)

```yaml
incident:
  severity:
  duration:
  impact:
  timeline: []
  root_cause:
  contributing_factors: []
  detection:
  response: []
  what_went_well: []
  action_items:
    - action:
      owner:
      due:
  follow_up_review:
```

## Prevention Gate

Every SEV1/SEV2 incident MUST produce at least one tracked action item with an
owner. Untracked "we'll be careful" is not a mitigation.

See also: `operations/deployment.md`, `standards/observability.md`,
`quality/debugging.md`.
