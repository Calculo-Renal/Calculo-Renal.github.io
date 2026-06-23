import React from "react";
import { View, StyleSheet } from "react-native";
import { ProcessedEntryContentType, ProcessedEntryType } from "@/types/EntryType";
import ContentType from "@/types/ContentType";
import ThemedText from "@/components/ThemedText";
import MathFormula from "@/components/MathFormula";
import VideoScreen from "@/components/VideoScreen"

interface SectionProps {
  node: ProcessedEntryType;
  depth?: number;
  onRegisterSectionRef: (id: number, ref: View | null) => void;
  onRegisterSectionLayout?: (id: number, y: number) => void;
}

export default function Section({ node, depth = 0, onRegisterSectionRef, onRegisterSectionLayout }: SectionProps) {
  const sectionRef = React.useRef<View>(null);

  React.useEffect(() => {
    onRegisterSectionRef(node.id, sectionRef.current);
  }, [node.id, onRegisterSectionRef]);

  const isContentNode = (content: ContentType | ProcessedEntryType): content is ContentType => {
    return "type" in content && typeof content.type === "string";
  };

  const renderMixedText = (text: string) => {
    const regex = /(\$\$.*?\$\$|\$.*?\$)/g;
    const parts = text.split(regex);

    if (parts.length === 1) {
      return <ThemedText>{text}</ThemedText>;
    }

    return (
      <View style={styles.mixedTextContainer}>
        {parts.map((part, idx) => {
          const isDisplayMath = part.startsWith("$$") && part.endsWith("$$");
          const isInlineMath = part.startsWith("$") && part.endsWith("$");

          if (isDisplayMath || isInlineMath) {
            return <MathFormula key={idx} value={part} />;
          }

          return part ? <ThemedText key={idx}>{part}</ThemedText> : null;
        })}
      </View>
    );
  };

  const renderContent = (content: ContentType) => {
    switch (content.type) {
      case "text":
        return renderMixedText(content.data);
      case "formula":
        return <MathFormula value={content.data} />;
      case "video":
        return <VideoScreen source={content.data} />
      case "row":
        return (
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {content.data.map((sub, idx) => (
              <View key={idx} style={{ flex: 1 }}>
                {renderContent(sub)}
              </View>
            ))}
          </View>
        );
      case "col":
        return (
          <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
            {content.data.map((sub, idx) => (
              <View key={idx} style={{ flex: 1 }}>
                {renderContent(sub)}
              </View>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  const renderInnerNode = (content: ProcessedEntryContentType | ProcessedEntryContentType[] | null | undefined) => {
    if (!content) return null;

    if (Array.isArray(content)) {
      return content.map((subNode, index) =>
        isContentNode(subNode) ? (
          <View key={index}>{renderContent(subNode)}</View>
        ) : (
          <Section
            key={subNode.id}
            node={subNode}
            depth={depth + 1}
            onRegisterSectionRef={onRegisterSectionRef}
            onRegisterSectionLayout={onRegisterSectionLayout}
          />
        )
      );
    }

    if (isContentNode(content)) {
      return renderContent(content as ContentType);
    }

    return (
      <Section
        node={content}
        depth={depth + 1}
        onRegisterSectionRef={onRegisterSectionRef}
        onRegisterSectionLayout={onRegisterSectionLayout}
      />
    );
  };

  return (
    <View
      ref={sectionRef}
      nativeID={String(node.id)}
      style={{ marginLeft: depth * 12, marginVertical: 8 }}
      onLayout={(event) => {
        if (onRegisterSectionLayout) {
          onRegisterSectionLayout(node.id, event.nativeEvent.layout.y);
        }
      }}
    >
      <ThemedText
        style={[
          depth === 0 && { fontSize: 24, fontWeight: "700" },
          depth === 1 && { fontSize: 20, fontWeight: "600" },
          depth >= 2 && { fontSize: 16, fontWeight: "500" },
        ]}
      >
        {node.title}
      </ThemedText>

      <View style={{ marginTop: 4 }}>
        {renderInnerNode(node.content)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mixedTextContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  }
});
