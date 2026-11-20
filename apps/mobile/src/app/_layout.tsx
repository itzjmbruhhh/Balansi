import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import "@/global.css";

const StyledSafeAreaView = styled(SafeAreaView);

export const unstable_settings = {
  initialRouteName: "(auth)",
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

function AuthenticatedStack() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const inAuthGroup = segments[0] === "(auth)";

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn && !inAuthGroup) router.replace("/(auth)/SignIn");
    if (isSignedIn && inAuthGroup) router.replace("/(tabs)");
  }, [inAuthGroup, isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color="#5A2B82" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  if (!publishableKey) {
    return (
      <StyledSafeAreaView className="flex-1 items-center justify-center bg-background px-8">
        <Text className="text-center text-lg font-bold text-foreground">Balansi needs an auth key</Text>
        <Text className="mt-2 text-center text-sm leading-6 text-muted-foreground">
          Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to apps/mobile/.env and restart Expo.
        </Text>
      </StyledSafeAreaView>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <AuthenticatedStack />
    </ClerkProvider>
  );
}
