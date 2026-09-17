# /test

## Purpose

Verify that the change works correctly.

Testing should be risk-based.

## Human Gate

Present the test plan (which suites and test types) and get approval before
running any test.

The plan MUST include the blackbox / browser offer. The agent must ask whether
to run development blackbox tests; skipping them silently is not allowed.
Browser / blackbox tests require their own approval (see Development Blackbox
Testing).

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

## Development Blackbox Testing

Blackbox (browser) tests are part of the standard cycle, not an afterthought.
After the whitebox checks pass, the agent MUST offer them and get approval.
The user declines only if they choose to — the agent never omits the offer.

1. Start the web app in development mode. Use the project's primary dev
   command — read package.json scripts (or Makefile / Procfile) instead of
   guessing:

   ```text
   npm run dev              # Vite / Next.js / most package.json projects
   npm run serve            # or the project's serve / start script
   php artisan serve        # Laravel
   go run .                 # Go / Gin
   python manage.py runserver  # Django
   ```

   Prefer `dev`, then `serve`, then any equivalent start script.

2. Wait for readiness: poll the URL or health endpoint until it responds on
   the expected port. Note the URL and port.

3. Run blackbox tests against the dev server (workflow in
   `quality/browser-testing.md`):

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

4. After testing, stop the dev server and report the restart command, or leave
   it running for review — say which. Never abandon background processes
   silently.

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
