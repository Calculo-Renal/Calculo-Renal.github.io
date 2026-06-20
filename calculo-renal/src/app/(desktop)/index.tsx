import ThemedScrollView from "@/components/ThemedScrollView";
import ThemedText from "@/components/ThemedText";
import { StyleSheet } from "react-native";

export default function LandingPage() {
  return (
    <ThemedScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.index}
    >
      <ThemedText style={styles.text}>
        Cálculo Renal é um projeto focado em facilitar o aprendizado da
        disciplina de Cálculo para alunos do ensino técnico e graduação. O
        projeto é composto por um livro digital, disponível gratuitamente, e uma
        série de conquistas que os alunos podem desbloquear ao completar
        exercícios e desafios relacionados ao conteúdo do livro. O objetivo é
        tornar o aprendizado do Cálculo mais acessível, interativo e motivador
        para os estudantes, incentivando-os a explorar os conceitos matemáticos
        de forma prática e envolvente.
      </ThemedText>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  index: {
    alignItems: "flex-start",
    paddingTop: 32,
    paddingHorizontal: "20%",
  },
  text: {
    fontSize: 18,
  },
});
