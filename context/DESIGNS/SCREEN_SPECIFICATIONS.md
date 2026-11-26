# Balansi: Screen Specifications

> **Scope:** sign-in and sign-up, dashboard, the analytics figures on that dashboard, the add-transaction sheet (Tier A, fully specified), and the Categories, Category detail, Accounts, and Profile screens (Tier B, low fidelity). Sign-in/sign-up are implemented; the signed-in finance screens remain placeholders. Apart from auth and current navigation facts, these specs are product direction, not implemented behavior.
> **Tokens:** `DESIGN_TOKENS.md`. **Parts:** `COMPONENT_INVENTORY.md`. **Direction:** `DESIGN_BRIEF.md`.
> **Tags:** `[stated]` from `PRD.md` or approved by the owner in Phase 3. `[proposed]` my draft, not yet approved.
> **Out of scope:** yearly view, debts, AI, edit and delete.

Analytics is not a separate route. F-007 lives on the dashboard.

Both themes use the tokens. The default follows the system theme. `[stated]`

---

## 1. Navigation

```
(auth)/SignIn
(auth)/SignUp
(tabs)/
  index                  Dashboard
  categories/index       Category list for the month        Tier B
  categories/[id]        Category detail + transactions     Tier B
  accounts/index         Accounts and balances              Tier B
  profile                Sign out                           Tier B
Overlays
  add-transaction        Bottom sheet
  account-form           Bottom sheet                       Tier B
```

Current destinations are Dashboard (`index`), Categories, Accounts, and Settings, with a center Add action slot. The tab metadata and icon mapping live in `apps/mobile/constants/data.ts` and `constants/icons.ts`; the bar uses theme variables for active/inactive tint, surface, and border, and includes the bottom safe-area inset. Navigation SVGs have filled and outlined variants. Settings is the current destination for theme controls and sign out. Profile remains the planned product destination; it has not replaced Settings in the route tree.

The Dashboard, Categories, and Accounts routes currently render placeholder labels. The onboarding route was removed, and the Dashboard no longer links to it. The tab bar includes a raised center Add action that opens the Add transaction placeholder route.

Add is a circular primary action raised at the center of the tab bar. It stays visible across tab destinations and opens the Add transaction route. It is a floating action, not a fifth tab.

## 2. Sign in and account creation (F-001)

**Implemented.** Balansi owns the native UI and flow logic. Clerk provides identity, session, verification, and password-reset services. The screens use NativeWind and shared controls in `apps/mobile/src/components/auth/AuthUI.tsx`. See `AUTH_SCREEN_SPECIFICATIONS.md` for the implemented flow summary; it does not define an additional Welcome or OAuth flow.

**Sign-up flow.** Collect email, username, and password twice. Username is required and validated as 4–64 characters with no spaces; Clerk enforces uniqueness and instance-specific character rules. Create the account, send an email verification code, verify it, then activate the session and route to `(tabs)`. Users can resend the code or return to edit their details.

**Sign-in flow.** Collect email and password, validate email locally, then activate the session and route to `(tabs)`. If required, the flow handles device-trust email verification and email, phone, authenticator TOTP, and backup-code MFA.

**Password recovery.** The user requests an email code, verifies it, chooses and confirms a new password, and is signed in after the update. Other sessions are signed out when the password changes.

**Visual treatment.** The sign-in and sign-up screens share the warm lilac canvas, Balansi wordmark, Oak and Green accents, rounded controls, and existing light/dark theme tokens. The layout scrolls with the keyboard and respects safe areas. No new artwork or decorative motion is used.

**States.** Clerk initialization/loading, submitting, field validation, provider errors, email verification, MFA, password reset, and signed-in routing. A missing publishable key shows setup guidance.

**Configuration.** `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` must be set. Enable email/password, username sign-up, and email verification codes in Clerk Dashboard, plus the Native API for native requests. Sign-in uses email and password. Google/Apple OAuth and passkey MFA are not implemented.

## 3. Dashboard (F-006, F-002, F-007, F-011)

**Job.** After sign-in, show what the accounts hold now, and this month's actual, expected, and past spending. `[stated]`

**Two scopes.** "Now" figures do not change with the month, because balances have no history. "This month" figures follow the month control. `[stated]`

**Regions, top to bottom.**

*Now*
1. **Title row.** "Dashboard" in `type-title`, left aligned.
2. **Total owned.** Sum of account balances, `type-hero`, tabular, centered, with the label "Total owned" and the line "Balances as of [date]" under it.
3. **Purpose donut.** Account balances split by purpose, centered. Center label: "By purpose" and the total owned. The reference center copy is not used.
4. **Legend.** One row per purpose that has a balance: chip, name, share, peso amount.

*This month*
5. **Section header.** "This month" with the month control. Default is the current month.
6. **Left over.** Actual income minus actual expenses for the selected month. Positive: `positive-text` and ▲. Negative: `negative-text` and ▼. A projection using expected amounts is later.
7. **Month summary card.** Solid `brand` card. Two amounts, actual expenses and expected expenses, and the gap in words. Income is not on this card.
8. **Category list.** This month's expense total per category, with the share bar. Expected for that category is secondary meta if it exists.

Past expenses are actual rows from earlier months. They appear when the month control moves backward. There is no separate "Past" tab.

**Sample content.** Pesos, two decimals. Category names stay the PRD 3.1 draft. The Figma frames label every number "Sample data".

**States.**
- **Loading.** Title and month control stay. No fake amounts. A quiet loading line sits where the hero will be.
- **Empty.** No accounts and no transactions. No zero donut. "Nothing tracked yet. Add your first expense or income." The primary button "Add transaction" opens the sheet.
- **Error.** "Couldn't load your figures." A "Try again" text button. The month control stays usable.
- **Partial.** Accounts exist and this month has no transactions. Show total owned, the donut, and an empty category list with the add action. Left over is ₱0.00 only when the month truly has zero actual income and zero actual expenses.

**Width.** One column on the phone. At 375pt the hero is 32pt and the donut is about 144pt. At 430pt the hero is 42pt and the donut is about 184pt. Content insets stay 18 to 22pt.

## 4. Analytics figures (F-007)

These are the dashboard regions in section 3, not another page.

| Figure | Question | Rule | Scope |
|---|---|---|---|
| Total owned | How much do I hold? | Sum of hand-entered account balances | Now |
| By purpose | What is each peso set aside for? | Donut of those balances, positive balances only | Now |
| Left over | Am I ahead this month? | Actual income minus actual expenses | Month |
| Actual vs expected | Am I on plan? | Month summary card | Month |
| Category totals | Where did it go? | Sum of that month's expenses per category | Month |

Rules for every figure: totals are computed, never stored. Amounts are integer centavos. No chart is drawn with no data. Donut slices keep 3:1 contrast against neighbors and are always named in the legend. Reduce-motion draws final states.

Not included: line charts, bar charts, yearly charts, projections, and trends.

Transactions group by calendar month. `[stated]` The yearly view (F-014) is TBD and has no frame.

## 5. Add transaction sheet (F-004, F-008, F-012)

**Pattern.** A tall bottom sheet, not a centered dialog. Top corners `radius-sheet` (24pt). Scrim is `scrim`. Shadow is `shadow-sheet`.

**Open.** The Add pill. Close by the scrim, a close control, and the system back gesture. If an amount has been typed, closing shows the system alert "Discard this entry?". `[stated]` After a successful save, the sheet closes and the figures on the screen below include the new row.

**Fields.**

Stated minimum:
- Amount in pesos, greater than zero.
- Expense or income.
- Actual or expected.
- Category. A subcategory's type matches its parent when one is used.
- Date. Reports use the month. The day defaults to today. `[stated]`

Proposed additions: subcategory, a month control instead of a calendar, an optional account, and an optional note. No repeat control. Recurring entries are out of the MVP. `[stated]`

**Layout inside the sheet.**
- Amount entry first, centered, peso prefix at about 70% of the amount size, green caret, no input box, system number pad.
- Then the Expense / Income choice, then Actual / Expected.
- Then category, month, account, note.
- Category opens an in-sheet pane with categories and subcategories and a back arrow. No second sheet is stacked. `[stated]`
- Primary button full width: "Save expense" or "Save income". Disabled until amount and category are present.

**States.**
- **Editing.** Typed values stay while the sheet is open.
- **Saving.** Primary button shows a busy state and ignores a second tap.
- **Error.** "Couldn't save. Your entry is still here." Every typed value is kept.
- **Validation.** Missing amount or category: the button stays disabled. No extra rules.

**Not on this sheet.** Transfers, balance edits, receipts, and currency conversion.

## 6. Tier B screens (low fidelity) `[stated]`

These are blueprints for future destinations; the current signed-in routes still render placeholders. Detailed visual passes come later.

- **Categories.** Title and month control. One category row per category with the month's actual and expected totals and the share bar. Tap opens Category detail. The Add pill is visible.
- **Category detail.** Header with the category name, the month total, and the month control. Below it, the transaction rows for that month, newest first, with a paginated list. Rows are not pressable. The Add pill is visible. Empty: "No [category] transactions this month."
- **Accounts.** Account rows (name, purpose, balance) and a total. An "Add account" primary button opens the account form sheet. Balances are entered by hand. Empty: "No accounts yet. Add one to see what you hold."
- **Account form sheet.** Name, kind (bank or wallet), purpose, balance. Primary button "Save account".
- **Profile.** The planned profile destination shows the signed-in email and sign-out action; Settings currently owns sign-out.

## 7. Still open

- Whether expected income appears on the dashboard besides left over's exclusion of expected rows.
- Edit and delete (out of this pass). No control for them until the PRD answers that TODO.
- Whether saving a transaction changes an account balance. The schema draft says no. The dashboard must not show a balance that moved unless that decision changes.
- Balances at zero or below, for example a credit card. The donut excludes them. Confirm this is acceptable.
- Font loading and chart implementation dependencies.
- Haptics.
