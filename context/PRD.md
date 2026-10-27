# Balansi: Product Requirements (PRD)

> **Purpose:** what Balansi does, for whom, and how we know a feature is done.
> **Not here:** how it is built (see `RULES.md`, `ARCHITECTURE.md`), data model (see `SCHEMA.md`), stack rationale (see `RECOMMENDED.md`).
> **Status legend:** `MVP` = build first, `LATER` = planned, `IDEA` = not committed, `DROPPED` = decided against.
> **Maintenance:** every feature has a stable ID (`F-xxx`). Never reuse or renumber IDs. Edit one feature block at a time so only that block needs loading. Keep this file under ~150 lines; move dropped or completed detail out instead of letting it pile up.
> Anything marked `TODO` or `TBD` is undecided. Do not treat it as a requirement.

---

## 1. Product Summary

- **What:** Personal finance tracker with a separate web app and mobile app sharing one database. *(from RECOMMENDED.md)*
- **Primary user:** the owner, personal use first. Possibly public later. *(from RECOMMENDED.md)*
- **Core problem it solves:** TODO
- **What success looks like:** TODO

## 2. Scope

### In scope (MVP)
Taken from the MVP list in `RECOMMENDED.md` §9. Confirm or edit.
- Email login (web)
- Add transaction
- Transaction list
- Monthly total by category

### Planned later (`LATER`)
Taken from the "Add later" list in `RECOMMENDED.md` §9. Order and priority TBD.
- Mobile app
- Budgets
- Recurring transactions
- Charts
- CSV import of bank statements
- Receipt uploads
- Offline cache on mobile
- Push notifications and scheduled jobs
- AI-assisted categorization
- Admin dashboard, analytics, desktop wrapper

### Out of scope (for now)
Taken from the "Avoid or postpone" list in `RECOMMENDED.md` §9.
- Bank-sync integrations and payments (until a public release is decided)

## 3. Platforms and Availability

Both apps have mostly similar capabilities; some features will exist on one platform only. *(from RECOMMENDED.md)*

| Feature | Web | Mobile |
|---|---|---|
| F-001 to F-006 | TBD | TBD |

Platform-only features: TODO

## 4. Core Concepts (domain vocabulary)

Define each term once here and reuse it everywhere. Fill in as decisions are made.

| Term | Meaning |
|---|---|
| Account | TODO (e.g. where money lives) |
| Category | TODO |
| Transaction | TODO |
| Transfer | TODO. Mentioned in `RECOMMENDED.md` as a move between accounts; confirm it is a feature |

## 5. Features

Block template (copy for each new feature):

```
### F-xxx Name  [MVP | LATER | IDEA | DROPPED]  [Web | Mobile | Both]
**Goal:** one sentence, the user outcome.
**User flow:**
1. ...
**Rules / behavior:** edge cases, validation, defaults.
**Acceptance criteria:**
- [ ] Given ..., when ..., then ...
**Out of scope:** ...
**Open questions:** ...
```

### F-001 Sign in  [MVP]  [Web]
**Goal:** TODO
**User flow:** TODO
**Rules / behavior:** Email login is in the MVP list. Google sign-in is optional per `RECOMMENDED.md`. TODO: confirm.
**Acceptance criteria:**
- [ ] TODO

### F-002 Accounts  [TBD]  [TBD]
**Goal:** TODO
**User flow:** TODO
**Rules / behavior:** An `accounts` table is part of the MVP schema. No account screen is listed in the MVP; TODO: decide how accounts get created.
**Acceptance criteria:**
- [ ] TODO

### F-003 Categories  [TBD]  [TBD]
**Goal:** TODO
**User flow:** TODO
**Rules / behavior:** A `categories` table is part of the MVP schema. TODO: default categories or user-defined?
**Acceptance criteria:**
- [ ] TODO

### F-004 Add transaction  [MVP]  [Web]
**Goal:** TODO
**User flow:** TODO
**Rules / behavior:** TODO (required fields, income vs expense, currency, date defaults)
**Acceptance criteria:**
- [ ] TODO

### F-005 Transaction list  [MVP]  [Web]
**Goal:** TODO
**User flow:** TODO
**Rules / behavior:** TODO (sorting, filtering, edit and delete)
**Acceptance criteria:**
- [ ] TODO

### F-006 Monthly total by category  [MVP]  [Web]
**Goal:** TODO
**User flow:** TODO
**Rules / behavior:** TODO (month boundaries, how transfers are treated, currency handling)
**Acceptance criteria:**
- [ ] TODO

## 6. Non-Functional Requirements

Only what is already decided in `RECOMMENDED.md`; add more as needed.
- Data syncs across phone and desktop from day one.
- Free tiers only for now.
- Money correctness matters (storage rules live in `RULES.md`).
- Other (performance, privacy, accessibility, locales): TODO

## 7. Open Questions

Move each item into a feature block or Core Concepts once answered, then delete it here.
- Which currencies, and is multi-currency needed in the MVP?
- Which features are platform-specific?
- How are accounts and categories created in the MVP?
- Are transfers between accounts part of the MVP?
- What is the trigger for going public, and what changes then?
