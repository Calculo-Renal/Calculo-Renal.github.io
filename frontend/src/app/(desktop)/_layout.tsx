import Header from "@/components/Header";
import ThemedView from "@/components/ThemedView";
import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function DesktopLayout() {
  return (
    <ThemedView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Slot />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
