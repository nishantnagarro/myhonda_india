# Claude Code — Project Rules

This project strictly enforces clean architecture and mobile engineering guardrails.
Before writing any code or answering, thoroughly read and strictly follow all instructions in `AGENTS.md`.

Key mandates:
1. SOLID Principles & Strong Code Design Patterns (Strategy, Repository, Presenter/Container).
2. Pure TypeScript Domain layer; zero cross-feature dependencies (`npm run arch:check`).
3. Strict TypeScript (zero `any`, explicit return types, discriminated unions).
4. No silent fallbacks or default mock values unless explicitly asked.
5. Loose coupling and maximum code reusability (`@core`, `@design-system`).
6. Skeletons for every screen/card; responsive design via `useResponsive()`.
7. High performance with `@shopify/flash-list` and zero memory leaks.
8. No inline styles, no color literals (use tokens), strict import sorting.
9. ALWAYS run `npm run validate` before finishing any task. Zero errors allowed.
