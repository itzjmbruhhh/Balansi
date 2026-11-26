# Balansi: Copilot review context

## What this project is

Balansi is a mobile-first, online personal finance tracker for Philippine pesos. Its MVP is for manually tracking actual and expected income and expenses, accounts and their purposes, categories, and monthly summaries. Web, AI features, currency conversion, and offline support are not current implementation goals.

## Current implementation

- The only app is `apps/mobile`, built with Expo, React Native, TypeScript, Expo Router, NativeWind, and Clerk.
- Clerk sign-in, username-based sign-up with email verification, password recovery, supported MFA steps, a signed-in route guard, and sign-out are implemented.
- Dashboard, Categories, and Accounts are still placeholder screens; the Add transaction flow and finance data features are not implemented.
- A Supabase client utility exists, but it does not forward Clerk session tokens; local Supabase config has Clerk third-party auth disabled. Supabase repositories and migrations, and the planned `packages/core` and `packages/data`, do not exist yet.
- The root `.env.example` uses `EXPO_PUBLIC_SUPABASE_ANON_KEY`, but the client reads `EXPO_PUBLIC_SUPABASE_KEY`; treat this as an unresolved configuration mismatch.
- Treat the documented shared data-layer boundaries as target architecture, not as existing code.

## Product and data invariants

- Store money as integer minor units (centavos) plus a currency code; do not use floating-point amounts for financial calculations.
- Keep actual and expected transactions separate. Monthly leftover means actual income minus actual expenses; expected entries do not contribute.
- Account balances are manually entered. Do not assume transactions update them automatically.
- User-owned records must be isolated by Clerk user ID. When database tables are added, enable and test RLS for every user-owned table, and prevent cross-user references as well as cross-user reads and writes.
- Use Philippine pesos in product behavior and formatting unless an approved requirement changes this.

## Review guidance

- Read `context/PRD.md`, `context/RULES.md`, `context/ARCHITECTURE.md`, and `context/SCHEMA.md` as relevant to the change. Use `context/DESIGN.md` and `context/DESIGNS/` for UI work.
- Running code, migrations, and passing tests define what exists. The PRD defines intended product behavior; `RULES.md` defines conventions.
- The docs preserve `[stated]`, `[proposed]`, and `TODO` distinctions. Do not report unimplemented proposed or future features as defects unless the change explicitly brings them into scope.
- For findings, identify concrete defects and their impact, cite the affected file and lines, and state a reproducible scenario. Prioritize financial correctness, user-data isolation, authentication boundaries, broken flows, and loss of user input over stylistic preferences.
- Check loading, error, empty, and retry states for asynchronous UI. Keep sensitive values out of logs and client code; never inspect or print `.env` files or `supabase_password.txt`.
- Follow existing React Native, Expo Router, NativeWind, and TypeScript patterns. Avoid adding abstractions or dependencies without a demonstrated need.
- Run `pnpm check` when practical. The current mobile package has lint and typecheck scripts but no test script, so the workspace test command may have no tests to execute.
- If behavior, architecture, schema intent, or design conventions change, update the corresponding context documents as described in `context/RULES.md`.
