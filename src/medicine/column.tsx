"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Syringe, Trash, EyeIcon } from "lucide-react";
import { ImagesState } from "@/types/medicine";
import { Link } from "react-router-dom";

export type Medicine = {
  id?: string;
  images: ImagesState[];
  medicine_name: string;
  medicine_desc: string;
  onActive: boolean;
  created_at: string;
  action: string;
};

export const getMedicineColumns = (
  delMed: (id: string) => void,
  isInventory?: boolean
): ColumnDef<Medicine>[] => [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const images = row.getValue("images");
      const firstImageUrl =
        Array.isArray(images) && images.length > 0 ? images[0]?.url : "";
      const altName =
        Array.isArray(images) && images.length > 0
          ? images[0]?.original_name
          : "No Image";
      return (
        <div
          className="max-w-[40px] max-h-[40px] truncate"
          title={firstImageUrl}
        >
          <img src={firstImageUrl} alt={altName} />
        </div>
      );
    },
  },
  {
    accessorKey: "medicine_name",
    header: "Name",
    cell: ({ row }) => (
      <div className="truncate" title={row.getValue("medicine_name")}>
        {row.getValue("medicine_name")}
      </div>
    ),
  },
  {
    accessorKey: "medicine_desc",
    header: "Description",
    cell: ({ row }) => (
      <div
        className="max-w-[200px] truncate overflow-hidden text-ellipsis"
        title={row.getValue("medicine_desc")}
      >
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
    header: () => <div className="w-full text-center font-semibold">Date</div>,
    cell: ({ row }) => {
      const value = row.getValue("created_at");
      const date = new Date(value as string);
      const formatted = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "action",
    header: () => <div className="flex justify-center w-full">Action</div>,
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex justify-center gap-2">
          {isInventory ? (
            <div>
              <Button className="text-black hover:text-yellow-500 cursor-pointer">
                <Link to={`/inventory/view/${id}`}>
                  <p className="flex items-center gap-1 ">
                    <EyeIcon /> View
                  </p>
                </Link>
              </Button>
            </div>
          ) : (
            <div>
              <Button className="text-black hover:text-blue-500 cursor-pointer">
                <Link to={`/medicine/update/${id}`}>
                  <Syringe />
                </Link>
              </Button>
              <Button
                className="text-black hover:text-red-500 cursor-pointer"
                onClick={async () => delMed(id as string)}
              >
                <Trash />
              </Button>
            </div>
          )}
        </div>
      );
    },
  },
];
