import React, { useEffect, useState } from "react";
import { Payment, columns } from "./column";
import { DataTable } from "./data-table";
import { SidebarLayout } from "@/layout";
import { Button } from "@/components/ui/button";
import { Syringe } from "lucide-react";
import { Link } from "react-router";
import axios from "axios";
async function getData(): Promise<Payment[]> {
  return [
    {
      id: "1",
      name: "Paracetamol",
      date: "2023-10-01",
      amount: 10,
      status: "completed",
    },
    {
      id: "2",
      name: "Ibuprofen",
      date: "2023-10-02",
      amount: 20,
      status: "pending",
    },
    {
      id: "3",
      name: "Aspirin",
      date: "2023-10-03",
      amount: 30,
      status: "failed",
    },
  ];
}

export default function medicine() {
  const [data, setData] = useState<Payment[]>([]);
  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
    test().then((response) => {
      setData(response);
    });
  }, []);

  const test = async () => {
    const response = await axios
      .get("http://localhost:8000/api/v1/inventories")
      .then((res) => {
        const data = res.data;
        return data
      }).catch((err) => {
        console.error("Error fetching data:", err)
      });

      console.log(response) 
      return response      
  };


  return (
    <div className="container py-10">
      <SidebarLayout title="Medicine">
        <Button className="mb-2 mt-5 ml-auto w-32 h-10 text-sm mr-20 hover:bg-black hover:text-white">
          <Link to="/medicine/create">Add Medicine</Link>
        </Button>
        <DataTable columns={columns} data={data} />
        {/* <h1 className="text-4xl font-bold mb-5 text-center">Medicine List</h1> */}
      </SidebarLayout>
    </div>
  );
}
