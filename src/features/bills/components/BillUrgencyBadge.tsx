// src/features/bills/components/BillUrgencyBadge.tsx
import { memo } from "react";
import { StyleSheet } from "react-native";
import { AlertCircle, Clock, CheckCircle2, Timer } from "lucide-react-native";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import {
  getDaysRemaining,
  getUrgencyLevel,
  type UrgencyLevel,
} from "@/src/utils/formatter";

interface BillUrgencyBadgeProps {
  dueDate: string;
}

const URGENCY_CONFIG: Record<
  UrgencyLevel,
  {
    bgClass: string;
    textClass: string;
    icon: typeof AlertCircle;
    iconColor: string;
    label: (d: number) => string;
  }
> = {
  overdue: {
    bgClass: "bg-red-100",
    textClass: "text-red-700",
    icon: AlertCircle,
    iconColor: "#b91c1c",
    label: (d) => `Telat ${Math.abs(d)} hari`,
  },
  urgent: {
    bgClass: "bg-red-100",
    textClass: "text-red-700",
    icon: Timer,
    iconColor: "#b91c1c",
    label: (d) => (d === 0 ? "Hari ini" : d === 1 ? "Besok" : `${d} hari lagi`),
  },
  warning: {
    bgClass: "bg-amber-100",
    textClass: "text-amber-700",
    icon: Clock,
    iconColor: "#b45309",
    label: (d) => `${d} hari lagi`,
  },
  normal: {
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-700",
    icon: CheckCircle2,
    iconColor: "#15803d",
    label: (d) => `${d} hari lagi`,
  },
};

export const BillUrgencyBadge = memo(function BillUrgencyBadge({
  dueDate,
}: BillUrgencyBadgeProps) {
  const days = getDaysRemaining(dueDate);
  const level = getUrgencyLevel(dueDate);
  const config = URGENCY_CONFIG[level];
  const IconComponent = config.icon;

  return (
    // alignSelf: "flex-start" agar lebar badge menyesuaikan konten, bukan stretch
    <Box className={`${config.bgClass} rounded-full px-2.5 py-1`} style={styles.badge}>
      <HStack className="items-center gap-1">
        <IconComponent size={11} color={config.iconColor} strokeWidth={2.5} />
        <Text className={`${config.textClass} text-xs font-semibold`}>
          {config.label(days)}
        </Text>
      </HStack>
    </Box>
  );
});

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
  },
});
