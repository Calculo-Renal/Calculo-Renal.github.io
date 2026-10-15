import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import ThemedText from "@/components/ThemedText";
import { useTheme } from "@/hooks/use-theme";
import MathFormula from "./MathFormula";

export default function PowerDerivative() {
    const theme = useTheme();
    const [coeficient, setCoeficient] = React.useState<number>(1);
    const [exponent, setExponent] = React.useState<number>(1);
    return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <TextInput
            value={String(coeficient)} 
            onChangeText={(text) => setCoeficient(Number(text))} 
            placeholder="1"
            keyboardType="numeric"
        />
        <ThemedText>X</ThemedText>
        <TextInput
            value={String(exponent)} 
            onChangeText={(text) => setExponent(Number(text))} 
            placeholder="1"
            keyboardType="numeric"
        />
        <ThemedText> d/dx </ThemedText>
        <ThemedText> = </ThemedText>
        <MathFormula value={exponent === 0 ? `0` : exponent === 1 ? `${coeficient}` : `${coeficient * exponent}X^{${exponent - 1}}`} />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        
        }
    })