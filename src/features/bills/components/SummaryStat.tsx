// src/features/bills/components/SummaryStat.tsx
import { memo } from "react";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { AmountText } from "./AmountText";

interface SummaryStatProps {
  label: string;
  value: number;
  hidden: boolean;
  valueClassName?: string;
}

export const SummaryStat = memo(function SummaryStat({
  label,
  value,
  hidden,
  valueClassName = "text-white",
}: SummaryStatProps) {
  return (
    <VStack className="flex-1 p-3 bg-white/10 rounded-2xl gap-0.5">
      <Text className="text-white/50 text-xs">{label}</Text>
      <AmountText
        value={value}
        hidden={hidden}
        size="sm"
        className={valueClassName}
      />
    </VStack>
  );
});
