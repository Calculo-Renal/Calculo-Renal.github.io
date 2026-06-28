import LinkPressable from "@/components/LinkPressable";
import ThemedText from "@/components/ThemedText";
import ThemedScrollView from "@/components/ThemedScrollView";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "@/hooks/use-theme";

export default function AboutUsPage() {
  const theme = useTheme();

  return (
    <ThemedScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[styles.index, { backgroundColor: theme.background }]}
    >
      <ThemedText style={styles.text}>
        A motivação para criação deste site foi um projeto de extensão proposto
        por nossa orientadora, Izabela, que visava ajudar os alunos do ensino
        técnico e da graduação na aprendizagem da disciplina de Cálculo. Para
        mais informações sobre nós, orientandos, clique nas imagens abaixo para
        ser direcionado às nossas páginas do GitHub.
      </ThemedText>
      
      <ThemedText style={[styles.title, { color: theme.text }]}>Orientadora</ThemedText>
      <View style={styles.item}>
        <Image
          source={require("@/assets/images/sobre-nos/izabela-pfp.png")}
          style={styles.image}
        />
        <ThemedText style={[styles.name, { color: theme.text }]}>Izabela Marques</ThemedText>
      </View>

      <ThemedText style={[styles.title, { color: theme.text }]}>Orientandos</ThemedText>
      <View style={styles.row}>
        {[
          { username: "frxd-sloureiro", name: "Frederico Loureiro" },
          { username: "JeanC4rlo", name: "Jean Carlo" },
          { username: "GuilhermeMalard", name: "Guilherme Malard" },
          { username: "pedrosoares01", name: "Pedro Soares" },
          { username: "pedropsaraiva", name: "Pedro Peixoto" },
        ].map((dev) => (
          <View key={dev.username} style={styles.item}>
            <LinkPressable
              href={`https://github.com/${dev.username}`}
              target="_blank"
              style={({ hovered, pressed }: { hovered: boolean; pressed: boolean }) => [
                styles.link,
                {
                  backgroundColor: pressed 
                    ? theme.surfaceActive 
                    : hovered 
                      ? theme.surfaceActive 
                      : "transparent"
                }
              ]}
            >
              <Image
                source={{ uri: `https://github.com/${dev.username}.png` }}
                style={styles.image}
              />
              <ThemedText style={[styles.name, { color: theme.text }]}>{dev.name}</ThemedText>
            </LinkPressable>
          </View>
        ))}
      </View>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  index: {
    alignItems: "flex-start",
    paddingTop: 32,
    paddingHorizontal: "20%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    paddingBottom: 8,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: 16,
  },
  link: {
    flexDirection: "column",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
  },
  item: {
    alignItems: "center",
    marginRight: 24,
    marginBottom: 24,
  },
  name: {
    marginTop: 8,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
  },
});