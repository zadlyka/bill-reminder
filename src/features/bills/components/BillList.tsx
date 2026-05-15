// src/features/bills/components/BillList.tsx
import { memo, useCallback } from "react";
import { FlatList, type ListRenderItem } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { BILL_CARD_HEIGHT } from "@/src/constants/bill";
import type { Bill } from "@/src/types/bill";
import { BillCard } from "./BillCard";

interface BillListProps {
  bills: Bill[];
  isLoading?: boolean;
  onSeeAll?: () => void;
}

const ITEM_HEIGHT = BILL_CARD_HEIGHT + 12; // card + marginBottom

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
    <VStack className="items-center py-12 gap-2">
      <Text className="text-4xl">🎉</Text>
      <Text className="font-semibold text-typography-900">
        Semua tagihan lunas!
      </Text>
      <Text className="text-sm text-typography-400 text-center">
        Tidak ada tagihan yang perlu dibayar
      </Text>
    </VStack>
  );
});

const LoadingState = memo(function LoadingState() {
  return (
    <VStack className="items-center py-10 gap-2">
      <Spinner size="large" />
      <Text className="text-sm text-typography-400">Memuat tagihan...</Text>
    </VStack>
  );
});

export const BillList = memo(function BillList({
  bills,
  isLoading = false,
  onSeeAll,
}: BillListProps) {
  const renderItem = useCallback<ListRenderItem<Bill>>(
    ({ item }) => <BillCard bill={item} />,
    []
  );

  const keyExtractor = useCallback((item: Bill) => item.id, []);

  const getItemLayout = useCallback(
    (_: ArrayLike<Bill> | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
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
