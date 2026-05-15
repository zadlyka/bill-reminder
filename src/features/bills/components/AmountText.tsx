// src/features/bills/components/AmountText.tsx
import { memo } from "react";
import { Text } from "@/components/ui/text";
import { formatCurrency } from "@/src/utils/formatter";

interface AmountTextProps {
  value: number;
  hidden: boolean;
  size?: "lg" | "md" | "sm";
  className?: string;
}

const SIZE_CLASS: Record<NonNullable<AmountTextProps["size"]>, string> = {
  lg: "text-3xl font-bold tracking-tight",
  md: "text-lg font-semibold",
  sm: "text-sm font-medium",
};

export const AmountText = memo(function AmountText({
  value,
  hidden,
  size = "md",
  className = "",
}: AmountTextProps) {
  return (
    <Text className={`${SIZE_CLASS[size]} ${className}`}>
      {hidden ? "••••••" : formatCurrency(value)}
    </Text>
  );
});
