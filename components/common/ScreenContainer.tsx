import { memo } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import type { ReactNode } from "react";

interface ScreenContainerProps {
  children: ReactNode;
  className?: string;
}

export const ScreenContainer = memo(function ScreenContainer({
  children,
  className = "",
}: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <Box style={styles.inner} className={`px-4 ${className}`}>
        {children}
      </Box>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  inner: { flex: 1 },
});