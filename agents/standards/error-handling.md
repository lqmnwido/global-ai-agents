# Error Handling

Errors SHOULD be:

```text
Observable
Actionable
Traceable
Safe for users
Useful for developers
```

## Rules

User-facing messages should not reveal internal infrastructure.

Internal logs may contain deeper diagnostic information.

Do not expose internal stack traces in production responses.

## API Error Format

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": {}
}
```
