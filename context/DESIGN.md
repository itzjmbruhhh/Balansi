# Balansi: Design Direction

> **Purpose:** how Balansi looks and behaves in the UI. Direction for screens, tokens, copy tone, and motion.
> **Not here:** product behavior (`PRD.md`), code conventions (`RULES.md`).
> **Reference:** `DESIGNS/DESIGN.md` is the Acorns (iOS) design system this direction borrows from. Values (colors, type scale, spacing, radii) live there and are not copied here. Once tokens exist in `apps/mobile/global.css`, the code wins for exact values.
> **Tags:** `[stated]` the owner said it. `[proposed]` my draft. `TODO` undecided.
> **Filter:** antislop filters generic output (`RULES.md` 7a). This file supplies the direction it needs.
> **Size:** keep under ~150 lines.

---

## 1. Direction

- Keep the Acorns palette as it is for now: Oak purple for brand and structure, Acorn Green for action and positive signals, warm lilac-white canvas, deep aubergine dark mode. `[stated]` See `DESIGNS/DESIGN.md` section 2.
- Keep the visual language: rounded humanist type (Nunito Sans), big tabular numbers, pill buttons, calm flat surfaces with color only where it carries meaning, light and dark modes. `[proposed]`
- Do not copy Acorns' identity. Replace Round-Ups and Found Money, the acorn and oak motifs, and investing wording. Balansi needs its own name, logo, and icon. `[proposed]`
- Pesos, not dollars: use the peso sign and no `$` anywhere. `[stated]` (`PRD.md`)

## 2. What carries over from the reference

| Acorns element | Balansi use `[proposed]` |
|---|---|
| Portfolio total | Total owned: the sum of account balances (F-002) |
| All-time gain line | Left over for the month, green with ▲ when positive, red with ▼ when negative |
| Allocation donut and legend | Balances split by account purpose (F-011) |
| Round-Ups card (purple gradient) | Month summary card: actual vs expected (F-007) |
| Found Money feed | Recent transactions list; income shown with a green "+" |
| Amount entry (large centered number) | Add-transaction amount input |
| Bottom tab bar, green active state | Tabs for Balansi's own screens (section 3) |

Not carried over: the Invest, Later, Spend, Earn, and Profile tabs, investing terms, and any figure that is not real data.

## 3. Screen Map (MVP) `[proposed]`

Follows the primary flow in `PRD.md` section 2.

| Screen | Feature | Contents |
|---|---|---|
| Sign in | F-001 | Email login |
| Dashboard | F-006, F-007 | Month selector (current month by default), total owned, left over, month summary card, balances-by-purpose donut, category list for the month |
| Category | F-005 | Month total for the category, subcategories, its transactions |
| Add transaction | F-004, F-008, F-012 | Bottom sheet: amount, expense or income, actual or expected, category, month, optional account, optional note |
| Accounts | F-002, F-011 | Accounts grouped by purpose, with balances; add and edit |

Navigation: bottom tabs for Dashboard, Categories, Accounts, and Profile, plus an Add action reachable from every tab.

## 4. Money Display

- Peso sign prefix, thousands separators, two decimals, tabular figures. `[proposed]`
- Format from integer centavos in one shared helper in `packages/core`, never ad hoc in screens.
- Income uses the positive green with a "+". Expenses use the normal text color, not red, so the app stays calm. Red is for a negative left over. `[proposed]`
- Show a clear empty state with the next action instead of a zero chart.

## 5. Tokens

- Tokens live in `apps/mobile/global.css` as Tailwind v4 theme variables. Verify the exact syntax against the NativeWind v5 theme docs. `[proposed]`
- Name by role, not by hue: `canvas`, `surface`, `surface-pressed`, `divider`, `text-primary`, `text-secondary`, `text-tertiary`, `brand`, `action`, `positive`, `negative`, `warning`.
- One chart palette for purpose slices and category colors, taken from the reference's allocation palette.
- Dark mode uses the reference's dark values. Do not use pure black or pure white. `[stated]` (follows the reference)

## 6. Copy Tone

- Plain, specific, and short. State what the number is and what to do next. `[proposed]`
- Drop the reference's motivational lines ("Your money is hard at work"). They are generic, and antislop-copywriting is likely to flag them. `[proposed]`
- Empty states say what to add. Errors say what failed and what to try.

## 7. Motion and Haptics

- Keep it light: a donut sweep on load and a number ticker on change are fine. Nothing decorative. `[proposed]`
- Respect the system reduce-motion setting.
- Haptics need `expo-haptics`, which is not installed. TODO: decide whether to add it.

## 8. Accessibility `[proposed]`

- Dark forest text on the green; never white on bright green (reference, section 7).
- Touch targets at least 44pt; rows at least 56pt.
- Dynamic Type for body and numbers; labels that affect layout stay fixed.
- The donut gets one summary label plus per-slice rows for screen readers.

## 9. Open Items

- Name, logo, and app icon for Balansi.
- Font loading for Nunito Sans (`expo-font`, or a Google Fonts package).
- Donut and chart implementation (the reference assumes `react-native-svg`, which is not installed).
- A shadcn-style component library for mobile (`PRD.md` section 5). Not chosen yet.
- Whether dark mode is the default or follows the system setting.
- Whether to rename `DESIGNS/DESIGN.md` to avoid two files called `DESIGN.md`, and move the Android and SwiftUI guides out of context.
