import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/utils/base-api";

export function useUpload() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File[]) => {
      if (!file) return;
      const res = await apiClient.uploads.$post({
        form: {
          files: file,
        },
      });

      const body = await res.json();
      console.log(body);
      if (!body.success) {
        throw new Error(body.error.message);
      }
      return body.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["upload"],
      });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}
