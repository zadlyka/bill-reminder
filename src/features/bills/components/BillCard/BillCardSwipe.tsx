// src/features/bills/components/BillCard/BillCardSwipe.tsx
//
// FIX: Reanimated v4 — tidak ada Animated.SharedValue.
// useSharedValue<number> sudah cukup, tipe dikembalikan sebagai SharedValue<number>.
//
import * as Haptics from "expo-haptics";
import { useCallback, useState } from "react";
import { LayoutChangeEvent, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SwipeActionLeft } from "./SwipeActionLeft";
import { SwipeActionRight } from "./SwipeActionRight";

// ─── Constants ───────────────────────────────────────────────────────────────

const THRESHOLD_RATIO = 0.4;
const VELOCITY_THRESHOLD = 800;
const SWIPE_RESISTANCE = 0.75;

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 300,
  mass: 0.8,
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface BillCardSwipeProps {
  children: React.ReactNode;
  onPaid: () => void;
  onDelete: () => void;
  isPaid?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function BillCardSwipe({
  children,
  onPaid,
  onDelete,
  isPaid = false,
}: BillCardSwipeProps) {
  // useSharedValue<number> sudah return SharedValue<number> — tidak perlu type cast
  const translateX = useSharedValue(0);
  const [cardWidth, setCardWidth] = useState(0);

  // ── Haptic helpers ────────────────────────────────────────────────────────
  const hapticSuccess = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const hapticWarning = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }, []);

  // ── Layout ───────────────────────────────────────────────────────────────
  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setCardWidth(e.nativeEvent.layout.width);
  }, []);

  // ── Gesture ──────────────────────────────────────────────────────────────
  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-15, 15])
    .onUpdate((e) => {
      if (isPaid && e.translationX > 0) return;
      translateX.value = e.translationX * SWIPE_RESISTANCE;
    })
    .onEnd((e) => {
      const tx = translateX.value;
      const vx = e.velocityX;
      const threshold = cardWidth * THRESHOLD_RATIO;

      const triggerRight =
        (tx > threshold || (vx > VELOCITY_THRESHOLD && tx > 20)) && !isPaid;
      const triggerLeft =
        tx < -threshold || (vx < -VELOCITY_THRESHOLD && tx < -20);

      if (triggerRight) {
        runOnJS(hapticSuccess)();
        translateX.value = withSpring(
          cardWidth + 50,
          SPRING_CONFIG,
          (done) => {
            if (done) runOnJS(onPaid)();
          }
        );
      } else if (triggerLeft) {
        runOnJS(hapticWarning)();
        translateX.value = withSpring(
          -(cardWidth + 50),
          SPRING_CONFIG,
          (done) => {
            if (done) runOnJS(onDelete)();
          }
        );
      } else {
        translateX.value = withSpring(0, SPRING_CONFIG);
      }
    });

  // ── Animated styles ──────────────────────────────────────────────────────
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(translateX.value !== 0 ? 0.985 : 1, {
          duration: 150,
        }),
      },
    ],
  }));

  return (
    <Animated.View
      style={[styles.outerWrapper, scaleStyle]}
      onLayout={handleLayout}
    >
      {cardWidth > 0 && (
        <>
          <SwipeActionRight translateX={translateX} cardWidth={cardWidth} />
          <SwipeActionLeft translateX={translateX} cardWidth={cardWidth} />
        </>
      )}

      <GestureDetector gesture={panGesture}>
        <Animated.View style={cardStyle}>{children}</Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    marginBottom: 12,
    borderRadius: 20,
    overflow: "hidden",
  },
});
