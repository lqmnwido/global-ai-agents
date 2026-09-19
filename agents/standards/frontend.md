# Frontend Standards

## Standard Flow

Recommended frontend flow:

```text
Page / View
    │
Component
    │
Composable / Service
    │
State Management
    │
API Client
    │
Backend
```

## Rules

Reusable functionality SHOULD NOT be duplicated between pages.

Frontend projects MUST use their existing design system.

Do not create visually inconsistent components when reusable components exist.

Before creating any new component, the agent MUST first check the codebase and
the design system library for an existing component that covers the need. If one
exists (or can be extended), reuse it instead of creating a duplicate. A new
module requesting a known component type (e.g. a table) is NOT a reason to build
a second copy.
