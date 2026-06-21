import { ReactNode } from "react";
import { Link, Href, usePathname } from "expo-router";
import { Platform, Pressable, PressableProps, StyleSheet } from "react-native";
import ThemedText from "@/components/ThemedText";

type LinkPressableProps = PressableProps & {
  href: Href;
  children: string | ReactNode;
  activeStyle?: any;
  target?: "_blank" | "_self" | "_parent" | "_top" | (string & object);
};

export default function LinkPressable({
  href,
  children,
  style,
  activeStyle,
  target,
  ...props
}: LinkPressableProps) {
  const pathname = usePathname();
  const hrefString = typeof href === "object" ? href.pathname : href;

  const currentSegment = pathname?.split("/").pop();
  const targetSegment = hrefString?.split("/").pop();

  const isActive = currentSegment === targetSegment;

  const flattenedStyle = StyleSheet.flatten([style, isActive && activeStyle]);
  const useAnchor = Platform.OS === "web" && target != null;
  const anchorStyle = Platform.OS === "web" && target != null ? [flattenedStyle, { display: "inline-flex" }] : flattenedStyle;

  if (useAnchor) {
    return (
      <Link href={href} target={target} style={anchorStyle}>
        {typeof children === "string" ? (
          <ThemedText style={isActive ? { fontWeight: "bold" } : undefined}>
            {children}
          </ThemedText>
        ) : (
          children
        )}
      </Link>
    );
  }

  return (
    <Link href={href} target={target} asChild>
      <Pressable style={flattenedStyle} {...props}>
        {typeof children === "string" ? (
          <ThemedText style={isActive ? { fontWeight: "bold" } : undefined}>
            {children}
          </ThemedText>
        ) : (
          children
        )}
      </Pressable>
    </Link>
  );
}
