import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Spacing } from "@/constants/theme";

interface VideoScreenProps {
  source: string;
  title?: string;
}

export default function VideoScreen({ source, title }: VideoScreenProps) {
  const videoSources: Record<string, number> = {
    "o-que-e-um-limite": require("@/assets/videos/limites/o-que-e-um-limite.mp4"),
    "limite-lateral-dominio": require("@/assets/videos/limites/limite-lateral-dominio.mp4"),
    "limite-lateral-partes": require("@/assets/videos/limites/limite-lateral-partes.mp4"),
    "derivadas-ex-1": require("@/assets/videos/derivadas/Video_Cap_2_Ex_1.mp4"),
    "derivadas-ex-2": require("@/assets/videos/derivadas/Video_Cap_2_Ex_2.mp4"),
    "derivadas-ex-3": require("@/assets/videos/derivadas/Video_Cap_2_Ex_3.mp4"),
    "derivadas-ex-4": require("@/assets/videos/derivadas/Video_Cap_2_Ex_4.mp4"),
    "derivadas-ex-5": require("@/assets/videos/derivadas/Video_Cap_2_Ex_5.mp4"),
    "derivadas-ex-6": require("@/assets/videos/derivadas/Video_Cap_2_Ex_6.mp4"),
  };

  const player = useVideoPlayer(videoSources[source]);

  return (
    <View style={styles.container}>
      {title && <ThemedText style={styles.title}>{title}</ThemedText>}
      <View style={styles.videoWrapper}>
        <VideoView
          player={player}
          style={styles.video}
          allowsPictureInPicture
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: Spacing.two,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: Spacing.two,
  },
  videoWrapper: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
  },
  video: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
