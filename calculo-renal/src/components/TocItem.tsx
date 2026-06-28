import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import {
  ProcessedEntryContentType,
  ProcessedEntryType,
} from "@/types/EntryType";
import ContentType from "@/types/ContentType";
import ThemedText from "@/components/ThemedText";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme"

interface TocItemProps {
  node: ProcessedEntryType;
  activeId: number;
  onSelectSection: (id: number) => void;
  depth?: number;
  number?: number[];
}

const isContentNode = (
  content: ContentType | ProcessedEntryType,
): content is ContentType => "type" in content;

export default function TocItem({
  node,
  activeId,
  onSelectSection,
  depth = 0,
  number = [1],
}: TocItemProps) {
  if (depth > 2) return null;

  const isActive = node.id === activeId;
  const progress = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: isActive ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [isActive, progress]);

  const theme = useTheme();

  const backgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", theme.surfaceActive],
  });

  const borderColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", theme.primary],
  });

  const textOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  const numberOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 0.95],
  });

  const label = number.join(".");

  const renderChildren = (
    content:
      | ProcessedEntryContentType
      | ProcessedEntryContentType[]
      | null
      | undefined,
  ) => {
    if (!content) return null;

    const children = Array.isArray(content) ? content : [content];

    return children.map((child, index) => {
      if (isContentNode(child)) return null;

      return (
        <TocItem
          key={child.id}
          node={child}
          activeId={activeId}
          onSelectSection={onSelectSection}
          depth={depth + 1}
          number={[...number, index + 1]}
        />
      );
    });
  };

  return (
    <View
      style={[
        styles.itemWrapper,
        depth > 0 && styles.nestedItemWrapper,
        depth > 0 && { borderLeftColor: theme.border },
        { marginLeft: depth * Spacing.two },
      ]}
    >
      <Pressable
        onPress={() => onSelectSection(node.id)}
        style={({ pressed }) => [
          styles.pressableArea,
          pressed && styles.itemPressed,
        ]}
      >
        <Animated.View
          style={[
            styles.itemButton,
            {
              backgroundColor,
              borderColor,
            },
          ]}
        >
          <ThemedText
            numberOfLines={2}
            style={[
              styles.itemText,
              isActive ? styles.itemTextActive : styles.itemTextInactive,
              { opacity: textOpacity },
            ]}
          >
            <ThemedText
              style={[
                styles.itemNumber,
                isActive ? styles.itemNumberActive : styles.itemNumberInactive,
                { opacity: numberOpacity },
              ]}
            >
              {label}
            </ThemedText>{" "}
            {node.title}
          </ThemedText>
        </Animated.View>
      </Pressable>

      {renderChildren(node.content)}
    </View>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    gap: Spacing.one,
  },
  nestedItemWrapper: {
    borderLeftWidth: 1,
    paddingLeft: Spacing.one,
  },
  pressableArea: {
    borderRadius: 10,
  },
  itemPressed: {
    opacity: 0.8,
  },
  itemButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  itemText: {
    fontSize: 14,
    lineHeight: 20,
  },
  itemTextActive: {
    fontWeight: "700",
  },
  itemTextInactive: {
    opacity: 0.7,
  },
  itemNumber: {
    fontSize: 12,
    fontWeight: "700",
  },
  itemNumberActive: {
    opacity: 0.95,
  },
  itemNumberInactive: {
    opacity: 0.55,
  },
});
