export const initialMedicine = {
    loading: false,
    error: null,
    success: false,
    data: [],
}

export interface MedicineState {
  id?: string;
  medicine_name: string;
  medicine_desc: string;
  onActive: boolean;
  images: ImagesState[];
  created_at: string;
  action: React.ReactNode;
}

export interface ImagesState {
  id?: string;
  url : string;
  original_Name: string;
  public_id: string;
}


export type MedicineItem = {
    id?: string;
    medicine_name: string;
    medicine_desc: string;
    images: string[];
}

