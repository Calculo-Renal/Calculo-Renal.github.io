import LinkPressable from "@/components/LinkPressable"
import ThemedText from "@/components/ThemedText";
import { sumario } from "@/data/sumario";
import { View } from "react-native"
import { StyleSheet } from "react-native";

export default function BookPage() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>
        Sumário
      </ThemedText>
      {Object.entries(sumario).map(([key, chapter]) => (
        <LinkPressable key={key} href={`/(desktop)/livro/${key}/`}> 
          <ThemedText style={styles.summaryItem}>
            {`${key}. ${chapter.chapter}`}
          </ThemedText>
        </LinkPressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 32,
  },
  summaryItem: {
    fontSize: 16,
    marginBottom: 8,
  },
})