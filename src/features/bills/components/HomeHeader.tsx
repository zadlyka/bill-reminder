import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Bell } from "lucide-react-native";
import { memo } from "react";
import { StyleSheet } from "react-native";

interface HomeHeaderProps {
  name: string;
  onNotificationPress?: () => void;
}

export const HomeHeader = memo(function HomeHeader({
  name,
  onNotificationPress,
}: HomeHeaderProps) {
  return (
    <HStack
      style={styles.container}
      className="items-center justify-between my-4"
    >
      <HStack space="sm" className="items-center">
        <Avatar size="md">
          <AvatarFallbackText>{name}</AvatarFallbackText>
        </Avatar>
        <VStack>
          <Text className="text-xs text-typography-400">Selamat datang,</Text>
          <Text className="text-base font-semibold text-typography-900">
            {name}
          </Text>
        </VStack>
      </HStack>

      <Pressable
        onPress={onNotificationPress}
        style={styles.notifBtn}
        className="rounded-full bg-background-100"
      >
        <Bell size={20} color="#374151" strokeWidth={1.8} />
      </Pressable>
    </HStack>
  );
});

const styles = StyleSheet.create({
  container: { paddingVertical: 16 },
  notifBtn: { padding: 10 },
});
