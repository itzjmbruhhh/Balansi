# Balansi: Screen Specifications

> **Scope:** sign-in, dashboard, the analytics figures on that dashboard, and the add-transaction sheet.
> **Tokens:** `DESIGN_TOKENS.md`. **Parts:** `COMPONENT_INVENTORY.md`. **Direction:** `DESIGN_BRIEF.md`.
> **Tags:** `[stated]` from `PRD.md`. `[proposed]` from `DESIGN.md` or a PRD draft.
> **Out of scope:** category detail, accounts, profile, yearly view, debts, AI.

Analytics is not a separate route in the current map. F-007 lives on the dashboard. A second analytics screen is not specified.

Both themes use the tokens. The default theme is open.

---

## 1. Sign in (F-001)

**Required.** Email sign-in through Clerk. `[stated]`

**How it is built.** JavaScript or Clerk's hosted email flow while the app runs in Expo Go (`RULES.md` 7b). Google and Apple sign-in are not part of this spec.

**Balansi chrome around that flow.** `[proposed]`

- Canvas background, screen title "Balansi" in `type-title`, `text-primary`.
- No generated logo.
- Short line under the title: what the step is (email sign-in).
- Clerk owns the email field, the submit control, and Clerk's own errors.
- If a Balansi-drawn button is used to open the flow, it is the primary button.

**States.**

- Ready: the Clerk email step is on the canvas.
- Submitting: Clerk's own progress. Do not add a second spinner on top of it.
- Error: Clerk's message stays visible. Balansi does not replace it with a generic failure line.
- Success: go to the dashboard.

**Unspecified.** Field layout inside Clerk, password versus email code, and a custom sign-in form. Do not draw a homemade form and treat it as the spec.

## 2. Dashboard (F-006, F-002, F-007, F-011)

**Job.** After sign-in, show this month's actual, expected, and past spending, plus what the accounts hold. `[stated]`

**Default period.** The current month. `[proposed]`

**Regions, top to bottom.** This order is `[proposed]` (`DESIGN.md` section 3). The figures inside it mix stated math with that layout.

1. **Title row.** "Dashboard" in `type-title`, left aligned. Month control on the trailing side. Changing month updates every figure on the screen.
2. **Total owned.** Sum of account balances, `type-hero`, tabular, centered. Label in `type-meta`, `text-secondary`: "Total owned". `[stated]` that the sum is shown.
3. **Left over.** Actual income minus actual expenses for the selected month. `[stated]` `type-delta` under the hero. Positive: `positive` and ▲. Negative: `negative` and ▼. The words "this month" use `text-secondary`. A projection that mixes in expected amounts is later, not this screen. `[stated]`
4. **Month summary card.** Actual against expected for the month. `[stated]` for the comparison. The purple gradient card is the `[proposed]` container. Show two amounts: actual expenses and expected expenses. Income is not on this card. Left over already covers income minus expenses.
5. **Purpose donut.** Account balances split by purpose. `[proposed]` Purposes are savings, emergency fund, necessities, guilt-free, investments. `[stated]` Colors wait on the open mapping. Center label is one line naming the chart ("By purpose") and one line with the total owned. The reference center copy ("Aggressive", "100% invested") is not used.
6. **Legend.** One row per purpose that has a balance: chip, name, share, peso amount.
7. **Category list.** This month's expense total per category. `[stated]` for the monthly total by category. A list, not a second chart. `[proposed]` Row shows the category name and the actual total. Expected for that category is secondary meta if it exists.

Past expenses are actual rows from earlier months. `[proposed]` definition in the PRD. They appear when the month control moves backward. There is no separate "Past" tab in this spec.

**Sample content.** Use the schema's shape: pesos, two decimals. Category names stay the PRD 3.1 draft until you confirm them, and the frame labels them as sample data.

**States.**

- **Loading.** Title and month control stay. Amounts and the donut do not render fake numbers. A quiet loading line sits where the hero will be.
- **Empty.** No accounts and no transactions. No zero donut. One line says nothing is tracked yet, and the primary button opens the add sheet. A second text button can add an account once that screen exists. Until the accounts screen is in scope, the only action is Add.
- **Error.** The fetch failed. Say what failed and offer a retry. Keep the month control usable.
- **Partial.** Accounts exist and this month has no transactions. Show total owned and an empty category list with the add action. The donut still shows purposes. Left over is ₱0.00 only when the month truly has zero actual income and zero actual expenses. Do not draw a zero chart.

**Width.** One column on the phone. At 375pt the hero is 32pt and the donut is about 144pt. At 430pt the hero is 42pt and the donut is about 184pt. Content insets stay 18 to 22pt.

## 3. Analytics figures (F-007)

These are the dashboard regions in section 2, not another page.

| Figure | Rule | Status |
|---|---|---|
| Monthly total by category | Sum of that month's expenses in each category | `[stated]` |
| Actual vs expected | The month summary card | `[stated]` comparison, `[proposed]` card |
| Left over | Actual income minus actual expenses for the month | `[stated]` |
| Total owned | Sum of hand-entered account balances | `[stated]` |
| By purpose | Donut of those balances | `[proposed]` |

Charts beyond the purpose donut are TODO in the PRD. This spec does not add bar charts, line charts, or a yearly chart.

Transactions group by calendar month. `[stated]` The yearly view (F-014) is TBD and has no frame here.

## 4. Add transaction sheet (F-004, F-008, F-012)

**Pattern.** A bottom sheet, not a centered dialog. Top corners `radius-sheet` (24pt). Scrim is `scrim`. Shadow is `shadow-sheet`. `[proposed]` container. The reference sheet anatomy supplies the measurements.

**Open.** The Add action on the dashboard. Close by the scrim, a close control, and the system back gesture. After a successful save, the sheet closes and the dashboard figures include the new row. `[proposed]`

**Fields.**

Stated minimum:

- Amount in pesos, greater than zero.
- Expense or income.
- Actual or expected.
- Category. A subcategory's type matches its parent when a subcategory is used.
- Date. Reports use the month. The day can default to today. `[stated]` that the day is unimportant.

Proposed additions (`PRD.md` F-004, `DESIGN.md` section 3):

- Subcategory.
- Month control instead of a full calendar, with the day stored as today.
- Optional account.
- Optional note.
- No repeat control. Recurring entries are out of the MVP. `[stated]`

**Layout inside the sheet.** `[proposed]`

- Amount entry first, centered, `type-hero` or `type-amount-lg`, peso prefix at about 70% of the amount size, green caret, no input box, system number pad.
- Then a segmented choice: Expense / Income.
- Then Actual / Expected.
- Then category, month, account, note.
- Primary button full width: "Save expense" or "Save income", matching the choice. Disabled until amount and category are present.

**States.**

- **Editing.** Typed values stay while the sheet is open.
- **Saving.** Primary button shows a busy state and ignores a second tap.
- **Error.** Connection missing or save failed. Keep every typed value. Say what failed. `[proposed]` in the PRD for the offline case. The product is online-only, so this state still matters. `[stated]`
- **Validation.** Missing amount or category: the primary button stays disabled. Do not invent extra rules.

**Not on this sheet.** Transfers, balance edits, receipts, and currency conversion.

## 5. Navigation chrome

`[proposed]`, included because the dashboard needs a way to open Add.

Bottom tabs: Dashboard, Categories, Accounts, Profile. Add is a separate action reachable from the dashboard, not a fifth tab with an empty destination. Categories, Accounts, and Profile have no frames in this spec. If the tab bar is drawn with the dashboard, those three tabs are visible and labeled as later screens, not as finished pages.

Active tab: green icon and green label. Inactive: `text-tertiary`. No tint pill behind the active icon. Bar background is `surface` in light mode and `canvas` in dark mode. Height 52pt plus the safe area. Top edge `border-hairline`.

The reference puts a 20px blur on the bar. This spec uses a solid bar.

## 6. Still open

- Theme default.
- Purpose-to-chart-color map.
- Exact center label if "By purpose" is rejected.
- Whether expected income appears anywhere on the dashboard besides left over's exclusion of expected rows.
- Edit and delete. No control for them until the PRD answers that TODO.
- Whether saving a transaction changes an account balance. The schema draft says no. The dashboard must not show a balance that moved unless that decision changes.
