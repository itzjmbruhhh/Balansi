import { useSignIn } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import {
  AuthBrand,
  AuthButton,
  AuthField,
  AuthFooter,
  AuthHeading,
  AuthLinkText,
  AuthNotice,
  AuthShell,
  AuthTextButton,
  messageFromAuthError,
  validateEmail,
} from "../../components/auth/AuthUI";

export default function SignIn() {
  const { signIn, fetchStatus } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<"credentials" | "device-trust" | "mfa" | "reset-code" | "new-password">("credentials");
  const [mfaMethod, setMfaMethod] = useState<"email" | "phone" | "totp" | "backup">("email");
  const [primaryMfaMethod, setPrimaryMfaMethod] = useState<"email" | "phone" | "totp">("email");
  const [hasAlternateMfaMethod, setHasAlternateMfaMethod] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const loading = fetchStatus === "fetching";
  const normalizedEmail = email.trim();

  async function finishSignIn() {
    const result = await signIn.finalize({ navigate: () => router.replace("/(tabs)") });
    if (result?.error) setError(messageFromAuthError(result.error));
  }

  async function submitCredentials() {
    setError("");
    const validation = validateEmail(email);
    setEmailError(validation);
    if (validation || !password) {
      if (!password) setError("Enter your password.");
      return;
    }
    try {
      const result = await signIn.password({ emailAddress: normalizedEmail, password });
      if (result.error) {
        setError(messageFromAuthError(result.error));
        return;
      }
      if (signIn.status === "complete") {
        await finishSignIn();
      } else if (signIn.status === "needs_client_trust") {
        const emailFactor = signIn.supportedSecondFactors?.find((factor) => factor.strategy === "email_code");
        if (!emailFactor) {
          setError("This account needs another verification method. Contact support to continue.");
          return;
        }
        const sent = await signIn.mfa.sendEmailCode();
        if (sent.error) {
          setError(messageFromAuthError(sent.error));
          return;
        }
        setStep("device-trust");
      } else if (signIn.status === "needs_second_factor") {
        const factors = signIn.supportedSecondFactors ?? [];
        if (factors.some((factor) => factor.strategy === "email_code")) {
          const sent = await signIn.mfa.sendEmailCode();
          if (sent.error) setError(messageFromAuthError(sent.error));
          else { setPrimaryMfaMethod("email"); setHasAlternateMfaMethod(true); setMfaMethod("email"); setStep("mfa"); }
        } else if (factors.some((factor) => factor.strategy === "phone_code")) {
          const sent = await signIn.mfa.sendPhoneCode();
          if (sent.error) setError(messageFromAuthError(sent.error));
          else { setPrimaryMfaMethod("phone"); setHasAlternateMfaMethod(true); setMfaMethod("phone"); setStep("mfa"); }
        } else if (factors.some((factor) => factor.strategy === "totp")) {
          setPrimaryMfaMethod("totp");
          setHasAlternateMfaMethod(true);
          setMfaMethod("totp");
          setStep("mfa");
        } else if (factors.some((factor) => factor.strategy === "backup_code")) {
          setHasAlternateMfaMethod(false);
          setMfaMethod("backup");
          setStep("mfa");
        } else {
          setError("This account needs a verification method that isn’t available here. Contact support to continue.");
        }
      } else {
        setError("We need one more step to finish signing you in. Please try again.");
      }
    } catch (authError) {
      setError(messageFromAuthError(authError));
    }
  }

  async function verifyCode() {
    setError("");
    const submittedCode = code.trim();
    const backupCodeInvalid = step === "mfa" && mfaMethod === "backup" && !/^[a-zA-Z0-9-]{6,24}$/.test(submittedCode);
    const numericCodeInvalid = !(step === "mfa" && mfaMethod === "backup") && !/^\d{4,8}$/.test(submittedCode);
    if (backupCodeInvalid || numericCodeInvalid) {
      setError(step === "mfa" && mfaMethod === "backup" ? "Enter a valid backup code." : "Enter the verification code.");
      return;
    }
    try {
      let result: { error?: unknown };
      if (step === "device-trust" || (step === "mfa" && mfaMethod === "email")) {
        result = await signIn.mfa.verifyEmailCode({ code: submittedCode });
      } else if (step === "mfa" && mfaMethod === "phone") {
        result = await signIn.mfa.verifyPhoneCode({ code: submittedCode });
      } else if (step === "mfa" && mfaMethod === "totp") {
        result = await signIn.mfa.verifyTOTP({ code: submittedCode });
      } else if (step === "mfa" && mfaMethod === "backup") {
        result = await signIn.mfa.verifyBackupCode({ code: submittedCode });
      } else {
        result = await signIn.resetPasswordEmailCode.verifyCode({ code: submittedCode });
      }
      if (result.error) {
        setError(messageFromAuthError(result.error));
        return;
      }
      if (step === "device-trust" || step === "mfa") {
        if (signIn.status === "complete") await finishSignIn();
      } else if (signIn.status === "needs_new_password") {
        setStep("new-password");
      }
    } catch (authError) {
      setError(messageFromAuthError(authError));
    }
  }

  async function startPasswordReset() {
    setError("");
    const validation = validateEmail(email);
    setEmailError(validation);
    if (validation) return;
    try {
      const created = await signIn.create({ identifier: normalizedEmail });
      if (created.error) {
        setError(messageFromAuthError(created.error));
        return;
      }
      const sent = await signIn.resetPasswordEmailCode.sendCode();
      if (sent.error) {
        setError(messageFromAuthError(sent.error));
        return;
      }
      setStep("reset-code");
    } catch (authError) {
      setError(messageFromAuthError(authError));
    }
  }

  async function updatePassword() {
    setError("");
    if (newPassword.length < 8) {
      setError("Use at least 8 characters for your password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Those passwords don’t match.");
      return;
    }
    try {
      const result = await signIn.resetPasswordEmailCode.submitPassword({ password: newPassword, signOutOfOtherSessions: true });
      if (result.error) {
        setError(messageFromAuthError(result.error));
        return;
      }
      if (signIn.status === "complete") await finishSignIn();
    } catch (authError) {
      setError(messageFromAuthError(authError));
    }
  }

  const verifying = step === "device-trust" || step === "mfa" || step === "reset-code";
  const title = step === "device-trust" ? "Check your inbox" : step === "mfa" ? "Verify it’s you" : step === "reset-code" ? "Reset your password" : step === "new-password" ? "Choose a new password" : "Welcome back";
  const subtitle = step === "device-trust"
    ? `Enter the code we sent to ${normalizedEmail}.`
    : step === "mfa"
      ? mfaMethod === "email" ? "Enter the code sent to your email." : mfaMethod === "phone" ? "Enter the code sent to your phone." : mfaMethod === "totp" ? "Enter the code from your authenticator app." : "Enter one of your saved backup codes."
    : step === "reset-code"
      ? `Enter the code we sent to ${normalizedEmail}.`
      : step === "new-password"
        ? "Choose a new password for your Balansi account."
        : "Your money picture is right where you left it.";

  return (
    <AuthShell>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView className="flex-1" keyboardShouldPersistTaps="handled" contentContainerClassName="flex-grow pb-8">
          <AuthBrand />
          <AuthHeading title={title} subtitle={subtitle} />
          {error ? <AuthNotice>{error}</AuthNotice> : null}

          {step === "credentials" ? (
            <>
              <AuthField label="Email address" value={email} onChangeText={(value) => { setEmail(value); setEmailError(""); }} error={emailError} autoCapitalize="none" autoComplete="email" keyboardType="email-address" textContentType="emailAddress" returnKeyType="next" />
              <AuthField label="Password" value={password} onChangeText={setPassword} autoCapitalize="none" autoComplete="current-password" secureTextEntry textContentType="password" returnKeyType="done" onSubmitEditing={submitCredentials} />
              <View className="-mt-2 mb-5 items-end">
                <AuthTextButton title="Forgot password?" onPress={startPasswordReset} />
              </View>
              <AuthButton title="Sign in" onPress={submitCredentials} loading={loading} />
              <AuthFooter>
                <Text className="text-sm text-muted-foreground">New to Balansi? </Text>
                <Link href="/(auth)/SignUp" className="min-h-11 justify-center"><AuthLinkText>Create an account</AuthLinkText></Link>
              </AuthFooter>
            </>
          ) : verifying ? (
            <>
              <AuthField label={step === "mfa" && mfaMethod === "backup" ? "Backup code" : "Verification code"} value={code} onChangeText={(value) => setCode(step === "mfa" && mfaMethod === "backup" ? value.slice(0, 24) : value.replace(/\D/g, "").slice(0, 8))} autoComplete="one-time-code" keyboardType={step === "mfa" && mfaMethod === "backup" ? "default" : "number-pad"} textContentType="oneTimeCode" maxLength={step === "mfa" && mfaMethod === "backup" ? 24 : 8} returnKeyType="done" onSubmitEditing={verifyCode} />
              <AuthButton title="Verify code" onPress={verifyCode} loading={loading} />
              {step === "mfa" && (mfaMethod !== "backup" || hasAlternateMfaMethod) ? <AuthTextButton
                title={mfaMethod === "backup" ? "Use another verification method" : "Use a backup code"}
                disabled={loading}
                onPress={() => { setMfaMethod(mfaMethod === "backup" ? primaryMfaMethod : "backup"); setCode(""); setError(""); }}
              /> : null}
              {(step === "device-trust" || (step === "mfa" && (mfaMethod === "email" || mfaMethod === "phone")) || step === "reset-code") ? <AuthTextButton title="Send a new code" disabled={loading} onPress={async () => {
                setError("");
                try {
                  const result = step === "device-trust" || (step === "mfa" && mfaMethod === "email")
                    ? await signIn.mfa.sendEmailCode()
                    : step === "mfa" ? await signIn.mfa.sendPhoneCode() : await signIn.resetPasswordEmailCode.sendCode();
                  if (result.error) setError(messageFromAuthError(result.error));
                } catch (authError) {
                  setError(messageFromAuthError(authError));
                }
              }} /> : null}
              <AuthTextButton title="Back to sign in" disabled={loading} onPress={() => { signIn.reset(); setStep("credentials"); setCode(""); setError(""); }} />
            </>
          ) : (
            <>
              <AuthField label="New password" value={newPassword} onChangeText={setNewPassword} autoCapitalize="none" autoComplete="new-password" secureTextEntry textContentType="newPassword" />
              <AuthField label="Confirm new password" value={confirmPassword} onChangeText={setConfirmPassword} autoCapitalize="none" autoComplete="new-password" secureTextEntry textContentType="newPassword" returnKeyType="done" onSubmitEditing={updatePassword} />
              <AuthButton title="Save new password" onPress={updatePassword} loading={loading} />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthShell>
  );
}
