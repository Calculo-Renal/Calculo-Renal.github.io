import LinkPressable from "@/components/LinkPressable"
import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";
import { useTheme } from "@/hooks/use-theme"
import { useHeaderHeight } from "@/context/HeaderHeightContext";
import { StyleSheet, View } from "react-native";

export default function Header() {
  const theme = useTheme();
  const { setHeaderHeight } = useHeaderHeight();
  
  return (
    <View
      style={[styles.header, {
        backgroundColor: theme.surface,
      }]}
      onLayout={(event) => {
        setHeaderHeight(event.nativeEvent.layout.height);
      }}
    >
      <LinkPressable href={"/(desktop)"}>
        <Logo />
      </LinkPressable>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
  
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  
    paddingVertical: 12,
    paddingHorizontal: "20%",
  }
})
