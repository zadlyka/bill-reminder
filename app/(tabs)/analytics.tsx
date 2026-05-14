import { ScreenContainer } from "@/components/common/ScreenContainer";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function AnalyticsScreen() {
  return (
    <ScreenContainer>
      <VStack space="sm" className="mt-4">
        <Heading size="xl">Analitik</Heading>
        <Text className="text-typography-500">
          Ringkasan pengeluaran tagihan Anda
        </Text>
      </VStack>
    </ScreenContainer>
  );
}