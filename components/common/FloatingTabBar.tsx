import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  CalendarDays,
  ChartBar,
  House,
  Settings,
  type LucideIcon,
} from "lucide-react-native";
import { memo, useCallback, useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type TabConfig = {
  icon: LucideIcon;
  label: string;
};

const TAB_CONFIG: Record<string, TabConfig> = {
  index: { icon: House, label: "Home" },
  analytics: { icon: ChartBar, label: "Analitik" },
  calendar: { icon: CalendarDays, label: "Kalender" },
  settings: { icon: Settings, label: "Setelan" },
};

const SPRING_CONFIG = { damping: 18, stiffness: 200, mass: 0.8 };

type TabItemProps = {
  routeName: string;
  isFocused: boolean;
  accessibilityLabel?: string;
  onPress: () => void;
};

const TabItem = memo(function TabItem({
  routeName,
  isFocused,
  accessibilityLabel,
  onPress,
}: TabItemProps) {
  const config = TAB_CONFIG[routeName];
  const Icon = config?.icon;
  const progress = useSharedValue(isFocused ? 1 : 0);
  const opacity = useSharedValue(isFocused ? 1 : 0);
  const iconScale = useSharedValue(1);

  useEffect(() => {
    progress.value = withSpring(isFocused ? 1 : 0, SPRING_CONFIG);
    opacity.value = withTiming(isFocused ? 1 : 0, { duration: 180 });
  }, [isFocused, progress, opacity]);

  const pillStyle = useAnimatedStyle(() => ({
    paddingHorizontal: withSpring(isFocused ? 20 : 16, SPRING_CONFIG),
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ["transparent", "#ffffff"],
    ),
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    flexDirection: "row" as const,
    gap: 6,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    maxWidth: withSpring(isFocused ? 60 : 0, SPRING_CONFIG),
    overflow: "hidden" as const,
  }));

  const handlePress = useCallback(() => {
    iconScale.value = withSpring(0.75, { damping: 8, stiffness: 300 }, () => {
      iconScale.value = withSpring(1, SPRING_CONFIG);
    });
    onPress();
  }, [onPress, iconScale]);

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel ?? config?.label}
    >
      <Animated.View style={pillStyle}>
        <Animated.View style={iconStyle}>
          {Icon != null && (
            <Icon
              size={20}
              color={isFocused ? "#000000" : "#9ca3af"}
              strokeWidth={isFocused ? 2.5 : 1.8}
            />
          )}
        </Animated.View>
        <Animated.View style={labelStyle}>
          <Text style={styles.label} numberOfLines={1}>
            {config?.label}
          </Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
});

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <Box style={styles.wrapper}>
      <HStack style={styles.pill} className="px-2 py-2 bg-black rounded-full">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabItem
              key={route.key}
              routeName={route.name}
              isFocused={isFocused}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
            />
          );
        })}
      </HStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  pill: {
    gap: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
      },
      android: { elevation: 12 },
    }),
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000000",
  },
});
