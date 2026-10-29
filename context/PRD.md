# Balansi: Product Requirements (PRD)

> **Purpose:** what Balansi does, for whom, and how we know a feature is done.
> **Not here:** how it is built (`RULES.md`, `ARCHITECTURE.md`), data model (`SCHEMA.md`), stack rationale (`RECOMMENDED.md`).
> **Status legend:** `MVP` build first, `LATER` planned, `IDEA` not committed, `DROPPED` decided against, `TBD` needs a decision.
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

## 3. Features

| ID | Feature | Status | Notes |
|---|---|---|---|
| F-001 | Sign in | MVP | Email login (per `RECOMMENDED.md`) |
| F-002 | Accounts (bank accounts and wallets) | MVP | Name, balance, and purpose label; balance entered by hand |
| F-003 | Categories and subcategories | MVP | Defaults copied to each user at signup; editable |
| F-004 | Add expense (manual) | MVP | Actual expenses |
| F-005 | Category screen | MVP | Expenses per category |
| F-006 | Dashboard | MVP | Actual, expected, and past |
| F-007 | Analytics | MVP | Monthly total by category; actual vs expected; left over (income minus expenses) |
| F-008 | Expected expenses | MVP | Entered by hand; may include system-suggested categories |
| F-009 | Debts and urgent payments | LATER | Moved out of the MVP; to be improved later |
| F-010 | Offline use and sync | DROPPED | The app is fully online |
| F-011 | Allocation buckets | MVP | A purpose label on each account (see 3.2) |
| F-012 | Add income (manual) | MVP | Used to compute what is left over |
| F-020 | AI forecasting | LATER | `[stated]` |
| F-021 | AI trend analysis | LATER | `[stated]` |
| F-022 | Computer vision for grocery prices | LATER | `[stated]` |
| F-023 | Web app | LATER | `[stated]` |
| F-024 | Currency conversion | LATER | Pesos only for now `[stated]` |

"And probably more" on the AI side is noted but not specified. `[stated]`

### 3.1 Default categories `[proposed]`

A draft to edit. Savings, emergency fund, and investments are not expense categories; they are account purposes (F-011).

| Category | Example subcategories |
|---|---|
| Housing | Rent or mortgage, utilities, internet |
| Food | Groceries, dining out |
| Transport | Fuel, commute, maintenance |
| Health | Medical, medicine, insurance |
| Education | Tuition, books, courses |
| Personal and guilt-free | Entertainment, shopping, hobbies, subscriptions |
| Debt payments | Loans, credit cards |
| Other | Uncategorized |

Income categories `[proposed]`: Salary, Side income, Other income.

### 3.2 Feature details

Criteria come from what you stated; `[proposed]` items are my drafts.

**F-002 Accounts and F-011 Allocation buckets**
- Each account is a bank account or a wallet, with a name, a balance, and a purpose. `[stated]`
- Purpose is one of: savings, emergency fund, necessities, guilt-free, investments. `[stated]`
- "How much I own" is the sum of account balances, shown per account. `[stated]`
- Balances are entered and edited by hand. Expenses do not change them automatically. `[proposed]`
- [ ] Adding an account with a name, purpose, and balance shows it in the account list and the total. `[proposed]`

**F-004 Add expense**
- Flow: pick category and subcategory, enter amount in pesos, date, optional note, optionally an account. `[proposed]`
- [ ] A saved expense appears in lists and totals right away. `[proposed]`
- [ ] With no connection, adding shows a clear error and loses nothing the user typed. `[proposed]`
- TODO: edit and delete behavior.

**F-008 Expected expenses**
- Entered by hand with an amount, category, and date. No recurring expenses in the MVP. `[stated]`
- The system may suggest a category. Mechanism (rule-based or AI): TODO.
- [ ] An expected expense counts toward "expected" for its month and not toward "actual". `[proposed]`

**F-012 Add income**
- Income is recorded manually with an amount in pesos, a date, an income category, and an optional note. `[stated]`
- [ ] A saved income entry appears in the list and in the month's income total right away. `[proposed]`
- TODO: recurring income (for example salary) is out of the MVP unless you say otherwise.

**F-006 Dashboard and F-007 Analytics**
- Shows actual, expected, and past expenses. `[stated]`
- Analytics: monthly total by category, and actual vs expected for the month. `[stated]`
- Left over: income minus expenses for the month. `[stated]` Whether expected amounts count: see open questions.
- [ ] Left over for a month equals that month's actual income minus its actual expenses. `[proposed]`
- [ ] Totals for a month equal the sum of that month's expenses of each kind. `[proposed]`
- TODO: layout, default month, charts.

## 4. Core Concepts

| Term | Meaning |
|---|---|
| Actual expense | Money already spent |
| Expected expense | A planned or upcoming spend, entered by hand |
| Past expense | An actual expense dated in an earlier period `[proposed]` |
| Account | A bank account or wallet where money is held |
| Account purpose | The bucket an account's money is for: savings, emergency fund, necessities, guilt-free, or investments |
| Income | Money received, entered by hand |
| Left over | Income minus expenses for a period |

## 5. Non-Functional Requirements

- Fully online. A connection is required. `[stated]`
- Flexible, scalable, and performant. `[stated]` Measurable targets: TODO.
- Use existing UI component libraries, similar to shadcn, for mobile. `[stated]` Library choice: TODO (a `RULES.md` item).
- Free tiers only for now. (`RECOMMENDED.md`)

## 6. Open Questions

1. How does the system suggest categories for expected expenses (rules from past entries, or AI)?
2. Should a transaction require an account, or is it optional?
3. Should adding a transaction (income or expense) ever adjust an account balance, or stay fully manual?
4. Can an account's purpose change over time, and do totals by purpose need history?
5. Does left over use actual amounts only, or can it include expected income and expenses as a projection?
6. Is expected income a thing in the MVP, or only actual income?
