// src/utils/formatter.ts
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(isoDate));
}

export function getDaysRemaining(isoDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(isoDate);
  due.setHours(0, 0, 0, 0);
  return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function getDueLabel(isoDate: string): string {
  const days = getDaysRemaining(isoDate);
  if (days < 0) return `Overdue ${Math.abs(days)} days`;
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  return `${days} days left`;
}

export type UrgencyLevel = "overdue" | "urgent" | "warning" | "normal";

export function getUrgencyLevel(isoDate: string): UrgencyLevel {
  const days = getDaysRemaining(isoDate);
  if (days < 0) return "overdue";
  if (days <= 2) return "urgent";
  if (days <= 5) return "warning";
  return "normal";
}
