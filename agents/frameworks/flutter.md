# Dart · Flutter Profile

> Company standard for Flutter projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | Dart 3.x |
| Framework | Flutter 3.x |
| Frontend | Flutter widgets, Material 3 or Cupertino |
| Database | SQLite (sqflite) / Isar / drift for local, Firebase or REST for remote |
| Testing | Flutter test (widget + integration), mockito for mocking |

## Conventions

- App entry at `lib/main.dart`
- Features organized in `lib/features/{feature_name}/` (presentation, data, domain)
- Shared widgets in `lib/shared/widgets/`, services in `lib/shared/services/`
- Models/data classes in `lib/features/{feature}/data/models/`
- Route definitions in `lib/routes/` or via `go_router`
- Key files: `pubspec.yaml`, `lib/main.dart`, `analysis_options.yaml`

## Patterns

- BLoC or Riverpod for state management
- Repository pattern for data access abstraction
- Use cases in `domain/` layer for business logic (clean architecture)
- Named routes or `go_router` for declarative navigation
- Dependency injection via provider, riverpod, or get_it

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- `test/` directory mirroring `lib/` structure
- Widget tests with `testWidgets()` and `pumpWidget()`
- Integration tests in `integration_test/` directory
- Run `flutter test` for unit/widget, `flutter test integration_test/` for integration
