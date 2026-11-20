<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read these installed skill files directly (use these paths even if a same-named global skill exists):
- Core filter, always on: `antislop`: `.codex/skills/antislop/SKILL.md`
- UI / visual: `antislop-ui`: `.codex/skills/antislop-ui/SKILL.md`
- Mobile / responsive: `antislop-layoutmobile`: `.codex/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `antislop-code`: `.codex/skills/antislop-code/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source. Acknowledging the user's request without naming the source does not replace this notice.
Only an explicit choice of antislop during or after selects a session mode. A request to review, audit, or avoid file edits does not select a mode; read the global preference in that case. Another skill's mode does not select antislop's mode.
If the mode is unresolved, ask during/after and end the response; wait for the answer before any UI review, planning, or concept. For read-only tasks, put the active-mode notice only at the start of the final answer, never in progress messages. For editing tasks, announce before the first edit and omit it from the final answer.
To update antislop later: `npx antislop-ai --update`, or run `npx antislop-ai` and pick Overwrite them.
<!-- antislop:end -->

## Mobile app and authentication

- The Expo app lives in `apps/mobile` and uses Expo Router, NativeWind, and `@clerk/expo`.
- Clerk is already installed and configured in `apps/mobile/app.json`. Do not run Clerk `init` or add another provider. The root provider and secure token cache are in `apps/mobile/src/app/_layout.tsx`.
- Auth screens are custom NativeWind screens in `apps/mobile/src/app/(auth)/SignIn.tsx` and `SignUp.tsx`. Sign-up requires a username; sign-in uses email and password. Shared fields, buttons, validation, and auth copy live in `apps/mobile/src/components/auth/AuthUI.tsx`.
- Keep Clerk's publishable key in `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`; never expose secret keys in app code. Do not inspect or print `.env` files.
- Keep auth routes inside the root route guard. Signed-out users go to `(auth)`; signed-in users go to `(tabs)`.
- Use the existing Balansi theme tokens and design context in `context/DESIGN.md` and `context/DESIGNS/`. Do not introduce a second visual system for auth.
- Update `context/ARCHITECTURE.md`, `context/RULES.md`, and relevant screen/component specifications when auth behavior or app structure changes.
