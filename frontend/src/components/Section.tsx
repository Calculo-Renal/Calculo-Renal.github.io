import React from "react";
import { View, StyleSheet } from "react-native";
import { ProcessedEntryContentType } from "@/types/EntryContentType";
import { ProcessedEntryType } from "@/types/EntryType";
import ContentType from "@/types/ContentType";
import ThemedText from "@/components/ThemedText";
import MathFormula from "@/components/MathFormula";
import VideoScreen from "@/components/VideoScreen";
import RenderList from "@/components/List";

interface SectionProps {
  node: ProcessedEntryType;
  onRegisterSectionRef: (id: number, ref: View | null) => void;
  onRegisterSectionLayout?: (id: number, y: number) => void;
}

export default function Section({
  node,
  onRegisterSectionRef,
  onRegisterSectionLayout,
}: SectionProps) {
  const sectionRef = React.useRef<View>(null);

  React.useEffect(() => {
    onRegisterSectionRef(node.id, sectionRef.current);
  }, [node.id, onRegisterSectionRef]);

  const isContentNode = (
    content: ContentType | ProcessedEntryType,
  ): content is ContentType => {
    return "type" in content && typeof content.type === "string";
  };

  const renderMixedText = (text: string) => {
    const regex = /(\$\$.*?\$$|\$.*?\$)/g;
    const parts = text.split(regex);

    if (parts.length === 1) {
      return <ThemedText>{text}</ThemedText>;
    }

    return (
      <ThemedText style={styles.paragraphText}>
        {parts.map((part, idx) => {
          const isDisplayMath = part.startsWith("$$") && part.endsWith("$$");
          const isInlineMath = part.startsWith("$") && part.endsWith("$");

          if (isDisplayMath || isInlineMath) {
            return <MathFormula key={idx} value={part} />;
          }

          return part ? <ThemedText key={idx}>{part}</ThemedText> : null;
        })}
      </ThemedText>
    );
  };

  const renderContent = (content: ContentType) => {
    switch (content.type) {
      case "text":
        return renderMixedText(content.data);
      case "formula":
        return <MathFormula value={content.data} />;
      case "video":
        return <VideoScreen source={content.data} title={content.title} />;
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
      case "list":
        return <RenderList data={content.data} renderContent={renderContent} />;
      default:
        return null;
    }
  };

  const renderInnerNode = (
    content:
      | ProcessedEntryContentType
      | ProcessedEntryContentType[]
      | null
      | undefined,
  ) => {
    if (!content) return null;

    if (Array.isArray(content)) {
      return content.map((subNode, index) =>
        isContentNode(subNode) ? (
          <View key={index}>{renderContent(subNode)}</View>
        ) : (
          <Section
            key={subNode.id}
            node={subNode}
            onRegisterSectionRef={onRegisterSectionRef}
            onRegisterSectionLayout={onRegisterSectionLayout}
          />
        ),
      );
    }

    if (isContentNode(content)) {
      return renderContent(content as ContentType);
    }

    return (
      <Section
        node={content}
        onRegisterSectionRef={onRegisterSectionRef}
        onRegisterSectionLayout={onRegisterSectionLayout}
      />
    );
  };

  return (
    <View
      ref={sectionRef}
      nativeID={String(node.id)}
      style={{ marginLeft: node.depth * 12, marginVertical: 8 }}
      onLayout={(event) => {
        if (onRegisterSectionLayout) {
          onRegisterSectionLayout(node.id, event.nativeEvent.layout.y);
        }
      }}
    >
      <ThemedText
        style={[
          node.depth === 0 && {
            fontSize: 24,
            fontWeight: "700",
            marginBottom: 12,
          },
          node.depth === 1 && {
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 8,
          },
          node.depth >= 2 && {
            fontSize: 16,
            fontWeight: "500",
            marginBottom: 4,
          },
        ]}
      >
        {node.label && node.depth !== 0 ? `${node.label} ` : ""}
        {node.title}
      </ThemedText>

      <View style={{ gap: 16 }}>{renderInnerNode(node.content)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  paragraphText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
