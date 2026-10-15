import LinkPressable from "@/components/LinkPressable";
import ThemedText from "@/components/ThemedText";
import { sumario } from "@/data/sumario";
import { useTheme } from "@/hooks/use-theme";
import { View, StyleSheet, ScrollView } from "react-native";

export default function BookPage() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ThemedText style={styles.title}>Sumário</ThemedText>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.list}>
          {Object.entries(sumario).map(([key, chapter]) => (
            <LinkPressable
              key={key}
              href={`/(desktop)/livro/${key}`}
              style={({
                hovered,
              }: {
                hovered: boolean;
                pressed: boolean;
              }) => [
                styles.item,
                {
                  borderColor: hovered
                      ? theme.primary
                      : theme.border,
                  backgroundColor: theme.surface
                },
              ]}
            >
              <View style={styles.textContainer}>
                {chapter.data.label && (
                  <View
                    style={[
                      styles.numberBadge,
                      {
                        borderColor: theme.border,
                        backgroundColor: theme.background,
                      },
                    ]}
                  >
                    <ThemedText
                      style={[styles.chapterNumber, { color: theme.text }]}
                    >
                      {chapter.data.label}
                    </ThemedText>
                  </View>
                )}
                <ThemedText
                  style={[styles.chapterTitle, { color: theme.text }]}
                >
                  {chapter.data.title}
                </ThemedText>
              </View>
            </LinkPressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 28,
  },
  scroll: {
    width: "100%",
    maxWidth: 700,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  list: {
    gap: 8,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chapterNumber: {
    fontSize: 14,
    fontWeight: "700",
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
});
