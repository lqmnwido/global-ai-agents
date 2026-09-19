# Frontend · Component Design

> Reusable frontend skill. Load when working on component design and composition.

## Purpose

- Governs how components are structured, named, composed, and exposed to ensure a consistent, maintainable component architecture.

## Rules

- Component creation cycle MUST start with a reuse check: search the codebase
  and the design system library for an existing component that covers the need
  (or can be extended) before creating anything new.
- If an existing component matches, reuse or extend it. Only create a new
  component when no existing one fits; a new module does NOT justify duplicating
  an existing component.
- Do not create visually inconsistent components when a design system exists; always extend or wrap existing primitives.
- One component per file; keep the filename matching the exported component name exactly.
- Prefer composition over inheritance; break large components into smaller, focused children.
- Keep components presentation-focused; business logic belongs in hooks, stores, or service layers.
- Props interfaces must be explicit TypeScript types or interfaces; never use untyped `any` props.
- Events must follow a consistent naming convention: `on` + EventName (e.g. `onSubmit`, `onItemSelect`).

## Guidelines

- Before building a component, record what you found: `searched_for` (what was
  looked up) and `reused` (the component(s) chosen). If nothing fits, state why
  before creating a new one.
- Use slot patterns or render props for layout extension points rather than passing deeply nested config objects.
- Expose a minimal public API surface; internal helper components should not be exported.
- Co-locate related files: component, styles, tests, and types in the same directory.
- Use default exports for page-level components and named exports for library/utility components.

```tsx
// Good: focused, composable, explicit props
interface UserCardProps {
  user: User;
  onSelect?: (userId: string) => void;
}
export function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <article>
      <Avatar user={user} />
      <button onClick={() => onSelect?.(user.id)}>{user.name}</button>
    </article>
  );
}
```

- Use named slots or children for composition: `<Card><CardHeader>...</CardHeader><CardBody>...</CardBody></Card>`.
- Default props should come from the design system tokens, not hardcoded values.

## Anti-patterns

- Do not create a new component (e.g. a table) per module/page when one
  reusable component already serves the same need; this is duplication.
- Do not duplicate reusable logic across pages; extract it into a shared hook or utility.
- Do not pass more than 5-6 props to a single component; split it into sub-components.
- Do not use prop drilling deeper than two levels; use context or composition instead.
- Do not hardcode colors, spacing, or typography values directly in component render logic.
- Do not create "god components" that handle multiple unrelated responsibilities.
