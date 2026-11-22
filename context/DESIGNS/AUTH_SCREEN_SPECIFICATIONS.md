# Balansi: Auth Screen Specifications (Welcome, Sign in, Sign up)

> **Scope:** Welcome (entry), Sign in, Sign up, and the email verification step. Replaces the "Chrome around Clerk" note in `SCREEN_SPECIFICATIONS.md` section 2 once approved.
> **Tokens:** `DESIGN_TOKENS.md` (no new values). **Parts:** `COMPONENT_INVENTORY.md`.
> **Source rules:** `RULES.md` 7b (Clerk), 7a (antislop), `ARCHITECTURE.md` section 4 (identity).
> **Tags:** `[stated]` from the owner's request. `[proposed]` my draft. `[verify]` check against current Clerk docs before building.
> **Out of scope:** forgot password and reset, Apple sign-in, multi-factor, account deletion, legal pages.

---

## 1. Conflicts with existing docs (decide before building)

| # | Existing doc says | This spec does | Needed |
|---|---|---|---|
| A1 | `PRD.md` F-001: email login via Clerk | Adds Google, password, and username | Update F-001 |
| A2 | `SCREEN_SPECIFICATIONS` 2: "Do not draw a homemade form" | Draws the forms | Use Clerk custom flows (hooks), not prebuilt components. `[verify]` |
| A3 | `COMPONENT_INVENTORY` 3: label floats on focus | Labels stay visible above every field | Update the text field spec. Reason: visible labels survive autofill and password managers |
| A4 | `RULES.md` 7b: native Google needs a development build | Google works through the browser-based flow in Expo Go. `[verify]` | Keep native Google for a later dev build |
| A5 | `SCHEMA.md`: no user table | Username lives in Clerk, not Supabase | None, unless the app needs to show it |
| A6 | Product is not yet store-published | Offering Google sign-in may require an equivalent privacy-preserving option on iOS (App Store guideline 4.8) | Check before store release. `[verify]` |

## 2. Flow `[proposed]`

```
Welcome (signed out only)
   |-- "Sign in" ---------> Sign in  <--link-->  Sign up <-- "Create account" --|
   |                           |                    |
   |                           | success            | email + password: verification code, then success
   |                           v                    v
   |                       Dashboard            Dashboard
Signed-in users skip Welcome and open the Dashboard.
Google (either screen): browser-based OAuth, return to the app, then Dashboard
```

- Google on Sign in and Sign up is one button and one flow. Clerk decides whether the Google account signs in or creates a user. `[verify]`
- Sign up with email and password normally requires an email code before the account is active. This spec includes that step.
- The Clerk Dashboard must enable: Google, password, username, and email verification by code. The UI cannot work without these settings.

## 3. Layout

- Oak band at the top with the word "Balansi" (`type-amount-lg`). A solid fill, no gradient, no photo. Reason: the one saturated element, and the identity.
- Sheet below with `radius-sheet` (24pt) top corners on `canvas`, side inset 22pt (`space-6`).
- Order inside the sheet: title (`type-title`), Google button, "or" divider, fields, primary button, switch link.
- The page scrolls inside the keyboard-safe area. The band scrolls away on Sign up. Sign in fits one screen at 390 x 844.
- 375pt wide: the same layout, with the band at 24pt top padding. 430pt and tablet: the sheet is capped at 480pt wide and centered.

## 4. Components (UI only, no Clerk imports)

Location: `apps/mobile/src/features/auth/components/`. Every component is controlled by props.

| Component | Props | Notes |
|---|---|---|
| `AuthLayout` | `children` | Band plus sheet plus keyboard avoiding |
| `TextField` | `label, value, onChangeText, error?, disabled?, helper?, ...input props` | 52pt, `radius-md`, `surface` fill, `border-focus` on focus, `negative-text` border and message on error |
| `PasswordField` | `TextField` props plus `autoComplete` | Trailing eye button, 44pt hit, `aria-label` "Show password" or "Hide password", `aria-pressed` |
| `ProviderButton` | `provider, label, onPress, loading?, disabled?` | New variant, built from existing tokens: `surface` fill, `border-outline` width in `text-secondary`, `text-primary` label, pill. Google "G" is the official mark |
| `PrimaryButton` | `label, onPress, loading?, disabled?` | Existing primary. Disabled: fill at 35%, label at 60% |
| `OutlineButton` | `label, onPress, disabled?` | Existing outline variant. Used on Welcome |
| `WelcomeHero` | `title, subtitle` | Oak area with wordmark, shapes, headline, and line. Shapes are decorative and hidden from screen readers |
| `DividerLabel` | `label` | Two `border-row` lines around "or" in `type-meta` |
| `TextLink` | `prefix, label, onPress` | `type-meta` prefix in `text-secondary`, label in `action-text`, 14pt / 800 |
| `CodeField` | `length, value, onChange, error?` | 6 boxes, same height and radius as `TextField`, tabular figures |
| `FormMessage` | `message` | `type-meta`, `negative-text`, linked to its field with `accessibilityHint` / `aria-describedby` |

Screens (`SignInScreen`, `SignUpScreen`) hold React Hook Form and the Clerk hooks, and translate Clerk errors into field messages. Validation schemas live in `packages/core` (`RULES.md` 4 and 6).

## 5. Welcome (entry screen) `[proposed]`

The first screen a signed-out user sees. It routes to Sign in or Sign up and does nothing else.

**Layout.** Same Oak and sheet language as the auth screens, so the three read as one flow.
- Oak area, full bleed: wordmark, shapes, headline, supporting line.
- Sheet below, `radius-sheet` top corners, `canvas` fill, 22pt inset: two stacked buttons with 12pt between them, 32pt bottom padding plus the safe area.

| Element | Rule |
|---|---|
| Wordmark | The word "Balansi" in `type-amount-lg`, `on-brand`. No logo |
| Shapes | Six flat shapes in a 3 x 2 grid, decorative, hidden from screen readers, no animation |
| Headline | "Know where your pesos go", `type-amount-lg`, `on-brand` |
| Supporting line | "Track what you spend, what you earn, and what you hold.", `type-body`, `on-brand-85` |
| Primary | "Sign in", opens Sign in |
| Outline | "Create account", opens Sign up. Existing outline variant: `border-outline`, `outline-brand` label |

**Shapes.** Colors are `chart-emergency-fund`, `chart-necessities`, `chart-guilt-free`, `chart-investments`, and a `canvas`-colored shape in the slot where `chart-savings` would sit, because Oak is already the background. No gradients, shadows, or blur.

**States.** One. There is no loading, error, or disabled state, because the screen holds no data.

**Not included, on purpose.**
- Carousel dots from the reference: there is no carousel content.
- A photo: replaced by the shapes.
- The legal line ("By continuing, you agree to ... Privacy Policy and Terms of Use"): Balansi has neither page yet, so the links would be dead. Add it as two `TextLink` items once both pages exist.

**Behavior.** Back from Sign in or Sign up returns to Welcome. `[proposed]` Welcome has no back action. Welcome is not reachable once signed in.

## 6. Sign in

| Element | Rule |
|---|---|
| Title | "Sign in" |
| Google | "Continue with Google" |
| Email | Label "Email", `email-address` keyboard, `autoComplete="email"`, return key Next |
| Password | Label "Password", `autoComplete="current-password"`, return key Done submits |
| Primary | "Sign in", disabled until both fields have content |
| Switch link | "New to Balansi? Create an account" |

States: empty (email focused, button disabled), filled, field error, Google error, loading, disabled.

## 7. Sign up

| Element | Rule |
|---|---|
| Title | "Create your account" |
| Fields | Username, Email, Password, Confirm password |
| Password helper | "Use at least 8 characters." `[verify]` the minimum and any strength or breach checks in the Clerk Dashboard |
| Confirm password | Checked in the app only. Clerk has no such field. Zod `refine` in `core` |
| Primary | "Create account", disabled until all four fields have content |
| Switch link | "Already have an account? Sign in" |
| Verify step | Title "Check your email", line "Enter the 6-digit code sent to [email]", `CodeField`, "Verify email", "Send a new code", "Use a different email" |

States: empty (username focused), filled, validation errors, loading, verify, verify error.

## 8. Error messages `[proposed]`

Clerk returns error codes and messages. The app shows its own copy, mapped by code, so wording stays consistent. Codes below are the ones I expect and must be confirmed. `[verify]`

| Condition | Field | Copy |
|---|---|---|
| Wrong password | Password | "Password is incorrect. Try again." |
| No account for this email | Email | "No account found for this email." |
| Username taken | Username | "That username is taken." |
| Email already used | Email | "An account with this email already exists." |
| Password too short or breached | Password | "Choose a stronger password. Use at least 8 characters." |
| Passwords differ (app-side) | Confirm password | "Passwords don't match." |
| Code wrong or expired | Code | "That code didn't match. Check the email and try again." |
| Google cancelled or failed | Form | "Couldn't sign in with Google. Try again." |
| Network | Form | "Couldn't reach Balansi. Check your connection." |

Do not reveal whether an email exists on Sign in if the Clerk instance is configured to prevent it. `[verify]`

## 9. Accessibility and interaction

- Every field has a visible label. No placeholder-only labels. Placeholders use `text-secondary`.
- Focus ring is `border-focus` (`action-text`). Errors never rely on color alone: the message text always appears.
- Touch targets are at least 44pt. The eye button is 44 x 44. Buttons are 52pt tall.
- Respect system text scale. Respect reduce-motion: the spinner stops rotating.
- Autofill: `username`, `email`, `current-password`, and `new-password` hints. The two password fields on Sign up both use `new-password`.
- Loading disables every control on the screen, including Google, and keeps typed values.
- The primary button never changes size between states.

## 10. Antislop reasons (R-31)

| Decision | Reason |
|---|---|
| Oak band with the wordmark | The one brand moment. No logo is invented (R-23) |
| Google above email | It is the fastest path, so it is first. The divider keeps the two methods separate |
| Persistent labels | Autofill and screen readers need them (R-39) |
| Provider button variant | Google's guidelines want a neutral button. It reuses tokens, so no new values |
| No forgot-password link | The reset screen does not exist yet. A dead link would break R-24 and R-26 |
| Copy | Names the action ("Create account", "Send code"). No generic CTAs (R-15) |
| Welcome shapes | They echo the five purpose colors on the dashboard donut, and appear on this screen only. No gradient, glow, or animation (R-01, R-07, R-13, R-19) |
| Welcome buttons say "Sign in" and "Create account" | They match the titles of the two screens they open, instead of "Log in" and "Sign up" |
| No carousel dots, photo, or legal line on Welcome | Dots with no carousel are decoration, a photo would be an unrequested asset (R-23), and legal links would be dead (R-24, R-26) |

## 11. Open items

- Forgot password and reset flow (needed before real use with password sign-in).
- Privacy Policy and Terms of Use pages, then the legal line on Welcome. App stores typically require a privacy policy before release.
- A visible back control on Sign in and Sign up. The mockups rely on the system back gesture, and a 44pt back button in the Oak band is the likely addition.
- Whether Welcome keeps its shapes, or becomes a plain Oak area.
- Apple sign-in, depending on store release (A6).
- Whether the display name shown in the app is the Clerk username.
- Final Clerk error codes and the password rules configured in the Dashboard.
