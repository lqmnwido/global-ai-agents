# Logging

Production code SHOULD log meaningful operational events.

Logs should contain enough information for debugging without exposing sensitive information.

## Recommended Structured Context

```text
request_id
user_id
module
action
resource_id
status
duration
```

## Never Log

```text
Passwords
Access tokens
Private keys
Sensitive authentication material
Credit card numbers
Personal data without necessity
```

Never log passwords, access tokens, private keys, or sensitive authentication material.
