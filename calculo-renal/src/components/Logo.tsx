import React, { useEffect, useState } from "react";
import { StyleSheet, View, useColorScheme, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { Asset } from "expo-asset";

interface LogoProps {
  height?: number;
  style?: ViewStyle;
}

const logoLight = require("@/assets/images/logo.png");
const logoDark = require("@/assets/images/logo-dark.png");

export default function Logo({ height = 64, style }: LogoProps) {
  const colorScheme = useColorScheme();
  const logo = colorScheme === "dark" ? logoDark : logoLight;

  const [aspectRatio, setAspectRatio] = useState<number>(1);

  useEffect(() => {
    const source = Asset.fromModule(logo);

    if (source?.width && source?.height) {
      setAspectRatio(source.width / source.height);
    }
  }, [logo]);

  return (
    <View style={[styles.container, style]}>
      <Image
        source={logo}
        style={{
          height,
          aspectRatio,
        }}
        contentFit="contain"
        transition={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
