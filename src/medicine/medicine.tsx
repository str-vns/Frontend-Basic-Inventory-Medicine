import React, { useEffect, useState } from "react";
import { columns } from "./column";
import { DataTable } from "@shared/Table/data-table";
import { SidebarLayout } from "@/layout";
import { Button } from "@/components/ui/button";
import { Syringe, Trash } from "lucide-react";
import { Link } from "react-router";
import { useGetMedicine } from "@/api/Medicine/Api_Medicine";

type MedicineTableRow = {
  id: string;
  images: string;
  medicine_name: string;
  medicine_desc: string;
  onActive: boolean;
  created_at: string;
  action: React.ReactNode;
};

const MedicinePage: React.FC = () => {
  const [datas, setData] = useState<MedicineTableRow[]>([]);
  const { getData } = useGetMedicine(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getData(); 

        if (!Array.isArray(items)) return;

        const mapped: MedicineTableRow[] = items.map((item) => ({
          id: item.id ?? "",
          medicine_name: item.medicine_name,
          medicine_desc: item.medicine_desc,
          onActive: item.onActive,
          images: item.images?.[0]?.url || "",
          created_at: new Date(item.created_at).toLocaleDateString(),
          action: (
            <div className="flex justify-center gap-2">
              <Button
                className="text-black hover:text-blue-500"
                onClick={() => console.log("Inject:", item.id)}
              >
                <Syringe />
              </Button>
              <Button
                className="text-black hover:text-red-500"
                onClick={() => console.log("Delete:", item.id)}
              >
                <Trash />
              </Button>
            </div>
          ),
        }));

        setData(mapped);
      } catch (err) {
        console.error("Error fetching medicines:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-10 ">
      <SidebarLayout title="Medicine">
        <Button className="mb-2 mt-5 ml-auto w-32 h-10 text-sm mr-20 hover:bg-black hover:text-white border-1 border-black">
          <Link to="/medicine/create">Add Medicine</Link>
        </Button>
        <DataTable columns={columns} data={datas} />
      </SidebarLayout>
    </div>
  );
};

export default MedicinePage;
