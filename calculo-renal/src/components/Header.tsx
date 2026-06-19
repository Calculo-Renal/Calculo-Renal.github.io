import LinkPressable from "@/components/LinkPressable"
import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";
import { useTheme } from "@/hooks/use-theme"
import { StyleSheet, View } from "react-native";

export default function Header() {
  const theme = useTheme();
  
  return (
    <View style={[styles.header, {
      backgroundColor: theme.surface
    }]}>
      <LinkPressable href={"/(desktop)"} style={{
        width: "100%",
        height: "100%",
      }}>
        <Logo />
      </LinkPressable>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 4,
    paddingVertical: 12,
  }
})
