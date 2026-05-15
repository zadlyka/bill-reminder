// app/(tabs)/index.tsx
//
// ✏️ FILE DIUPDATE
//
// Perubahan dari versi lama:
//   1. Gunakan useState lokal untuk mengelola daftar bills (ganti MOCK_BILLS langsung)
//   2. Tambah handler handlePaid dan handleDelete
//   3. Teruskan handler ke BillList via props onPaid dan onDelete
//
// Catatan: Saat ini menggunakan state lokal + mock data.
// Ketika sudah pakai React Query (useBills), ganti useState bills
// dengan data dari hook dan panggil mutation di handler.
//
import { ScreenContainer } from "@/components/common/ScreenContainer";
import { BillList } from "@/src/features/bills/components/BillList";
import { HomeHeader } from "@/src/features/bills/components/HomeHeader";
import { SummaryCard } from "@/src/features/bills/components/SummaryCard";
import { MOCK_BILLS, MOCK_SUMMARY } from "@/src/lib/mock/bills";
import type { Bill } from "@/src/types/bill";
import { useCallback, useState } from "react";

export default function HomeScreen() {
  // State lokal untuk demo swipe interaction
  // Ketika pakai React Query: ganti ini dengan useBills() + useMutation
  const [bills, setBills] = useState<Bill[]>(MOCK_BILLS.slice(0, 3));

  const handlePaid = useCallback((id: string) => {
    setBills((prev) =>
      prev.map((bill) =>
        bill.id === id ? { ...bill, status: "paid" as const } : bill
      )
    );
  }, []);

  const handleDelete = useCallback((id: string) => {
    setBills((prev) => prev.filter((bill) => bill.id !== id));
  }, []);

  return (
    <ScreenContainer>
      <HomeHeader name="Victor" />
      <SummaryCard summary={MOCK_SUMMARY} />
      <BillList
        bills={bills}
        isLoading={false}
        onPaid={handlePaid}
        onDelete={handleDelete}
      />
    </ScreenContainer>
  );
}
