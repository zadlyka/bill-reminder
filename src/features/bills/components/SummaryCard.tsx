// src/features/bills/components/SummaryCard.tsx
import { memo, useCallback, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Eye, EyeOff, List, Plus } from "lucide-react-native";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import { ROUTES } from "@/src/constants/navigation";
import type { BillSummary } from "@/src/types/bill";
import { AmountText } from "./AmountText";
import { SummaryStat } from "./SummaryStat";

interface SummaryCardProps {
  summary: BillSummary;
  onSeeAllPress?: () => void;
}

export const SummaryCard = memo(function SummaryCard({
  summary,
  onSeeAllPress,
}: SummaryCardProps) {
  const router = useRouter();
  const [hideAmount, setHideAmount] = useState(false);

  const toggleAmountVisibility = useCallback(() => {
    setHideAmount((prev) => !prev);
  }, []);

  const handleAddPress = useCallback(() => {
    router.push(ROUTES.BILL_CREATE);
  }, [router]);

  return (
    <Box style={styles.card} className="p-5 mb-4 bg-black rounded-3xl">
      {/* Header */}
      <HStack className="items-center justify-between mb-1">
        <Text className="text-xs text-white/50 font-medium uppercase tracking-widest">
          Summary
        </Text>
        <Pressable
          onPress={toggleAmountVisibility}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel={hideAmount ? "Tampilkan nominal" : "Sembunyikan nominal"}
        >
          {hideAmount ? (
            <EyeOff size={18} color="rgba(255,255,255,0.5)" />
          ) : (
            <Eye size={18} color="rgba(255,255,255,0.5)" />
          )}
        </Pressable>
      </HStack>

      {/* Total tagihan belum bayar */}
      <VStack className="mb-5 gap-0.5">
        <Text className="text-white/40 text-xs mt-1">Total Belum Bayar</Text>
        <AmountText
          value={summary.totalUnpaid}
          hidden={hideAmount}
          size="lg"
          className="text-white"
        />
      </VStack>

      {/* Divider */}
      <Divider className="bg-white/10 mb-5" />

      {/* Stats row */}
      <HStack className="mb-5" space="md">
        <SummaryStat
          label="Telat"
          value={summary.totalOverdue}
          hidden={hideAmount}
          valueClassName="text-red-400"
        />
        <SummaryStat
          label="Lunas"
          value={summary.totalPaid}
          hidden={hideAmount}
          valueClassName="text-emerald-400"
        />
        <VStack className="flex-1 p-3 bg-white/10 rounded-2xl gap-0.5">
          <Text className="text-white/50 text-xs">Segera</Text>
          <Text className="text-sm font-semibold text-amber-400">
            {hideAmount ? "••" : `${summary.upcomingCount} tagihan`}
          </Text>
        </VStack>
      </HStack>

      {/* Action Buttons */}
      <HStack space="sm">
        <Pressable
          onPress={handleAddPress}
          className="flex-row items-center justify-center flex-1 gap-2 py-3 bg-white rounded-2xl active:opacity-80"
        >
          <Plus size={16} color="#000" strokeWidth={2.5} />
          <Text className="text-sm font-semibold text-black">Tambah</Text>
        </Pressable>

        <Pressable
          onPress={onSeeAllPress}
          className="flex-row items-center justify-center flex-1 gap-2 py-3 bg-white/15 rounded-2xl active:opacity-80"
        >
          <List size={16} color="#fff" strokeWidth={2} />
          <Text className="text-sm font-semibold text-white">Semua</Text>
        </Pressable>
      </HStack>
    </Box>
  );
});

const styles = StyleSheet.create({
  card: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
      },
      android: { elevation: 8 },
    }),
  },
});
