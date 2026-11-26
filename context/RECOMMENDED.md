# Personal Finance Tracker: Tech Stack Decision Guide (v2)

A mobile-first, online personal finance tracker for Philippine pesos. This document explains the intended stack and rationale; `PRD.md` and `RULES.md` define the current product direction and conventions.

**Decisions already made in our discussions**

- React everywhere (you have amateur React experience), in TypeScript
- **Expo (React Native) for mobile first; Next.js for web later**, as separate apps built at different times
- Relational database (PostgreSQL), because finance data is relational
- One database, not two
- Free tiers only for now
- Fully online; offline support is out of scope
- The mobile app is the current platform; web is later

---

## 1. Recommended Tech Stack

| Layer                | Choice                                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Frontend / Web       | Next.js (React) + TypeScript + Tailwind CSS + shadcn/ui                                                                |
| Mobile               | Expo (React Native) + Expo Router + TypeScript                                                                         |
| Backend              | **None to start.** Supabase handles it; add Edge Functions only when needed                                            |
| Database             | PostgreSQL (hosted on Supabase)                                                                                        |
| API                  | Supabase auto-generated API (`supabase-js`) behind your own shared repository layer                                    |
| Authentication       | Clerk (mobile sign-in; third-party auth provider for Supabase)                                                         |
| File / Media Storage | Supabase Storage (receipts, CSV imports)                                                                               |
| Hosting / Deployment | Mobile: Expo development workflow, EAS Build for release later. Web hosting is a later decision                         |
| Testing              | Vitest (shared logic), React Testing Library (web), Playwright (web end-to-end), React Native Testing Library (mobile) |
| DevOps / CI/CD       | GitHub + GitHub Actions, Supabase CLI for database migrations                                                          |
| Other tools          | TanStack Query, React Hook Form + Zod, pnpm workspaces (monorepo), ESLint + Prettier                                   |

> Free-tier limits and terms change. Check the current Supabase, Vercel, and Expo pricing pages before you rely on any of them.

---

## 2. Purpose of Each Technology

**Next.js**

- _What:_ A React framework for websites and web apps, with routing, build tooling, and optional server features built in.
- _Why:_ It gives the web version a proper, polished web foundation instead of Expo's web output, and it's the most in-demand React web framework.
- _Where:_ The entire web UI. Since the app is behind a login, you'll mostly use it as a client-side app.

**Tailwind CSS + shadcn/ui**

- _What:_ Utility-based styling plus a set of good-looking, copy-into-your-project components (tables, dialogs, forms).
- _Why:_ A finance app is full of tables, forms, and dialogs, and this gets you a clean desktop-style UI quickly.
- _Where:_ Web UI only.

**Expo + Expo Router (React Native)**

- _What:_ A toolkit for building iOS and Android apps in React, with file-based navigation.
- _Why:_ Native phone experience with your React skills, and instant testing on your phone through Expo Go.
- _Where:_ The entire mobile UI.

**TypeScript**

- _What:_ JavaScript with types.
- _Why:_ Money code needs safety, and types shared between web and mobile keep them consistent.

**Supabase (PostgreSQL + Storage + API) with Clerk authentication**

- _What:_ A hosted Postgres database with file storage and an instant API. Clerk handles sign-in and identity; the intended setup configures it as Supabase's third-party auth provider.
- _Why:_ Supabase provides the database and API; Clerk owns user identity. Supabase Auth is not the selected sign-in system.
- _Where:_ The data backend for the mobile app first, then web if built. Apps use Clerk session tokens when the integration is complete; do not create or rely on Supabase Auth user sessions.

**Row Level Security (RLS)**

- _What:_ Database rules like "a user can only read rows where `user_id` is theirs."
- _Why:_ With no custom backend, security lives in the database. This is the most important thing to get right.

**Shared packages (`core` and `data`)**

- _What:_ Two internal packages used by both apps. `core` holds types, Zod schemas, money and date helpers, and business rules. `data` holds the repository layer, the Supabase client, and TanStack Query hooks.
- _Why:_ This is where the real logic lives, so you write it once and both UIs stay thin.

**TanStack Query**

- _What:_ Fetches, caches, and refreshes server data in React. It works on both web and React Native.
- _Why:_ Removes lots of manual loading/error/refresh code, and can live in the shared `data` package.

**React Hook Form + Zod**

- _What:_ Form handling plus schema validation.
- _Why:_ Every transaction entry is a form with rules. Zod schemas in `core` are reused by both apps.

**pnpm workspaces (monorepo)**

- _What:_ One repository containing both apps and the shared packages.
- _Why:_ Share code without publishing packages, and change a schema once for both apps. Add Turborepo later if builds get slow.

**GitHub Actions**

- _What:_ Runs tests and linting automatically on every push.
- _Why:_ Catches breakage early and looks good in a portfolio.

**Supabase CLI + migrations**

- _What:_ Your database schema lives as versioned SQL files in your repo.
- _Why:_ You can rebuild the database anywhere, which is also what makes switching providers realistic.

---

## 3. Pros, Cons, Alternatives

### Next.js (web)

- **Pros:** Polished web experience, huge ecosystem, strong resume value, still React. Server features are available if you ever need them.
- **Cons:** Heavier than you need for a logged-in app. The App Router and server/client component split take time to learn. Best hosted on Vercel; other hosts need more setup.
- **Alternatives:** Vite + React (lighter, pure static, easiest hosting, less resume value); Remix / React Router; Vue/Nuxt (new framework, no code sharing with mobile).

### Expo / React Native (mobile)

- **Pros:** Real native app from React skills, fast testing via Expo Go, large community.
- **Cons:** Some native features need custom builds. UI is not HTML/CSS, so web components can't be reused.
- **Alternatives:** Flutter (Dart, different skill set); native Swift/Kotlin (two codebases); Capacitor wrapping the web app (less native feel).

### Two UI codebases instead of one

- **Pros:** Each platform gets the UI it deserves. Platform-specific features are easy. The apps are independent, so you can build, release, or drop one without touching the other.
- **Cons:** Screens are written twice, and you upgrade two sets of dependencies. Features that exist on both platforms cost double the UI work.
- **Alternative:** One Expo codebase for both (less work, weaker web).

### Supabase (Postgres)

- **Pros:** Real SQL and relational integrity. Auth, storage, and API included. Generous free tier. Open source and standard Postgres, so leaving is realistic. Auto-generated TypeScript types from your schema.
- **Cons:** Free projects can pause after inactivity (verify the current policy). Offline support is weaker than Firestore's. Your security depends on correct RLS rules. Complex server logic means Edge Functions (Deno) or Postgres functions.
- **Alternatives:** Firebase (NoSQL, better offline, awkward for reporting); Neon or plain Postgres + your own API (more control, more work); PocketBase; Appwrite.

### Using the Supabase API directly (no custom backend)

- **Pros:** Much less code to maintain, fastest route to an MVP.
- **Cons:** Business logic can drift into the clients or into database functions.
- **Alternatives:** NestJS/Fastify/FastAPI backend. Add it later; the repository layer makes that painless.

### Vercel hosting

- **Pros:** Free Hobby plan, best Next.js support, auto-deploy from GitHub.
- **Cons:** The free Hobby plan is for **non-commercial** use, so check their terms before making the app public or paid.
- **Alternatives:** Netlify, Cloudflare Pages (Next.js needs an adapter), Firebase Hosting, or self-hosting later.

### Shared logic with TanStack Query + Zod

- **Pros:** Popular, small, and works on both platforms.
- **Cons:** Platform differences (like session storage) need a small adapter.
- **Alternatives:** Redux Toolkit, SWR.

### Testing stack

- **Pros:** All JavaScript-based, free, and fast. Most tests target shared logic, so they run once for both apps.
- **Cons:** Mobile UI testing is clunkier than web.
- **Alternatives:** Jest instead of Vitest; Maestro or Detox for mobile end-to-end tests.

---

## 4. Flexibility and Scalability

**Adding or removing features:** Easy. Organize code by feature (transactions, accounts, budgets). A feature is a folder in `core`/`data` for logic and a folder in each app for screens. Removing a feature means deleting those folders and one migration. A feature that exists only on web simply isn't built on mobile.

**Replacing a technology without rebuilding:**

| If you want to replace...                   | Difficulty | Why                                                                        |
| ------------------------------------------- | ---------- | -------------------------------------------------------------------------- |
| Supabase hosting with another Postgres host | Easy       | Standard Postgres. Export and import.                                      |
| Supabase API with your own backend          | Easy       | Only `packages/data` changes, and neither app's screens do.                |
| Clerk authentication                       | Medium     | User IDs are tied to data and RLS rules. Plan the migration.               |
| Web hosting                                 | Easy       | Move the Next.js app to another host.                                      |
| Next.js with another web framework          | Medium     | Rewrite the web UI only. Shared logic, mobile, and database are untouched. |
| Expo with another mobile approach           | Medium     | Rewrite the mobile UI only. Same reasoning.                                |

The target rule: **screens do not talk to Supabase directly.** They call shared repository functions (`transactionsRepo.list()`), and only those know about Supabase. The current mobile client utility is an early setup pending the shared data layer and Clerk token wiring.

**Small vs large deployments:** The same stack works from one user (you) to thousands. Postgres scales a long way. A well-indexed Postgres handles millions of rows comfortably. Moving from free to paid tiers is a plan change, not a rewrite.

**Growing users and data:** Index `(user_id, date)` early, use database views or functions for monthly totals, and paginate transaction lists. If you outgrow the managed API, add a dedicated backend in front of the same database.

**Architecture evolving over time:** Continue with the mobile app and Supabase. Add the web app after the mobile MVP if needed. Add Edge Functions, a separate API service, or background workers only when a real feature requires them.

**Code reuse between web and mobile:** Roughly **50 to 70 percent** of the total code, because UI is split but the logic is shared.

| Shared                               | Not shared                                                 |
| ------------------------------------ | ---------------------------------------------------------- |
| Types and Zod schemas                | Screens and components                                     |
| Money, date, and category logic      | Styling (Tailwind on web, StyleSheet/NativeWind on mobile) |
| Repository layer and Supabase client | Navigation                                                 |
| TanStack Query hooks                 | Session storage (cookies on web, secure storage on mobile) |
| Tests for all of the above           | Charts (Recharts on web, Victory Native on mobile)         |

---

## 5. Architecture

### Principle: loose coupling through layers

```
 Web UI (Next.js)      Mobile UI (Expo)
        \                  /
         ▼                ▼
   Shared hooks and feature logic        ← knows nothing about Supabase
                 │
                 ▼
   Repository interfaces (your own functions)
                 │  implemented by
                 ▼
   Supabase client  ───────►  Supabase (Postgres, Storage, API)
```

Swap the bottom layer and everything above stays the same. Swap either UI and the rest stays the same.

### Recommended project structure (pnpm monorepo)

```
finance-tracker/
├── apps/
│   ├── web/                    # Next.js
│   │   ├── app/                # routes / pages
│   │   └── src/features/       # transactions, accounts, categories, budgets
│   └── mobile/                 # Expo
│       ├── app/                # Expo Router screens
│       └── src/features/
├── packages/
│   ├── core/                   # Zod schemas, types, money helpers, business rules (no React, no Supabase)
│   └── data/                   # Repository layer, Supabase client, TanStack Query hooks, auth adapter
├── supabase/
│   ├── migrations/             # Versioned SQL schema
│   ├── seed.sql
│   └── functions/              # Edge Functions (added later)
├── .github/workflows/          # CI
├── pnpm-workspace.yaml
└── README.md
```

Current repository: `apps/mobile` is the only app; it contains the initial Clerk auth flow and tab shell. The planned `packages/core`, `packages/data`, and Supabase migrations are not implemented. Continue with mobile; add shared packages as data features require them, and create `apps/web` only when web becomes an active product target.

### How the pieces communicate

- **Apps → shared packages:** Both apps import from `core` and `data` as normal packages.
- **Data layer → Supabase:** Uses `supabase-js` over HTTPS. Clerk owns sign-in sessions on each platform; the app passes a Clerk session token to Supabase. Do not model this as Supabase Auth sessions.
- **Supabase → database:** RLS rules check the logged-in user on every query.
- **Files:** Apps upload directly to Supabase Storage, and the database stores only the file path.
- **External services (later):** Called from Edge Functions or a backend, never directly from the apps when API keys are involved.

### Data design rules worth deciding now

- Store money as **integer minor units** (centavos/cents) plus a currency code. Never floats.
- Every table has a `user_id` with an RLS policy.
- Transfers between accounts are one database transaction, so both sides succeed or neither does.
- Keep schema changes in migration files, not manual edits in the dashboard.
- Keep `core` free of React and Supabase imports so it stays reusable and easy to test.

---

## 6. Development Experience

| Factor                    | Assessment                                                                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Ease of learning          | Moderate. The current work is Expo/React Native, Clerk, Supabase, and RLS; Next.js is deferred until web work begins. |
| Development speed         | High for the mobile MVP, since there is no custom backend to write. A second UI will add work if web is built later. |
| Documentation / community | Excellent for React, Next.js, Expo, and Supabase.                                                                                                                        |
| Debugging                 | Good. Browser DevTools on web, Expo dev tools on mobile, Supabase logs and SQL editor. RLS bugs ("why is my query empty?") are the most common stumbling block.          |
| Testing                   | Shared logic is easy to test once. Web UI testing is smooth. Mobile UI testing needs more setup.                                                                         |
| Maintenance               | Moderate. Two apps mean two sets of upgrades (Next.js releases, Expo SDK releases). Managed services keep the backend side light.                                        |
| Libraries                 | Huge ecosystem. Check that mobile libraries support React Native, and web ones support your Next.js setup.                                                               |
| Long-term viability       | Strong. React, Next.js, and Postgres are safe bets. Expo is widely adopted. Supabase is open source, so the exit path exists.                                            |

---

## 7. Future Expansion

| Future need              | Supported?       | How                                                                                                                        |
| ------------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Real-time features       | Yes              | Supabase Realtime (live updates across devices)                                                                            |
| Notifications            | Yes              | Expo Notifications for mobile push, web push or email for web, scheduled by Edge Functions                                 |
| Offline functionality    | No, out of scope | The PRD defines Balansi as fully online and marks offline use as dropped. Revisit only if the product decision changes.   |
| Background jobs          | Yes              | Supabase scheduled functions (`pg_cron`) and Edge Functions; later a worker service                                        |
| File uploads             | Yes              | Supabase Storage, included                                                                                                 |
| Payments                 | Yes              | Stripe or similar, via Edge Functions or a backend. Never handle card data yourself.                                       |
| Analytics                | Yes              | SQL views for in-app reports. PostHog or similar for usage analytics.                                                      |
| AI features              | Yes              | Call an LLM API from an Edge Function (categorize transactions, summarize spending). Keep API keys server-side.            |
| Third-party integrations | Yes              | Bank-sync providers, currency rates, and so on, through server-side functions and webhooks                                 |
| Admin dashboard          | Yes              | A third app in `apps/` (easy, since it reuses `core` and `data`), or Supabase Studio / Retool for internal use             |
| Desktop application      | Yes              | Wrap the Next.js web app with Tauri or Electron if you ever want one, though a good web app covers desktop for a long time |

---

## 8. Decision Table

| Layer          | Recommended                                    | Purpose                             | Pros                                   | Cons                                | Alternatives                      |
| -------------- | ---------------------------------------------- | ----------------------------------- | -------------------------------------- | ----------------------------------- | --------------------------------- |
| Frontend / Web | Next.js + Tailwind + shadcn/ui                 | Web UI                              | Polished, in-demand, still React       | Heavier than needed, learning curve | Vite + React, Remix, Nuxt         |
| Mobile         | Expo (React Native)                            | First app for iOS and Android       | Native feel from React skills         | Can't reuse web components          | Flutter, Capacitor, native        |
| Backend        | None at first (Supabase), later Edge Functions | Server-side logic                   | Almost no code to maintain             | Complex logic needs a plan          | NestJS, Fastify, FastAPI          |
| Database       | PostgreSQL (Supabase)                          | Store users, accounts, transactions | Relational integrity, SQL reports      | Pausing on free tier, weak offline  | Firebase, Neon, PocketBase        |
| API            | Supabase API via shared repository layer       | Connect apps to data                | Auto-generated, typed, swappable       | Tied to Supabase unless wrapped     | Custom REST/GraphQL API           |
| Authentication | Clerk, with Supabase third-party auth         | Login and user identity             | RLS can use verified Clerk JWT claims  | Requires token and RLS configuration | Supabase Auth, Firebase Auth, Better Auth |
| File Storage   | Supabase Storage                               | Receipts, imports                   | Included, access rules                 | Free storage cap                    | Cloudflare R2, S3                 |
| Hosting        | EAS for mobile releases; web host later        | Serve and ship the apps             | Managed build and deploy options       | Service limits and terms can change | Vercel, Netlify, Cloudflare Pages |
| Shared code    | pnpm workspaces: `core` + `data`               | Reuse logic across apps             | One source of truth                    | Monorepo setup time                 | Separate repos, Nx, Turborepo     |
| Data fetching  | TanStack Query                                 | Server state, caching               | Works on web and mobile                | Learning curve                      | SWR, Redux Toolkit                |
| Forms          | React Hook Form + Zod                          | Validation                          | Shared schemas                         | Learning curve                      | Formik, Valibot                   |
| Testing        | Vitest + RTL + Playwright (+ RNTL)             | Catch bugs                          | Free, mostly shared                    | Mobile UI testing is clunkier       | Jest, Maestro, Detox              |
| CI/CD          | GitHub Actions + Supabase CLI                  | Automated checks, migrations        | Free for personal use                  | Some setup time                     | GitLab CI, CircleCI               |

---

## 9. Final Recommendation

### Recommended stack

**Expo (mobile first) → Supabase (Postgres and API) with Clerk authentication**, in a pnpm workspace. The intended data boundaries are shared `core` and `data` packages when needed; TanStack Query, React Hook Form, and Zod remain recommendations rather than current dependencies. Next.js web is a later platform.

### Why this fits your app

- Matches your skills: React you already partly know, SQL you already know.
- Separate apps let each platform have the UI it deserves; mobile is built first and web can follow later.
- The shared packages mean the hard parts (data rules, validation, money logic) are written once.
- Relational data suits finance, and standard Postgres keeps you from being locked in.
- Everything on the list has a usable free tier at personal scale.
- It teaches skills that transfer: SQL, TypeScript, React and React Native, auth and security (RLS), monorepos, CI/CD, and testing.

### Avoid or postpone

- **A custom backend server:** not needed for the MVP.
- **Firebase alongside Supabase:** one database, one auth system.
- **Building both apps at once:** complete the mobile MVP before starting the later web app.
- **Turborepo/Nx, microservices, Kubernetes, GraphQL:** more complexity than a personal app needs.
- **Offline sync:** valuable, but after the core features work.
- **Bank-sync integrations and payments:** postpone until you decide to go public.
- **Desktop wrapper (Tauri/Electron):** the web app covers desktop for now.
- **Paid tools and subscriptions:** nothing here requires them yet.

### MVP: start with this

1. Continue the existing `apps/mobile` Expo app and Clerk authentication flow.
2. Before implementing finance data features, add Supabase migrations and verify Clerk token forwarding and RLS.
3. Implement and test the schema and user-isolation invariants in `SCHEMA.md`.
4. Add shared `core`/`data` packages when needed for domain logic and data access; keep screens out of direct Supabase queries.
5. Build the account, category, transaction, and monthly-summary features in the mobile app.
6. Add tests for money calculations, repository behavior, and relevant mobile flows; keep GitHub Actions checks passing.

### Add later, as the app grows

- Web app (`apps/web`) after the mobile MVP, reusing shared logic where appropriate
- Budgets, recurring transactions, and charts
- CSV import of bank statements, with receipt uploads
- Push notifications and scheduled jobs
- Edge Functions, or a dedicated API service if logic grows
- AI-assisted categorization
- EAS Build and app store release when ready to publish
- Admin dashboard, analytics, and desktop wrapper
- Paid hosting tiers when real users arrive

### Suggested first step

Implement the first Supabase migrations and verify Clerk-backed RLS before connecting finance screens to persisted data. `SCHEMA.md` is a draft, not an existing database schema.
