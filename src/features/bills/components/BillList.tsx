// src/features/bills/components/BillList.tsx
//
// ✏️ FILE DIUPDATE
//
// Perubahan dari versi lama:
//   - renderItem meneruskan isFirst={index === 0} ke BillCard pertama
//     agar swipe hint onboarding hanya muncul di card pertama
//   - Props onPaid dan onDelete tetap ada
//
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { BILL_CARD_HEIGHT } from "@/src/constants/bill";
import type { Bill } from "@/src/types/bill";
import { ClipboardList } from "lucide-react-native";
import { memo, useCallback } from "react";
import { FlatList, type ListRenderItemInfo } from "react-native";
import { BillCard } from "./BillCard";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BillListProps {
  bills: Bill[];
  isLoading?: boolean;
  onSeeAll?: () => void;
  onPaid?: (id: string) => void;
  onDelete?: (id: string) => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ITEM_HEIGHT = BILL_CARD_HEIGHT + 12;

// ─── Sub-components ──────────────────────────────────────────────────────────

const ListHeader = memo(function ListHeader({
  onSeeAll,
}: {
  onSeeAll?: () => void;
}) {
  return (
    <HStack className="items-center justify-between mb-3">
      <Text className="text-base font-bold text-typography-900">
        Tagihan Terkini
      </Text>
      <Pressable
        onPress={onSeeAll}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text className="text-sm font-medium text-indigo-500">Lihat semua</Text>
      </Pressable>
    </HStack>
  );
});

const EmptyState = memo(function EmptyState() {
  return (
    <VStack className="items-center gap-2 py-12">
      <ClipboardList className="text-4xl" />
      <Text className="font-semibold text-typography-900">
        No bills due today
      </Text>
      <Text className="text-sm text-center text-typography-400">
        Review outstanding and upcoming bills
      </Text>
    </VStack>
  );
});

const LoadingState = memo(function LoadingState() {
  return (
    <VStack className="items-center gap-2 py-10">
      <Spinner size="large" />
      <Text className="text-sm text-typography-400">Loading bills...</Text>
    </VStack>
  );
});

// ─── Main Component ──────────────────────────────────────────────────────────

export const BillList = memo(function BillList({
  bills,
  isLoading = false,
  onSeeAll,
  onPaid,
  onDelete,
}: BillListProps) {
  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Bill>) => (
      <BillCard
        bill={item}
        onPaid={onPaid}
        onDelete={onDelete}
        isFirst={index === 0} // ← hanya card pertama yang dapat swipe hint
      />
    ),
    [onPaid, onDelete],
  );

  const keyExtractor = useCallback((item: Bill) => item.id, []);

  const getItemLayout = useCallback(
    (_: ArrayLike<Bill> | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  if (isLoading) return <LoadingState />;

  return (
    <FlatList
      data={bills}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      ListHeaderComponent={<ListHeader onSeeAll={onSeeAll} />}
      ListEmptyComponent={<EmptyState />}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      windowSize={5}
      initialNumToRender={8}
      updateCellsBatchingPeriod={50}
    />
  );
});
