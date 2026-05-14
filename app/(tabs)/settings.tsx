import { ScreenContainer } from "@/components/common/ScreenContainer";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function SettingsScreen() {
  return (
    <ScreenContainer>
      <VStack space="sm" className="mt-4">
        <Heading size="xl">Pengaturan</Heading>
        <Text className="text-typography-500">
          Kelola preferensi aplikasi Anda
        </Text>
      </VStack>
    </ScreenContainer>
  );
}