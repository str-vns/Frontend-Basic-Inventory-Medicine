import React, { use, useEffect, useState } from "react";
import { Medicine, columns } from "./column";
import { DataTable } from "@shared/Table/data-table";
import { SidebarLayout } from "@/layout";
import { Button } from "@/components/ui/button";
import { Syringe, Trash } from "lucide-react";
import { Link } from "react-router";
import { useGetInventory } from "@api/Inventory/Api_Inventory";

const MedicinePage: React.FC = () => {
  const [data, setData] = useState<Medicine[]>([]);
  const getData = useGetInventory();

  useEffect(() => {
    getData.execute();
  }, []);

  const test = () => {
    console.log("test");
  };
  useEffect(() => {
    const items = getData.data?.data;
    if (!Array.isArray(items)) return;

    const mapped = items.map((item: any) => ({
      id: item.pk,
      name: item.fields.medicine_name,
      desc: item.fields.medicine_desc,
      onActive: item.fields.onActive,
      date: new Date(item.fields.created_at).toLocaleDateString(),
      action: (
        // <Link to={`/medicine/${item.pk}`}>
        <div className="flex justify-center gap-2 ">
       <Button className="text-black hover:text-blue-500 " onClick={() => test()}>
          <Syringe />
        </Button>
         <Button className="text-black hover:text-red-500 " onClick={() => test()}>
          <Trash  />
        </Button>
        </div>
      ),
      // </Link>
    }));

    setData(mapped);
  }, [getData.data]);

  return (
    <div className="py-10 ">
      <SidebarLayout title="Medicine">
        <Button className="mb-2 mt-5 ml-auto w-32 h-10 text-sm mr-20 hover:bg-black hover:text-white border-1 border-black">
          <Link to="/medicine/create">Add Medicine</Link>
        </Button>
        <DataTable columns={columns} data={data} />

      </SidebarLayout>
    </div>
  );
};

export default MedicinePage;
