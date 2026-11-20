import { Alert, Text, Pressable } from "react-native";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import { useAppearance } from "@/src/theme/useAppearance";
import { useClerk } from "@clerk/expo";
import { useState } from "react";

const Settings = () => {
  const { mode, setTheme } = useAppearance();
  const { signOut } = useClerk();
  const [signingOut, setSigningOut] = useState(false);

  return (
    <ScreenContainer className="bg-background">
      <Text className="text-foreground">Settings</Text>

      <Pressable className="min-h-11 justify-center" onPress={() => setTheme("light")}>
        <Text className="text-foreground">{mode === "light" ? "✓ Light" : "Light"}</Text>
      </Pressable>

      <Pressable className="min-h-11 justify-center" onPress={() => setTheme("dark")}>
        <Text className="text-foreground">{mode === "dark" ? "✓ Dark" : "Dark"}</Text>
      </Pressable>

      <Pressable className="min-h-11 justify-center" onPress={() => setTheme("system")}>
        <Text className="text-foreground">{mode === "system" ? "✓ System" : "System"}</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: signingOut, busy: signingOut }}
        className="mt-8 min-h-12 justify-center border-t border-border active:opacity-70 disabled:opacity-50"
        disabled={signingOut}
        onPress={async () => {
          setSigningOut(true);
          try {
            await signOut();
          } catch {
            Alert.alert("Couldn’t sign out", "Check your connection and try again.");
          } finally {
            setSigningOut(false);
          }
        }}
      >
        <Text className="font-bold text-[#5A2B82] dark:text-[#C8AEDF]">{signingOut ? "Signing out…" : "Sign out"}</Text>
      </Pressable>
    </ScreenContainer>
  );
};

export default Settings;
