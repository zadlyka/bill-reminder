// src/features/bills/components/BillCard.tsx
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { CATEGORY_ICON, STATUS_CONFIG } from "@/src/constants/bill";
import { ROUTES } from "@/src/constants/navigation";
import type { Bill } from "@/src/types/bill";
import { formatCurrency } from "@/src/utils/formatter";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { BillUrgencyBadge } from "./BillUrgencyBadge";

interface BillCardProps {
  bill: Bill;
}

export const BillCard = memo(function BillCard({ bill }: BillCardProps) {
  const router = useRouter();
  const scale = useSharedValue(1);
  const category = CATEGORY_ICON[bill.category];
  const status = STATUS_CONFIG[bill.status];
  const isPaid = bill.status === "paid";
  const IconComponent = category.icon;

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
    <Animated.View style={[animatedStyle, styles.wrapper]}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="p-4 border bg-background-50 border-background-200 rounded-2xl"
        style={isPaid && styles.paidCard}
      >
        <HStack className="items-center" space="sm">
          {/* Category icon */}
          <Box
            className={`items-center justify-center ${category.bgClass} rounded-xl w-11 h-11`}
          >
            <IconComponent
              size={20}
              color={category.iconColor}
              strokeWidth={1.8}
            />
          </Box>

          {/* Name + badge */}
          <VStack className="flex-1 gap-1">
            <Text
              className="text-sm font-semibold text-typography-900"
              numberOfLines={1}
            >
              {bill.name}
            </Text>

            {isPaid ? (
              <Box
                className={`${status.bgClass} rounded-full px-2.5 py-1 self-start`}
              >
                <Text className={`${status.textClass} text-xs font-semibold`}>
                  {status.label}
                </Text>
              </Box>
            ) : (
              <BillUrgencyBadge dueDate={bill.dueDate} />
            )}
          </VStack>

          {/* Amount + chevron */}
          <VStack className="items-end gap-1">
            <Text className="text-sm font-bold text-typography-900">
              {formatCurrency(bill.amount)}
            </Text>
            <ChevronRight size={15} color="#9ca3af" />
          </VStack>
        </HStack>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  paidCard: { opacity: 0.55 },
});
