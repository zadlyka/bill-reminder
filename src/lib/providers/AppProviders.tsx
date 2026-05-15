// src/lib/providers/AppProviders.tsx
//
// ✏️ FILE DIUPDATE
//
// Perubahan dari versi lama:
//   - Tambah GestureHandlerRootView sebagai wrapper paling luar
//   - Wajib ada untuk react-native-gesture-handler v2 agar gesture bekerja
//   - style={{ flex: 1 }} diperlukan agar tidak collapse
//
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { queryClient } from "@/src/lib/query/client";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // 🆕

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    // GestureHandlerRootView HARUS menjadi wrapper terluar
    <GestureHandlerRootView style={styles.flex}>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider mode="light">
          {children}
        </GluestackUIProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
