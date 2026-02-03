import apiClient from "@/utils/base-api";
import { CustomerType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetCustomer() {
  return useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      const res = await apiClient.customers.$get();
      const body = await res.json();

      if (!body.success) {
        throw new Error(body.error.message);
      }
      return body.data;
    },
  });
}

export function usePostCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CustomerType.CreateCustomer) => {
      const res = await apiClient.customers.$post({
        json: data,
      });
      const body = await res.json();
      if (!body.success) {
        throw new Error(body.error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customer"],
      });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}
