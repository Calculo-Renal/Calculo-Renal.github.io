import LinkPressable from "@/components/LinkPressable";
import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";
import { useTheme } from "@/hooks/use-theme";
import { useHeaderHeight } from "@/context/HeaderHeightContext";
import { Platform, StyleSheet, View } from "react-native";

export default function Header() {
  const theme = useTheme();
  const { setHeaderHeight } = useHeaderHeight();
  
  return Platform.select({
    web: (
      <View
        style={[styles.headerWeb, { backgroundColor: theme.surface }]}
        onLayout={(event) => {
          setHeaderHeight(event.nativeEvent.layout.height);
        }}
      >
        <LinkPressable href={"/(desktop)"}>
          <Logo />
        </LinkPressable>
        <Navigation />
      </View>
    ),
    default: (
      <View
        style={[styles.headerMobile, { backgroundColor: theme.surface }]}
      >
        <LinkPressable href={"/(tabs)"}>
          <Logo />
        </LinkPressable>
      </View>
    ),
  });
}

const styles = StyleSheet.create({
  headerWeb: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: "20%",
  },
  headerMobile: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  }
});
