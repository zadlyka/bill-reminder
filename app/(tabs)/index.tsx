import { ScreenContainer } from "@/components/common/ScreenContainer";
import { BillList } from "@/src/features/bills/components/BillList";
import { HomeHeader } from "@/src/features/bills/components/HomeHeader";
import { SummaryCard } from "@/src/features/bills/components/SummaryCard";

import { MOCK_BILLS, MOCK_SUMMARY } from "@/src/lib/mock/bills";

export default function HomeScreen() {
  return (
    <ScreenContainer>
      <HomeHeader name="Victor" />
      <SummaryCard summary={MOCK_SUMMARY} />
      <BillList bills={MOCK_BILLS.slice(0, 3)} isLoading={false} />
    </ScreenContainer>
  );
}
