import axios from "axios";
import { create } from "zustand";
import { BaseURL } from "@assets/base/index";
import { MedicineState, MedicineItem } from "@/types/medicine";
import { File64base } from "@/utils/File64Base";
import { devError } from "@/utils/generalHelpers";

interface MedicineStore {
  medicines: MedicineState[];
  singleMedicine?: MedicineState;
  loading: boolean;
  error: string | null;
  success: boolean;
  getData: () => Promise<MedicineState[]>;
  addCreate: (data: MedicineItem) => Promise<MedicineState | void>;
  updateMed: (id: string, data: MedicineItem) => Promise<MedicineState | void>;
  getSingleData?: (id: string) => Promise<MedicineState | void>;
  delImg?: (imgId: string) => Promise<void>;
  delMed?: (id: string) => Promise<void>;
  
}

export const useGetMedicine = create<MedicineStore>((set) => ({
  medicines: [],
  singleMedicine: undefined,
  loading: false,
  error: "",
  success: false,

  getData: async () => {
    try {
      set({ loading: true, error: "", success: false });

      const response = await axios.get<MedicineState[]>(`${BaseURL}medicines`);

      const medicines = response.data ?? [];

      set({
        medicines,
        success: true,
      });

      return medicines;
    } catch (error) {
      devError(`Error fetching medicines: ${error}`);
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
        medicines: [],
      });

      return [];
    } finally {
      set({ loading: false });
    }
  },

  addCreate: async (data: MedicineItem) => {
    set({ loading: true, error: "", success: false });
    try {
        // const headers = {
      //   "Content-Type": "multipart/form-data",
      //   "Authorization": `Token ${localStorage.getItem("token")}`,
      // }
      
      const formData = new FormData();
      formData.append("medicine_name", data.medicine_name);
      formData.append("medicine_desc", data.medicine_desc);

      const response = await axios.post<MedicineState>(
        `${BaseURL}medicine`,
        formData,
        { 
          // headers
         }
      );

      const med_id = response.data.id;
      const multiUploadData = new FormData();
      data.images.forEach((image) => {
        if (typeof image === "string") {
          const blob = File64base(
            image,
            `image_${Date.now()}.png`,
            "image/png"
          );
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

      await axios.post(`${BaseURL}MultiUpload`, multiUploadData, { 
        // headers
      });
      return response.data;

    } catch (error) {
      devError(`Error creating medicine: ${error}`);
      set({ error: error instanceof Error ? error.message : "unknown error" });
    } finally {
      set({ loading: false, success: false });
    }
  },

  getSingleData: async (id: string) => {
    set({ loading: true, error: "", success: false });

    try {
      const response = await axios.get<MedicineState>(
        `${BaseURL}medicine/${id}`
      );

      const medicine = response.data;

      set({
        singleMedicine: medicine,
        success: true,
        loading: false,
      });

      return medicine;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";

      console.error("Error fetching medicine:", errorMsg); // or use your `devError`

      set({
        singleMedicine: undefined,
        error: errorMsg,
        loading: false,
        success: false,
      });

      return undefined;
    }
  },

  updateMed: async (id: string, data: MedicineItem) => {
    set({ loading: true, error: "", success: false });
    try {
      // const headers = {
      //   "Content-Type": "multipart/form-data",
      //   "Authorization": `Token ${localStorage.getItem("token")}`,
      // }

      const formData = new FormData();
      formData.append("medicine_name", data.medicine_name);
      formData.append("medicine_desc", data.medicine_desc);
      const response = await axios.patch<MedicineState>(
        `${BaseURL}medicine/patch/${id}`,
        formData,
        {
          // headers
        }
      );

      const multiUploadData = new FormData();
      data.images.forEach((image) => {
        if (typeof image === "string") {
          const blob = File64base(
            image,
            `image_${Date.now()}.png`,
            "image/png"
          );
          multiUploadData.append("img", blob);
        } else if (typeof File !== "undefined") {
          multiUploadData.append("img", image);
        } else {
          console.warn("Unsupported image type:", typeof image);
        }
      });

      if (id !== undefined && id !== null) {
        multiUploadData.append("item_id", String(id));
      } else {
        throw new Error("Medicine ID is undefined or null");
      }
      console.log("MultiUpload Data:", multiUploadData);
        await axios.post(`${BaseURL}MultiUpload`, multiUploadData, { 
        // headers
       });

       return response.data;
    } catch (error) {
      devError(`Error updating medicine: ${error}`);
      set({ error: error instanceof Error ? error.message : "unknown error" });
    } 
  },

  delImg: async (imgId: string) => {
    set({ loading: true, error: "", success: false });
    try {
      // const headers = {
      //   "Content-Type": "application/json",
      //   "Authorization": `Token ${localStorage.getItem("token")}`,
      // }

       await axios.delete(`${BaseURL}delMultiImage/${imgId}?path=medicine`, {
        // headers,
      });

      set({ loading: false, success: true });
    } catch (error) {
      devError(`Error deleting image: ${error}`);
      set({ error: error instanceof Error ? error.message : "unknown error" });
    } finally {
      set({ loading: false, success: false });
    }
  },

  delMed: async (id: string) => {
    set({loading: true, error: "", success: false});
    try {
      // const headers = {
      //   "Content-Type": "application/json",
      //   "Authorization": `Token ${localStorage.getItem("token")}`,
      // }
      await axios.delete(`${BaseURL}medicine/delete/${id}`,{ 
        // headers
       })

      set({loading: false, success: true});
  
    } catch (error) {
      devError(`Error deleting medicine: ${error}`);
      set({ error: error instanceof Error ? error.message : "unknown error", success: false, loading: false  });
    }
  }
}));
