# Testing Standards

## Purpose

Verify that the change works correctly.

Testing should be risk-based.

## Testing Pyramid

```text
          E2E
         /   \
   Integration
      /       \
     Unit Tests
```

Use the lowest-cost test capable of validating the behavior.

## Minimum Important Paths

```text
Happy path
Validation failure
Unauthorized access
Forbidden access
Missing resource
Unexpected dependency failure
Relevant edge cases
```

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

## Rules

New behavior SHOULD include tests where practical.

Bug fixes SHOULD include a regression test when the failure can be reproduced automatically.
