import { create } from "zustand";

interface Inventory {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
}

export const useInventoryStore = create<Inventory> () ((set) =>({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    error: null,
    setError: (error: string | null) => set({ error }),
}))