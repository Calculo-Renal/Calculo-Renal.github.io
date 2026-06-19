import { useTheme } from "@/hooks/use-theme"
import { View, ViewProps } from "react-native";

export default function ThemedView({
  style,
  ...props
}: ViewProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
        },
        style,
      ]}
      {...props}
    />
  );
}
