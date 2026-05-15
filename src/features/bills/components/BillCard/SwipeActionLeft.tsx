// src/features/bills/components/BillCard/SwipeActionLeft.tsx
//
// FIX: Reanimated v4 — SharedValue diimport langsung dari "react-native-reanimated".
//
import { Trash2 } from "lucide-react-native";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface SwipeActionLeftProps {
  translateX: SharedValue<number>;
  cardWidth: number;
}

export function SwipeActionLeft({
  translateX,
  cardWidth,
}: SwipeActionLeftProps) {
  const THRESHOLD = cardWidth * 0.4;

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [-60, 0], [1, 0], "clamp");
    return { opacity };
  });

  const iconStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [-THRESHOLD, 0],
      [1.15, 0.6],
      "clamp"
    );
    return { transform: [{ scale }] };
  });

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.Text style={styles.label}>Hapus</Animated.Text>
      <Animated.View style={[styles.iconWrapper, iconStyle]}>
        <Trash2 size={20} color="#fff" strokeWidth={2.2} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 24,
    backgroundColor: "#ef4444",
    borderRadius: 20,
    overflow: "hidden",
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
