"use client";
import { ColumnDef } from "@tanstack/react-table";

export type Medicine = {
  id?: string;
  images: string;
  medicine_name: string;
  medicine_desc: string;
  onActive: boolean;
  created_at: string;
  action: React.ReactNode;
};

export const columns: ColumnDef<Medicine>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => (
      console.log(row.getValue("images")),
      (
        <div
          className="max-w-[40px] max-h-[40px] truncate"
          title={row.getValue("images")}
        >
          <img src={row.getValue("images")} alt={row.getValue("medicine_name")} />
        </div>
      )
    ),
  },
  {
    accessorKey: "medicine_name",
    header: "Name",
    cell: ({ row }) => (
      <div className=" truncate" title={row.getValue("medicine_name")}>
        {row.getValue("medicine_name")}
      </div>
    ),
  },
  {
    accessorKey: "medicine_desc",
    header: "Description",
    cell: ({ row }) => (
      <div className=" truncate" title={row.getValue("medicine_desc")}>
        {row.getValue("medicine_desc")}
      </div>
    ),
  },
  {
    accessorKey: "onActive",
    header: "On Active",
    cell: ({ row }) => (
      <div
        className={`truncate ${
          row.getValue("onActive") ? "text-green-500" : "text-red-500"
        }`}
        title={row.getValue("onActive")}
      >
        {row.getValue("onActive") ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: () => <div className="flex justify-center w-full">Date</div>,
  },
  {
    accessorKey: "action",
    header: () => <div className="flex justify-center w-full">Action</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">{row.getValue("action")}</div>
    ),
  },
];
