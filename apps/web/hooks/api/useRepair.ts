import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
        queryKey: ["repairs"],
      });
      queryClient.invalidateQueries({ queryKey: ["repairsPagination"] });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}

export function useGetRepair(limit: string) {
  return useQuery({
    queryKey: ["repairs"],
    queryFn: async () => {
      const res = await apiClient.repairs[":limit"].$get({
        param: {
          limit: limit,
        },
      });
      const body = await res.json();

      if (!body.success) {
        throw new Error(body.error.message);
      }
      return body.data;
    },
  });
}

export function useGetRepairPagination(page: string, pageSize: string) {
  return useQuery({
    queryKey: ["repairsPagination", page, pageSize],
    queryFn: async () => {
      const res = await apiClient.repairs["paginates"].$get({
        query: {
          page: page,
          pageSize: pageSize,
        },
      });
      const body = await res.json();

      if (!body.success) {
        throw new Error(body.error.message);
      }
      return body.data;
    },
  });
}

export function useGetRecentActivityRepair() {
  return useQuery({
    queryKey: ["recentActivityRepair"],
    queryFn: async () => {
      const res = await apiClient.repairs["activities"].$get();
      const body = await res.json();

      if (!body.success) {
        throw new Error(body.error.message);
      }
      return body.data;
    },
  });
}
