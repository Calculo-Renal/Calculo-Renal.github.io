import { StyleSheet, View } from "react-native";
import { ProcessedChapterType } from "@/data/sumario";
import Section from "@/components/Section";

interface ChapterContentProps {
  chapterData: ProcessedChapterType;
  onRegisterSectionRef: (id: number, ref: View | null) => void;
}

export default function ChapterContent({ chapterData, onRegisterSectionRef }: ChapterContentProps) {
  return (
    <View style={styles.container}>
      <Section node={chapterData.data} depth={0} onRegisterSectionRef={onRegisterSectionRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
