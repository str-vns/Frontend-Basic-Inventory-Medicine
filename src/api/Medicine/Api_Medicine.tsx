import axios from "axios";
import { create } from "zustand";
import { BaseURL } from "@assets/base/index";
import { MedicineState, MedicineItem } from "@/types/medicine";
import { File64base } from "@/utils/File64Base";


interface MedicineStore {
  medicines: MedicineState[];
  loading: boolean;
  error: string | null;
  success: boolean;
  getData: () => Promise<MedicineState[]>;
  addCreate: (data: MedicineItem) => Promise<MedicineState | void>;
}

export const useGetMedicine = create<MedicineStore>((set) => ({
  medicines: [],
  loading: false,
  error: "",
  success: false,

  getData: async () => {
    set({ loading: true, error: "", success: false });
    try {
      // const headers = {
      //   "Content-Type": "application/json",
      //   "Authorization": `Bearer ${localStorage.getItem("token")}`,
      // }

      const response = await axios.get<MedicineState[]>(`${BaseURL}medicines`);
      console.log("Medicines fetched successfully:", response);
      set({ success: true, medicines: response.data });
      console.log("Fetched medicines:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching medicines:", error);
      set({ error: error instanceof Error ? error.message : "unknown error" });
      return [];
    } finally {
      set({ loading: false });
    }
  },
  addCreate: async (data: MedicineItem) => {

    set({ loading: true, error: "", success: false });
    try {
 
      const headers = {
        "Content-Type": "Content-Type: multipart/form-data",
        "Authorization": `Token 9f4e7f336f912e234a78c164d1b8ade7120d32f2`,
      }
      const formData = new FormData();
      formData.append("medicine_name", data.medicine_name);
      formData.append("medicine_desc", data.medicine_desc);

      const response = await axios.post<MedicineState>(`${BaseURL}medicine`, formData, { headers });
      console.log("Medicine created successfully:", response);
      set((state) => ({
        medicines: [...state.medicines, response.data],
        success: true,
      }));
      const med_id = response.data.id;
      const multiUploadData = new FormData();
      data.images.forEach((image) => {
        if (typeof image === "string") {
          // If the image is a base64 string, convert it to a Blob
          const blob = File64base(image, `image_${Date.now()}.png`, 'image/png');
          multiUploadData.append("img", blob);
        } else if (typeof File !== "undefined") {
          multiUploadData.append("img", image);
        } else {
          console.warn("Unsupported image type:", typeof image);
        }
      });

      if (med_id !== undefined && med_id !== null) {
        multiUploadData.append("item_id", String(med_id));
      } else {
        throw new Error("Medicine ID is undefined or null");
      }

      await axios.post(`${BaseURL}MultiUpload`, multiUploadData, { headers });
    } catch (error) {
      console.log("Error creating medicine:", error);
      set({ error: error instanceof Error ? error.message : "unknown error" });
    } finally {
      set({ loading: false, success: false });
    }
  },

}));
