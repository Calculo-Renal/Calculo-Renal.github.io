import { StyleSheet, View } from "react-native";
import { ProcessedChapterType } from "@/data/sumario";
import Section from "@/components/Section";

interface ChapterContentProps {
  chapterData: ProcessedChapterType;
  onRegisterSectionRef: (id: number, ref: View | null) => void;
  onRegisterSectionLayout?: (id: number, y: number) => void;
}

export default function ChapterContent({ chapterData, onRegisterSectionRef, onRegisterSectionLayout }: ChapterContentProps) {
  return (
    <View style={styles.container}>
      <Section
        node={chapterData.data}
        depth={0}
        onRegisterSectionRef={onRegisterSectionRef}
        onRegisterSectionLayout={onRegisterSectionLayout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
