// src/features/bills/components/BillCard/BillStatusBadge.tsx
//
// 🆕 NEW FILE
// Combines two things from the previous version into one component:
//   1. BillUrgencyBadge.tsx (overdue/warning/normal badge based on dueDate)
//   2. Inline status badge in BillCard.tsx (the "Paid" badge)
//
// Now you only need to use:
// <BillStatusBadge status={bill.status} dueDate={bill.dueDate} />
//
import type { BillStatus } from "@/src/types/bill";
import {
  getDaysRemaining,
  getUrgencyLevel,
  type UrgencyLevel,
} from "@/src/utils/formatter";
import { AlertCircle, CheckCircle2, Clock, Timer } from "lucide-react-native";
import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BillStatusBadgeProps {
  status: BillStatus;
  dueDate: string;
}

type BadgeConfig = {
  bg: string;
  text: string;
  iconColor: string;
  icon: typeof AlertCircle;
  label: (days: number) => string;
};

// ─── Config Map ──────────────────────────────────────────────────────────────

const PAID_CONFIG: BadgeConfig = {
  bg: "rgba(16, 185, 129, 0.12)",
  text: "#059669",
  iconColor: "#059669",
  icon: CheckCircle2,
  label: () => "Paid",
};

const URGENCY_CONFIG: Record<UrgencyLevel, BadgeConfig> = {
  overdue: {
    bg: "rgba(239, 68, 68, 0.12)",
    text: "#dc2626",
    iconColor: "#dc2626",
    icon: AlertCircle,
    label: (d) => `Overdue ${Math.abs(d)} days`,
  },
  urgent: {
    bg: "rgba(239, 68, 68, 0.12)",
    text: "#dc2626",
    iconColor: "#dc2626",
    icon: Timer,
    label: (d) => (d === 0 ? "Today" : d === 1 ? "Tomorrow" : `${d} days left`),
  },
  warning: {
    bg: "rgba(245, 158, 11, 0.12)",
    text: "#d97706",
    iconColor: "#d97706",
    icon: Clock,
    label: (d) => `${d} days left`,
  },
  normal: {
    bg: "rgba(16, 185, 129, 0.12)",
    text: "#059669",
    iconColor: "#059669",
    icon: CheckCircle2,
    label: (d) => `${d} days left`,
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export const BillStatusBadge = memo(function BillStatusBadge({
  status,
  dueDate,
}: BillStatusBadgeProps) {
  const isPaid = status === "paid";
  const days = getDaysRemaining(dueDate);
  const urgencyLevel = getUrgencyLevel(dueDate);

  const config = isPaid ? PAID_CONFIG : URGENCY_CONFIG[urgencyLevel];
  const IconComponent = config.icon;

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <IconComponent size={11} color={config.iconColor} strokeWidth={2.5} />
      <Text style={[styles.label, { color: config.text }]}>
        {config.label(days)}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.1,
  },
});
