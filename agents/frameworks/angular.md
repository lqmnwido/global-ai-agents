# Angular · Angular Profile

> Company standard for Angular projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | TypeScript 5.x |
| Framework | Angular 17+ (standalone components) |
| Frontend | Angular with SCSS or Tailwind CSS |
| Database | N/A (frontend, communicates via services) |
| Testing | Karma + Jasmine (unit), Playwright or Cypress (E2E) |

## Conventions

- Feature modules or standalone components in `src/app/`
- Components in `src/app/{feature}/` with `.component.ts`, `.component.html`, `.component.scss`
- Services in `src/app/{feature}/` with `@Injectable` and `providedIn: 'root'`
- Guards in `src/app/guards/`, interceptors in `src/app/interceptors/`
- Routing via `app.routes.ts` or feature route files
- Key files: `angular.json`, `tsconfig.json`, `package.json`, `src/main.ts`

## Patterns

- Standalone components (default in Angular 17+) avoiding NgModules
- Signal-based reactivity (`signal()`, `computed()`, `effect()`)
- HTTP interceptors for auth and error handling
- Route guards (`canActivate`, `canMatch`) for access control
- Dependency injection with typed providers

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- Jasmine + Karma with `*.spec.ts` files co-located
- TestBed for component and service unit tests
- Playwright or Cypress E2E tests in `e2e/` directory
- Run `ng test` for unit, `ng e2e` for end-to-end
