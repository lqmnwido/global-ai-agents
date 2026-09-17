# C# · Blazor Profile

> Company standard for Blazor projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | C# 12+ / .NET 8 |
| Framework | Blazor Server / Blazor WebAssembly / Blazor United |
| Frontend | Blazor component-based UI, Tailwind or MudBlazor |
| Database | PostgreSQL with Entity Framework Core |
| Testing | bUnit + xUnit, Playwright for E2E |

## Conventions

- Components in `Components/` or `Pages/` with `.razor` and `.razor.cs` files
- Shared components in `Shared/` or `Components/Shared/`
- Services registered via DI in `Program.cs`
- `@page` directive for routable components, `@code` blocks for logic
- Cascading parameters for cross-component state
- Key files: `*.csproj`, `Program.cs`, `App.razor`, `appsettings.json`

## Patterns

- Component lifecycle methods (`OnInitializedAsync`, `OnParametersSetAsync`)
- CascadingValue/CascadingParameters for dependency propagation
- EventCallback for parent-child component communication
- Service injection with `@inject` directive in components
- StateHasChanged for manual UI refresh after async operations

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- bUnit for isolated component unit tests in `*.Tests` project
- Playwright or Selenium for full browser E2E tests
- Run `dotnet test` to execute unit test suite
