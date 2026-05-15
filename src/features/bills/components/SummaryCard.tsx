// src/features/bills/components/SummaryCard.tsx
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ROUTES } from "@/src/constants/navigation";
import type { BillSummary } from "@/src/types/bill";
import { useRouter } from "expo-router";
import { Eye, EyeOff, List, Plus } from "lucide-react-native";
import { memo, useCallback, useState } from "react";
import { Platform, StyleSheet } from "react-native";
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
        <Text className="text-xs font-medium tracking-widest uppercase text-white/50">
          Summary
        </Text>
        <Pressable
          onPress={toggleAmountVisibility}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel={hideAmount ? "Show amounts" : "Hide amounts"}
        >
          {hideAmount ? (
            <EyeOff size={18} color="rgba(255,255,255,0.5)" />
          ) : (
            <Eye size={18} color="rgba(255,255,255,0.5)" />
          )}
        </Pressable>
      </HStack>

      {/* Total unpaid bills */}
      <VStack className="mb-5 gap-0.5">
        <Text className="mt-1 text-xs text-white/40">Total Unpaid</Text>
        <AmountText
          value={summary.totalUnpaid}
          hidden={hideAmount}
          size="lg"
          className="text-white"
        />
      </VStack>

      {/* Divider */}
      <Divider className="mb-5 bg-white/10" />

      {/* Stats row */}
      <HStack className="mb-5" space="md">
        <SummaryStat
          label="Overdue"
          value={summary.totalOverdue}
          hidden={hideAmount}
          valueClassName="text-red-400"
        />
        <SummaryStat
          label="Paid"
          value={summary.totalPaid}
          hidden={hideAmount}
          valueClassName="text-emerald-400"
        />
        <VStack className="flex-1 p-3 bg-white/10 rounded-2xl gap-0.5">
          <Text className="text-xs text-white/50">Upcoming</Text>
          <Text className="text-sm font-semibold text-amber-400">
            {hideAmount ? "•••••" : `${summary.upcomingCount} bills`}
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
          <Text className="text-sm font-semibold text-black">Add</Text>
        </Pressable>

        <Pressable
          onPress={onSeeAllPress}
          className="flex-row items-center justify-center flex-1 gap-2 py-3 bg-white/15 rounded-2xl active:opacity-80"
        >
          <List size={16} color="#fff" strokeWidth={2} />
          <Text className="text-sm font-semibold text-white">All</Text>
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
