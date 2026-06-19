import { useTheme } from "@/hooks/use-theme"
import { TextProps, Text } from "react-native";

export default function ThemedText({
  style,
  ...props
}: TextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          color: theme.text,
          fontFamily: "DM Sans"
        },
        style,
      ]}
      {...props}
    />
  );
}
