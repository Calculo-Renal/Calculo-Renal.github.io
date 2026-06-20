import ThemedText from "@/components/ThemedText";
import { useTheme } from "@/hooks/use-theme";
import { View, StyleSheet, Platform } from "react-native";

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

  if (Platform.OS === "web" && KatexWeb) {
    const { BlockMath, InlineMath } = KatexWeb;
    const isInline = value.trim().startsWith("$");
    const cleanValue = isInline ? value.replace(/\$/g, "").trim() : value;

    const webStyle = StyleSheet.flatten([
      styles.web,
      { color: theme.text } as any,
    ]);

    return (
      <View style={webStyle}>
        {isInline ? <InlineMath math={cleanValue} /> : <BlockMath math={cleanValue} />}
      </View>
    );
  }

  return KatexMobile ? (
    <View style={styles.mobileContainer}>
      <KatexMobile
        expression={value}
        style={styles.mobile}
        displayMode={true}
        throwOnError={false}
      />
    </View>
  ) : (
    <ThemedText>{value}</ThemedText>
  );
}

const styles = StyleSheet.create({
  web: {
    width: "100%",
    backgroundColor: "transparent",
    marginVertical: 12,
    alignItems: "center",
    overflow: "auto" as any,
  },
  mobileContainer: {
    width: "100%",
    height: 100,
    marginVertical: 12,
  },
  mobile: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
