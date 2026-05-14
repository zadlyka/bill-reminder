import type { BillCategory, BillStatus } from "@/src/types/bill";

export const BILL_CARD_HEIGHT = 76;

export const STATUS_CONFIG: Record<
  BillStatus,
  { label: string; bgClass: string; textClass: string }
> = {
  unpaid: {
    label: "Belum Bayar",
    bgClass: "bg-amber-100",
    textClass: "text-amber-700",
  },
  paid: {
    label: "Lunas",
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-700",
  },
  overdue: {
    label: "Telat",
    bgClass: "bg-red-100",
    textClass: "text-red-700",
  },
};

export const CATEGORY_EMOJI: Record<BillCategory, string> = {
  electricity: "⚡",
  water: "💧",
  internet: "🌐",
  rent: "🏠",
  subscription: "📱",
  other: "📄",
};
