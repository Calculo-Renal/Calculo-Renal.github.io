import LinkPressable from "@/components/LinkPressable"
import { View } from "react-native"
import { StyleSheet } from "react-native"

export default function Navigation() {
    return (
        <View style={styles.navigation}>
            <LinkPressable href={"/(desktop)/book"}>
                Livro
            </LinkPressable>
            <LinkPressable href={"/(desktop)/about"}>
                Sobre nós
            </LinkPressable>
            <LinkPressable href={"/(desktop)/achievements"}>
                Conquistas
            </LinkPressable>
        </View>
    )
}

const styles = StyleSheet.create({
    navigation: {
        flexDirection: "row",
        gap: 8,
    }
})
