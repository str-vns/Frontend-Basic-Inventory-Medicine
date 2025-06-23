import axios from "axios";
import { create } from "zustand";
import { InventoryState } from "@/types/inventory";
import { BaseURL } from "@assets/base/index";

interface InventoryStore {
  inv: InventoryState;
  loading: boolean;
  error: string;
  success: boolean;
  getData: (id: string) => Promise<InventoryState | void>
}

export const useGetInventory = create<InventoryStore>((set) => ({
  inv: {
    medicine_id: "",
    medicine_name: "",
    medicine_desc: "",
    onActive: false,
    images: [],
    inventories: [],
  },
  loading: false,
  error: '',
  success: false,

  getData: async (id: string) => {
    set({ loading: true, error: '', success: false });
    try {
      const res = await axios.get(`${BaseURL}inventory/single/${id}`);
      set({ inv: res.data, loading: false, success: true });
      return res.data;
    } catch (error) {
      console.error("Error fetching inventory:", error);
       set({
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
        inv: {
          medicine_id: "",
          medicine_name: "",
          medicine_desc: "",
          onActive: false,
          images: [],
          inventories: [],
        },
      });
    }
  }
  
}))