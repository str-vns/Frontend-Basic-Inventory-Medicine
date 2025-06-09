"use client";
import { ColumnDef } from "@tanstack/react-table";

export type Medicine = {
  id: string;
  image: string;
  name: string;
  desc: string;
  onActive: boolean;
  date: string;
  action: React.ReactNode;
};

export const columns: ColumnDef<Medicine>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
     console.log(row.getValue("image")),
      <div className="max-w-[40px] max-h-[40px] truncate" title={row.getValue("image")}>
        <img src={row.getValue("image")} alt={row.getValue("name")} />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
      cell: ({ row }) => (
    <div className=" truncate" title={row.getValue("name")}>
      {row.getValue("name")}
    </div>
  ),
  },
  {
    accessorKey: "desc",
    header: "Description",
      cell: ({ row }) => (
    <div className=" truncate" title={row.getValue("desc")}>
      {row.getValue("desc")}
    </div>
  ),
  },
  {
    accessorKey: "onActive",
    header: "On Active",
      cell: ({ row }) => (
    <div className={`truncate ${row.getValue("onActive") ? "text-green-500" : "text-red-500"}`}  title={row.getValue("onActive")}>
      {row.getValue("onActive") ? "Active" : "Inactive"}
    </div>
  ),
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "action",
    header: () => <div className="flex justify-center w-full">Action</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">{row.getValue("action")}</div>
    ),
  },
];
