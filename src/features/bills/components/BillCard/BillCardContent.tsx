// src/features/bills/components/BillCard/BillCardContent.tsx

import { CATEGORY_ICON } from "@/src/constants/bill";
import type { Bill } from "@/src/types/bill";
import { formatCurrency } from "@/src/utils/formatter";
import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BillStatusBadge } from "./BillStatusBadge";

interface BillCardContentProps {
  bill: Bill;
}

export const BillCardContent = memo(function BillCardContent({
  bill,
}: BillCardContentProps) {
  const category = CATEGORY_ICON[bill.category];
  const IconComponent = category.icon;
  const isPaid = bill.status === "paid";

  return (
    <View style={[styles.card, isPaid && styles.paidCard]}>
      {/* ── Icon ── */}
      <View
        style={[styles.iconContainer, { backgroundColor: category.iconBg }]}
      >
        <IconComponent size={20} color={category.iconColor} strokeWidth={1.8} />
      </View>

      {/* ── Info ── */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {bill.name}
        </Text>
        <BillStatusBadge status={bill.status} dueDate={bill.dueDate} />
      </View>

      {/* ── Amount (top aligned) ── */}
      <View style={styles.right}>
        <Text style={styles.amount}>{formatCurrency(bill.amount)}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,

    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 3,

    borderWidth: 1,
    borderColor: "rgba(230, 232, 255, 0.8)",
  },

  paidCard: {
    opacity: 0.55,
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  info: {
    flex: 1,
    gap: 5,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    letterSpacing: 0.1,
  },

  right: {
    alignSelf: "flex-start", // ⬅️ bikin amount di atas
    alignItems: "flex-end",
  },

  amount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
});
