# Balansi: Component Inventory

> **Scope:** parts used by sign-in chrome, the dashboard, the analytics figures, the add-transaction sheet, and the Tier B screens (Categories, Category detail, Accounts, Profile) at low fidelity.
> **Look:** `DESIGN_TOKENS.md`. **Where they sit:** `SCREEN_SPECIFICATIONS.md`.
> **Source anatomy:** `DESIGNS/DESIGN.md` sections 4 and 6. Balansi names and content overrides are in `DESIGN.md`.
> **Tags:** `[stated]` owner-approved (Phase 3). `[proposed]` draft.
> **Out of scope:** partner-brand rows, notification bell, milestone illustrations, projection charts, invest range switch (1D / 1W / 1Y), gradients.

Variants listed here are the ones the reference already defines, plus the Tier B additions in section 15. No extra visual styles.

---

## 1. Button

Pill radius. Label `type-button`. Press: scale 0.98. Disabled: fill at 35% opacity, label at 60%.

| Variant | Fill | Label | Use in this scope |
|---|---|---|---|
| Primary | `action` | `on-action`, 16pt / 800 | Save on the sheet. Empty-state add action. Add pill |
| Secondary | `brand` | `on-brand`, 15pt / 800 | A second brand action, if a screen needs one. Not used on the dashboard by default |
| Outline | transparent, `border-outline` | `outline-brand`, 15pt / 800 | Edit, once edit exists. Not required yet |
| Text | none | `action-text`, 14pt / 800 | Retry, or a quiet alternate action |

Padding: 15pt vertical, 30pt horizontal. Full width on the sheet with 18pt side insets. Minimum height 48pt. Hit area at least 44pt.

Pressed primary fill is `action-pressed`. Pressed secondary fill is `brand-pressed`. Pressed outline fill is `brand-wash`. Pressed text button drops to 60% opacity.

## 2. Amount entry

The sheet's amount. No box. Centered. `type-hero` or `type-amount-lg`, weight 900, tabular. Caret uses `action`. Peso prefix, same weight, about 70% of the amount size. Helper line under it in `type-meta`, `text-secondary`.

One variant. States: empty (prefix and a zero or a bare caret), filled, disabled while saving.

## 3. Text field

Used for note and account name. Clerk sign-in fields stay inside Clerk.

Height 52pt. Fill `surface`. Radius `radius-md`. No border at rest. Focus: `border-focus`. Placeholder `text-secondary`, `type-body`. Label sits above on focus, `type-label`, `text-secondary`.

States: rest, focus, disabled.

## 4. Choice group

Two uses on the sheet, same control.

- Expense / Income
- Actual / Expected

Selected segment: `action` fill, `on-action` label. Unselected: `surface` fill, `text-primary` label. Radius `radius-md` on the track. Each segment at least 44pt tall.

## 5. Month control

Sits in the "This month" section header on the dashboard, and is the month field on the sheet. Shows the month and year with step buttons backward and forward. Current month is the default. It scopes only the month figures: left over, the summary card, and the category list. It does not change total owned or the donut. `[stated]`

Minimum hit area 44pt. Label `type-meta`. No separate screen. A month picker sheet is deferred with F-014.

## 6. Hero total

Centered stack.

- Label, `type-meta`, `text-secondary`: "Total owned"
- Amount, `type-hero`, `text-primary`, tabular
- Line under it, `type-meta`, `text-secondary`: "Balances as of [date]", taken from the most recent account update

The hero has no delta line. Left over lives in the month section. Ticker runs when the amount changes, 300ms, unless reduce-motion is on.

## 7. Left over line

First row of the "This month" section.

- Amount, `type-delta`, with ▲ in `positive-text` when positive or ▼ in `negative-text` when negative
- Words "left over this month" in `text-secondary`

## 8. Month summary card

Full width minus 18pt. Radius `radius-xl`. Padding 18pt. Solid `brand` fill, no gradient. Shadow `shadow-summary`.

Contents: eyebrow "This month" in `on-brand-85`, `type-label`. Two lines, actual expenses and expected expenses, amounts in `on-brand`, `type-amount-lg` for the leading figure and `type-money` for the second. Subtitles in `on-brand-80`, `type-meta`. A line stating the gap in words (for example "under expected") when both figures exist.

One variant. Not pressable until a detail screen exists.

## 9. Purpose donut

Outer diameter about 168pt (144pt at 375pt wide, 184pt at 430pt). Inner hole about 110pt at the standard size, filled with `canvas`. Segments use the `chart-*` purpose tokens in the order savings, emergency fund, necessities, guilt-free, investments. Only purposes that have a positive balance get a segment. Gaps 0 to 2 degrees.

Center: title `type-label` in `text-secondary`, value `type-subtitle` in `text-primary`. Title: "By purpose". Value: total owned.

Load: segments sweep in clockwise from 12 o'clock over 600ms. Center fades in at 400ms. Reduce-motion draws the finished ring.

Tap a segment: highlight that segment and move the legend to its row. Hit area along the ring at least 44pt. One accessibility summary for the whole donut.

The donut has no shadow. No donut is drawn when there are no positive balances.

## 10. Legend row

Padding 9pt vertical. Divider `border-row`. Leading chip 12pt, radius `radius-xs`, the segment color. Name `type-row`. Share `type-meta`, `text-secondary`. Amount `type-money`, tabular, right aligned, about 78pt wide.

Full row is tappable, at least 56pt. Tap matches the donut highlight.

Variants: normal, highlighted (row fill `surface-pressed`).

## 11. Category row

List of this month's expense totals, on the dashboard and on the Categories screen.

Height about 62pt. Inset 22pt. Name `type-row`. Actual total `type-money`, `text-primary`, trailing. Expected total, when present, `type-meta`, `text-secondary`, under the name. Under that, the share bar (section 15).

No leading color chip. `[stated]` Divider `border-row`. No shadow.

On the dashboard the row is not pressable. On the Categories tab it opens Category detail.

## 12. Transaction row

Used on Category detail. Same height and inset as the category row.

Income amount: `positive-text` with a leading "+". Expense amount: `text-primary`, no minus sign. Subtitle: month, plus the account name when one is set. An "Expected" tag in `type-meta` when the row is expected. `[proposed]`

Not pressable (edit and delete are out of this pass). `[stated]`

## 13. Bottom sheet and in-sheet pane

Scrim `scrim`. Panel fill `surface`. Top radius `radius-sheet`. Shadow `shadow-sheet`. Side inset 18pt. Bottom inset includes the safe area. The amount stays above the keyboard.

Parts: grab area, title in `type-subtitle`, body, full-width primary button.

States: open, saving (button busy, fields still showing their values), error (message in `negative-text` with the retry copy, values kept).

Close: scrim tap, close control (at least 44pt, accessible name "Close"), system back. If an amount has been typed, closing opens the system discard alert (M4).

In-sheet pane: the category and subcategory picker slides in inside the same sheet with a back arrow. Sheets are never stacked. `[stated]`

## 14. Tab bar and Add pill

Tab bar height 52pt plus safe area. Background `surface` light, `canvas` dark. `border-hairline` on top. Solid, no blur. Icon 22pt with a 44pt hit. Label `type-tab`, always visible.

Active: filled icon and label in `action-text`. Inactive: `text-tertiary`. No pill behind the active item.

Tabs: Dashboard, Categories, Accounts, Profile.

Add pill: primary button, compact, floating above the tab bar on the right, with `shadow-card`. Shown on Dashboard, Categories, and Category detail. Hidden on Accounts and Profile. `[stated]`

## 15. Tier B additions `[proposed]`, approved at low fidelity

| Part | Anatomy |
|---|---|
| Account row | Name `type-row`, purpose in `type-meta` `text-secondary`, balance `type-money` trailing. Height about 62pt |
| Category detail header | Back arrow, category name `type-title`, month total `type-amount-lg`, month control below |
| Section header | `type-subtitle` title, optional trailing control. Used for "This month" |
| Share bar | A 4pt tall bar, `radius-sm`, `brand` fill on a `divider` track, showing the category's share of the month's expenses. Decorative to screen readers, with the value in the row text |
| Inline error banner | `type-meta` message plus a text button, on `surface`, no icon |

## 16. Overlay types

| ID | Type | Use | Status |
|---|---|---|---|
| M1 | Bottom sheet, tall | Add transaction | Tier A |
| M2 | In-sheet pane | Category and subcategory picker | Tier A |
| M3 | Bottom sheet, short | Add or edit account | Tier B |
| M4 | System alert | "Discard this entry?" when closing a filled sheet | Approved |
| M5 | Centered dialog | Delete confirmation | Reserved, edit and delete are out of this pass |
| M6 | Month picker sheet | Jump to a month or year | Deferred with F-014 |

## 17. Empty, loading, error

Shared by the dashboard and the Tier B lists. Copy is specific to the missing data. No illustration.

| State | Content |
|---|---|
| Loading | Fixed title. No placeholder amounts |
| Empty | One sentence and a primary button that opens the sheet. Dashboard: "Nothing tracked yet. Add your first expense or income." with "Add transaction" |
| Error | What failed, plus a text button labeled "Try again". Dashboard: "Couldn't load your figures." |

## 18. Explicitly not components yet

App icon, logo, yearly chart, search field, toast, edit and delete controls. Add them when those screens are in scope.
