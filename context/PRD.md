# Balansi: Product Requirements (PRD)

> **Purpose:** what Balansi does, for whom, and how we know a feature is done.
> **Not here:** how it is built (`RULES.md`, `ARCHITECTURE.md`), data model (`SCHEMA.md`), stack rationale (`RECOMMENDED.md`).
> **Status legend:** `MVP` is planned for the first product release, not a claim that the feature is implemented; `LATER` planned after the MVP, `IDEA` not committed, `DROPPED` decided against, `TBD` needs a decision.
> **Tags:** `[stated]` the owner said or confirmed it. `[proposed]` my draft, awaiting confirmation. `TODO` undecided; do not treat as a requirement.
> **Maintenance:** stable IDs (`F-xxx`), never renumbered. Edit one feature at a time. Keep under ~200 lines.

---

## 1. Product Summary

- **Problem:** track personal expenses (past, current, and predicted) to manage how much goes to savings, emergency funds, necessities, guilt-free purchases, and possibly investments. `[stated]`
- **Users:** the owner, plus a couple of close friends as testers. `[stated]` Testers have separate, private data. `[proposed]`
- **Platform:** mobile first (Expo). Web later. `[stated]`
- **Connectivity:** fully online. No offline support. `[stated]`
- **Currency:** pesos only. Conversion to other currencies is a possible future addition. `[stated]`
- **MVP principle:** keep it simple, just track how money is spent. `[stated]`

## 2. Primary Flow `[stated]`

Login, then Dashboard (actual, expected, and past expenses), then a screen per expense category, then manual expense input.

**Implementation snapshot:** the Expo app currently implements the Clerk sign-in/sign-up flows, route guard, and a signed-in tab shell. The Dashboard tab route (`apps/mobile/src/app/(tabs)/index.tsx`), Categories, and Accounts are placeholders; there is no separate dashboard feature screen. Transaction entry, finance data, and reporting are not implemented. The primary flow above describes the intended product, not the current app behavior. See `ARCHITECTURE.md` for the implementation boundary.

## 3. Features

| ID | Feature | Status | Notes |
|---|---|---|---|
| F-001 | Sign in and account creation | MVP | Implemented in the mobile app: custom email/password flow via Clerk; username required at sign-up, email verification, password reset, protected signed-in routes, sign-out, and supported email/phone/TOTP/backup-code verification (`RULES.md` 7b) |
| F-002 | Accounts (bank accounts and wallets) | MVP | Name, balance, and purpose label; balance entered by hand |
| F-003 | Main and sub categories | MVP | Two separate lists, for income and for expenses; defaults copied to each user at signup; editable |
| F-004 | Add actual expense (manual) | MVP | Money already spent; add and remove |
| F-005 | Category screen | MVP | Expenses per main category and sub category |
| F-006 | Dashboard | MVP | Actual, expected, and past |
| F-007 | Analytics | MVP | Monthly total by category; actual vs expected; left over (actual income minus actual expenses) |
| F-008 | Expected income and expenses | MVP | Entered by hand; kept apart from actual entries; may include system-suggested categories |
| F-009 | Debts and urgent payments | LATER | Moved out of the MVP; to be improved later |
| F-010 | Offline use and sync | DROPPED | The app is fully online |
| F-011 | Allocation buckets | MVP | A purpose label on each account (see 3.2) |
| F-012 | Add actual income (manual) | MVP | Money already received; add and remove |
| F-013 | Monthly grouping | MVP | Entries grouped by month |
| F-014 | Yearly grouping | TBD | Long-term view by year; MVP or later |
| F-015 | Payment methods | MVP | Cash, GCash, Bank Branch and similar; chosen on each actual expense `[stated]` |
| F-016 | Custom tags | MVP | Labels such as paid, not paid, debt on actual entries `[stated]` |
| F-017 | Link an actual entry to the expected one it fulfilled | TBD | Optional, per item tracking `[proposed]` |
| F-020 | AI forecasting | LATER | `[stated]` |
| F-021 | AI trend analysis | LATER | `[stated]` |
| F-022 | Computer vision for grocery prices | LATER | `[stated]` |
| F-023 | Web app | LATER | `[stated]` |
| F-024 | Currency conversion | LATER | Pesos only for now `[stated]` |
| F-025 | Calendar deadlines | LATER | Deadlines on specific days `[stated]` |

"And probably more" on the AI side is noted but not specified. `[stated]`

### 3.1 Default categories `[proposed]`

A draft to edit. Each row is a main category with example sub categories. Savings, emergency fund, and investments are not expense categories; they are account purposes (F-011).

| Main category (expense) | Example sub categories |
|---|---|
| Housing | Rent or mortgage, utilities, internet |
| Food | Groceries, dining out |
| Transport | Fuel, commute, maintenance |
| Health | Medical, medicine, insurance |
| Education | Tuition, books, courses |
| Personal and guilt-free | Entertainment, shopping, hobbies, subscriptions |
| Debt payments | Loans, credit cards |
| Other | Uncategorized |

Income main categories `[proposed]`: Salary, Side income, Other income. Each can have several sub categories of the user's own (for example one per employer or client), and the same sub category can be used again and again. `[stated]`

### 3.2 Feature details

Criteria come from what you stated; `[proposed]` items are my drafts.

**F-002 Accounts and F-011 Allocation buckets**
- Each account is a bank account or a wallet, with a name, a balance, and a purpose. `[stated]`
- Purpose is one of: savings, emergency fund, necessities, guilt-free, investments. `[stated]`
- "How much I own" is the sum of account balances, shown per account. `[stated]`
- Balances are entered and edited by hand. Expenses do not change them automatically. `[proposed]`
- [ ] Adding an account with a name, purpose, and balance shows it in the account list and the total. `[proposed]`

**F-003 Main and sub categories**
- Main categories and sub categories are separate lists, for both income and expenses. `[stated]`
- A sub category belongs to one main category. An entry may use a main category alone. `[proposed]`
- A category that has entries cannot be deleted. `[proposed]`

**F-015 Payment methods and F-016 Tags**
- A payment method is how an expense was paid: Cash, GCash, Bank Branch, and similar. It may be linked to an account. `[stated]`
- Tags are custom labels the user creates (paid, not paid, debt, and so on). An entry can have several. `[stated]`
- Tags apply to actual entries only. `[proposed]`
- [ ] A saved actual expense shows its payment method, date, tags, and remarks. `[proposed]`

**F-004 Add actual expense**
- Flow: pick main category and optionally a sub category, enter amount in pesos, payment method, month (the day defaults to today and is not important), optional tags, optional remarks, optionally an account. `[stated]`
- Payment method is required for an actual expense. `[proposed]`
- [ ] A saved expense appears in lists and totals right away. `[proposed]`
- [ ] With no connection, adding shows a clear error and loses nothing the user typed. `[proposed]`
- Removing an entry is supported. TODO: edit behavior, and whether removal can be undone.

**F-008 Expected income and expenses**
- Expected entries are stored apart from actual ones, to project and plan ahead of the date. `[stated]`
- Entered by hand with an amount, a main category, an optional sub category, a date, and optional remarks. No recurring entries in the MVP. `[stated]`
- Expected entries have no payment method, account, or tags. `[proposed]`
- The system may suggest a category. Mechanism (rule-based or AI): TODO.
- [ ] An expected entry counts toward "expected" for its month and not toward "actual". `[proposed]`

**F-017 Link actual to expected** (TBD)
- When an actual entry fulfills an expected one, it can point to it, so the app shows which plans are done. One plan may be fulfilled by several entries. `[proposed]`
- Without the link, expected and actual are still compared by month and category.

**F-012 Add actual income**
- Income is recorded manually with an amount in pesos, a date, a main category, an optional sub category, and optional remarks. `[stated]`
- Income can also be expected, stored with the other expected entries (F-008). `[stated]`
- [ ] A saved income entry appears in the list and in the month's income total right away. `[proposed]`
- TODO: recurring income (for example salary) is out of the MVP unless you say otherwise.

**F-006 Dashboard and F-007 Analytics**
- Shows actual, expected, and past expenses. `[stated]`
- Analytics: monthly total by category, and actual vs expected for the month. Also an expected summary per month: expected income, expected expenses, and expected left over. `[stated]`
- Left over: actual income minus actual expenses for the month. `[stated]` A projection using expected amounts comes later.
- Entries are grouped by month, and by year for the long term. `[stated]` The default view is the current month. `[proposed]`
- Exact days do not matter much; the app tracks generalized monthly totals. `[stated]`
- [ ] Left over for a month equals that month's actual income minus its actual expenses. `[proposed]`
- [ ] Totals for a month equal the sum of that month's entries of each kind. `[proposed]`
- TODO: layout, default month, charts.

## 4. Core Concepts

| Term | Meaning |
|---|---|
| Actual entry | Money that has already moved, income or expense. Stored on its own |
| Expected entry | A planned or upcoming income or expense, entered by hand. Stored apart from actual entries |
| Past expense | An actual expense dated in an earlier period `[proposed]` |
| Main category | A top level group of entries, either income or expense |
| Sub category | A finer group inside one main category |
| Payment method | How an expense was paid (Cash, GCash, Bank Branch) |
| Tag | A custom label on an actual entry (paid, not paid, debt) |
| Account | A bank account or wallet where money is held |
| Account purpose | The bucket an account's money is for: savings, emergency fund, necessities, guilt-free, or investments |
| Left over | Actual income minus actual expenses for a period |
| Period | A calendar month; months roll up into years `[stated]` |

## 5. Non-Functional Requirements

- Fully online. A connection is required. `[stated]`
- Flexible, scalable, and performant. `[stated]` Measurable targets: TODO.
- NativeWind is the current mobile styling system; the app currently uses custom components. A reusable mobile component-library decision remains TODO.
- Free tiers only for now. (`RECOMMENDED.md`)

## 6. Open Questions

1. How does the system suggest categories for expected entries (rules from past entries, or AI)?
2. Should adding an entry ever adjust an account balance, or stay fully manual?
3. Can an account's purpose change over time, and do totals by purpose need history?
4. Is the yearly view (F-014) in the MVP or later?
5. Do tags also apply to expected entries, and are "paid" and "not paid" tags or a status?
6. Is the actual to expected link (F-017) in the MVP?
7. Does "repeated" income mean many entries under one sub category, or entries that repeat on their own?
8. How should payment methods and accounts relate in the screens, since both list GCash and banks?
