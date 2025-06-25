import axios from "axios";
import { create } from "zustand";
import { InventoryState, InventoryData } from "@/types/inventory";
import { BaseURL } from "@assets/base/index";
import { devError, devLog } from "@/utils/generalHelpers";
import { showToast } from "@/shared/Sonner/toast";
import { usePersistUser } from "@/api/user/Api_user";

interface InventoryStore {
  inv: InventoryState;
  loading: boolean;
  error: string;
  success: boolean;
  getData: (id: string) => Promise<InventoryState | void>;
  addInventory?: (data: InventoryData) => Promise<void>;
  updateInventory?: (
    id: string,
    data: InventoryData
  ) => Promise<InventoryData | void>;
  deleteInventory?: (id: string) => Promise<void>;
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
  error: "",
  success: false,

  getData: async (id: string) => {
    set({ loading: true, error: "", success: false });
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
  },

  addInventory: async (data: InventoryData) => {
    const token = usePersistUser.getState().token.user_Token;
    set({ loading: true, error: "", success: false });
    devLog(`Adding inventory with data: ${JSON.stringify(data)}`);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      };

      const response = await axios.post(`${BaseURL}inventory`, data, {
        headers,
      });
      set({ loading: false, success: true });
      showToast({
        title: "Success",
        description: "Inventory added successfully",
        type: "success",
      });
      return response.data;
    } catch (error) {
      devError(
        `Error adding inventory: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
      });
      showToast({
        title: "Error",
        description: error instanceof Error ? error.message : "Unknown error",
        type: "error",
      });
    }
  },

  updateInventory: async (id: string, data: InventoryData) => {
    const token = usePersistUser.getState().token.user_Token;
    set({ loading: true, error: "", success: false });
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      };

      const response = await axios.patch(
        `${BaseURL}inventory/patch/${id}`,
        data,
        {
          headers,
        }
      );
      set({ loading: false, success: true });
      showToast({
        title: "Success",
        description: "Inventory updated successfully",
        type: "success",
      });

      return response.data;
    } catch (error) {
      devError(
        `Error updating inventory: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
      });
      showToast({
        title: "Error",
        description: error instanceof Error ? error.message : "Unknown error",
        type: "error",
      });
    }
  },

  deleteInventory: async (id: string) => {
    const token = usePersistUser.getState().token.user_Token;
    set({ loading: true, error: "", success: false });

    try {
      await axios.delete(`${BaseURL}inventory/delete/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      set({ loading: false, success: true });
    } catch (error) {
      devError(
        `Error deleting inventory: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

      set({
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
      });

      showToast({
        title: "Error",
        description: error instanceof Error ? error.message : "Unknown error",
        type: "error",
      });
    }
  },
}));
