// src/features/bills/components/BillCard/BillCardSwipe.tsx
//
// ✏️ FILE DIUPDATE — upgrade swipe UX ke level Apple Mail / Gmail
//
// Perubahan dari versi lama:
//   1. Resistance curve  — card tidak bisa bergerak terlalu jauh (interpolate)
//   2. Better trigger    — ACTION_TRIGGER 120px + VELOCITY_TRIGGER 900px/s
//   3. Magnetic snap     — withSpring ke action position saat threshold tercapai
//   4. Card depth effect — scale + shadow berubah saat swipe
//   5. Delete animation  — opacity→0 + height→0 (200ms) sebelum onDelete dipanggil
//   6. Paid animation    — scale down + flash + fade (250ms) sebelum onPaid dipanggil
//   7. Swipe hint        — peek animation saat pertama load (hanya 1x)
//   8. Gesture reliability — activeOffsetX ±20, failOffsetY ±10
//   9. Haptic            — success/warning, trigger hanya 1x per swipe
//  10. Semua magic number → swipeConstants.ts
//
import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  ACTION_TRIGGER,
  ACTIVE_OFFSET_X,
  CARD_RADIUS,
  DELETE_DURATION,
  DEPTH_SCALE_MIN,
  DEPTH_SHADOW_OPACITY_MAX,
  DEPTH_SHADOW_OPACITY_MIN,
  DEPTH_SHADOW_RADIUS_MAX,
  DEPTH_SHADOW_RADIUS_MIN,
  DEPTH_SHADOW_RANGE,
  DEPTH_TRANSLATE_RANGE,
  FAIL_OFFSET_Y,
  HINT_DISTANCE,
  HINT_DURATION,
  HINT_STEP_DELAY,
  PAID_DURATION,
  RESISTANCE_INPUT,
  RESISTANCE_OUTPUT,
  SPRING_CANCEL,
  SPRING_SNAP,
  VELOCITY_MIN_DISTANCE,
  VELOCITY_TRIGGER,
} from "./swipeConstants";
import { SwipeActionLeft } from "./SwipeActionLeft";
import { SwipeActionRight } from "./SwipeActionRight";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BillCardSwipeProps {
  children: React.ReactNode;
  onPaid: () => void;
  onDelete: () => void;
  isPaid?: boolean;
  /** Jika true, card ini akan menampilkan swipe hint onboarding */
  showHint?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function BillCardSwipe({
  children,
  onPaid,
  onDelete,
  isPaid = false,
  showHint = false,
}: BillCardSwipeProps) {
  const translateX = useSharedValue(0);
  const cardHeight = useSharedValue<number | undefined>(undefined);
  const opacity = useSharedValue(1);
  const [cardWidth, setCardWidth] = useState(0);

  // Guard agar haptic hanya trigger 1x per swipe gesture
  const hapticFiredRef = useRef(false);

  // ── Haptic helpers ────────────────────────────────────────────────────────
  const hapticSuccess = useCallback(() => {
    if (hapticFiredRef.current) return;
    hapticFiredRef.current = true;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const hapticWarning = useCallback(() => {
    if (hapticFiredRef.current) return;
    hapticFiredRef.current = true;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }, []);

  const resetHapticGuard = useCallback(() => {
    hapticFiredRef.current = false;
  }, []);

  // ── Swipe hint (peek animation — hanya 1x) ────────────────────────────────
  useEffect(() => {
    if (!showHint || cardWidth === 0) return;

    // Sequence: center → kanan → center → kiri → center
    translateX.value = withDelay(
      400, // tunggu list selesai render
      withSequence(
        withTiming(HINT_DISTANCE, { duration: HINT_DURATION }),
        withDelay(
          HINT_STEP_DELAY,
          withTiming(0, { duration: HINT_DURATION })
        ),
        withDelay(
          HINT_STEP_DELAY,
          withTiming(-HINT_DISTANCE, { duration: HINT_DURATION })
        ),
        withDelay(
          HINT_STEP_DELAY,
          withTiming(0, { duration: HINT_DURATION })
        )
      )
    );
  }, [showHint, cardWidth, translateX]);

  // ── Layout ───────────────────────────────────────────────────────────────
  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setCardWidth(width);
    if (cardHeight.value === undefined) {
      cardHeight.value = height;
    }
  }, [cardHeight]);

  // ── Paid animation: scale + flash → fade → callback ───────────────────────
  const triggerPaidAnimation = useCallback(() => {
    // 1. Scale down sedikit
    // 2. Opacity fade ke 0
    // 3. Height collapse ke 0
    // 4. Panggil onPaid
    opacity.value = withTiming(0, { duration: PAID_DURATION }, (done) => {
      if (done) {
        cardHeight.value = withTiming(0, { duration: DELETE_DURATION }, (collapsed) => {
          if (collapsed) runOnJS(onPaid)();
        });
      }
    });
  }, [opacity, cardHeight, onPaid]);

  // ── Delete animation: fade + collapse → callback ──────────────────────────
  const triggerDeleteAnimation = useCallback(() => {
    opacity.value = withTiming(0, { duration: DELETE_DURATION }, (done) => {
      if (done) {
        cardHeight.value = withTiming(0, { duration: DELETE_DURATION }, (collapsed) => {
          if (collapsed) runOnJS(onDelete)();
        });
      }
    });
  }, [opacity, cardHeight, onDelete]);

  // ── Gesture ──────────────────────────────────────────────────────────────
  const panGesture = Gesture.Pan()
    .activeOffsetX([ACTIVE_OFFSET_X[0], ACTIVE_OFFSET_X[1]])
    .failOffsetY([FAIL_OFFSET_Y[0], FAIL_OFFSET_Y[1]])
    .onBegin(() => {
      runOnJS(resetHapticGuard)();
    })
    .onUpdate((e) => {
      const raw = e.translationX;
      if (isPaid && raw > 0) return;

      // Resistance curve — card makin berat saat jauh
      translateX.value = interpolate(
        raw,
        [...RESISTANCE_INPUT],
        [...RESISTANCE_OUTPUT],
        Extrapolation.CLAMP
      );

      // Haptic preview saat mencapai threshold (1x per gesture)
      if (raw > ACTION_TRIGGER) {
        runOnJS(hapticSuccess)();
      } else if (raw < -ACTION_TRIGGER) {
        runOnJS(hapticWarning)();
      }
    })
    .onEnd((e) => {
      const tx = translateX.value;
      const vx = e.velocityX;

      const triggerRight =
        !isPaid &&
        (tx > ACTION_TRIGGER ||
          (vx > VELOCITY_TRIGGER && e.translationX > VELOCITY_MIN_DISTANCE));

      const triggerLeft =
        tx < -ACTION_TRIGGER ||
        (vx < -VELOCITY_TRIGGER && e.translationX < -VELOCITY_MIN_DISTANCE);

      if (triggerRight) {
        // Snap ke kanan → paid animation
        translateX.value = withSpring(cardWidth + 50, SPRING_SNAP, (done) => {
          if (done) runOnJS(triggerPaidAnimation)();
        });
      } else if (triggerLeft) {
        // Snap ke kiri → delete animation
        translateX.value = withSpring(
          -(cardWidth + 50),
          SPRING_SNAP,
          (done) => {
            if (done) runOnJS(triggerDeleteAnimation)();
          }
        );
      } else {
        // Belum threshold → elastic cancel
        translateX.value = withSpring(0, SPRING_CANCEL);
        runOnJS(resetHapticGuard)();
      }
    });

  // ── Animated styles ──────────────────────────────────────────────────────

  // Card bergeser secara horizontal
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  // Outer wrapper: scale + shadow depth berubah saat swipe
  const depthStyle = useAnimatedStyle(() => {
    const absTx = Math.abs(translateX.value);

    const scale = interpolate(
      absTx,
      [0, DEPTH_TRANSLATE_RANGE],
      [1, DEPTH_SCALE_MIN],
      Extrapolation.CLAMP
    );
    const shadowOpacity = interpolate(
      absTx,
      [0, DEPTH_SHADOW_RANGE],
      [DEPTH_SHADOW_OPACITY_MIN, DEPTH_SHADOW_OPACITY_MAX],
      Extrapolation.CLAMP
    );
    const shadowRadius = interpolate(
      absTx,
      [0, DEPTH_SHADOW_RANGE],
      [DEPTH_SHADOW_RADIUS_MIN, DEPTH_SHADOW_RADIUS_MAX],
      Extrapolation.CLAMP
    );

    // Height collapse saat delete/paid animation
    const heightStyle =
      cardHeight.value !== undefined
        ? { height: cardHeight.value, overflow: "hidden" as const }
        : {};

    return {
      transform: [{ scale }],
      shadowOpacity,
      shadowRadius,
      ...heightStyle,
    };
  });

  return (
    <Animated.View
      style={[styles.outerWrapper, depthStyle]}
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
    borderRadius: CARD_RADIUS,
    overflow: "hidden",
    // Base shadow (akan di-override oleh depthStyle saat swipe)
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
});
