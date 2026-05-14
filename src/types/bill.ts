export type BillStatus = "paid" | "unpaid" | "overdue";

export type BillCategory =
  | "electricity"
  | "water"
  | "internet"
  | "rent"
  | "subscription"
  | "other";

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: BillStatus;
  category: BillCategory;
  notes?: string;
  isRecurring: boolean;
  recurringInterval?: "monthly" | "yearly" | "weekly";
  createdAt: string;
  updatedAt: string;
}

export interface BillSummary {
  totalUnpaid: number;
  totalPaid: number;
  totalOverdue: number;
  upcomingCount: number;
}