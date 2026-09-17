# Authentication

## Requirements

Every change MUST consider authentication implications.

Authentication considerations:

```text
Authentication provider
Session management
Token strategy
Credential storage
Password hashing
Token revocation
Refresh token flow
Multi-factor authentication
Password reset flow
Account lockout
Rate limiting on auth endpoints
Secure storage of secrets
```

Never trust client-side authentication alone.

Authorization MUST be enforced server-side.
