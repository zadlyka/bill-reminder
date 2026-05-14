import { ScreenContainer } from "@/components/common/ScreenContainer";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";

export default function BillDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ScreenContainer>
      <Heading size="lg" className="mt-4">
        Detail Tagihan
      </Heading>
      <Text className="mt-2 text-typography-500">ID: {id}</Text>
    </ScreenContainer>
  );
}