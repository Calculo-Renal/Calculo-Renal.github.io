import { Redirect } from "expo-router"
import { Platform } from "react-native";

export default function RootLayout() {

  const isDesktop =
    Platform.OS === "web" ||
    Platform.OS === "windows" ||
    Platform.OS === "macos";

  return isDesktop ? <Redirect href="/(desktop)" /> : <Redirect href="/(tabs)" />;
}
