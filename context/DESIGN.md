# Balansi: Design Context

> **Purpose:** explain how the generated design documents in `DESIGNS/` relate to the product direction, what changed during adaptation, and which decisions remain open.
> **Authority:** `PRD.md` and `RULES.md` define product behavior and implementation constraints. The documents in `DESIGNS/` are working design specifications, not replacements for them. Once implemented, `apps/mobile/global.css` is authoritative for token values.

## Document map

The generated CursorAI design files now live in `context/DESIGNS/`:

| File | Use |
|---|---|
| [`DESIGNS/DESIGN_BRIEF.md`](DESIGNS/DESIGN_BRIEF.md) | Short design direction and the reasons Balansi borrows selected ideas from the Acorns reference. Start here for identity, mood, scope, and open decisions. |
| [`DESIGNS/DESIGN_TOKENS.md`](DESIGNS/DESIGN_TOKENS.md) | Proposed color, type, spacing, radius, border, shadow, motion, and money-format values. Traceable to the reference, but expressed as Balansi role tokens. |
| [`DESIGNS/SCREEN_SPECIFICATIONS.md`](DESIGNS/SCREEN_SPECIFICATIONS.md) | Screen behavior and layout for sign-in, the dashboard and its analytics, and the add-transaction sheet. |
| [`DESIGNS/COMPONENT_INVENTORY.md`](DESIGNS/COMPONENT_INVENTORY.md) | Component anatomy, variants, states, and interaction details used by those screens. |
| [`DESIGNS/DESIGN.md`](DESIGNS/DESIGN.md) | The original Acorns iOS design study. It is source material, not Balansi product direction. |

`DESIGN-android.md`, `DESIGN-expo.md`, and `DESIGN-swiftui.md` are platform/reference notes in the same directory. They are not the generated screen specification set above.

## What the adaptation preserves

The design set studies Acorns' calm, rounded, number-led dashboard and reuses its purple and green palette, type scale, spacing, radii, and selected component patterns. The palette is an owner-stated starting point; most Balansi-specific layouts and interactions are marked `[proposed]` in the detailed files so they are not mistaken for confirmed product requirements.

The mapping changes the meaning of the reference components:

- Portfolio total becomes **Total owned**, the sum of account balances.
- The gain line becomes **Left over this month**, actual income minus actual expenses. Expected amounts are excluded.
- The allocation donut represents account balances by purpose, rather than investment holdings.
- The purple gradient summary compares actual and expected expenses for the selected month.
- The large amount entry and bottom-sheet pattern support adding a transaction.
- Navigation uses Balansi's proposed Dashboard, Categories, Accounts, and Profile labels.

Acorns-specific names, investing language, `$` amounts, growth illustrations, and partner cashback content do not carry into Balansi. Use pesos. Expenses use the normal text color; green marks positive amounts and red marks a negative monthly leftover.

## Product context and boundaries

The current design scope is email sign-in, the dashboard (including analytics figures), and the add-transaction sheet. Analytics is part of the dashboard, not a separate destination. Category detail, account management, profile, yearly views, debts, and AI screens are not specified yet. The product tracks real spending and balances; it does not forecast, scan receipts, or convert currency.

The figures have distinct meanings: total owned comes from account balances; monthly leftover uses actual income and expenses only; the summary compares actual against expected expenses; category totals group monthly expenses. The purpose donut and its presentation are proposed. Do not turn these into investment or projection metrics.

## How to use the generated specifications

1. Read `DESIGNS/DESIGN_BRIEF.md` for the adaptation and current scope.
2. Use `DESIGNS/SCREEN_SPECIFICATIONS.md` for screen-level content, ordering, and states.
3. Use `DESIGNS/COMPONENT_INVENTORY.md` for component-level treatment.
4. Use `DESIGNS/DESIGN_TOKENS.md` for proposed values, checking implementation tokens once they exist.
5. Consult `DESIGNS/DESIGN.md` only to understand the Acorns reference behind a choice.

Respect `[stated]`, `[proposed]`, and `TODO` labels. Product requirements and implementation rules take precedence where a generated design draft conflicts with them. The generated documents intentionally preserve unresolved choices rather than silently filling them in.

## Decisions still open

- Whether light or dark is the default, or the app follows the system theme.
- How the five account purposes map to the reference's six chart colors.
- Whether the proposed tab map and Add entry point are approved.
- Whether expected income appears on the dashboard.
- Whether transaction edits/deletes are in scope and whether saving a transaction affects account balances.
- Balansi's logo, app icon, and wordmark treatment; do not invent a symbol from the reference.
- Font loading and chart implementation dependencies.

The detailed open-item lists live in `DESIGNS/DESIGN_BRIEF.md`, `DESIGNS/SCREEN_SPECIFICATIONS.md`, and `DESIGNS/DESIGN_TOKENS.md`; update those when a decision is made, then keep this overview aligned.
