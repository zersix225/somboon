import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/utils/base-api";
import { RepairType } from "@/types";

export function usePostRepair() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RepairType.CreateRepair) => {
      const res = await apiClient.repairs.$post({
        json: data,
      });
      const body = await res.json();
      if (!body.success) {
        throw new Error(body.error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["repair"],
      });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}
