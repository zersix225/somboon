import { usePostRepair } from "@/hooks/api/useRepair";
import { useUpload } from "@/hooks/api/useUpload";
import { toast } from "sonner";

export const useRepairSubmit = () => {
  const postRepair = usePostRepair();
  const postUpload = useUpload();

  const submit = async (data: any, files: File[]) => {
    await postRepair.mutateAsync(data, {
      onSuccess: () => {
        toast.success("Repair created");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    await postUpload.mutateAsync(files);
  };

  return { submit };
};
