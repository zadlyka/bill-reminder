// src/features/bills/components/BillCard/BillCard.tsx
//
// ✏️ FILE DIREFACTOR (dulunya src/features/bills/components/BillCard.tsx)
//
// Perubahan dari versi lama:
//   - Dipecah menjadi subfolder BillCard/ dengan 5 sub-komponen
//   - File ini menjadi thin orchestrator: terima props → teruskan ke Swipe & Content
//   - Press animation tetap ada (scale 0.97) tapi kini via Pressable + Reanimated
//   - Tambah props onPaid dan onDelete untuk swipe callbacks dari parent
//   - Import BillCardContent, BillCardSwipe menggantikan semua inline UI lama
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
  /** Dipanggil setelah animasi swipe kanan selesai */
  onPaid?: (id: string) => void;
  /** Dipanggil setelah animasi swipe kiri selesai */
  onDelete?: (id: string) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * BillCard — entry point publik.
 *
 * Struktur komponen:
 *   BillCard                    ← orchestrator (file ini)
 *   └── BillCardSwipe           ← gesture + swipe animation
 *       └── Pressable wrapper   ← press scale animation (0.97)
 *           └── BillCardContent ← pure UI (no logic)
 */
export const BillCard = memo(function BillCard({
  bill,
  onPaid,
  onDelete,
}: BillCardProps) {
  const router = useRouter();
  const pressScale = useSharedValue(1);

  // ── Callbacks ────────────────────────────────────────────────────────────
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
    pressScale.value = withSpring(0.97, { damping: 20, stiffness: 400 });
  }, [pressScale]);

  const handlePressOut = useCallback(() => {
    pressScale.value = withSpring(1, { damping: 20, stiffness: 300 });
  }, [pressScale]);

  // ── Press animation style ─────────────────────────────────────────────
  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  return (
    <BillCardSwipe
      onPaid={handlePaid}
      onDelete={handleDelete}
      isPaid={bill.status === "paid"}
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
