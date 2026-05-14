import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/src/lib/query/keys";
import { billService } from "@/src/services/billService";
import type { Bill } from "@/src/types/bill";

export function useBills() {
  return useQuery({
    queryKey: queryKeys.bills.list(),
    queryFn: billService.getAll,
  });
}

export function useBillDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.bills.detail(id),
    queryFn: () => billService.getById(id),
    enabled: id.length > 0,
  });
}

export function useCreateBill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: billService.create,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.bills.all() });
    },
  });
}

export function useUpdateBill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Bill, "id">>;
    }) => billService.update(id, data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.bills.all() });
    },
  });
}

export function useDeleteBill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: billService.remove,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.bills.all() });
    },
  });
}