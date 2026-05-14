import { memo, useCallback } from "react";
import { FlatList, StyleSheet, type ListRenderItem } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { BILL_CARD_HEIGHT } from "@/src/constants/bill";
import type { Bill } from "@/src/types/bill";
import { BillCard } from "./BillCard";

interface BillListProps {
  bills: Bill[];
  isLoading?: boolean;
  onSeeAll?: () => void;
}

const ListHeader = memo(function ListHeader({
  onSeeAll,
}: {
  onSeeAll?: () => void;
}) {
  return (
    <HStack style={styles.header} className="items-center justify-between">
      <Text className="text-base font-bold text-typography-900">
        Tagihan Terkini
      </Text>
      <Pressable onPress={onSeeAll}>
        <Text className="text-sm font-medium text-indigo-500">
          Lihat semua
        </Text>
      </Pressable>
    </HStack>
  );
});

const EmptyState = memo(function EmptyState() {
  return (
    <VStack className="items-center py-10">
      <Text style={styles.emptyEmoji}>🎉</Text>
      <Text className="mt-2 font-semibold text-typography-900">
        Semua tagihan lunas!
      </Text>
      <Text className="mt-1 text-sm text-typography-400">
        Tidak ada tagihan yang perlu dibayar
      </Text>
    </VStack>
  );
});

const LoadingState = memo(function LoadingState() {
  return (
    <VStack className="items-center py-8">
      <Spinner size="large" />
      <Text className="mt-2 text-sm text-typography-400">
        Memuat tagihan...
      </Text>
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

  const keyExtractor = useCallback(
    (item: Bill) => item.id,
    []
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<Bill> | null | undefined, index: number) => ({
      length: BILL_CARD_HEIGHT + 12,
      offset: (BILL_CARD_HEIGHT + 12) * index,
      index,
    }),
    []
  );

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <FlatList
      data={bills}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      ListHeaderComponent={<ListHeader onSeeAll={onSeeAll} />}
      ListEmptyComponent={<EmptyState />}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      windowSize={5}
      initialNumToRender={8}
      updateCellsBatchingPeriod={50}
    />
  );
});

const styles = StyleSheet.create({
  header:     { marginBottom: 12 },
  content:    { paddingBottom: 100 },
  emptyEmoji: { fontSize: 40 },
});