import { View, StyleSheet, Platform } from "react-native";
import ThemedText from "@/components/ThemedText";
import { useTheme } from "@/hooks/use-theme";

const KatexMobile =
  Platform.OS !== "web" ? require("react-native-katex").default : null;
const KatexWeb =
  Platform.OS === "web"
    ? {
        BlockMath: require("react-katex").BlockMath,
        InlineMath: require("react-katex").InlineMath,
      }
    : null;

if (Platform.OS === "web") {
  require("katex/dist/katex.min.css");
}

export default function MathFormula({ value }: { value: string }) {
  const theme = useTheme();
  const isInline =
    value.trim().startsWith("$") && !value.trim().startsWith("$$");
  const cleanValue = value.replace(/\$/g, "").trim();

  if (Platform.OS === "web" && KatexWeb) {
    const { BlockMath, InlineMath } = KatexWeb;
    return isInline ? (
      <ThemedText style={{ color: theme.text }}>
        <InlineMath math={cleanValue} />
      </ThemedText>
    ) : (
      <View style={styles.webBlock}>
        <ThemedText style={{ color: theme.text }}>
          <BlockMath math={cleanValue} />
        </ThemedText>
      </View>
    );
  }

  if (KatexMobile) {
    if (isInline) {
      return (
        <View style={styles.mobileInlineContainer}>
          <KatexMobile
            expression={cleanValue}
            style={{ flex: 1, backgroundColor: "transparent" }}
            displayMode={false}
            throwOnError={false}
          />
        </View>
      );
    }
    return (
      <View style={styles.mobileBlockContainer}>
        <KatexMobile
          expression={cleanValue}
          style={{ flex: 1, backgroundColor: "transparent" }}
          displayMode={true}
          throwOnError={false}
        />
      </View>
    );
  }

  return <ThemedText>{value}</ThemedText>;
}

const styles = StyleSheet.create({
  webBlock: {
    width: "100%",
    marginVertical: 8,
    alignItems: "center",
  },
  mobileBlockContainer: {
    width: "100%",
    height: 80,
    marginVertical: 8,
  },
  mobileInlineContainer: {
    height: 24,
    minWidth: 30,
  },
});
