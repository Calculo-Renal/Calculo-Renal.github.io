import { useVideoPlayer, VideoView, VideoViewProps } from "expo-video";
import { StyleSheet, View } from "react-native";

interface VideoScreenProps {
  source: string;
}

export default function VideoScreen({ source }: VideoScreenProps) {
  const videoSources: Record<string, number> = {
    "maximo": require("@/assets/videos/maximo.mp4"),
    "limites": require("@/assets/videos/limites.mp4"),
    "limite-lateral-esquerdo": require("@/assets/videos/limite-lateral-esquerdo.mp4"),
  };

  const player = useVideoPlayer(videoSources[source]);

  return (
    <View style={styles.container}>
      <VideoView player={player} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
