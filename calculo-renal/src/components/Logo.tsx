import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';

interface LogoProps {
  height?: number;
  style?: ViewStyle;
}

export default function Logo({ height = 64, style }: LogoProps) {
  return (
    <View style={[styles.container, style]}>
      <Image
        style={{ width: '100%', height: height,  }}
        source={require('@/assets/images/logo.png')}
        contentFit="contain"
        transition={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
