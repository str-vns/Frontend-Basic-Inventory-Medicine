import React, { useEffect, useState, useRef } from "react";
import { getMedicineColumns } from "./column";
import { DataTable } from "@shared/Table/data-table";
import { SidebarLayout } from "@/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGetMedicine } from "@/api/Medicine/Api_Medicine";
import { ImagesState } from "@/types/medicine";
import { showToast } from "@/shared/Sonner/toast";
type MedicineTableRow = {
  id?: string;
  images: ImagesState[];
  medicine_name: string;
  medicine_desc: string;
  onActive: boolean;
  created_at: string;
  action: string;
};

const MedicinePage: React.FC = () => {
  const [datas, setData] = useState<MedicineTableRow[]>([]);
  const delMed = useGetMedicine((state) => state.delMed);
  const getData = useGetMedicine((state) => state.getData);
  const hasFetchedRef = useRef(false);

  const onRefresh = async () => {
    const data = await getData();
    setData(data);
  };

  const columns = getMedicineColumns(
  async (id: string) => {
    if (delMed) {
      await delMed(id);      
      await onRefresh();     
      showToast({
        title: "Medicine deleted successfully",
        description: "The medicine has been removed from the list.",
        position: "top-right",
        type: "success",
      });
    } else {
      showToast({
        title: "Delete failed",
        description: "Delete function is not available.",
        position: "top-right",
        type: "error",
      });
    }
  },
);

  useEffect(() => {
    if (hasFetchedRef.current) return;

    const fetchData = async () => {
      const data = await getData();
      setData(data);
      hasFetchedRef.current = true;
    };

    fetchData();
  }, [getData]);

  return (
    <div className="py-10">
      <SidebarLayout title="Medicine">
        <Button
          type="button"
          asChild
          className="mb-2 mt-5 ml-auto w-32 h-10 text-sm mr-20 hover:bg-black hover:text-white border border-black"
        >
          <Link to="/medicine/create">Add Medicine</Link>
        </Button>
        <DataTable columns={columns} data={datas} />
      </SidebarLayout>
    </div>
  );
};

export default MedicinePage;
