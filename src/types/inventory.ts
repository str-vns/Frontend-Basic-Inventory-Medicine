import { ImagesState } from "./medicine";
export const initalInventory = {
    loading: false,
    error: null, 
    success: false,
    data: [],
}

export interface InventoryData {
   id?: string;
   medicine_id: string;
   medicine_measurement: string;
   medicine_type: string;
   quantity: string;
   medicine_price: string;
   manufacturer: string;
   expiration_date: string;
   onActive?: boolean;
}

export type InventoryState = {
    medicine_id?: string;
    medicine_name: string;
    medicine_desc: string;
    onActive?: boolean;
    images?: ImagesState[];
    inventories: InventoryData[];
}

