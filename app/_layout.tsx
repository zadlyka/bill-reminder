// @ts-ignore: Cannot find module or type declarations for side-effect import
import "../global.css";
import { AppProviders } from "@/src/lib/providers/AppProviders";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <AppProviders>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="bill" options={{ headerShown: false }} />
      </Stack>
    </AppProviders>
  );
}