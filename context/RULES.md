# Balansi: Rules and Conventions

> **Purpose:** how code is written in this repo. Applies to every task.
> **Not here:** what the product does (`PRD.md`), data model (`SCHEMA.md`), system design (`ARCHITECTURE.md`), stack rationale (`RECOMMENDED.md`).
> **Source tags:** `[RECOMMENDED]` = decided in `RECOMMENDED.md`. `[PREF]` = the owner's stated coding preferences. `[REC]` = recommendation, change freely. `[TODO]` = undecided.
> **Size:** keep under ~200 lines. One line per rule. Link instead of copying.

---

## 1. Doc Map and Conflict Order

| Question | File | Status |
|---|---|---|
| What are we building? | `PRD.md` | exists |
| How is code written? | `RULES.md` | this file |
| What does the data look like? | `SCHEMA.md` until migrations exist, then `supabase/migrations/` | draft exists |
| How is it put together? | `ARCHITECTURE.md` | not yet created |
| How does it look? | `DESIGN.md` | draft exists |
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
- Layout, spacing, and color tokens live in one place: `apps/mobile/global.css` (Tailwind v4 theme variables), named in `DESIGN.md`. `[REC]`

## 7a. UI, Copy, and Code Quality (antislop) `[stated by owner]`

- Use [antislop](https://github.com/miqdadbadjuber/anti-slop) (`miqdadbadjuber/anti-slop`) as a filter for UI, in-app copy, and code comments.
- It is a filter, not a style guide: it prescribes no colors, fonts, or layouts. Visual direction comes from this project's own `DESIGN.md`, which antislop does not supply. A plain, sterile result means `DESIGN.md` is missing direction, not that the filter failed.
- Load the skill that matches the task:

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
- Install: run `npx antislop-ai` from the repo root, scope this project only, agents Claude Code and Codex, all six skills. Commit the result so both agents share one pinned version (v3.2.22 when checked, 2026-10-30). For claude.ai, also add the single file `antislop.md` (core only) to the Project knowledge. `[REC]`
- Never run `npx antislop`: that npm name is a different package. The correct one is `antislop-ai`. `[REC]`

## 7b. Services `[stated by owner]`

Free tiers only (section 3, rule 8). Check each service's current limits before adopting it, and ask before paying for anything.

**EAS (builds and store publishing)**
- Use EAS Build for development and release builds, and EAS Submit for the App Store and Play Store if the app is published.
- Run the CLI as `npx eas-cli@latest <command>`, per `apps/mobile/AGENTS.md`.
- Keep `development`, `preview`, and `production` profiles in `eas.json`, with a separate app ID for development builds. `[REC]`
- `[TODO]` Store developer accounts and their fees. Check before publishing.

**Clerk (auth, possibly billing)**
- Clerk replaces Supabase Auth from `RECOMMENDED.md`. Add it to Supabase as a third-party auth provider and pass the Clerk session token to the Supabase client.
- `user_id` columns are `text` holding the Clerk user ID. RLS policies compare it with `(select auth.jwt()->>'sub')`. The integration does not sync user records into Supabase.
- Expo packages: `@clerk/expo` and `expo-secure-store`. The publishable key goes in `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`. Clerk secret keys stay server-side.
- Use the JavaScript or hosted sign-in flow while developing in Expo Go. Native components and native Google or Apple sign-in need a development build. `[REC]`
- Billing is not in the MVP. Before adopting Clerk Billing, check its cost (0.7% per transaction plus Stripe fees), that its `PricingTable` is web-only in Expo, and whether Apple and Google require their own in-app purchase systems for digital subscriptions. `[TODO]`
- `[TODO]` Default categories can no longer be seeded by a trigger on `auth.users`. Choose a mechanism (a function called on first sign-in, or a Clerk webhook to an Edge Function) and update `SCHEMA.md`, which still assumes Supabase Auth.

**CodeRabbit (code review)**
- Use CodeRabbit for pull request reviews. Its comments are suggestions; `RULES.md` and `pnpm check` stay authoritative.
- Confirm pricing on its pricing page before relying on it. Its docs list a free plan with PR summaries on private repos and paid plans for private-repo reviews, and other sources disagree. Paying needs the owner's approval.
- `[TODO]` Add a `.coderabbit.yaml` so reviews follow `RULES.md` (verify the supported options in its docs).

**PostHog (analytics)**
- Use `posthog-react-native`, installed with `npx expo install posthog-react-native expo-file-system expo-application expo-device expo-localization`. Keys go in `EXPO_PUBLIC_POSTHOG_API_KEY` and `EXPO_PUBLIC_POSTHOG_HOST`.
- Never send money amounts, account or bank names, notes, or emails in events. Send event names and non-financial properties only. `[REC]`
- Do not send events from local development builds. `[REC]`
- `[TODO]` Choose the PostHog region (US or EU), and decide whether a privacy policy is needed before store release.

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
- [ ] No rule in sections 3 to 7b is broken.
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
- ESLint and Prettier rule set
- Root `AGENTS.md` and `CLAUDE.md` index files for Codex and Claude Code, and how they share one set of instructions
- How default categories are seeded with Clerk (7b)
- Clerk Billing vs app-store in-app purchases (7b)
- PostHog region and privacy policy (7b)
- CodeRabbit plan (7b)
