// src/features/bills/components/BillCard/SwipeActionRight.tsx
//
// FIX: Reanimated v4 — SharedValue diimport langsung dari "react-native-reanimated",
// bukan via namespace Animated.SharedValue (deprecated sejak v4).
//
import { Check } from "lucide-react-native";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface SwipeActionRightProps {
  translateX: SharedValue<number>;
  cardWidth: number;
}

export function SwipeActionRight({
  translateX,
  cardWidth,
}: SwipeActionRightProps) {
  const THRESHOLD = cardWidth * 0.4;

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, 60], [0, 1], "clamp");
    return { opacity };
  });

  const iconStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [0, THRESHOLD],
      [0.6, 1.15],
      "clamp"
    );
    return { transform: [{ scale }] };
  });

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.iconWrapper, iconStyle]}>
        <Check size={22} color="#fff" strokeWidth={2.5} />
      </Animated.View>
      <Animated.Text style={styles.label}>Lunas</Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 24,
    backgroundColor: "#10b981",
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
    marginRight: 8,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
