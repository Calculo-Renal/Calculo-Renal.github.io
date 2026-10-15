import React from "react";
import { View, StyleSheet } from "react-native";
import ContentType from "@/types/ContentType";
import ThemedText from "@/components/ThemedText";

interface RenderListProps {
  data: (string | ContentType)[];
  renderContent: (content: ContentType) => React.ReactNode;
}

export default function RenderList({ data, renderContent }: RenderListProps) {
  return (
    <View style={styles.listContainer}>
      {data.map((item, idx) => {
        if (typeof item === "string") {
          return (
            <View key={idx} style={styles.listItem}>
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.itemText}>{item}</ThemedText>
            </View>
          );
        }

        return (
          <View key={idx} style={styles.listItem}>
            <ThemedText style={styles.bullet}>•</ThemedText>
            <View style={styles.nestedContent}>{renderContent(item)}</View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingLeft: 8,
    marginVertical: 6,
    gap: 6,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    marginRight: 8,
    width: 12,
    textAlign: "center",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  nestedContent: {
    flex: 1,
  },
});
