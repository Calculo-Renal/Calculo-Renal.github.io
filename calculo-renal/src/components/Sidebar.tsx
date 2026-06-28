import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { ProcessedChapterType } from "@/data/sumario";
import ThemedText from "@/components/ThemedText";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import TocItem from "@/components/TocItem";

interface SidebarProps {
  currentChapterData: ProcessedChapterType;
  activeId: number;
  onSelectSection: (id: number) => void;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function Sidebar({
  currentChapterData,
  activeId,
  onSelectSection,
  style,
  contentContainerStyle,
}: SidebarProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.sidebar,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      <View style={styles.header}>
        <ThemedText style={styles.kicker}>Capítulo</ThemedText>
        <ThemedText style={styles.title}>
          {currentChapterData.data.title}
        </ThemedText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
      >
        <TocItem
          node={currentChapterData.data}
          activeId={activeId}
          onSelectSection={onSelectSection}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    gap: Spacing.two,
    borderWidth: 1,
    borderRadius: 18,
    padding: Spacing.three,
  },
  header: {
    gap: Spacing.half,
    marginBottom: Spacing.one,
  },
  kicker: {
    fontSize: 11,
    opacity: 0.6,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "700",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  scrollContent: {
    paddingBottom: Spacing.two,
  },
});
