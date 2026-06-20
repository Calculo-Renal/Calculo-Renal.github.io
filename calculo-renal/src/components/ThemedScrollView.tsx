import React from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/use-theme";

interface ThemedScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
}

const ThemedScrollView = React.forwardRef<ScrollView, ThemedScrollViewProps>(function ThemedScrollView(
  {
    children,
    style,
    contentContainerStyle,
    ...props
  },
  ref
) {
  const theme = useTheme();

  return (
    <ScrollView
      ref={ref}
      style={[{ backgroundColor: theme.background }, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      {...props}
    >
      {children}
    </ScrollView>
  );
});

export default ThemedScrollView;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
});
