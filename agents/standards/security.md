# Security Requirements

## Security Checklist

Every change MUST consider:

```text
Authentication
Authorization
Input validation
Output escaping
SQL injection
XSS
CSRF
SSRF
File upload safety
Path traversal
Command injection
Mass assignment
Rate limiting
Sensitive data exposure
Logging of secrets
Broken access control
```

## Rules

Never trust client-side validation alone.

Authorization MUST be enforced server-side.

Use appropriate HTTP status codes for errors.

Do not expose internal stack traces in production responses.
