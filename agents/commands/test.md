# /test

## Purpose

Verify that the change works correctly.

Testing should be risk-based.

## Human Gate

Present the test plan (which suites and test types) and get approval before
running any test. Browser/blackbox tests require their own confirmation.

## Testing Pyramid

```text
          E2E
         /   \
   Integration
      /       \
     Unit Tests
```

Use the lowest-cost test capable of validating the behavior.

## Test Categories

When applicable:

```text
Unit tests
Feature tests
Integration tests
API tests
Database tests
Authentication tests
Authorization tests
Regression tests
UI tests
Browser tests
Performance tests
Security tests
```

## Regression Requirement

Existing tests MUST continue passing unless the expected behavior intentionally changed.

## Browser Testing

Browser automation may use an approved Browser MCP.

Typical validation:

```text
Open page
Authenticate
Navigate
Perform action
Validate result
Check API response
Check console
Check network errors
Capture evidence if necessary
```
