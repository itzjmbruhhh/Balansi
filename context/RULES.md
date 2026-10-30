# Balansi: Rules and Conventions

> **Purpose:** how code is written in this repo. Applies to every task.
> **Not here:** what the product does (`PRD.md`), data model (`SCHEMA.md`), system design (`ARCHITECTURE.md`), stack rationale (`RECOMMENDED.md`).
> **Source tags:** `[RECOMMENDED]` = decided in `RECOMMENDED.md`. `[PREF]` = the owner's stated coding preferences. `[REC]` = recommendation, change freely. `[TODO]` = undecided.
> **Size:** keep under ~150 lines. One line per rule. Link instead of copying.

---

## 1. Doc Map and Conflict Order

| Question | File | Status |
|---|---|---|
| What are we building? | `PRD.md` | exists |
| How is code written? | `RULES.md` | this file |
| What does the data look like? | `SCHEMA.md` until migrations exist, then `supabase/migrations/` | draft exists |
| How is it put together? | `ARCHITECTURE.md` | not yet created |
| How does it look? | `DESIGN.md` | not yet created |
| Why this stack? | `RECOMMENDED.md` (rationale only) | exists |

**Conflict order:**
- Running code, migrations, and passing tests win for *what exists now*.
- `PRD.md` wins for intended behavior.
- `RULES.md` wins for conventions.
- `RECOMMENDED.md` yields to all of the above.
- Flag conflicts instead of silently picking one.

## 2. Project Layout `[RECOMMENDED]`

- pnpm monorepo: `apps/mobile` (Expo, built first), `apps/web` (Next.js, later), `packages/core`, `packages/data`, `supabase/`.
- Mobile is the first platform. Do not create `apps/web` until it is needed. `[stated by owner]`

## 3. Non-Negotiables `[RECOMMENDED]`

1. Apps never call Supabase directly. Only `packages/data` does, through repository functions.
2. `packages/core` has no React and no Supabase imports.
3. Money is stored as integer minor units plus a currency code. Never floats.
4. Every table has `user_id` and an RLS policy.
5. A transfer between accounts is one database transaction.
6. Schema changes go through migration files in `supabase/migrations/`, never manual dashboard edits.
7. Secrets and third-party API keys stay server-side (Edge Functions or backend), never in the apps.
8. Free tiers only for now. Do not add paid services without asking.

## 4. TypeScript

- Strict types, meaningful names. No `any` without a written reason. `[PREF]`
- Prefer simplicity over cleverness. No abstraction until it is clearly needed. `[PREF]`
- Avoid comments that restate the code. Code should be self-explanatory. `[PREF]`
- Validate external input (forms, API responses) with Zod schemas from `core`. `[REC]`

## 5. React and React Native `[PREF]`

**Components**
- Functional components with one clear responsibility. Split when they grow large or complex.
- Keep logic out of JSX. Extract a named helper instead of nesting logic inline.
- Prefer composition or context over prop drilling, but do not overuse context.

**State**
- Keep state minimal and local. Lift it only when necessary.
- Never store derived values in state. Compute them during render.

**`useEffect`**
- Only for real side effects: subscriptions, timers, DOM or native interactions.
- Never for deriving state from props, simple calculations, or state computable during render.
- Always correct dependency arrays. Clean up subscriptions and timers.

**`useCallback`, `useMemo`, `React.memo`**
- Off by default. Use only when:
  - passing a function or value to a memoized child, or
  - there is an expensive computation, or
  - there is a measured performance problem.
- Prefer plain functions for handlers. Do not wrap everything.
- Avoid passing unstable objects or functions as props where it causes needless re-renders.

## 6. Data Fetching and Forms

- Server data comes from TanStack Query hooks in `packages/data`. Screens call hooks, not Supabase. `[RECOMMENDED]`
- Every fetch handles loading and error states in the UI. `[PREF]`
- Do not add `useEffect` for fetching when a Query hook covers it. Use `useEffect` for fetching only when a real side effect requires it. `[PREF]`
- Forms use React Hook Form with Zod schemas from `core`. `[RECOMMENDED]`
- Paginate transaction lists, and index `(user_id, date)`. `[RECOMMENDED]`

## 7. Mobile Styling

- **Default: NativeWind v5** (`className`). `[stated by owner]`
- **Fallback: React Native `StyleSheet`**, used if NativeWind v5 cannot do something needed, is unstable in the monorepo, or is abandoned. `[stated by owner]`
- Do not mix both approaches within one component. Pick one per component.
- Pin NativeWind and its peer dependencies (Tailwind, react-native-css, Reanimated) to exact versions and upgrade them deliberately. `[REC]`
- Decision: use NativeWind v5 (release candidate) from the start, accepting pre-release risk, to avoid a later v4-to-v5 migration. `[stated by owner]` Install the exact RC pair from the NativeWind v5 docs, and check generated Expo package versions against the version the docs list as tested. `[REC]`
- Layout, spacing, and color tokens belong in one place. `[TODO]` where (Tailwind theme config vs a shared file). Decide when `DESIGN.md` is created.

## 7a. UI, Copy, and Code Quality (antislop) `[stated by owner]`

- Use [antislop](https://github.com/miqdadbadjuber/anti-slop) (`miqdadbadjuber/anti-slop`) as a filter for UI, in-app copy, and code comments.
- It is a filter, not a style guide: it prescribes no colors, fonts, or layouts. Visual direction comes from this project's own `DESIGN.md`, which antislop does not supply. A plain, sterile result means `DESIGN.md` is missing direction, not that the filter failed.
- Load the skill that matches the task. With the single-file install (see below) only the core is available, and it applies to every task:

| Task | Skill |
|---|---|
| Any task | `antislop` (core, always loaded) |
| Screens and components | `antislop-ui` |
| Layout across screen sizes, tap targets | `antislop-layoutmobile` |
| Contrast, focus, states, accessibility | `antislop-human` |
| Labels, empty states, errors, any in-app text | `antislop-copywriting` |
| Comment cleanup | `antislop-code` |

- Use **during** mode while building new UI and **after** mode to audit existing work. UI work ends with the Delivery Gate PASS/FAIL report. `[REC]`
- Do not invent numbers, ratings, or placeholder claims in the UI. Finance figures shown must come from real data.
- Conflict order: `RULES.md` for code conventions, `DESIGN.md` for visual direction, antislop for what to filter out. If they disagree, flag it instead of choosing silently.
- Pin the installed antislop release and upgrade deliberately (`npx antislop-ai --update`). `[REC]`
- Review the skill files before installing, since they steer the agent. `[REC]`
- Install: the single file `antislop.md` (v3.2.22 when downloaded, 2026-10-30), stored in `context/` and added to the claude.ai Project knowledge. No coding agent is installed. If you adopt one (Claude Code, Cursor, and others), run `npx antislop-ai` and re-read this section. `[REC]`
- Never run `npx antislop`: that npm name is a different package. The correct one is `antislop-ai`. `[REC]`

## 8. Feature Organization `[RECOMMENDED]`

- Organize by feature (transactions, accounts, categories, later budgets).
- A feature is a folder in `core` and `data` for logic, and a folder in each app for screens.
- Removing a feature means deleting those folders and adding one migration.
- Naming conventions for files, hooks, and repositories: `[TODO]`

## 9. Testing

- Vitest tests are required for money helpers and total calculations in `core`. `[RECOMMENDED]`
- Repository and hook logic in `data` is tested where it holds real rules. `[REC]`
- Mobile UI uses React Native Testing Library, kept light. `[RECOMMENDED]`
- A bug fix adds a test that fails before the fix, where practical. `[REC]`

## 10. Definition of Done

- [ ] Lint, type check, and tests pass.
- [ ] No rule in sections 3 to 7a is broken.
- [ ] Docs updated per the table below.

| If the change touches... | Update |
|---|---|
| Requirements or behavior | `PRD.md` |
| Tables, columns, or RLS | a migration, plus `SCHEMA.md` if intent or invariants change |
| Package boundaries or data flow | `ARCHITECTURE.md` |
| UI patterns or tokens | `DESIGN.md` |
| A convention in this file | `RULES.md` |

## 11. Open Decisions

- Naming conventions (files, hooks, repositories)
- Where design tokens live
- ESLint and Prettier rule set
- Whether to add a short `CLAUDE.md` index (only if Claude Code is used)
