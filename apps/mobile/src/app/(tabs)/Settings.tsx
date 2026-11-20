import { Text, Pressable } from "react-native";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import { useAppearance } from "@/src/theme/useAppearance";

const Settings = () => {
  const { mode, setTheme } = useAppearance();

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
    </ScreenContainer>
  );
};

export default Settings;
