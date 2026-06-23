import { View, TouchableOpacity } from "react-native";
import { ProcessedChapterType } from "@/data/sumario";
import { ProcessedEntryContentType, ProcessedEntryType } from "@/types/EntryType";
import { useTheme } from "@/hooks/use-theme"
import ContentType from "@/types/ContentType";
import ThemedScrollView from "@/components/ThemedScrollView";
import ThemedText from "@/components/ThemedText";

interface SidebarProps {
  currentChapterData: ProcessedChapterType;
  activeId: number;
  onSelectSection: (id: number) => void;
}

function TocItem({
  node,
  activeId,
  onSelectSection,
  depth = 0,
  number = [1],
}: {
  node: ProcessedEntryType;
  activeId: number;
  onSelectSection: (id: number) => void;
  depth?: number;
  number?: number[];
}) {
  if (depth > 2) return null;

  const isContentNode = (content: ContentType | ProcessedEntryType): content is ContentType => {
    return "type" in content && typeof content.type === "string";
  };

  const labelNumber = number.join(".");

  const isActive = node.id === activeId;

  const renderTocContent = (content: ProcessedEntryContentType | ProcessedEntryContentType[] | null | undefined) => {
    if (!content) return null;

    if (Array.isArray(content)) {
      return content.map((subNode, index) =>
        isContentNode(subNode) ? null : (
          <TocItem
            key={subNode.id ?? index}
            node={subNode}
            activeId={activeId}
            onSelectSection={onSelectSection}
            depth={depth + 1}
            number={[...number, index + 1]}
          />
        )
      );
    }

    if (isContentNode(content)) return null;

    return (
      <TocItem
        node={content}
        activeId={activeId}
        onSelectSection={onSelectSection}
        depth={depth + 1}
        number={[...number, 1]}
      />
    );
  };
  return (
    <View style={{ marginLeft: depth * 12}}>
      <TouchableOpacity onPress={() => onSelectSection(node.id)}>
        <ThemedText style={isActive ? { fontWeight: "600" } : { opacity: 0.65 }}>
          {labelNumber} {node.title}
        </ThemedText>
      </TouchableOpacity>

      {renderTocContent(node.content)}
    </View>
  );
}

export default function Sidebar({ currentChapterData, activeId, onSelectSection }: SidebarProps) {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.surface, flex: 1 }}>
      <ThemedText style={{ fontWeight: "700", fontSize: 16, padding: 4}}>
        {currentChapterData.data.title}
      </ThemedText>
      
      <ThemedScrollView
        style={{ backgroundColor: theme.surface, flex: 1 }}
        contentContainerStyle={{ backgroundColor: theme.surface, flexGrow: 1, minHeight: "100%", padding: 4}}
      >
        <TocItem
          node={currentChapterData.data}
          activeId={activeId}
          onSelectSection={onSelectSection}
          number={[1]}
        />
      </ThemedScrollView>
    </View>
  );
}