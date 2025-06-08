import axios from "axios";
import { create } from "zustand";
import { initalInventory } from "@/types/inventory";

export const useGetInventory = create((set, get) => ({
    ...initalInventory,

    execute: async () => {
        set({ ...initalInventory, loading: true});
        try {
            const res = await axios.get("")
        }
    }
}))