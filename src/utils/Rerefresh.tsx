import { useGetInventory } from "@/api/Inventory/Api_Inventory"; 
import { devLog, devError } from "@/utils/generalHelpers";

export const useRefreshSingleInv = (id: string) => {
  const getData = useGetInventory((state) => state.getData);

  const onRefresh = async () => {
    if (id) {
      try {
        const singleData = await getData(id);
        if (!singleData) {
          devError("No data found for the given ID");
          return;
        }
        devLog(`Fetched single data: ${JSON.stringify(singleData)}`);
        return singleData;
      } catch (error) {
        devError(`Fetch error: ${(error as Error)?.message || "Unknown error"}`);
      }
    }
  };

  return onRefresh;
}