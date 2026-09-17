# Frontend · Testing

> Reusable frontend skill. Load when writing or reviewing frontend tests at any level.

## Purpose

- Defines testing strategy, coverage expectations, and quality standards for unit, component, and end-to-end tests.

## Rules

- Every bug fix must include a regression test that fails without the fix and passes with it.
- Test what the user sees: component behavior, visible output, and interaction results; never test implementation details or internal state.
- Cover at minimum: happy path, validation errors, unauthorized/forbidden access, and empty or missing resource states for every feature.
- Never disable, skip, or delete an existing test to make CI pass; fix the test or the code.
- Each test file must be independent; no shared mutable state, no execution-order dependencies.
- Mock network calls and external services; never hit real backends in unit or component tests.
- Keep E2E tests focused on critical user journeys; do not duplicate unit test coverage in E2E.

## Guidelines

- Use the Arrange-Act-Assert pattern with clear, descriptive test names that state the scenario and expected outcome.
- Prefer testing library queries that mirror user behavior: `getByRole`, `getByText`, `getByLabelText`.
- Assert error states, loading states, and empty states explicitly; these are common failure points in production.

```ts
// Good: tests behavior, covers error state
test("shows error message when API call fails", async () => {
  server.use(http.get("/api/items", () => HttpResponse.error()));
  render(<ItemList />);
  expect(await screen.findByRole("alert")).toHaveTextContent("Failed to load items");
});
```

- Test accessibility in component tests: check for labeled controls, heading structure, and ARIA attributes.
- Use snapshot tests sparingly and only for component API surfaces (prop types, slot structure), not visual output.

## Anti-patterns

- Do not write tests that assert internal component state, private variables, or hook internals.
- Do not test third-party library internals; trust their published API and test only your integration with it.
- Do not use `data-testid` as the primary selector strategy; prefer semantic roles and accessible names.
- Do not leave console error warnings unaddressed in test output; they mask real failures.
- Do not use arbitrary `setTimeout` or `waitFor` loops without a deterministic assertion inside.
