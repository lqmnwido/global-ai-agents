# React Native · React Native Profile

> Company standard for React Native projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | TypeScript 5.x |
| Framework | React Native 0.73+ (Expo managed or bare workflow) |
| Frontend | React Native components, NativeWind or StyleSheet |
| Database | AsyncStorage / MMKV for local, REST or GraphQL for remote |
| Testing | Jest + React Native Testing Library, Detox for E2E |

## Conventions

- Entry point at `App.tsx` or `app/` directory (Expo Router)
- Screens in `src/screens/` or `app/` (file-based routing)
- Components in `src/components/`, shared in `src/components/shared/`
- Navigation in `src/navigation/` using React Navigation
- Services/API calls in `src/services/` or `src/api/`
- Key files: `package.json`, `tsconfig.json`, `app.json` (Expo), `metro.config.js`

## Patterns

- React Navigation stacks and tabs for screen navigation
- Custom hooks for platform-specific logic extraction
- Context + useReducer or Zustand/Jotai for state management
- FlatList/FlashList for performant scrolling lists
- Platform-specific code via `Platform.OS` checks or `.ios.tsx`/`.android.tsx` files

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- Jest with `__tests__/` directories or `*.test.tsx` co-located
- React Native Testing Library for component interaction tests
- Detox for end-to-end tests in `e2e/` directory
- Run `npm test` for unit, `npx detox test` for E2E
