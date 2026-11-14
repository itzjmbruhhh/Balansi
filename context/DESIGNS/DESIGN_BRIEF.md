# Balansi: Design Brief

> **Purpose:** the visual direction for the current scope (sign-in, dashboard, analytics figures, add-transaction sheet).
> **Values:** `DESIGN_TOKENS.md`. **Screens:** `SCREEN_SPECIFICATIONS.md`. **Parts:** `COMPONENT_INVENTORY.md`.
> **Sources:** `DESIGN.md` (what Balansi keeps), `DESIGNS/DESIGN.md` (numeric reference), `PRD.md` (behavior).
> **Tags:** `[stated]` owner-confirmed. `[proposed]` draft. Unmapped items stay open.
> **Authority:** when `apps/mobile/global.css` defines a token, the code wins for that value (`DESIGN.md`).

---

## 1. Product this design serves

Balansi is a phone-first expense tracker for the owner and a few testers. It shows money already spent, money expected, and how account balances are set aside. Currency is Philippine pesos. The app is online only. `[stated]`

The MVP tracks spending. It does not forecast, scan receipts, or convert currency. `[stated]`

## 2. Personality

Warm, calm, and plain. One heavy number leads each money screen. Surfaces stay flat and lilac-white in light mode, deep aubergine in dark mode. Color shows up only where it means something: Oak purple for brand and structure, Acorn Green for the primary action and for positive money. `[stated]` for the palette. Rounded type, tabular amounts, and pill buttons are `[proposed]`.

Copy names the figure and the next action. Short and specific. `[proposed]`

Working dials, derived from that direction for later screens: ENERGY 2 / RHYTHM 2 / MOTION 2. Motion is a donut sweep on load and a number ticker when a total changes. Nothing else moves for decoration. `[proposed]`

## 3. What the reference lends

`DESIGNS/DESIGN.md` is an Acorns iOS study. Balansi keeps its palette, type scale, spacing, radii, and the calm dashboard order. `[stated]` for the palette. The widget mapping below is `[proposed]`.

| Reference element | Balansi use |
|---|---|
| Portfolio total | Total owned: sum of account balances |
| Gain line under the total | Left over this month. Green with ▲ when positive. Red with ▼ when negative |
| Allocation donut and legend | Balances split by account purpose |
| Purple gradient card | This month: actual against expected |
| Partner cashback rows | Recent transactions. Income uses green and a "+" |
| Centered amount entry | Add-transaction amount |
| Bottom tabs, green when active | Dashboard, Categories, Accounts, Profile, plus Add |

## 4. Left behind

Acorns naming, Round-Ups, Found Money, acorn and oak illustrations, investing words, and any `$`. The reference tab names (Invest, Later, Spend, Earn, Profile) stay in the reference. `[proposed]`

Expenses use the normal text color. Red is for a negative left over, not for every expense. `[proposed]`

## 5. Themes

Light and dark both exist. Dark mode uses the aubergine surfaces in `DESIGN_TOKENS.md`. `[stated]`

Which theme is the default, or whether the app follows the system, is still open (`DESIGN.md` section 9).

## 6. Current scope

This brief covers sign-in, the dashboard (including the analytics figures), and the add-transaction sheet. Category, accounts, and profile screens are in the proposed map and are out of this spec until a later pass.

Logo, app icon, and a Balansi wordmark treatment are open. Until they exist, screens use the word "Balansi" in the product typeface. Do not invent a symbol.

## 7. Open before drawing

1. Confirm the proposed screen map (tabs and the Add action).
2. Map the five account purposes onto the chart colors. The reference has six slices with investing names. No purpose owns a color yet.
3. Choose the theme default.
4. Approve a logo separately from these specs.
