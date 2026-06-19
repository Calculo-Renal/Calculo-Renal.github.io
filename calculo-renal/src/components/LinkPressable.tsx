import { ReactNode } from "react";
import { Link, Href, usePathname } from "expo-router";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import ThemedText from "@/components/ThemedText";

type LinkPressableProps = PressableProps & {
  href: Href;
  children: string | ReactNode;
  activeStyle?: any;
};

export default function LinkPressable({
  href,
  children,
  style,
  activeStyle,
  ...props
}: LinkPressableProps) {
  const pathname = usePathname();
  const hrefString = typeof href === "object" ? href.pathname : href;

  const currentSegment = pathname?.split("/").pop();
  const targetSegment = hrefString?.split("/").pop();

  const isActive = currentSegment === targetSegment;

  const flattenedStyle = StyleSheet.flatten([style, isActive && activeStyle]);

  return (
    <Link href={href} asChild>
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
