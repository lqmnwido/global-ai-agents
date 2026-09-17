# Frontend · State Management

> Reusable frontend skill. Load when working on client-side state, stores, and data caching.

## Purpose

- Governs how application state is organized, shared, and persisted to avoid duplication, stale data, and over-engineering.

## Rules

- Default to local component state; promote to global state only when multiple unrelated components need the same data.
- Every piece of data must have a single source of truth; never duplicate state between a store and a component.
- Async data fetching, caching, and revalidation must go through a centralized data layer or library; never fetch in effects and store in local state for sharing.
- Do not derive state that can be computed from existing state; use selectors or memoized computations instead.
- Global stores must be small and domain-scoped; one monolithic store is prohibited.
- Prefer immutable updates or structured mutation patterns (e.g. Immer) to prevent accidental reference sharing.
- Persisted state must have a clear TTL, invalidation strategy, and schema version guard.

## Guidelines

- Use local state (`useState`, `useReducer`, signals) for UI-only concerns: modals, toggles, hover state.
- Use global stores or context for auth, feature flags, user preferences, and cross-cutting data.
- Derive list filters, sorted views, and aggregated counts from the canonical collection, not from a second copy.

```ts
// Good: derived, not duplicated
const filteredItems = useMemo(
  () => items.filter(i => i.status === activeFilter),
  [items, activeFilter]
);
```

- Cache server data at the network or data layer; the view layer should not manage cache invalidation logic.
- Avoid storing server response shapes verbatim if they contain redundant or UI-irrelevant fields; normalize into a lean client model.
- For real-time updates (WebSockets, SSE), update the single source and let the UI re-render from it.

## Anti-patterns

- Do not maintain parallel state in `useState` and a global store for the same data.
- Do not fetch the same resource in multiple components; deduplicate via a shared hook or cache layer.
- Do not put derived or transient UI values (hover, scroll position, animation state) in a global store.
- Do not bypass the data layer by mutating store internals directly; use defined actions or mutations.
- Do not use deeply nested state objects; flatten or normalize to simplify updates and selectors.
