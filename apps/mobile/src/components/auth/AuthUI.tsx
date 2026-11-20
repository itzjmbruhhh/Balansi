import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import type { TextInputProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const StyledSafeAreaView = styled(SafeAreaView);

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 pt-8">{children}</View>
    </StyledSafeAreaView>
  );
}

export function AuthBrand() {
  return (
    <View className="mb-10">
      <Text className="text-2xl font-extrabold tracking-tight text-foreground">Balansi</Text>
      <View className="mt-3 h-1 w-10 rounded-full bg-primary" />
    </View>
  );
}

export function AuthHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View className="mb-8">
      <Text className="text-3xl font-extrabold tracking-tight text-foreground">{title}</Text>
      <Text className="mt-2 text-base leading-6 text-muted-foreground">{subtitle}</Text>
    </View>
  );
}

export function AuthField({ label, error, className = "", ...props }: TextInputProps & { label: string; error?: string; className?: string }) {
  return (
    <View className={`mb-5 ${className}`}>
      <Text className="mb-2 text-sm font-bold text-foreground">{label}</Text>
      <TextInput
        {...props}
        accessibilityLabel={label}
        className={`h-14 rounded-xl border bg-surface px-4 text-base text-foreground ${error ? "border-red-500" : "border-border"}`}
        placeholderTextColor="#9C92AD"
        selectionColor="#5A2B82"
        returnKeyType={props.returnKeyType ?? "next"}
      />
      {error ? <Text accessibilityRole="alert" className="mt-1.5 text-sm text-red-700">{error}</Text> : null}
    </View>
  );
}

export function AuthNotice({ children }: { children: ReactNode }) {
  return (
    <View accessibilityRole="alert" className="mb-5 rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 dark:bg-[#2A1E3A]">
      <Text className="text-sm leading-5 text-red-700 dark:text-red-300">{children}</Text>
    </View>
  );
}

export function AuthButton({ title, onPress, loading, disabled = false }: { title: string; onPress: () => void; loading: boolean; disabled?: boolean }) {
  const unavailable = loading || disabled;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: unavailable, busy: loading }}
      className={`mt-1 min-h-14 flex-row items-center justify-center rounded-full px-6 ${unavailable ? "bg-primary/50" : "bg-primary active:opacity-80"}`}
      disabled={unavailable}
      onPress={onPress}
    >
      {loading ? <ActivityIndicator color="#14302A" /> : <Text className="text-base font-extrabold text-[#14302A]">{title}</Text>}
    </Pressable>
  );
}

export function AuthTextButton({ title, onPress, disabled = false }: { title: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      className="min-h-11 justify-center px-2 active:opacity-60 disabled:opacity-50"
      disabled={disabled}
      onPress={onPress}
    >
      <Text className="text-sm font-bold text-[#5A2B82] dark:text-[#C8AEDF]">{title}</Text>
    </Pressable>
  );
}

export function AuthFooter({ children }: { children: ReactNode }) {
  return <View className="mt-8 flex-row justify-center">{children}</View>;
}

export function AuthLinkText({ children }: { children: ReactNode }) {
  return <Text className="text-sm font-bold text-[#5A2B82] dark:text-[#C8AEDF]">{children}</Text>;
}

export function validateEmail(value: string) {
  const email = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Enter a valid email address.";
}

export function validateUsername(value: string) {
  const username = value.trim();
  if (!username) return "Enter a username.";
  if (username.length < 4 || username.length > 64) return "Username must be between 4 and 64 characters.";
  if (/\s/.test(username)) return "Usernames can’t contain spaces.";
  return "";
}

export function messageFromAuthError(error: unknown) {
  const clerkError = error as { errors?: Array<{ longMessage?: string; message?: string }> };
  return clerkError?.errors?.[0]?.longMessage || clerkError?.errors?.[0]?.message || "We couldn’t complete that request. Please try again.";
}
