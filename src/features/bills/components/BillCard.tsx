import { memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  BILL_CARD_HEIGHT,
  CATEGORY_EMOJI,
  STATUS_CONFIG,
} from "@/src/constants/bill";
import { ROUTES } from "@/src/constants/navigation";
import type { Bill } from "@/src/types/bill";
import { formatCurrency, getDueLabel } from "@/src/utils/formatter";

interface BillCardProps {
  bill: Bill;
}

export const BillCard = memo(function BillCard({ bill }: BillCardProps) {
  const router   = useRouter();
  const scale    = useSharedValue(1);
  const status   = STATUS_CONFIG[bill.status];
  const emoji    = CATEGORY_EMOJI[bill.category];
  const dueLabel = getDueLabel(bill.dueDate);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withTiming(0.97, { duration: 100 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withTiming(1, { duration: 150 });
  }, [scale]);

  const handlePress = useCallback(() => {
    router.push(ROUTES.BILL_DETAIL(bill.id));
  }, [router, bill.id]);

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="p-4 border bg-background-50 border-background-200 rounded-2xl"
      >
        <HStack className="items-center" space="sm">
          <Box className="items-center justify-center bg-background-100 rounded-xl w-11 h-11">
            <Text style={styles.emoji}>{emoji}</Text>
          </Box>

          <VStack className="flex-1">
            <Text className="text-sm font-semibold text-typography-900">
              {bill.name}
            </Text>
            <Text className="text-typography-400 text-xs mt-0.5">
              {dueLabel}
            </Text>
          </VStack>

          <VStack className="items-end">
            <Text className="text-sm font-bold text-typography-900">
              {formatCurrency(bill.amount)}
            </Text>
            <Box
              className={`${status.bgClass} rounded-full px-2 py-0.5 mt-1`}
            >
              <Text className={`${status.textClass} text-xs font-medium`}>
                {status.label}
              </Text>
            </Box>
          </VStack>

          <ChevronRight size={16} color="#9ca3af" />
        </HStack>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    height: BILL_CARD_HEIGHT,
    marginBottom: 12,
  },
  emoji: { fontSize: 20 },
});