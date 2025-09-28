'use client'

import axios from 'axios'
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
import { toast } from 'sonner'
import { useAuth } from '@clerk/nextjs'
import { Trash2Icon } from 'lucide-react'
import { User } from '@clerk/nextjs/server'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { DataTablePagination } from '@/components/shared/table-pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/components'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const router = useRouter()

	const { getToken } = useAuth()

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

	const mutation = useMutation({
		mutationFn: async () => {
			const token = await getToken()
			const selectedRows = table.getSelectedRowModel().rows

			await Promise.all(
				selectedRows.map(async (row) => {
					const userId = (row.original as User).id

					await axios.delete(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users/${userId}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
				}),
			)
		},
		onSuccess: () => {
			toast.success('User(s) deleted successfully')
			router.refresh()
		},
		onError: (error: any) => {
			const message = error.response?.data?.message || error.message || 'Failed to delete user(s)!'
			toast.error(message)
		},
	})

	return (
		<div className='rounded-md border'>
			{Object.keys(rowSelection).length > 0 && (
				<div className='flex justify-end'>
					<button
						className='m-4 flex cursor-pointer items-center gap-2 rounded-md bg-red-500 px-2 py-1 text-sm text-white'
						onClick={() => mutation.mutate()}
						disabled={mutation.isPending}
					>
						<Trash2Icon className='size-4' />
						{mutation.isPending ? 'Deleting' : 'Delete User(s)'}
					</button>
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
