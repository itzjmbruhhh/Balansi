# Balansi: Design Brief

> **Purpose:** the visual direction for the current scope (sign-in and sign-up, dashboard, analytics figures, add-transaction sheet, and the Tier B screens at low fidelity).
> **Values:** `DESIGN_TOKENS.md`. **Screens:** `SCREEN_SPECIFICATIONS.md`. **Parts:** `COMPONENT_INVENTORY.md`.
> **Sources:** `DESIGN.md` (what Balansi keeps), `DESIGNS/DESIGN.md` (numeric reference), `PRD.md` (behavior).
> **Tags:** `[stated]` owner-confirmed, including the Phase 3 approvals. `[proposed]` draft.
> **Authority:** when `apps/mobile/global.css` defines a token, the code wins for that value (`DESIGN.md`).

---

## 1. Product this design serves

Balansi is a phone-first expense tracker for the owner and a few testers. It shows money already spent, money expected, and how account balances are set aside. Currency is Philippine pesos. The app is online only. `[stated]`

The MVP tracks spending. It does not forecast, scan receipts, or convert currency. `[stated]`

## 2. Personality

Warm, calm, and plain. One heavy number leads the dashboard. Surfaces stay flat and lilac-white in light mode, deep aubergine in dark mode. Color shows up only where it means something: Oak purple for brand and structure, Acorn Green for the primary action and for positive money. There are no gradients. `[stated]` Rounded type, tabular amounts, and pill buttons are `[proposed]`.

Copy names the figure and the next action. Short and specific. `[proposed]`

Dials: ENERGY 2 / RHYTHM 2 / MOTION 2. Motion is a donut sweep on load and a number ticker when a total changes. Nothing else moves for decoration. `[proposed]`

## 3. What the reference lends

`DESIGNS/DESIGN.md` is an Acorns iOS study. Balansi keeps its palette, type scale, spacing, radii, and the calm dashboard order. `[stated]` The widget mapping below is approved.

| Reference element | Balansi use |
|---|---|
| Portfolio total | Total owned: sum of account balances, with a "Balances as of" line |
| Gain line under the total | Left over this month, in the "This month" section. Green with ▲ when positive. Red with ▼ when negative |
| Allocation donut and legend | Balances split by account purpose |
| Purple gradient card | This month: actual against expected, as a solid Oak card |
| Partner cashback rows | Transaction rows on Category detail. Income uses green and a "+" |
| Centered amount entry | Add-transaction amount |
| Bottom tabs, green when active | Dashboard, Categories, Accounts, Profile, plus an Add pill |

## 4. Left behind

Acorns naming, Round-Ups, Found Money, acorn and oak illustrations, investing words, any `$`, and the gradient. The reference tab names (Invest, Later, Spend, Earn, Profile) stay in the reference.

Expenses use the normal text color. Red is for a negative left over, not for every expense. `[stated]`

## 5. Themes

Light and dark both exist, and the app follows the system theme. `[stated]` Dark mode uses the aubergine surfaces in `DESIGN_TOKENS.md`.

## 6. Current scope

Tier A: sign-in and sign-up, the dashboard (including the analytics figures), and the add-transaction sheet. Tier B at low fidelity: Categories, Category detail, Accounts, Profile, and the account form sheet. Yearly view, debts, AI, and edit and delete are out of scope.

**Implementation status:** sign-in and sign-up are implemented. The signed-in app has a tab shell; its Dashboard route is `apps/mobile/src/app/(tabs)/index.tsx`, which currently renders placeholder content, with no separate dashboard feature screen. Categories and Accounts are also placeholders; analytics, transaction entry, and the account form are design-only. Profile is a proposed destination; Settings is the current route for theme controls and sign-out.

The wordmark is the word "Balansi" in Nunito Sans. A logo and app icon are not designed yet. Do not invent a symbol. `[stated]`

## 7. Open before drawing

1. Whether expected income shows on the dashboard.
2. How zero or negative account balances are shown.
3. Font loading and chart implementation dependencies.
