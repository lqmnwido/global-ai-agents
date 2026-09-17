# Data Privacy

## Purpose

Personal data must be handled lawfully and minimized. Applies to all systems
processing user data. Relevant regimes include Malaysia **PDPA 2010** and EU
**GDPR**; follow the strictest applicable rule.

## Classify Data

```text
Public        no restriction
Internal      company-only
Confidential  business-sensitive (contracts, finances)
Personal      identifies a person (PII)
Sensitive     health, biometric, religion, political, financial account, IDs
```

Personal and Sensitive data require handling controls.

## Principles

1. **Lawful basis** — collect only with a valid basis (consent, contract, legal duty).
2. **Minimization** — collect the minimum needed for the stated purpose.
3. **Purpose limitation** — do not reuse data for unrelated purposes.
4. **Retention** — define and enforce a retention period; delete when expired.
5. **Accuracy** — allow correction.
6. **Security** — protect in transit and at rest.
7. **Access & portability** — support subject access and export requests.
8. **Erasure** — support deletion requests across all stores and backups.

## Engineering Rules

```text
- Never log PII or sensitive data (see standards/logging.md)
- Never put PII in URLs, query strings, or error messages
- Redact or mask PII in non-production environments
- Encrypt PII in transit and at rest
- Do not export production personal data to dev/staging
- Restrict cross-border transfer unless a lawful mechanism exists
- Tag/mark columns and fields that hold personal data
```

## Change Checklist

```text
[ ] What personal data does this change touch?
[ ] Is collection minimized and purpose-limited?
[ ] Is a lawful basis recorded for new data?
[ ] Are retention and deletion defined?
[ ] Is logging free of PII?
[ ] Are access controls enforced server-side?
[ ] Is cross-border transfer avoided or lawful?
```

## Output

```yaml
privacy:
  data_types: []
  lawful_basis:
  retention:
  pii_logged: false
  new_processing: false
  dpia_required: false
```

See also: `standards/security.md`, `standards/secrets.md`,
`backend/authentication.md`, `backend/authorization.md`.
