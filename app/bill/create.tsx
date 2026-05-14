import { ScreenContainer } from "@/components/common/ScreenContainer";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function BillCreateScreen() {
  return (
    <ScreenContainer>
      <Heading size="lg" className="mt-4">
        Tambah Tagihan
      </Heading>
      <Text className="mt-2 text-typography-500">
        Form akan dibuat di langkah berikutnya
      </Text>
    </ScreenContainer>
  );
}