import axios from "axios";
import { create } from "zustand";
import { initialMedicine } from "@/types/medicine";
import { BaseURL } from "@assets/base/index";

export const useGetMedicine = create((set) => ({
    ...initialMedicine,

    execute: async () => {
        set({ ...initialMedicine, loading: true});
        try{
            const res = await axios.get(`${BaseURL}medicines`);
            console.log("Medicine data fetched:", res.data);
            set({ ...initialMedicine, loading: false, data: res.data });
        } catch (error) {
            console.error("Error fetching medicine data:", error);
            set({ ...initialMedicine, loading: false, error: error });
        }
    },
    addMed: async (newItem) => {
        set({ ...initialMedicine, loading: true });
        try {
            const res = await axios.post(`${BaseURL}medicines`, newItem);
            set((state) => ({
                ...state,
                loading: false,
                data: [...state.data, res.data],
                success: true
            }));
        } catch (error) {
            set({ ...initialMedicine, loading: false, error: error });
        }
    }
}))