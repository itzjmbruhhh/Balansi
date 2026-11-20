import { useSignUp } from "@clerk/expo";
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
  validateUsername,
} from "../../components/auth/AuthUI";

export default function SignUp() {
  const { signUp, fetchStatus } = useSignUp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"details" | "verification">("details");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const loading = fetchStatus === "fetching";
  const normalizedEmail = email.trim();

  async function finishSignUp() {
    const result = await signUp.finalize({ navigate: () => router.replace("/(tabs)") });
    if (result?.error) setError(messageFromAuthError(result.error));
  }

  async function createAccount() {
    setError("");
    const validation = validateEmail(email);
    setEmailError(validation);
    if (validation) return;
    const usernameValidation = validateUsername(username);
    setUsernameError(usernameValidation);
    if (usernameValidation) return;
    if (password.length < 8) {
      setError("Use at least 8 characters for your password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Those passwords don’t match.");
      return;
    }
    try {
      const result = await signUp.password({ emailAddress: normalizedEmail, username: username.trim(), password });
      if (result.error) {
        setError(messageFromAuthError(result.error));
        return;
      }
      const sent = await signUp.verifications.sendEmailCode();
      if (sent.error) {
        setError(messageFromAuthError(sent.error));
        return;
      }
      setStep("verification");
    } catch (authError) {
      setError(messageFromAuthError(authError));
    }
  }

  async function verifyEmail() {
    setError("");
    if (!/^\d{6,8}$/.test(code.trim())) {
      setError("Enter the verification code from your email.");
      return;
    }
    try {
      const result = await signUp.verifications.verifyEmailCode({ code: code.trim() });
      if (result.error) {
        setError(messageFromAuthError(result.error));
        return;
      }
      if (signUp.status === "complete") await finishSignUp();
      else setError("Your email is verified, but one more account detail is required. Please contact support.");
    } catch (authError) {
      setError(messageFromAuthError(authError));
    }
  }

  async function resendCode() {
    setError("");
    try {
      const result = await signUp.verifications.sendEmailCode();
      if (result.error) setError(messageFromAuthError(result.error));
    } catch (authError) {
      setError(messageFromAuthError(authError));
    }
  }

  return (
    <AuthShell>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView className="flex-1" keyboardShouldPersistTaps="handled" contentContainerClassName="flex-grow pb-8">
          <AuthBrand />
          <AuthHeading
            title={step === "verification" ? "Confirm your email" : "Make room for clarity"}
            subtitle={step === "verification" ? `We sent a code to ${normalizedEmail}. Enter it below to finish setting up your account.` : "A clear view of your money starts with a few details."}
          />
          {error ? <AuthNotice>{error}</AuthNotice> : null}

          {step === "details" ? (
            <>
              <AuthField label="Email address" value={email} onChangeText={(value) => { setEmail(value); setEmailError(""); }} error={emailError} autoCapitalize="none" autoComplete="email" keyboardType="email-address" textContentType="emailAddress" returnKeyType="next" />
              <AuthField label="Username" value={username} onChangeText={(value) => { setUsername(value); setUsernameError(""); }} error={usernameError} autoCapitalize="none" autoCorrect={false} autoComplete="username" textContentType="username" returnKeyType="next" />
              <AuthField label="Password" value={password} onChangeText={setPassword} autoCapitalize="none" autoComplete="new-password" secureTextEntry textContentType="newPassword" />
              <Text className="-mt-3 mb-4 text-xs leading-5 text-muted-foreground">Use at least 8 characters. Your password should be hard to guess.</Text>
              <AuthField label="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} autoCapitalize="none" autoComplete="new-password" secureTextEntry textContentType="newPassword" returnKeyType="done" onSubmitEditing={createAccount} />
              <AuthButton title="Create account" onPress={createAccount} loading={loading} />
              <AuthFooter>
                <Text className="text-sm text-muted-foreground">Already have an account? </Text>
                <Link href="/(auth)/SignIn" className="min-h-11 justify-center"><AuthLinkText>Sign in</AuthLinkText></Link>
              </AuthFooter>
            </>
          ) : (
            <>
              <AuthField label="Email verification code" value={code} onChangeText={(value) => setCode(value.replace(/\D/g, "").slice(0, 8))} autoComplete="one-time-code" keyboardType="number-pad" textContentType="oneTimeCode" maxLength={8} returnKeyType="done" onSubmitEditing={verifyEmail} />
              <AuthButton title="Verify email" onPress={verifyEmail} loading={loading} />
              <View className="mt-4 items-center">
                <AuthTextButton title="Send a new code" disabled={loading} onPress={resendCode} />
                <AuthTextButton title="Change email address" disabled={loading} onPress={() => { signUp.reset(); setStep("details"); setCode(""); setError(""); }} />
              </View>
            </>
          )}
          <View nativeID="clerk-captcha" />
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthShell>
  );
}
