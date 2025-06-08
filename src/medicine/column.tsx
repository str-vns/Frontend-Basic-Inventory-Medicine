'use client'
import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
    id: string;
    name: string;
    date: string;
    amount: number;
    status: "pending" | "completed" | "failed";
    actions?: React.ReactNode;
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "status",
        header: "Status",
       
    },
 
]