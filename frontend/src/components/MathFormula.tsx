import { useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import ThemedText from "@/components/ThemedText";
import { useTheme } from "@/hooks/use-theme";

const KatexMobile =
  Platform.OS !== "web" ? require("react-native-katex").default : null;
const KatexWeb = Platform.OS === "web" ? require("react-katex") : null;

export default function MathFormula({ value }: { value: string }) {
  const theme = useTheme();
  const isInline =
    value.trim().startsWith("$") && !value.trim().startsWith("$$");
  const cleanValue = value.replace(/\$/g, "").trim();

  useEffect(() => {
    if (Platform.OS === "web" && !document.getElementById("katex-css")) {
      const link = document.createElement("link");
      link.id = "katex-css";
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
      document.head.appendChild(link);
    }
  }, []);

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
    return (
      <View
        style={
          isInline ? styles.mobileInlineContainer : styles.mobileBlockContainer
        }
      >
        <KatexMobile
          expression={cleanValue}
          style={styles.flexTarget}
          displayMode={!isInline}
          throwOnError={false}
        />
      </View>
    );
  }

  return <ThemedText>{value}</ThemedText>;
}

const styles = StyleSheet.create({
  flexTarget: {
    flex: 1,
    backgroundColor: "transparent",
  },
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
