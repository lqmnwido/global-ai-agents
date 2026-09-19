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

3. Check CORS before running blackbox tests. When the frontend and API run on
   separate origins (for example Vite on `:5173` calling a Gin API), confirm
   the backend allows the exact origins the browser uses — commonly both
   `http://localhost:5173` and `http://127.0.0.1:5173` — and that credentialed
   requests (`Access-Control-Allow-Credentials`) are permitted when the app
   uses auth cookies. A missing origin fails in the browser as a CORS error,
   not an API error, and blackbox tests report it as a red herring.

4. Run blackbox tests against the dev server (workflow in
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

   Run every main journey across all three categories, not just the happy
   path:

   ```text
   Positive  → expected success (valid input, correct flow)
   Negative  → expected rejection (bad input, missing fields, wrong
               credentials, unauthorized access)
   Bug/Error → expected error handling (404/500 responses, backend down,
               empty data, malformed data, browser console errors)
   ```

   If a category does not apply to a journey, say why in the test report
   instead of skipping it silently.

5. After testing, stop the dev server and report the restart command, or leave
   it running for review — say which. Never abandon background processes
   silently.

## Browser Testing

Browser automation MUST use the approved Playwright MCP browser tools
(`quality/browser-testing.md`).

- Use the Playwright browser MCP tools already in the toolset; if they are
  present, run them without asking to install anything.
- Do NOT use a bundled/plugin-cache browser skill (such as `computer-use`) as a
  substitute.
- Do NOT add Playwright to the project (`npm install @playwright/test`) or run
  `npx playwright install` to perform blackbox testing — Playwright is a global
  MCP server, not a project dependency. Ask once, only if it is genuinely
  unconfigured.

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
