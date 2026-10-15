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
  const [activeId, setActiveId] = useState<number | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<Map<number, View>>(new Map());
  const sectionPositions = useRef<Map<number, number>>(new Map());
  const targetSectionId = useRef<number | null>(null);

  const chapterData = capitulo ? sumario[capitulo] : null;

  useEffect(() => {
    sectionPositions.current.clear();
    sectionRefs.current.clear();
    targetSectionId.current = null;

    if (chapterData?.data) {
      let initialId = chapterData.data.id;
      const content = chapterData.data.content;

      if (content) {
        const children = Array.isArray(content) ? content : [content];
        const firstSection = children.find((c: any) => !("type" in c));
        if (firstSection) {
          initialId = (firstSection as any).id;
        }
      }
      setActiveId(initialId);
    }

    requestAnimationFrame(() => {
      scrollViewRef.current?.scrollTo({
        y: 0,
        animated: false,
      });
    });
  }, [capitulo, chapterData]);

  if (!chapterData || activeId === null) {
    return <Redirect href={"/404" as any} />;
  }

  const handleRegisterSectionRef = useCallback(
    (id: number, ref: View | null) => {
      if (ref) {
        sectionRefs.current.set(id, ref);
      } else {
        sectionRefs.current.delete(id);
      }
    },
    [],
  );

  const handleRegisterSectionLayout = useCallback((id: number, y: number) => {
    const targetRef = sectionRefs.current.get(id);

    if (targetRef && "measureLayout" in targetRef && scrollViewRef.current) {
      targetRef.measureLayout(
        scrollViewRef.current as any,
        (_, top) => {
          sectionPositions.current.set(id, top);
        },
        () => {},
      );
    } else {
      sectionPositions.current.set(id, y);
    }
  }, []);

  const handleSelectSection = useCallback((id: number) => {
    targetSectionId.current = id;
    setActiveId(id);

    if (Platform.OS === "web") {
      const targetRef = sectionRefs.current.get(id);

      if (targetRef && "scrollIntoView" in targetRef) {
        (targetRef as unknown as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        if (scrollViewRef.current) {
          const targetY = sectionPositions.current.get(id);
          if (targetY !== undefined) {
            scrollViewRef.current.scrollTo({
              y: Math.max(0, targetY - 80),
              animated: true,
            });
          }
        }
        return;
      }
    }

    const targetY = sectionPositions.current.get(id);

    if (targetY !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: Math.max(0, targetY - 80),
        animated: true,
      });
    } else {
      targetSectionId.current = null;
    }
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentY = event.nativeEvent.contentOffset.y;
      const activationOffset = 85;

      if (targetSectionId.current !== null) {
        const destinationY = sectionPositions.current.get(
          targetSectionId.current,
        );
        if (destinationY !== undefined) {
          const targetYWithOffset = Math.max(0, destinationY - 80);
          if (Math.abs(currentY - targetYWithOffset) <= 15) {
            targetSectionId.current = null;
          } else {
            return;
          }
        } else {
          targetSectionId.current = null;
        }
      }

      let nextActiveId = activeId;
      let closestTop = -Infinity;

      sectionPositions.current.forEach((top, id) => {
        if (currentY >= top - activationOffset && top > closestTop) {
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
    flex: 0.75,
    paddingHorizontal: "5%",
  },
  container: {
    paddingHorizontal: "10%",
    marginTop: 16,
    marginBottom: 32,
  },
});
