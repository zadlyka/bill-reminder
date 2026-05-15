// src/constants/bill.ts
//
// ✏️ FILE UPDATED
//
// Changes from previous version:
//   - Added `iconBg` field (hex color string) to each CATEGORY_ICON entry
//   - `bgClass` (Tailwind class) is kept for backward compatibility
//     if other components are still using it
//   - BillCardContent.tsx uses `iconBg` because StyleSheet cannot
//     accept Tailwind class strings as backgroundColor
//
import type { BillCategory, BillStatus } from "@/src/types/bill";
import type { LucideIcon } from "lucide-react-native";
import {
  Droplets,
  FileText,
  Home,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react-native";

export const BILL_CARD_HEIGHT = 88;

export const STATUS_CONFIG: Record<
  BillStatus,
  { label: string; bgClass: string; textClass: string }
> = {
  unpaid: {
    label: "Unpaid",
    bgClass: "bg-amber-100",
    textClass: "text-amber-700",
  },
  paid: {
    label: "Paid",
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-700",
  },
  overdue: {
    label: "Overdue",
    bgClass: "bg-red-100",
    textClass: "text-red-700",
  },
};

export const CATEGORY_ICON: Record<
  BillCategory,
  {
    icon: LucideIcon;
    bgClass: string; // Tailwind class — for components still using className
    iconBg: string; // 🆕 Hex color — for StyleSheet usage in BillCardContent
    iconColor: string;
  }
> = {
  electricity: {
    icon: Zap,
    bgClass: "bg-yellow-100",
    iconBg: "#fef9c3", // yellow-100
    iconColor: "#ca8a04",
  },
  water: {
    icon: Droplets,
    bgClass: "bg-blue-100",
    iconBg: "#dbeafe", // blue-100
    iconColor: "#2563eb",
  },
  internet: {
    icon: Wifi,
    bgClass: "bg-indigo-100",
    iconBg: "#e0e7ff", // indigo-100
    iconColor: "#4f46e5",
  },
  rent: {
    icon: Home,
    bgClass: "bg-orange-100",
    iconBg: "#ffedd5", // orange-100
    iconColor: "#ea580c",
  },
  subscription: {
    icon: Smartphone,
    bgClass: "bg-purple-100",
    iconBg: "#f3e8ff", // purple-100
    iconColor: "#9333ea",
  },
  other: {
    icon: FileText,
    bgClass: "bg-gray-100",
    iconBg: "#f3f4f6", // gray-100
    iconColor: "#6b7280",
  },
};
