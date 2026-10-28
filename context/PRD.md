# Balansi: Product Requirements (PRD)

> **Purpose:** what Balansi does, for whom, and how we know a feature is done.
> **Not here:** how it is built (`RULES.md`, `ARCHITECTURE.md`), data model (`SCHEMA.md`), stack rationale (`RECOMMENDED.md`).
> **Status legend:** `MVP` build first, `LATER` planned, `IDEA` not committed, `DROPPED` decided against, `TBD` needs a decision.
> **Tags:** `[stated]` the owner said it. `[proposed]` my draft, awaiting confirmation. `TODO` undecided; do not treat as a requirement.
> **Maintenance:** stable IDs (`F-xxx`), never renumbered. Edit one feature at a time. Keep under ~200 lines.

---

## 1. Product Summary

- **Problem:** track personal expenses (past, current, and predicted) to manage how much goes to savings, emergency funds, necessities, guilt-free purchases, and possibly investments. `[stated]`
- **Users:** the owner, plus a couple of close friends as testers. `[stated]` Testers are assumed to have separate, private data. `[proposed]`
- **Platform:** mobile first (Expo). Web later. `[stated]`
- **MVP principle:** keep it simple, just track how money is spent. `[stated]`

## 2. Primary Flow `[stated]`

Login, then Dashboard (actual, expected, and past expenses), then a screen per expense category, then manual expense input. The app is fully online. The app may also track debts and urgent payments.

## 3. Features

| ID | Feature | Status | Notes |
|---|---|---|---|
| F-001 | Sign in | MVP | Email login (per `RECOMMENDED.md`) |
| F-002 | Accounts (where savings are held) | MVP | Bank names and balances; "how much I own" read as balances, confirm |
| F-003 | Categories and subcategories | MVP | Generalized defaults; see 3.1 |
| F-004 | Add expense (manual) | MVP | Online only |
| F-005 | Category screen | MVP | Expenses per category |
| F-006 | Dashboard | MVP | Actual, expected, past |
| F-007 | Analytics | MVP, scope TBD | Named a core feature; MVP depth undecided |
| F-008 | Expected expenses | TBD | Needed for the dashboard's "expected"; manual entry assumed, confirm |
| F-009 | Debts and urgent payments | TBD | Stated as "could"; confirm if MVP |
| F-010 | Offline use and sync | DROPPED | Decided against: the app is fully online |
| F-011 | Allocation buckets | TBD | Savings, emergency, necessities, guilt-free, investments |
| F-020 | AI forecasting | LATER | `[stated]` |
| F-021 | AI trend analysis | LATER | `[stated]` |
| F-022 | Computer vision for grocery prices | LATER | `[stated]` |
| F-023 | Web app | LATER | `[stated]` |

"And probably more" on the AI side is noted but not specified. `[stated]`

### 3.1 Default categories `[proposed]`

You asked for generalized categories and subcategories. This is a draft to edit. Whether users can add or rename them is TODO.

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

Savings, emergency fund, and investments are shown as allocations, not expense categories (see F-011). `[proposed]`

### 3.2 Feature details

Criteria are drafted only from what you stated. Everything else is TODO.

**F-004 Add expense**
- Flow: pick category and subcategory, enter amount, date, optional note, choose account (TODO whether required).
- [ ] A saved expense appears in lists and totals right away. `[proposed]`
- [ ] With no connection, adding an expense shows a clear error and loses nothing the user typed. `[proposed]`
- TODO: required fields, currency, edit and delete behavior.

**F-006 Dashboard**
- [ ] Shows actual, expected, and past expenses. `[stated]`
- TODO: time range, layout, what "expected" means numerically.

**F-002 Accounts**
- [ ] Each account has a bank name and a balance. `[stated]`
- TODO: account types, whether balances are manual or derived from expenses.

**F-009 Debts and urgent payments**
- TODO: fields (who, amount, due date), reminders, relation to expenses.

## 4. Core Concepts

| Term | Meaning |
|---|---|
| Actual expense | Money already spent |
| Expected expense | Planned or upcoming spend, entered manually in the MVP (confirm) |
| Past expense | Earlier periods' actuals (confirm how it differs from "actual") |
| Account | A place money is held, identified by bank name |
| Allocation bucket | TODO. Savings, emergency fund, necessities, guilt-free, investments |

## 5. Non-Functional Requirements

- Fully online. A network connection is required; offline use is out of scope. `[stated]`
- Flexible, scalable, and performant. `[stated]` Measurable targets: TODO.
- Use existing UI component libraries, similar to shadcn, for mobile. `[stated]` Library choice: TODO (a `RULES.md` item).
- Free tiers only for now. (`RECOMMENDED.md`)

## 6. Open Questions

1. Currencies: single or multiple?
2. Is "expected" entered by hand, or derived from recurring expenses?
3. Are allocation buckets (F-011) in the MVP, and how are they defined (fixed percentages, amounts, or just labels)?
4. Are debts and urgent payments (F-009) in the MVP?
5. Can users add or rename categories?
6. What does analytics show in the MVP (totals, comparisons, charts)?
7. Does "how much I own" mean total balances, and is there anything separate from accounts?
