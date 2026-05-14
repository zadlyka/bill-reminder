import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ROUTES } from "@/src/constants/navigation";
import type { BillSummary } from "@/src/types/bill";
import { formatCurrency } from "@/src/utils/formatter";
import { useRouter } from "expo-router";
import { Eye, List, Plus } from "lucide-react-native";
import { memo, useCallback } from "react";
import { Platform, StyleSheet } from "react-native";

interface SummaryCardProps {
  summary: BillSummary;
  onSeeAllPress?: () => void;
}

export const SummaryCard = memo(function SummaryCard({
  summary,
  onSeeAllPress,
}: SummaryCardProps) {
  const router = useRouter();

  const handleAddPress = useCallback(() => {
    router.push(ROUTES.BILL_CREATE);
  }, [router]);

  return (
    <Box style={styles.card} className="p-5 mb-4 bg-black rounded-3xl">
      <HStack className="items-center justify-between mb-1">
        <Text className="text-sm text-white/60">Total Belum Bayar</Text>
        <Eye size={18} color="rgba(255,255,255,0.6)" />
      </HStack>

      <Text className="mb-4 text-3xl font-bold text-white">
        {formatCurrency(summary.totalUnpaid)}
      </Text>

      <HStack className="mb-5" space="md">
        <VStack className="flex-1 p-3 bg-white/10 rounded-2xl">
          <Text className="text-white/50 text-xs mb-0.5">Telat</Text>
          <Text className="text-sm font-semibold text-red-400">
            {formatCurrency(summary.totalOverdue)}
          </Text>
        </VStack>
        <VStack className="flex-1 p-3 bg-white/10 rounded-2xl">
          <Text className="text-white/50 text-xs mb-0.5">Lunas</Text>
          <Text className="text-sm font-semibold text-emerald-400">
            {formatCurrency(summary.totalPaid)}
          </Text>
        </VStack>
        <VStack className="flex-1 p-3 bg-white/10 rounded-2xl">
          <Text className="text-white/50 text-xs mb-0.5">Segera</Text>
          <Text className="text-sm font-semibold text-amber-400">
            {summary.upcomingCount} tagihan
          </Text>
        </VStack>
      </HStack>

      <HStack space="sm">
        <Pressable
          onPress={handleAddPress}
          className="flex-row items-center justify-center flex-1 gap-2 py-3 bg-white rounded-2xl"
        >
          <Plus size={16} color="#000" strokeWidth={2.5} />
          <Text className="text-sm font-semibold text-black">Tambah</Text>
        </Pressable>

        <Pressable
          onPress={onSeeAllPress}
          className="flex-row items-center justify-center flex-1 gap-2 py-3 bg-white/15 rounded-2xl"
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
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: { elevation: 6 },
    }),
  },
});
