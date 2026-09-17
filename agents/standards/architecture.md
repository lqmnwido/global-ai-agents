# Architecture Standards

## Architecture Decision Priority

Use this priority:

```text
1. Existing project pattern
2. Company standard
3. Framework convention
4. Industry best practice
5. New custom architecture
```

Custom architecture should be the final option.

## General Architecture

Projects SHOULD separate concerns clearly.

```text
Presentation
     │
Application
     │
Domain
     │
Infrastructure
     │
Database / External Systems
```

Not every framework requires physical folders matching these names.

Follow framework conventions.

## Rules

* Architecture MUST respect existing project conventions.
* Do not redesign the entire system to implement a small change.
* Reuse existing components before creating new ones.
* Do not create empty architectural layers to satisfy a diagram.
