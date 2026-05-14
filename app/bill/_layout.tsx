import { Stack } from "expo-router";

export default function BillLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#ffffff" },
        headerTintColor: "#000000",
        headerTitleStyle: { fontWeight: "600" },
      }}
    >
      <Stack.Screen name="[id]" options={{ title: "Detail Tagihan" }} />
      <Stack.Screen name="create" options={{ title: "Tambah Tagihan" }} />
    </Stack>
  );
}