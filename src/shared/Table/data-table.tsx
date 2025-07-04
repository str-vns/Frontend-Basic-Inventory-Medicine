import { ColumnDef ,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"

import {
    Table,
    TableBody, 
    TableCell,
    TableHead, 
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue>
{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]

    
}

export function DataTable<TData, TValue, >(
    {
        columns,
        data,
    }: DataTableProps<TData, TValue>)
    {
        const table = useReactTable({
                data, 
                columns, 
                getCoreRowModel: getCoreRowModel()
            })

    return (
        <div className="rounded-md border mt-5 mx-20   ">
            <Table >
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) =>
                    (
                        <TableRow key = {headerGroup.id}>
                            {headerGroup.headers.map((header) =>{
                                return (
                                    <TableHead key={header.id} >
                                        {header.isPlaceholder ?
                                        null : 
                                        flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                )
                            })}
                            </TableRow >
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="hover:bg-gray-100 " 
                            >
                                {row.getVisibleCells().map((cell) =>
                                (
                                  <TableCell key={cell.id} className="py-4 px-4">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </TableCell>  
                                ))}
                                </TableRow>

                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No Results
                            </TableCell>
                        </TableRow>
                    )} 

                </TableBody>
            </Table>
        </div>
    )
}