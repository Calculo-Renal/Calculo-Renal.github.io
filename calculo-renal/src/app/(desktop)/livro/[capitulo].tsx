import { useCallback, useRef, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useLocalSearchParams, Redirect } from "expo-router";
import { sumario } from "@/data/sumario";
import ThemedScrollView from "@/components/ThemedScrollView";
import ThemedView from "@/components/ThemedView";
import Sidebar from "@/components/Sidebar";
import ChapterContent from "@/components/ChapterContent";

export default function ChapterScreen() {
  const { capitulo } = useLocalSearchParams<{ capitulo: string }>();
  const [activeId, setActiveId] = useState<number>(1);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const sectionRefs = useRef<Map<number, View>>(new Map());

  const chapterData = capitulo ? sumario[capitulo] : null;

  if (!chapterData) {
    return <Redirect href={"/404" as any} />;
  }

  const handleRegisterSectionRef = useCallback((id: number, ref: View | null) => {
    if (ref) {
      sectionRefs.current.set(id, ref);
    } else {
      sectionRefs.current.delete(id);
    }
  }, []);

  const handleSelectSection = useCallback((id: number) => {
    setActiveId(id);

    const targetRef = sectionRefs.current.get(id);
    if (!targetRef) return;

    if (Platform.OS === "web" && "scrollIntoView" in targetRef) {
      (targetRef as unknown as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    if (scrollViewRef.current) {
      targetRef.measureLayout(
        scrollViewRef.current as any,
        (_x, y) => {
          scrollViewRef.current?.scrollTo({ y: Math.max(0, y - 16), animated: true });
        },
        () => console.warn(`Falha ao medir a seção com ID: ${id}`)
      );
    }
  }, []);

  return (
    <ThemedView style={styles.screenLayout}>
      <View style={styles.sidebarContainer}>
        <Sidebar 
          currentChapterData={chapterData} 
          activeId={activeId} 
          onSelectSection={handleSelectSection}
        />
      </View>

      <ThemedScrollView ref={scrollViewRef} style={styles.mainContent} contentContainerStyle={styles.container}>
        <ChapterContent chapterData={chapterData} onRegisterSectionRef={handleRegisterSectionRef} />
      </ThemedScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
    flexDirection: "row",
  },
  sidebarContainer: {
    flex: 0.2,
  },
  mainContent: {
    paddingHorizontal: "10%",
    flex: 0.8,
  },
  container: {
    paddingHorizontal: "10%",
    marginTop: 16,
    marginBottom: 32,
  },
});