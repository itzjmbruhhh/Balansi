import { Appearance } from "react-native";
import { useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

export function useAppearance() {
  const [mode, setMode] = useState<ThemeMode>("system");

  const setTheme = (mode: ThemeMode) => {
    if (mode === "system") {
      Appearance.setColorScheme("unspecified");
    } else {
      Appearance.setColorScheme(mode);
    }
    setMode(mode);
  };

  return {
    mode,
    setTheme,
  };
}
