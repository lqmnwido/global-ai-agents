# C# · ASP.NET Core Profile

> Company standard for ASP.NET Core projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | C# 12+ / .NET 8 |
| Framework | ASP.NET Core 8 |
| Frontend | Razor Pages / Blazor Server / separate SPA |
| Database | PostgreSQL with Entity Framework Core |
| Testing | xUnit + Moq, WebApplicationFactory for integration |

## Conventions

- Controllers in `Controllers/` with `[ApiController]` attribute
- Models/Entities in `Models/` or `Entities/`
- DTOs in `DTOs/` or `ViewModels/`
- Services registered via DI in `Program.cs` or `Startup.cs`
- EF Core DbContext in `Data/` directory
- Key files: `*.csproj`, `Program.cs`, `appsettings.json`, `appsettings.Development.json`

## Patterns

- Dependency injection via built-in DI container in `Program.cs`
- Mediator pattern with MediatR for CQRS-style request handling
- EF Core migrations for database schema management
- Filter attributes (`IActionFilter`) for cross-cutting concerns
- Minimal APIs for lightweight endpoints alongside controllers

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- xUnit with `*.Tests` project referencing the main project
- `WebApplicationFactory<T>` for integration test server setup
- Run `dotnet test` to execute full suite
