import { apiClient } from "@/src/lib/api/client";
import type { Bill } from "@/src/types/bill";

export const billService = {
  getAll: (): Promise<Bill[]> =>
    apiClient<Bill[]>("/bills"),

  getById: (id: string): Promise<Bill> =>
    apiClient<Bill>(`/bills/${id}`),

  create: (
    data: Omit<Bill, "id" | "createdAt" | "updatedAt">
  ): Promise<Bill> =>
    apiClient<Bill>("/bills", { method: "POST", body: data }),

  update: (
    id: string,
    data: Partial<Omit<Bill, "id">>
  ): Promise<Bill> =>
    apiClient<Bill>(`/bills/${id}`, { method: "PATCH", body: data }),

  remove: (id: string): Promise<void> =>
    apiClient<void>(`/bills/${id}`, { method: "DELETE" }),
};