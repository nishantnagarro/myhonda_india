# MyHonda India — Engineering Guardrails & Project Architecture Guidelines

> **Target Audience:** All mobile app developers contributing to `myhonda-india`.  
> **Goal:** Maintain 100% consistent code quality, modular architecture, cross-platform performance, and prevent CI build/lint failures across the entire team.

---

## 1. Core Tooling & Package Management Rules

```bash
# ❌ NEVER use npm install <package> / yarn add <package> / pnpm add <package>
# ✅ ALWAYS use Expo CLI to resolve SDK-compatible versions
npx expo install <package-name>
```

- **Expo SDK Version:** `58.0.x` (React Native `0.88.x`, React `19.3.x`).
- **Continuous Native Generation (CNG):**
  - Never manually create or edit `ios/` or `android/` folders.
  - Native permissions, splash screens, schemes, and icons **must** be configured in `app.json` via plugins.
- **Expo Go vs Release Builds:**
  - Expo Go is a development playground. For testing custom native features (dark mode splash screens, background tasks, push notifications), use a development build (`npx expo run:ios` or EAS Development Builds).

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

| Rule | Description | Forbidden |
| :--- | :--- | :--- |
| **1. Domain is Pure TS** | Domain layer must never import React, React Native, Axios, or presentation components. | `from: src/features/*/domain` ➔ `to: react, react-native, axios, /data/, /presentation/` |
| **2. Presentation ➔ Data Isolation** | UI/Screens must depend on Domain interfaces/use cases, never on concrete Data repositories. | `from: src/features/*/presentation` ➔ `to: src/features/*/data` |
| **3. Feature Isolation** | Features must never directly import another feature. Shared logic belongs in `@/core` or `@/design-system`. | `from: src/features/A` ➔ `to: src/features/B` |
| **4. Core Framework Isolation** | Core framework utilities cannot import feature business logic. | `from: src/core` ➔ `to: src/features` |

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

## 10. Strict ESLint & Code Formatting Rules

Our ESLint configuration enforces automated standards that will break CI if not followed:

### A. Automatic Import Sorting & Grouping (`simple-import-sort`)
Imports must be grouped in this exact sequence:
```typescript
// 1. Side-effect imports
import "@/core/i18n/i18n";

// 2. React, React Native, and Expo built-ins
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";

// 3. Third-party packages
import { useQuery } from "@tanstack/react-query";

// 4. Internal path aliases (@core, @design-system, @features, @)
import { usePermissions } from "@/core/hooks/usePermissions";
import { resolveColor } from "@/design-system/tokens/colors";
import { AppText } from "@/design-system/primitives/AppText";

// 5. Parent relative imports (..)
import { splashImages } from "../../../../assets/images";

// 6. Sibling relative imports (.)
import { VehicleCard } from "./components/VehicleCard";

// 7. Stylesheet imports (*.styles)
import { styles } from "./ExploreScreen.styles";
```

### B. No Inline Styles (`react-native/no-inline-styles`)
- **NEVER** write inline styles in JSX:
  ```tsx
  // ❌ FORBIDDEN (Build will fail)
  <View style={{ flex: 1, backgroundColor: "#FFF" }} />

  // ✅ REQUIRED (Separate .styles.ts or StyleSheet.create)
  <View style={styles.container} />
  ```

### C. No Hardcoded Color Literals (`react-native/no-color-literals`)
- **NEVER** write literal hex, rgb, or color strings (`"#FFF"`, `"#CC0000"`, `"red"`):
  ```typescript
  // ❌ FORBIDDEN
  backgroundColor: "#FFFFFF",
  borderColor: "#E5E7EB",

  // ✅ REQUIRED: Reference design-system tokens
  import { resolveColor } from "@/design-system/tokens/colors";

  backgroundColor: resolveColor("surface.card"),
  borderColor: resolveColor("border.subtle"),
  ```

### D. No Raw Text in JSX (`react-native/no-raw-text`)
- All user-facing text must be wrapped inside `<AppText>` and localized using i18n:
  ```tsx
  // ❌ FORBIDDEN
  <Text>Book a Test Drive</Text>

  // ✅ REQUIRED
  <AppText variant="body">{t("vehicle.bookTestDrive")}</AppText>
  ```

### E. File Length Constraint (`max-lines`)
- Maximum file length is **300 lines** (excluding blank lines and comments).
- If a component grows large, split into `Presenter` (UI only) and `Container` (hooks & data fetching).

---

## 11. Theming, Assets & State Management

- **Theming:** Use `useAppTheme()` for dynamic light/dark mode. Status bar must be `<StatusBar style="auto" />`.
- **Assets:** Centrally export and consume all static images from `@assets/images` (`assets/images/index.ts`).
- **Server Cache & Async Data:** Always use **TanStack Query** (`@tanstack/react-query`). Never duplicate API data into local Zustand stores.
- **Client UI State:** Use **Zustand** with MMKV persistence (`src/core/store/useAppStore.ts`) strictly for client-side state.

---

## 12. Mandatory Pre-Commit Validation Checklist

Before opening any Pull Request or asking for review, **ALWAYS** run the full validation suite:

```bash
npm run validate
```

This single command runs:
1. `npm run typecheck` (`tsc --noEmit` — strict type safety)
2. `npm run arch:check` (`depcruise` — clean architecture boundary check)
3. `npm run lint` (`eslint .` — import order, no inline styles, no color literals)
4. `npm run i18n:check` (validates EN/HI locale synchronization)

> **Zero Warnings / Zero Errors Policy:** A Pull Request cannot be merged if `npm run validate` reports any error.
