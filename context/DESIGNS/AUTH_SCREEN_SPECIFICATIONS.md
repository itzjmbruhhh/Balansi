# Balansi: Auth Screen Specifications

> **Status:** implementation reference for the current mobile auth flow. The source of truth is `apps/mobile/src/app/(auth)/SignIn.tsx`, `SignUp.tsx`, `apps/mobile/src/components/auth/AuthUI.tsx`, and `apps/mobile/src/app/_layout.tsx`.
> **Related docs:** `SCREEN_SPECIFICATIONS.md` for the overall screen and navigation design; `RULES.md` section 7b for Clerk configuration.
> **Not included:** a Welcome screen, Google or Apple OAuth, passkey MFA, legal pages, or account deletion.

The auth flow is implemented with custom React Native screens styled with NativeWind. Clerk owns identity and session operations; Balansi owns the screens, local validation, and step transitions. The screens use React state and Clerk hooks, not React Hook Form or shared Zod schemas.

## 1. App entry and protected routes

- The root layout loads `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`, wraps the app in `ClerkProvider`, and uses Clerk's Expo secure token cache.
- While Clerk initializes, the app shows a loading indicator.
- If the publishable key is missing, the app shows setup guidance instead of starting Clerk.
- Signed-out users are redirected to `(auth)/SignIn`; signed-in users are redirected to `(tabs)`.
- Settings currently exposes sign-out. The product-design Profile route has not replaced Settings.

## 2. Sign in

The credentials screen collects email and password. Email is trimmed and checked locally; password is required. Successful sign-in activates the session and routes to `(tabs)`.

The flow also handles:

- Device-trust email verification when Clerk requires it.
- Email-code, phone-code, authenticator TOTP, and backup-code MFA when required by the account.
- Password recovery by email code, followed by new-password and confirmation fields. Passwords must be at least eight characters in this client flow; a successful reset signs out other sessions.

The screen supports resending applicable codes and returning to credentials. It does not offer Google or Apple sign-in.

## 3. Sign up

The details screen collects email, username, password, and password confirmation. Email is trimmed and checked locally. Username is trimmed, required, 4–64 characters, and cannot contain whitespace. Password must be at least eight characters and match the confirmation.

After Clerk creates the account, the app sends an email verification code. The user can submit a 6–8 digit code, request another code, or return to edit the details. A verified, complete sign-up activates the session and routes to `(tabs)`.

## 4. Shared controls and interaction

- Shared controls and validation helpers live in `apps/mobile/src/components/auth/AuthUI.tsx`.
- Fields have visible labels, accessibility labels, keyboard/autofill hints where applicable, and inline validation messages.
- Screens scroll within a keyboard-aware layout and safe area.
- Clerk errors are displayed using the provider's long message or message, with a generic fallback when neither is available.
- Sign-up and sign-in errors are not mapped to custom field-specific copy beyond local validation.

## 5. Clerk configuration

The mobile app requires `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`. The Clerk instance must support email/password sign-in, username sign-up, and email verification codes. Enable the Native API for native requests. MFA methods available to a user must be supported by the implemented flow; passkeys and other strategies need an explicit implementation before being enabled.

Never put a Clerk secret key in the mobile app. The publishable key is client-safe.

## 6. Design direction versus current UI

The implementation uses the existing Balansi theme and custom NativeWind controls. The detailed visual concepts in `DESIGN_BRIEF.md`, `DESIGN_TOKENS.md`, and `COMPONENT_INVENTORY.md` are design targets where they differ from the current controls; they do not imply that a Welcome screen or OAuth buttons exist.

Potential additions such as Google/Apple OAuth, Welcome, and legal pages require product approval and current Clerk/platform documentation before implementation. Do not treat the earlier Google/Welcome exploration as part of the current auth requirements.
