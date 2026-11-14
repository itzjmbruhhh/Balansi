# Balansi: Component Inventory

> **Scope:** parts used by sign-in chrome, the dashboard, the analytics figures, and the add-transaction sheet.
> **Look:** `DESIGN_TOKENS.md`. **Where they sit:** `SCREEN_SPECIFICATIONS.md`.
> **Source anatomy:** `DESIGNS/DESIGN.md` sections 4 and 6. Balansi names and content overrides are `[proposed]` in `DESIGN.md`.
> **Out of scope:** partner-brand rows, notification bell, milestone illustrations, projection charts, invest range switch (1D / 1W / 1Y).

Variants listed here are the ones the reference already defines. No extra visual styles.

---

## 1. Button

Pill radius. Label `type-button`. Press: scale 0.98. Disabled: fill at 35% opacity, label at 60%.

| Variant | Fill | Label | Use in this scope |
|---|---|---|---|
| Primary | `action` | `on-action`, 16pt / 800 | Save on the sheet. Empty-dashboard add action |
| Secondary | `brand` | white, 15pt / 800 | A second brand action, if a screen needs one. Not used on the dashboard by default |
| Outline | transparent, `border-outline` | `brand` light, `brand-soft` dark, 15pt / 800 | Edit, once edit exists. Not required on these screens yet |
| Text | none | `action` light, `action-bright` dark, 14pt / 800 | Retry, or a quiet alternate action |

Padding: 15pt vertical, 30pt horizontal. Full width on the sheet with 18pt side insets. Minimum height 48pt. Hit area at least 44pt.

Pressed primary fill is `action-pressed`. Pressed secondary fill is `brand-pressed`. Pressed outline fill is `brand-wash`. Pressed text button drops to 60% opacity.

## 2. Amount entry

The sheet's amount. No box. Centered. `type-hero` or `type-amount-lg`, weight 900, tabular. Caret uses `action`. Peso prefix, same weight, about 70% of the amount size. Helper line under it in `type-meta`, `text-secondary`.

One variant. States: empty (prefix and a zero or a bare caret), filled, disabled while saving.

## 3. Text field

Used if a Balansi screen draws note or account name. Clerk sign-in fields stay inside Clerk.

Height 52pt. Fill `surface`. Radius `radius-md`. No border at rest. Focus: `border-focus`. Placeholder `text-tertiary`, `type-body`. Label sits above on focus, `type-label`, `text-secondary`.

States: rest, focus, disabled.

## 4. Choice group

Two uses on the sheet, same control. `[proposed]`

- Expense / Income
- Actual / Expected

Selected segment: `action` fill, `on-action` label. Unselected: `surface` fill, `text-primary` label. Radius `radius-md` on the track. Each segment at least 44pt tall.

## 5. Month control

Trailing control on the dashboard title row, and the month field on the sheet. Shows the month and year. Steps backward and forward. Current month is the default. `[proposed]`

Minimum hit area 44pt. Label `type-meta`. No separate screen in this spec.

## 6. Hero total

Centered stack.

- Label, `type-meta`, `text-secondary`
- Amount, `type-hero`, `text-primary`, tabular
- Delta, `type-delta`

Delta variants: positive (`positive`, ▲), negative (`negative`, ▼). The period words stay `text-secondary`.

Ticker runs when the amount changes, 300ms, unless reduce-motion is on.

## 7. Month summary card

Full width minus 18pt. Radius `radius-xl`. Padding 18pt. Gradient `brand` to `brand-bright` at 150 degrees. Shadow `shadow-summary`.

Contents: eyebrow "This month" in white at 85%, `type-label`. Two lines, actual expenses and expected expenses, amounts in white, `type-amount-lg` for the leading figure and `type-money` for the second. Subtitles in white at 80%, `type-meta`.

One variant. Pressed scale 0.98 has no destination until a detail screen exists, so this spec does not make the card pressable.

## 8. Purpose donut

Outer diameter about 168pt (144pt at 375pt wide, 184pt at 430pt). Inner hole about 110pt at the standard size, filled with `canvas`. Segments use `chart-1` through `chart-6` in order, only for purposes that have a balance. Gaps 0 to 2 degrees.

Center: title `type-label` in `text-secondary`, value `type-subtitle` in `text-primary`. Proposed title: "By purpose". Proposed value: total owned.

Load: segments sweep in clockwise from 12 o'clock over 600ms. Center fades in at 400ms. Reduce-motion draws the finished ring.

Tap a segment: highlight that segment and move the legend to its row. Hit area along the ring at least 44pt.

The donut has no shadow.

## 9. Legend row

Padding 9pt vertical. Divider `border-row`. Leading chip 12pt, radius `radius-xs`, the segment color. Name `type-row`. Share `type-meta`, `text-secondary`. Amount `type-money`, tabular, right aligned, about 78pt wide.

Full row is tappable, at least 56pt. Tap matches the donut highlight.

Variants: normal, highlighted (row fill `surface-pressed`).

## 10. Category row

Dashboard list of this month's expense totals.

Height about 62pt. Inset 22pt. Name `type-row`. Actual total `type-money`, `text-primary`, trailing. Expected total, when present, `type-meta`, `text-secondary`, under the name.

Leading chip 12pt, radius `radius-xs`. Chip color waits on the same open chart mapping. Until then the chip uses `brand` for every category. Do not invent per-category colors.

Row tap has no destination in this spec (the category screen is out of scope). The row is not pressable here.

Divider `border-row`. No shadow.

## 11. Transaction row

Not on the dashboard in this scope. Reserved for the sheet's saved-state handoff and later lists, so the amount colors stay consistent.

Income amount: `positive` with a leading "+". Expense amount: `text-primary`, no minus sign. `[proposed]`

## 12. Bottom sheet

Scrim `scrim`. Panel fill `surface`. Top radius `radius-sheet`. Shadow `shadow-sheet`. Side inset 18pt. Bottom inset includes the safe area. The amount stays above the keyboard.

Parts: grab area, title in `type-subtitle`, body, full-width primary button.

States: open, saving (button busy, fields still showing their values), error (message in `negative` or `text-primary` with the retry copy, values kept).

Close: scrim tap, close control (at least 44pt, accessible name "Close"), system back.

This is the only overlay in the current scope. No centered dialog.

## 13. Tab bar

`[proposed]` chrome. See `SCREEN_SPECIFICATIONS.md` section 5.

Height 52pt plus safe area. Background `surface` light, `canvas` dark. `border-hairline` on top. Icon 22pt with a 44pt hit. Label `type-tab`, always visible.

Active: filled icon and label in `action` (light) or `action-bright` (dark). Inactive: `text-tertiary`. No pill behind the active item.

Dashboard is the only working tab in this spec.

## 14. Empty, loading, error

Shared by the dashboard. Copy is specific to the missing data. No illustration.

| State | Content |
|---|---|
| Loading | Fixed title. No placeholder amounts |
| Empty | One sentence and a primary button that opens the sheet |
| Error | What failed, plus a text button labeled "Try again" |

## 15. Explicitly not components yet

App icon, logo, account row, category detail header, yearly chart, search field, toast. Add them when those screens are in scope.
