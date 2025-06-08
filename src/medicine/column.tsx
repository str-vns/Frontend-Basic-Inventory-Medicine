"use client";
import { ColumnDef } from "@tanstack/react-table";

export type Medicine = {
  id: string;
  name: string;
  desc: string;
  onActive: boolean;
  date: string;
  action: React.ReactNode;
};

export const columns: ColumnDef<Medicine>[] = [
  {
    accessorKey: "name",
    header: "Name",
      cell: ({ row }) => (
    <div className="max-w-[200px] truncate" title={row.getValue("name")}>
      {row.getValue("name")}
    </div>
  ),
  },
  {
    accessorKey: "desc",
    header: "Description",
      cell: ({ row }) => (
    <div className="max-w-[200px] truncate" title={row.getValue("desc")}>
      {row.getValue("desc")}
    </div>
  ),
  },
  {
    accessorKey: "onActive",
    header: "On Active",
      cell: ({ row }) => (
    <div className={`max-w-[200px] truncate ${row.getValue("onActive") ? "text-green-500" : "text-red-500"}`}  title={row.getValue("onActive")}>
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
