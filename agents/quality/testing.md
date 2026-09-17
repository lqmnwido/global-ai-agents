# Testing Standards

New behavior SHOULD include tests where practical.

Bug fixes SHOULD include a regression test when the failure can be reproduced automatically.

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

## Testing Pyramid

```text
          E2E
         /   \
   Integration
      /       \
     Unit Tests
```

Use the lowest-cost test capable of validating the behavior.

## Regression Requirement

Existing tests MUST continue passing unless the expected behavior intentionally changed.
