'use client'

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Trash2Icon } from 'lucide-react'
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/components'

import { DataTablePagination } from '@/components/shared'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			rowSelection,
		},
	})

	console.log(rowSelection)
	return (
		<div className='rounded-md border'>
			{Object.keys(rowSelection).length > 0 && (
				<div className='flex justify-end'>
					<Button variant='destructive' size='lg' className='m-4 rounded-md bg-red-500'>
						<Trash2Icon className='size-4' />
						Delete payment(s)
					</Button>
				</div>
			)}
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className='h-24 text-center'>
								No results
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<DataTablePagination table={table} />
		</div>
	)
}
