# Balansi: Design Tokens

> **Purpose:** colors, type, spacing, radii, borders, and shadows for the current scope.
> **Source of values:** `DESIGNS/DESIGN.md`. **Role names:** `DESIGN.md`.
> **Authority:** after these variables exist in `apps/mobile/global.css`, the code wins (`DESIGN.md`).
> **Implementation status:** `global.css` currently defines a subset of the semantic color and typography variables used by the app. Many component, chart, spacing, radius, border, motion, and shadow values below remain design tokens only; do not assume they are implemented.
> **Phase 3 changes:** gradient removed. Chart tokens are named by purpose. Three text-contrast tokens added (`[proposed]`, pending a real contrast check).

Names are roles. Reference hue names sit in the Notes column so the values stay traceable.

---

## 1. Color

### Brand, action, semantic

| Token | Light | Dark | Notes |
|---|---|---|---|
| `brand` | `#5A2B82` | `#5A2B82` | Structure, secondary button, month summary card fill. Reference: Acorns Oak |
| `brand-pressed` | `#47206A` | `#47206A` | Pressed secondary button |
| `brand-soft` | `#C8AEDF` | `#C8AEDF` | Dark-mode outline border and text |
| `brand-wash` | `#F1ECF7` | `#2A1E3A` | Pressed outline fill |
| `outline-brand` | `#5A2B82` | `#C8AEDF` | Outline button border and label |
| `on-brand` | `#FFFFFF` | `#FFFFFF` | Text on `brand` |
| `on-brand-85` | white at 85% | white at 85% | Eyebrow on the summary card |
| `on-brand-80` | white at 80% | white at 80% | Subtitle on the summary card |
| `action` | `#6FBF4E` | `#6FBF4E` | Primary button fill. Reference: Acorn Green |
| `action-bright` | `#84D962` | `#84D962` | Dark-mode accents |
| `action-pressed` | `#5AA53D` | `#5AA53D` | Pressed primary button |
| `on-action` | `#14302A` | `#14302A` | Text on `action`. Never white on this green |
| `action-text` | `#357A24` | `#84D962` | `[proposed]` Active tab, text button, focus ring. Bright green fails contrast on light surfaces |
| `positive` | `#6FBF4E` | `#84D962` | Fills and icons. Income "+" on dark |
| `positive-text` | `#357A24` | `#84D962` | `[proposed]` Left over when up, income amounts, on light surfaces |
| `positive-wash` | `#E9F6E3` | `#1E2C18` | Quiet fill behind a positive chip |
| `negative` | `#E0584F` | `#FF6B6B` | Fills and icons |
| `negative-text` | `#C0392F` | `#FF6B6B` | `[proposed]` Left over when down, on light surfaces |
| `warning` | `#E0A52A` | `#F2C84B` | Warning only |
| `pending` | `#9C92AD` | `#9C92AD` | Pending or disabled metadata |

### Canvas, surface, text

| Token | Light | Dark |
|---|---|---|
| `canvas` | `#F5F3F8` | `#14121A` |
| `surface` | `#FFFFFF` | `#1E1B27` |
| `surface-pressed` | `#EDE9F2` | `#292533` |
| `surface-elevated` | `#FFFFFF` | `#292533` |
| `divider` | `#E5E1EC` | `#383143` |
| `text-primary` | `#1F1A2B` | `#F2EFF6` |
| `text-secondary` | `#6E6480` | `#ADA4BC` |
| `text-tertiary` | `#9C92AD` | `#756B85` |
| `scrim` | `rgba(15,9,22,0.55)` | `rgba(15,9,22,0.55)` |

`canvas` is never pure white. Dark `canvas` is never pure black. `[stated]`

`text-tertiary` is for disabled content only. It does not meet 4.5:1, so placeholders use `text-secondary`. `[proposed]`

### Chart

Named by account purpose. The map is approved. `[stated]`

| Token | Hex | Purpose |
|---|---|---|
| `chart-savings` | `#5A2B82` | Savings |
| `chart-emergency-fund` | `#45C2B0` | Emergency fund |
| `chart-necessities` | `#F2C84B` | Necessities |
| `chart-guilt-free` | `#9B6FD4` | Guilt-free |
| `chart-investments` | `#6FBF4E` | Investments |

Donut order is the table order, so every neighbor pair differs clearly, including the wrap from investments back to savings. Use these only on the donut and its legend chips. Keep them off buttons, links, and page backgrounds. Coral from the reference is not used because it sits too close to `negative`.

Verify the dark-mode `chart-savings` slice against `surface` once the donut exists. Lighten it for dark mode if it disappears.

### No gradients

Balansi uses no gradient fills. The month summary card is a solid `brand` fill. `[stated]`

## 2. Type

Family: Nunito Sans. Money uses tabular figures. `[proposed]` The app does not currently bundle or load Nunito Sans font files, so rendered text uses the platform fallback until font loading is implemented.

The reference face is a rounded geometric sans. Nunito Sans is the free stand-in named in `DESIGNS/DESIGN.md`. Font files are not in the app yet.

Fallback stack from the reference: `-apple-system, BlinkMacSystemFont, 'SF Pro Rounded', 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`.

| Role | Token | Size | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| Hero amount | `type-hero` | 38pt | 900 | 1.05 | -1pt |
| Card amount | `type-amount-lg` | 28pt | 900 | 1.1 | -0.5pt |
| Screen title | `type-title` | 22pt | 800 | 1.2 | -0.3pt |
| Card title | `type-subtitle` | 18pt | 800 | 1.25 | -0.2pt |
| Body | `type-body` | 16pt | 400 | 1.45 | 0 |
| Row title | `type-row` | 15pt | 700 | 1.3 | -0.1pt |
| Row amount | `type-money` | 15pt | 800 | 1.3 | -0.1pt |
| Meta | `type-meta` | 13pt | 600 | 1.35 | 0 |
| Eyebrow | `type-label` | 12pt | 700 | 1.3 | 0.4pt |
| Button | `type-button` | 16pt | 800 | 1.0 | 0 |
| Tab | `type-tab` | 10pt | 700 | 1.0 | 0.1pt |
| Delta | `type-delta` | 14pt | 700 | 1.2 | 0 |

Size steps from the reference: hero 32pt at 375pt wide, 38pt at 390pt, 42pt at 430pt. Donut outer size 144pt, 168pt, and 184pt at those widths.

`type-hero`, `type-title`, `type-body`, `type-row`, `type-meta`, and `type-delta` scale with the system text size. `type-tab` and `type-label` stay fixed.

Eyebrows are not forced to capitals. `[stated]`

## 3. Spacing

Base unit 4pt.

| Token | Value |
|---|---|
| `space-1` | 4 |
| `space-2` | 8 |
| `space-3` | 12 |
| `space-4` | 16 |
| `space-5` | 18 |
| `space-6` | 22 |
| `space-7` | 24 |
| `space-8` | 32 |
| `space-9` | 40 |
| `space-10` | 48 |
| `space-11` | 64 |

| Use | Token |
|---|---|
| Screen inset, cards | `space-5` (18pt) |
| Screen inset, rows and titles | `space-6` (22pt) |
| Card padding | `space-4` to `space-5` |
| Gap between sections | `space-4` to `space-6` |
| Donut to legend | `space-5` |
| Tablet content max width | 640pt, centered |

## 4. Sizing

| Token | Value | Use |
|---|---|---|
| `size-tap-target` | 44 | Minimum hit area |
| `size-button-min-height` | 48 | Buttons |
| `size-field-height` | 52 | Text fields |
| `size-tab-bar-height` | 52 | Plus the safe area |
| `size-row-height` | 62 | Category, account, and transaction rows |
| `size-legend-row-tap` | 56 | Legend rows |
| `size-legend-amount-width` | 78 | Right-aligned amount column |
| `size-donut-sm / md / lg` | 144 / 168 / 184 | By screen width |
| `size-donut-hole` | 110 | At the standard size |

## 5. Radius

| Token | Value | Use |
|---|---|---|
| `radius-xs` | 4pt | Legend color chip |
| `radius-sm` | 8pt | Inline tags, share bar |
| `radius-md` | 12pt | Text fields, choice track |
| `radius-lg` | 16pt | Stat tiles, list sections |
| `radius-xl` | 18pt | Month summary card |
| `radius-sheet` | 24pt | Sheet top corners |
| `radius-pill` | 500pt | Buttons, Add pill, small status pills |
| `radius-round` | 50% | Donut, circular controls |

Buttons use `radius-pill`. Fields and cards stay on `radius-md` and `radius-lg`.

## 6. Border

| Token | Value | Use |
|---|---|---|
| `border-hairline` | 0.5pt `divider` | Tab bar top, header after scroll |
| `border-row` | 1pt `divider` | Legend and list rows |
| `border-outline` | 1.5pt `outline-brand` | Outline button |
| `border-focus` | 1.5pt `action-text` | Focused text field |
| `border-elevated` | 1pt `divider` | Dark-mode card edge when shadow is too weak |

## 7. Shadow

Shadows are warm and rare. Rows stay flat.

| Token | Value | Use |
|---|---|---|
| `shadow-none` | none | Rows, donut, tab labels |
| `shadow-card` | `0 6px 18px -10px rgba(40,18,70,0.16)` | Tiles and list cards, Add pill |
| `shadow-summary` | `0 10px 24px -12px rgba(74,32,106,0.4)` | Month summary card, the one saturated block |
| `shadow-sheet` | `0 -8px 28px rgba(20,12,30,0.22)` | Bottom sheet |

## 8. Motion

| Token | Value | Use |
|---|---|---|
| `motion-donut` | 600ms ease-out, clockwise from 12 o'clock | Donut load. Center label fades at 400ms |
| `motion-ticker` | 300ms ease-out | Hero, left over, and summary amounts when they change |
| `motion-press` | scale 0.98, 80ms ease-out | Card and button press |
| `motion-tab` | 120ms color crossfade | Active tab |

Respect the system reduce-motion setting. Haptics are undecided. Do not add them in the spec.

## 9. Money format

Peso sign, thousands separators, two decimals, tabular figures. Source values are integer centavos. Income prefix is "+". Expenses have no sign and use `text-primary`. `[proposed]` for the display rules. Pesos, and no `$`, are `[stated]`.
