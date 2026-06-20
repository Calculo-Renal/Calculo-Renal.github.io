import LinkPressable from "@/components/LinkPressable";
import { View } from "react-native";
import { StyleSheet } from "react-native";

export default function Navigation() {
  return (
    <View style={styles.navigation}>
      <LinkPressable href={"/(desktop)/livro"}>Livro</LinkPressable>
      <LinkPressable href={"/(desktop)/sobre-nos"}>Sobre nós</LinkPressable>
      <LinkPressable href={"/(desktop)/conquistas"}>Conquistas</LinkPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
