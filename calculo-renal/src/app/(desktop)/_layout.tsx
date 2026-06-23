import Header from "@/components/Header"
import ThemedView from "@/components/ThemedView"
import { HeaderHeightProvider } from "@/context/HeaderHeightContext"
import { Slot } from "expo-router"
import { StyleSheet, View } from "react-native"

export default function DesktopLayout() {
  return (
    <HeaderHeightProvider>
      <ThemedView style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Slot />
        </View>
      </ThemedView>
    </HeaderHeightProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
})