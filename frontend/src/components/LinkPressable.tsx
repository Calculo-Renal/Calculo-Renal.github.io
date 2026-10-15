import { ReactNode } from "react";
import { Href, router, usePathname } from "expo-router";
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  Platform,
  Linking,
} from "react-native";
import ThemedText from "@/components/ThemedText";

type PressableStyleState = {
  hovered: boolean;
  pressed: boolean;
};

type LinkPressableProps = {
  href: Href;
  children: string | ReactNode;
  style?: ViewStyle | ((state: PressableStyleState) => ViewStyle | ViewStyle[]);
  activeStyle?: ViewStyle;
  target?: "_blank" | "_self" | "_parent" | "_top";
};

export default function LinkPressable({
  href,
  children,
  style,
  activeStyle,
  target,
}: LinkPressableProps) {
  const pathname = usePathname();

  const hrefString = typeof href === "object" ? href.pathname : href;
  const currentSegment = pathname?.split("/").pop();
  const targetSegment = hrefString?.split("/").pop();
  const isActive = currentSegment === targetSegment;

  const handlePress = () => {
    if (target === "_blank") {
      if (Platform.OS === "web") {
        window.open(hrefString ?? "", "_blank");
      } else {
        if (hrefString) {
          Linking.openURL(hrefString).catch(() => {});
        }
      }
      return;
    }

    router.navigate(href);
  };

  const resolveStyle = (state: PressableStyleState) => {
    const baseStyle = typeof style === "function" ? style(state) : style;
    return StyleSheet.flatten([baseStyle, isActive ? activeStyle : null]);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={(state) => resolveStyle(state)}
      {...(Platform.OS === "web" && target ? { dataTarget: target } : {})}
    >
      {typeof children === "string" ? (
        <ThemedText style={isActive ? { fontWeight: "bold" } : undefined}>
          {children}
        </ThemedText>
      ) : (
        children
      )}
    </Pressable>
  );
}
