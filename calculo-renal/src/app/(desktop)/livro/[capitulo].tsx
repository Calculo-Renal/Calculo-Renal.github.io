import { useCallback, useEffect, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
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
  const sectionPositions = useRef<Map<number, number>>(new Map());
  const isAutoScrolling = useRef<boolean>(false);

  const chapterData = capitulo ? sumario[capitulo] : null;

  useEffect(() => {
    sectionPositions.current.clear();
    sectionRefs.current.clear();
    setActiveId(1);
  }, [capitulo]);

  if (!chapterData) {
    return <Redirect href={"/404" as any} />;
  }

  const handleRegisterSectionRef = useCallback((id: number, ref: View | null) => {
    if (ref) sectionRefs.current.set(id, ref);
    else sectionRefs.current.delete(id);
  }, []);

  const handleRegisterSectionLayout = useCallback((id: number, y: number) => {
    sectionPositions.current.set(id, y);
  }, []);

  const handleSelectSection = useCallback((id: number) => {
    isAutoScrolling.current = true;
    setActiveId(id);

    if (Platform.OS === "web") {
      const targetRef = sectionRefs.current.get(id);
      if (targetRef && "scrollIntoView" in targetRef) {
        (targetRef as unknown as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setTimeout(() => {
          isAutoScrolling.current = false;
        }, 800);
        return;
      }
    }

    const targetY = sectionPositions.current.get(id);
    if (targetY !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: Math.max(0, targetY),
        animated: true,
      });
    } else {
      isAutoScrolling.current = false;
    }
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isAutoScrolling.current) return;

      const currentY = event.nativeEvent.contentOffset.y;
      let nextActiveId = activeId;
      let closestTop = -Infinity;

      sectionPositions.current.forEach((top, id) => {
        if (currentY >= top - 10 && top > closestTop) {
          closestTop = top;
          nextActiveId = id;
        }
      });

      if (nextActiveId !== activeId) {
        setActiveId(nextActiveId);
      }
    },
    [activeId],
  );

  const handleScrollEnd = useCallback(() => {
    isAutoScrolling.current = false;
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

      <ThemedScrollView
        ref={scrollViewRef}
        style={styles.mainContent}
        contentContainerStyle={styles.container}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollAnimationEnd={handleScrollEnd}
        scrollEventThrottle={16}
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
    flex: 0.25,
    height: "100%",
    padding: 16,
    minWidth: 260,
    justifyContent: "center",
  },
  mainContent: {
    paddingHorizontal: "5%",
    flex: 0.75,
  },
  container: {
    paddingHorizontal: "10%",
    marginTop: 16,
    marginBottom: 32,
  },
});