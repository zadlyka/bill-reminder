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

export const CATEGORY_ICON: Record<
  BillCategory,
  { icon: LucideIcon; bgClass: string; iconColor: string }
> = {
  electricity: {
    icon: Zap,
    bgClass: "bg-yellow-100",
    iconColor: "#ca8a04",
  },
  water: {
    icon: Droplets,
    bgClass: "bg-blue-100",
    iconColor: "#2563eb",
  },
  internet: {
    icon: Wifi,
    bgClass: "bg-indigo-100",
    iconColor: "#4f46e5",
  },
  rent: {
    icon: Home,
    bgClass: "bg-orange-100",
    iconColor: "#ea580c",
  },
  subscription: {
    icon: Smartphone,
    bgClass: "bg-purple-100",
    iconColor: "#9333ea",
  },
  other: {
    icon: FileText,
    bgClass: "bg-gray-100",
    iconColor: "#6b7280",
  },
};
