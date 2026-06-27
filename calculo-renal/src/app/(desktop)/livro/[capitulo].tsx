import { useCallback, useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, NativeScrollEvent, Platform, ScrollView, StyleSheet, View } from "react-native";
import { useLocalSearchParams, Redirect } from "expo-router";
import { sumario } from "@/data/sumario";
import { useHeaderHeight } from "@/context/HeaderHeightContext";
import ThemedScrollView from "@/components/ThemedScrollView";
import ThemedView from "@/components/ThemedView";
import Sidebar from "@/components/Sidebar";
import ChapterContent from "@/components/ChapterContent";

export default function ChapterScreen() {
  const { capitulo } = useLocalSearchParams<{ capitulo: string }>();
  const [activeId, setActiveId] = useState<number>(1);
  const { headerHeight } = useHeaderHeight();
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<Map<number, View>>(new Map());
  const sectionPositions = useRef<Map<number, number>>(new Map());

  const chapterData = capitulo ? sumario[capitulo] : null;

  if (!chapterData) {
    return <Redirect href={"/404" as any} />;
  }

  const handleRegisterSectionRef = useCallback((id: number, ref: View | null) => {
    if (ref) {
      sectionRefs.current.set(id, ref);
    } else {
      sectionRefs.current.delete(id);
      sectionPositions.current.delete(id);
    }
  }, []);

  const measureSectionPositions = useCallback(() => {
    if (!scrollViewRef.current) return;

    sectionRefs.current.forEach((ref, id) => {
      if (!ref) return;

      ref.measureLayout(
        scrollViewRef.current as any,
        (_x, y) => {
          sectionPositions.current.set(id, y);
        },
        () => {
          // Ignora falhas de renderização, pois a seção pode não estar visível no momento da medição
        }
      );
    });
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

  const handleRegisterSectionLayout = useCallback((id: number, y: number) => {
    sectionPositions.current.set(id, y);
  }, []);

  useEffect(() => {
    measureSectionPositions();
  }, [chapterData, measureSectionPositions]);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentY = event.nativeEvent.contentOffset.y;
    if (sectionPositions.current.size !== sectionRefs.current.size) {
      measureSectionPositions();
    }

    const sortedEntries = Array.from(sectionPositions.current.entries()).sort((a, b) => a[1] - b[1]);
    let nextActiveId = activeId;

    for (const [id, top] of sortedEntries) {
      if (top <= currentY + headerHeight) {
        nextActiveId = id;
      } else {
        break;
      }
    }

    if (nextActiveId !== activeId) {
      setActiveId(nextActiveId);
    }
  }, [activeId, headerHeight, measureSectionPositions]);

  return (
    <ThemedView style={styles.screenLayout}>
      <View style={styles.sidebarContainer}>
        <Sidebar 
          currentChapterData={chapterData} 
          activeId={activeId} 
          onSelectSection={handleSelectSection}
        />
      </View>

      <ThemedScrollView
        ref={scrollViewRef}
        style={styles.mainContent}
        contentContainerStyle={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onContentSizeChange={measureSectionPositions}
      >
        <ChapterContent
          chapterData={chapterData}
          onRegisterSectionRef={handleRegisterSectionRef}
          onRegisterSectionLayout={handleRegisterSectionLayout}
        />
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
    height: "100%",
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