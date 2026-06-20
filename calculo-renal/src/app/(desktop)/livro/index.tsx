import LinkPressable from "@/components/LinkPressable"
import { sumario } from "@/data/sumario";
import { View } from "react-native"

export default function BookPage() {
  return (
    <View>
      {Object.entries(sumario).map(([key, chapter]) => (
        <LinkPressable key={key} href={`/(desktop)/livro/${key}/`}>
          {`${key}. ${chapter.chapter}`}
        </LinkPressable>
      ))}
    </View>
  )
}
