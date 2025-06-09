import axios from "axios";
import { create } from "zustand";
import { initalInventory } from "@/types/inventory";
import { BaseURL } from "@assets/base/index";

export const useGetInventory = create((set) => ({
  ...initalInventory,

  execute: async () => {
    set({ ...initalInventory, loading: true });
    try {
      const res = await axios.get(`${BaseURL}medicines`);
      console.log("Inventory data fetched:", res.data);
      set({ ...initalInventory, loading: false, data: res });
    } catch (error) {
      console.error("Error fetching inventory:", error);
      set({ ...initalInventory, loading: false, error: error });
    }
  },
  
}));
