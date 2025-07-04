import { SidebarLayout } from "@/layout";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { InventoryState } from "@/types/inventory";
import CarouselThings from "@/shared/Carousel";
import { useRefreshSingleInv } from "@/utils/Rerefresh";
const InventoryView = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<InventoryState>();
  const refreshSingleInv = useRefreshSingleInv(id || "");
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!hasFetchedRef.current && id) {
      const fetchData = async () => {
        try {
          if (refreshSingleInv) {
            const singleData = await refreshSingleInv();
            console.log("Fetched single data:", singleData);
            if (singleData) {
              setData(singleData);
              hasFetchedRef.current = true;
            }
          } else {
            console.error("getData is undefined");
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
      fetchData();
    }
  }, [id, refreshSingleInv]);

  const handleRefresh = async () => {
    if (refreshSingleInv) {
      const singleData = await refreshSingleInv();
      if (singleData) {
        setData(singleData);
      } else {
        console.error("No data found for the given ID");
      }
    }
  };


  return (
    <div className="py-10 ">
      <SidebarLayout title="View Inventory" main="Inventory">
        <div className="border-2 mt-10 mx-32 sm:mx-auto  rounded-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start p-5 gap-12 ">
            <div className="w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0">
              {data && (
                <img
                  src={data.images?.[0]?.url}
                  alt={data.medicine_name}
                  className="object-cover w-full h-full rounded"
                />
              )}
            </div>

            <div className="flex flex-col  text-center md:text-left">
              <h1 className="text-2xl font-bold mt-2">
                {data ? data.medicine_name : "Loading..."}
              </h1>
              <p className="text-gray-600 mt-2 sm:overflow-hidden sm:text-ellipsis sm:max-w-md md:max-w-lg">
                {data ? data.medicine_desc : "Loading description..."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex align-center justify-center mt-5">
          <CarouselThings
            invData={data?.inventories}
            currentPageTitle={"📦 Inventory"}
            med_id={data?.medicine_id}
            onRefresh={handleRefresh}
          />
        </div>
      </SidebarLayout>
    </div>
  );
};

export default InventoryView;
