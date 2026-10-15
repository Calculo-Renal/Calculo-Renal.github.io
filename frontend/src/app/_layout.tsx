import {
  DarkTheme,
  DefaultTheme,
  Slot,
  SplashScreen,
  ThemeProvider,
} from "expo-router";
import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";

import { useEffect } from "react";
import { HeaderHeightProvider } from "@/context/HeaderHeightContext"

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    "DM Sans": require("@/assets/fonts/DMSans/DMSans.ttf"),
    "Funnel Display": require("@/assets/fonts/FunnelDisplay/FunnelDisplay.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <HeaderHeightProvider>
        <Slot />
      </HeaderHeightProvider>
    </ThemeProvider>
  );
}
