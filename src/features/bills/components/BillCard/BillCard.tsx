// src/features/bills/components/BillCard/BillCard.tsx
//
// ✏️ FILE DIUPDATE
//
// Perubahan dari versi lama:
//   - Tambah prop `isFirst` — card pertama di list mendapat showHint=true
//   - Teruskan showHint ke BillCardSwipe untuk trigger peek animation
//   - Press animation tetap sama (scale 0.98 → 1.0 via Pressable)
//
import { Pressable } from "@/components/ui/pressable";
import { ROUTES } from "@/src/constants/navigation";
import type { Bill } from "@/src/types/bill";
import { useRouter } from "expo-router";
import { memo, useCallback } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { BillCardContent } from "./BillCardContent";
import { BillCardSwipe } from "./BillCardSwipe";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BillCardProps {
  bill: Bill;
  onPaid?: (id: string) => void;
  onDelete?: (id: string) => void;
  /** Jika true, card ini tampilkan swipe hint onboarding (hanya card pertama) */
  isFirst?: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PRESS_SCALE_DOWN = 0.98;
const SPRING_PRESS_IN = { damping: 20, stiffness: 400 };
const SPRING_PRESS_OUT = { damping: 20, stiffness: 300 };

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * BillCard — entry point publik.
 *
 * Struktur:
 *   BillCard
 *   └── BillCardSwipe     (gesture + swipe + hint animation)
 *       └── Animated.View (press scale)
 *           └── Pressable (tap handler)
 *               └── BillCardContent (pure UI)
 */
export const BillCard = memo(function BillCard({
  bill,
  onPaid,
  onDelete,
  isFirst = false,
}: BillCardProps) {
  const router = useRouter();
  const pressScale = useSharedValue(1);

  const handlePaid = useCallback(() => {
    onPaid?.(bill.id);
  }, [onPaid, bill.id]);

  const handleDelete = useCallback(() => {
    onDelete?.(bill.id);
  }, [onDelete, bill.id]);

  const handlePress = useCallback(() => {
    router.push(ROUTES.BILL_DETAIL(bill.id));
  }, [router, bill.id]);

  const handlePressIn = useCallback(() => {
    pressScale.value = withSpring(PRESS_SCALE_DOWN, SPRING_PRESS_IN);
  }, [pressScale]);

  const handlePressOut = useCallback(() => {
    pressScale.value = withSpring(1, SPRING_PRESS_OUT);
  }, [pressScale]);

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  return (
    <BillCardSwipe
      onPaid={handlePaid}
      onDelete={handleDelete}
      isPaid={bill.status === "paid"}
      showHint={isFirst} // ← card pertama mendapat peek animation
    >
      <Animated.View style={pressStyle}>
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <BillCardContent bill={bill} />
        </Pressable>
      </Animated.View>
    </BillCardSwipe>
  );
});
