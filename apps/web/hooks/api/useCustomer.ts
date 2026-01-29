import { create } from "zustand";
import apiClient from "@/utils/base-api";
import { CustomerType } from "@/types";

type CustomerState = {
  success: boolean;
  customers: CustomerType.CustomerArray;
  loading: boolean;
  error: string | null;
  post: (data: CustomerType.CreateCustomer) => Promise<void>;
  getAll: () => Promise<void>;
};

const useCustomer = create<CustomerState>((set) => ({
  success: false,
  customers: [],
  loading: false,
  error: null,
  post: async (data) => {
    set({ loading: true });
    try {
      const res = await apiClient.customers.$post({
        json: data,
      });
      const body = await res.json();
      if (!body.success) {
        throw new Error(body.message);
      }
      set({ loading: false, success: true });
    } catch (err) {
      set({ loading: false, error: (err as Error).message });
    }
  },
  getAll: async () => {
    set({ loading: true });
    try {
      const res = await apiClient.customers.$get();
      const body = await res.json();
      if (!body.success) {
        throw new Error(body.message);
      }
      set({ customers: [...body.data], loading: false, success: true });
    } catch (err) {
      set({ loading: false, error: (err as Error).message });
    }
  },
}));
export default useCustomer;
