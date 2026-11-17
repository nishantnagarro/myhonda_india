# MyHonda India — AI Agent Rules & Engineering Guardrails

This is an enterprise Expo/React Native mobile application for MyHonda India. Prioritize mobile-first patterns, performance, accessibility, and cross-platform compatibility.

---

## 1. Expo & Package Management Rules

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed.
- **Expo SDK Version:** Read major version in `package.json` (~58.0.x). Fetch matching versioned docs (`https://docs.expo.dev/versions/v58.0.0/`) or `https://docs.expo.dev/llms.txt`. Never answer from memory.
- **Package Installation:** ALWAYS use `npx expo install <package>` instead of `npm i` or `yarn add` — it guarantees SDK-compatible versions.
- **Continuous Native Generation (CNG):**
  - If `ios/` and `android/` directories do not exist, they are generated. NEVER create or edit them manually.
  - Configure all native behavior (splash screens, permissions, schemes) in `app.json` and config plugins.
- **Expo Go vs Native Builds:** Expo Go only includes its bundled native modules. For native customizations (dark mode splash screens, background tasks), test via development builds (`npx expo run:ios|android` or EAS builds).

---

## 2. SOLID Principles & Software Design Patterns

Every line of code must strictly adhere to the **SOLID** design principles:

1. **Single Responsibility (SRP):**
   - Every file, component, and hook must have exactly one reason to change.
   - Strictly separate **Presenter (UI/Visual rendering only)** from **Container (Hooks, data fetching, business logic)**.
2. **Open/Closed (OCP):**
   - Code should be open for extension, but closed for modification.
   - Use registry-based strategy patterns (e.g., `permissionHandlers` registry in `usePermissions`) so new features/handlers can be added without modifying existing consumer code.
3. **Liskov Substitution (LSP):**
   - Subtypes and adapter implementations must be completely swappable without breaking client expectations (e.g., all `IPermissionHandler` implementations conform to the same contract).
4. **Interface Segregation (ISP):**
   - Keep TypeScript interfaces granular and client-specific. Never force a component to depend on props it does not use.
5. **Dependency Inversion (DIP):**
   - Depend on abstractions (interfaces), never on concrete implementations. Presentation depends on Domain use cases; Data implements Domain interfaces.
6. **Key Design Patterns to Use:**
   - **Strategy / Adapter Pattern:** For device capabilities, permissions, notifications, and analytics.
   - **Repository Pattern:** For data retrieval and caching abstraction.
   - **Container / Presenter Pattern:** For all feature screens and complex UI modules.

---

## 3. Strict Architectural Boundaries (`depcruise`)

This project strictly enforces Clean Architecture and vertical slices. `npm run arch:check` will fail any PR that violates these 4 rules:

1. **Domain Layer is Pure TypeScript:** `src/features/*/domain` must NEVER import React, React Native, Axios, data repositories, or presentation components.
2. **Presentation Cannot Import Data Layer:** Presentation components must depend on Domain use cases and interfaces, never on concrete Data repositories.
3. **No Cross-Feature Dependencies:** Features must be completely isolated. A feature under `src/features/A` cannot import from `src/features/B`. Shared logic belongs in `@/core` or `@/design-system`.
4. **Core Framework Isolation:** Core framework utilities (`src/core/*`) cannot import feature business logic (`src/features/*`).

---

## 4. Strong TypeScript Standards

- **Zero `any` Policy:** Never use `any`. Use `unknown` with runtime Zod schemas or type guards if data shape is dynamic.
- **Explicit Return Types:** Always define explicit return types on hooks, utility functions, repository methods, and public APIs.
- **Discriminated Unions:** Always model multi-state UI (loading, success, error, empty) using discriminated unions (`type State = { status: "loading" } | { status: "success"; data: T } | ...`).
- **Strict Compiler Compliance:** Never bypass strict null checks or implicit return rules.

---

## 5. Loose Coupling & Code Reusability (DRY)

- **Loose Coupling:** Features must never be tightly coupled to specific device APIs or concrete services. Always interact via core abstraction hooks (e.g. `usePermissions`, `useAppStore`).
- **Maximum Reusability:**
  - Always check and reuse existing UI primitives in `@/design-system/primitives` (`AppText`, `AppButton`, `AppInput`, `ScreenContainer`, `Skeleton`) before writing custom elements.
  - Shared domain utilities and helpers belong in `@/core`. Never duplicate logic across features.

---

## 6. No Fallbacks or Default Values Until Told

- **CRITICAL RULE:** NEVER inject silent fallback values, default mock data, or synthetic empty objects (`|| []`, `?? "Default"`, `data || mockData`) unless explicitly asked by the user or specified in acceptance criteria.
- **Fail Fast & Explicit Error Handling:** Let missing data or API failures surface clearly to error boundaries or typed error states. Silent fallbacks mask critical production bugs and hide breaking schema changes.

---

## 7. Responsive Design (All Device Factors)

- UI must seamlessly adapt across ultra-compact phones (360dp), standard viewports (390dp), Pro Max (430dp), and tablets/foldables (>=768dp).
- **Use `useResponsive()`:** Always consume responsive scaling helpers from `@/design-system/tokens/responsive`:
  - `scale(size)`: Horizontal guideline scaling.
  - `verticalScale(size)`: Vertical guideline scaling.
  - `moderateScale(size, factor)`: Font and radius scaling.
  - `maxContentWidth`: Max width constraint (720dp) for tablet layouts to prevent awkward stretching.
- **No Fixed Hardcoded Dimensions:** Never hardcode fixed pixel widths/heights that break on different screen sizes.

---

## 8. Skeletons for Every Screen (Perceived Performance)

- Every screen, list, and content card **MUST** provide a dedicated Skeleton loading state (e.g. `VehicleCardSkeleton`, `ExploreSkeleton`) using the `<Skeleton />` primitive.
- Avoid full-screen generic loading spinners for content screens. Skeletons prevent layout shifts (CLS) and provide immediate visual feedback.

---

## 9. Performance & Zero Memory Leaks

- **High-Performance Lists:** ALWAYS use `@shopify/flash-list` with `estimatedItemSize` instead of `ScrollView` or standard `FlatList` for dynamic data.
- **Smart Memoization:**
  - Wrap event handler callbacks passed down to children in `useCallback`.
  - Wrap heavy computations and filtered arrays in `useMemo`.
  - Memoize list item components with `React.memo`.
- **Zero Memory Leaks:** Always clean up event subscriptions (`subscription.remove()`), timers (`clearTimeout`), and animations in `useEffect` cleanup return functions.

---

## 10. Strict ESLint & Code Standards

The linter enforces strict rules. The build will fail if any of these are violated:

1. **Import Sorting & Grouping (`simple-import-sort`):**
   - 1. Side effects (`import "@/core/i18n/i18n";`)
   - 2. React / React Native / Expo (`react`, `react-native`, `expo`)
   - 3. Third-party libraries (`@tanstack/...`, `axios`, `zod`, `zustand`)
   - 4. Internal path aliases (`@core`, `@design-system`, `@features`, `@/`)
   - 5. Parent relative (`../`)
   - 6. Sibling relative (`./`)
   - 7. Stylesheet imports (`*.styles`)
2. **No Inline Styles (`react-native/no-inline-styles`):** NEVER use `style={{ ... }}` in JSX. All styles must use `StyleSheet.create` in `.styles.ts` or local style objects.
3. **No Color Literals (`react-native/no-color-literals`):** NEVER hardcode hex/rgb colors (`"#FFF"`, `"#CC0000"`). Always resolve tokens via `resolveColor("brand.primary")` or `useAppTheme()` from `@/design-system/tokens/colors`.
4. **No Raw Text (`react-native/no-raw-text`):** All user-facing strings must be wrapped in `<AppText>` and localized using i18n (`en.json` and `hi.json`).
5. **Max Lines per File:** 300 lines maximum. Modularize into Presenter (UI) and Container (Hooks/Data) if a file grows too large.

---

## 11. Theming, Assets & State Management

- **Theming:** Use `useAppTheme()` for dynamic light/dark mode. Status bar must be `<StatusBar style="auto" />`.
- **Assets:** Centrally export and consume all static images from `@assets/images` (`assets/images/index.ts`).
- **Server Cache & Async Data:** Always use **TanStack Query** (`@tanstack/react-query`). Never duplicate API data into local Zustand stores.
- **Client UI State:** Use **Zustand** with MMKV persistence (`src/core/store/useAppStore.ts`) strictly for client-side state.

---

## 12. Mandatory Validation Rule

Before declaring ANY task or feature complete, the AI agent MUST run:

```bash
npm run validate
```

This runs:
- `tsc --noEmit` (strict TypeScript validation)
- `depcruise --config .dependency-cruiser.js src` (Clean Architecture boundary validation)
- `eslint .` (strict style, import sort, and token linting)
- `node scripts/validate-i18n.mjs` (English and Hindi locale parity check)

**Zero errors and zero warnings are required.** Fix all issues before completing the turn.
