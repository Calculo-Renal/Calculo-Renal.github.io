import { ReactNode } from "react";
import { Link, Href } from "expo-router";
import { Pressable, PressableProps, Text } from "react-native";

type LinkPressableProps = PressableProps & {
  href: Href;
  children: string | ReactNode;
};

export default function LinkPressable({
  href,
  children,
  style,
  ...props
}: LinkPressableProps) {
  return (
    <Link href={href} asChild>
      <Pressable style={style} {...props}>
        {typeof children === "string" ? <Text>{children}</Text> : children}
      </Pressable>
    </Link>
  );
}
