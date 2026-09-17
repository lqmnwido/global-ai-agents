# Quality · Blackbox Testing with Playwright MCP

> Browser / blackbox (E2E) testing skill. Load when work requires verifying behavior through the UI
> or across a real user journey. Playwright MCP is the approved browser automation server.

## Purpose

- Blackbox testing validates behavior through the browser UI without relying on internal implementation details.
- Uses **Playwright MCP** (`@playwright/mcp`) — a browser automation MCP server — when configured for the agent.

## When to Use

- `/test` requires browser / E2E validation.
- Verifying flows that span multiple pages or states.
- Regression checks on UI behavior.
- Confirming API responses, console errors, and network traffic observed from the browser.

## Playwright MCP Tools

Configured server exposes tools such as:

```text
browser_navigate
browser_click
browser_type / browser_fill
browser_select_option
browser_snapshot
browser_take_screenshot
browser_evaluate
browser_wait
```

## Blackbox Test Workflow

```text
0. Start the development server (see below)
1. Open page        (browser_navigate)
2. Authenticate     (login flow)
3. Navigate         (browser_click / browser_navigate)
4. Perform action   (browser_fill / browser_type / browser_click)
5. Validate result  (browser_snapshot / browser_evaluate)
6. Check API response, console, and network errors
7. Capture evidence (browser_take_screenshot)
8. Stop the dev server (or leave it running explicitly — say which)
```

## Required Coverage: Positive / Negative / Bug-Error

Test each user journey in all three categories, never only the happy path:

```text
Positive  → the flow succeeds with valid input
Negative  → the flow is rejected with the expected feedback (validation,
            wrong credentials, unauthorized, forbidden)
Bug/Error → the flow degrades correctly when something goes wrong (404/500,
            backend unavailable, empty results, malformed data), and the
            browser console/network show no unexpected errors
```

If a category does not apply to a journey, record why in the test report
instead of skipping it silently.

## Start the Development Server First

Blackbox tests run against a running app. Start it in development mode before
opening the page:

```text
npm run dev              # Vite / Next.js / most package.json projects
npm run serve            # or the project's serve / start script
php artisan serve        # Laravel
go run .                 # Go / Gin
python manage.py runserver  # Django
```

Prefer the package.json `dev` script, then `serve`, then any equivalent start
command. Wait for the URL / health endpoint to respond, and note the port.
After tests, stop the dev server or leave it running explicitly — never leave
it silently. The dev server is for blackbox testing only; never point browser
tests at production by default.

## Guardrails

- Localhost: allowed. Staging: allowed. Production: restricted.
- CORS: when the frontend and API are separate dev origins, the backend must
  allow the exact origins the browser loads — typically both `localhost` and
  `127.0.0.1` on the dev port — and permit credentials when auth uses cookies.
  Verify with an `Origin`-carrying request before testing; otherwise the
  browser blocks requests and tests fail on CORS, not app logic.
- MCP is a **tool**, not part of the architecture. Business logic MUST NOT depend on MCP.
- Treat MCP servers with least privilege (see `standards/mcp.md`).
- Never skip a test to make CI pass. Report failures honestly.

## If Playwright MCP Is Not Configured

- Ask the user: *"Should we install and configure Playwright MCP for blackbox testing?"*
- If the user declines, skip browser / blackbox tests and note the gap in the test report.
- If approved, run `ai-agents-playwright` (or `ai-agents --playwright`) after installation is complete.
