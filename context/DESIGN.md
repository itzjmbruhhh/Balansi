# Balansi: Design Context

> **Purpose:** explain how the generated design documents in `DESIGNS/` relate to the product direction, what changed during adaptation, and which decisions remain open.
> **Authority:** `PRD.md` and `RULES.md` define product behavior and implementation constraints. The documents in `DESIGNS/` are working design specifications, not replacements for them. Once implemented, `apps/mobile/global.css` is authoritative for token values.
> **Implementation status:** the auth screens and initial tab shell exist. The Dashboard tab is `apps/mobile/src/app/(tabs)/index.tsx` and currently renders placeholder content; there is no separate dashboard feature screen. The dashboard design, analytics, transaction sheet, and finance screens in the specifications are not implemented; treat those specifications as design direction, not current UI behavior.

## Document map

The generated design files live in `context/DESIGNS/`:

| File | Use |
|---|---|
| [`DESIGNS/DESIGN_BRIEF.md`](DESIGNS/DESIGN_BRIEF.md) | Short design direction and the reasons Balansi borrows selected ideas from the Acorns reference. Start here for identity, mood, scope, and open decisions. |
| [`DESIGNS/DESIGN_TOKENS.md`](DESIGNS/DESIGN_TOKENS.md) | Color, type, spacing, radius, border, shadow, motion, and money-format values, expressed as Balansi role tokens. |
| [`DESIGNS/SCREEN_SPECIFICATIONS.md`](DESIGNS/SCREEN_SPECIFICATIONS.md) | Navigation, screen behavior and layout for sign-in and sign-up, the dashboard and its analytics, the add-transaction sheet, and the low-fidelity Tier B screens. |
| [`DESIGNS/AUTH_SCREEN_SPECIFICATIONS.md`](DESIGNS/AUTH_SCREEN_SPECIFICATIONS.md) | Current implemented Clerk auth flow and its boundary from proposed auth design additions. |
| [`DESIGNS/COMPONENT_INVENTORY.md`](DESIGNS/COMPONENT_INVENTORY.md) | Component anatomy, variants, states, and overlay types used by those screens. |
| [`DESIGNS/DESIGN.md`](DESIGNS/DESIGN.md) | The original Acorns iOS design study. It is source material, not Balansi product direction. |

`DESIGN-android.md`, `DESIGN-expo.md`, and `DESIGN-swiftui.md` are platform/reference notes in the same directory. They are not the generated screen specification set above.
There is currently no Tokens Studio JSON export in the repository; `DESIGN_TOKENS.md` is the available token reference.

## What the adaptation preserves

The design set studies Acorns' calm, rounded, number-led dashboard and reuses its purple and green palette, type scale, spacing, radii, and selected component patterns. The palette is an owner-stated starting point. Balansi uses no gradients.

The mapping changes the meaning of the reference components. These are product design decisions, not claims about the current app:

- Portfolio total becomes **Total owned**, the sum of account balances, with a "Balances as of" line.
- The gain line becomes **Left over this month**, actual income minus actual expenses, in a "This month" section with the month control. Expected amounts are excluded.
- The allocation donut represents account balances by purpose, rather than investment holdings.
- The summary card, now a solid Oak fill, compares actual and expected expenses for the selected month.
- The large amount entry and bottom-sheet pattern support adding a transaction.
- Navigation uses Dashboard, Categories, Accounts, and Profile tabs, plus a floating Add pill.

Acorns-specific names, investing language, `$` amounts, growth illustrations, and partner cashback content do not carry into Balansi. Use pesos. Expenses use the normal text color; green marks positive amounts and red marks a negative monthly leftover.

## Product context and boundaries

The design scope is email sign-in and account creation with a required username at sign-up, the dashboard (including analytics figures), and the add-transaction sheet, plus low-fidelity blueprints for Categories, Category detail, Accounts, and Profile so every tab has a destination. Analytics is part of the dashboard, not a separate destination. Yearly views, debts, and AI screens are not specified. The product tracks real spending and balances; it does not forecast, scan receipts, or convert currency.

The figures have distinct meanings and scopes. Total owned and the purpose donut come from account balances and show the current state, so they do not change with the month. Left over, the summary card, and category totals follow the selected month. Left over uses actual income and expenses only. Do not turn these into investment or projection metrics.

## Decisions made (Phase 3 approval)

| Decision | Outcome |
|---|---|
| Dashboard structure | Split into "Now" (total owned, donut, legend) and "This month" (month control, left over, summary card, category list) |
| Hero | Total owned, with a "Balances as of [date]" line |
| Tier B screens | Categories, Category detail, Accounts, Profile get low-fidelity blueprints |
| Add entry point | A floating primary pill, visible on Dashboard, Categories, and Category detail |
| Purpose colors | Savings Oak, Emergency fund Teal, Necessities Gold, Guilt-free Lilac, Investments Green |
| Category rows | A share bar replaces colored chips |
| Closing a filled sheet | System alert "Discard this entry?" |
| Theme default | Follows the system theme |
| Logo | The word "Balansi" in Nunito Sans for now; no generated symbol |
| Edit and delete | Out of this pass; Category detail lists transactions only |
| Gradient | Removed everywhere; the summary card is a solid Oak fill |
| Text contrast | `[proposed]` extra tokens `action-text`, `positive-text`, `negative-text` for light mode, pending a real contrast check |

## How to use the generated specifications

1. Read `DESIGNS/DESIGN_BRIEF.md` for the adaptation and current scope.
2. Use `DESIGNS/SCREEN_SPECIFICATIONS.md` for navigation, screen content, ordering, and states.
3. Use `DESIGNS/COMPONENT_INVENTORY.md` for component-level treatment.
4. Use `DESIGNS/DESIGN_TOKENS.md` for values, checking implementation tokens once they exist.
5. Consult `DESIGNS/DESIGN.md` only to understand the Acorns reference behind a choice.

Respect `[stated]`, `[proposed]`, and `TODO` labels. Product requirements and implementation rules take precedence where a generated design draft conflicts with them. The generated documents intentionally preserve unresolved choices rather than silently filling them in.

## Decisions still open

- Whether expected income appears on the dashboard.
- Whether saving a transaction affects account balances (the schema draft says no).
- How zero or negative account balances are shown.
- Whether transaction edits and deletes enter scope after this pass.
- A real logo, app icon, and wordmark treatment.
- Haptics, font loading, and chart implementation dependencies.
- Whether the proposed light-mode text contrast tokens are accepted after a real contrast check.

The detailed open-item lists live in `DESIGNS/DESIGN_BRIEF.md` and `DESIGNS/SCREEN_SPECIFICATIONS.md`; update those when a decision is made, then keep this overview aligned.
