import LinkPressable from "@/components/LinkPressable";
import ThemedText from "@/components/ThemedText";
import ThemedScrollView from "@/components/ThemedScrollView";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { View } from "react-native";

export default function AboutUsPage() {
  return (
    <ThemedScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.index}
    >
      <ThemedText style={styles.text}>
        A motivação para criação deste site foi um projeto de extensão proposto
        por nossa orientadora, Izabela, que visava ajudar os alunos do ensino
        técnico e da graduação na aprendizagem da disciplina de Cálculo. Para
        mais informações sobre nós, orientandos, clique nas imagens abaixo para
        ser direcionado ás nosssas paginas do GitHub.
      </ThemedText>
      <ThemedText style={styles.title}>Orientadora</ThemedText>
      <View style={styles.item}>
        <Image
          source={require("@/assets/images/sobre-nos/izabela-pfp.png")}
          style={styles.image}
        />
        <ThemedText style={styles.name}>Izabela Marques</ThemedText>
      </View>
      <ThemedText style={styles.title}>Orientandos</ThemedText>
      <View style={styles.row}>
        <View style={styles.item}>
          <LinkPressable
            href="https://github.com/frxd-sloureiro"
            target="_blank"
            style={styles.link}
          >
            <Image
              source={{ uri: "https://github.com/frxd-sloureiro.png" }}
              style={styles.image}
            />
            <ThemedText style={styles.name}>Frederico Loureiro</ThemedText>
          </LinkPressable>
        </View>

        <View style={styles.item}>
          <LinkPressable
            href="https://github.com/JeanC4rlo"
            target="_blank"
            style={styles.link}
          >
            <Image
              source={{ uri: "https://github.com/JeanC4rlo.png" }}
              style={styles.image}
            />
            <ThemedText style={styles.name}>Jean Carlo</ThemedText>
          </LinkPressable>
        </View>

        <View style={styles.item}>
          <LinkPressable
            href="https://github.com/GuilhermeMalard"
            target="_blank"
            style={styles.link}
          >
            <Image
              source={{ uri: "https://github.com/GuilhermeMalard.png" }}
              style={styles.image}
            />
            <ThemedText style={styles.name}>Guilherme Malard</ThemedText>
          </LinkPressable>
        </View>

        <View style={styles.item}>
          <LinkPressable
            href="https://github.com/pedrosoares01"
            target="_blank"
            style={styles.link}
          >
            <Image
              source={{ uri: "https://github.com/pedrosoares01.png" }}
              style={styles.image}
            />
            <ThemedText style={styles.name}>Pedro Soares</ThemedText>
          </LinkPressable>
        </View>

        <View style={styles.item}>
          <LinkPressable
            href="https://github.com/pedropsaraiva"
            target="_blank"
            style={styles.link}
          >
            <Image
              source={{ uri: "https://github.com/pedropsaraiva.png" }}
              style={styles.image}
            />
            <ThemedText style={styles.name}>Pedro Peixoto</ThemedText>
          </LinkPressable>
        </View>
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
    fontSize: 18,
  },
})
