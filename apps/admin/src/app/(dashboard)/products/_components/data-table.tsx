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
import { toast } from 'sonner'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Trash2Icon } from 'lucide-react'
import { ProductType } from '@repo/types'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/components'

import { DataTablePagination } from '@/components/shared'

interface Props<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: Props<TData, TValue>) {
	const router = useRouter()

	const { getToken } = useAuth()

	const [sorting, setSorting] = useState<SortingState>([])
	const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			rowSelection,
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		onRowSelectionChange: setRowSelection,
	})

	const mutation = useMutation({
		mutationFn: async () => {
			const token = await getToken()
			const selectedRows = table.getSelectedRowModel().rows

			await Promise.all(
				selectedRows.map(async (row) => {
					const productId = (row.original as ProductType).id

					await axios.delete(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${productId}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
				}),
			)
		},
		onSuccess: () => {
			toast.success('Product(s) deleted successfully')
			router.refresh()
			setRowSelection({})
		},
		onError: (error) => {
			const message = error.message || 'Failed to delete product(s)!'

			toast.error(message)
		},
	})

	return (
		<div className='rounded-md border'>
			{Object.keys(rowSelection).length > 0 && (
				<div className='flex justify-end'>
					<Button
						variant='destructive'
						size='lg'
						onClick={() => mutation.mutate()}
						disabled={mutation.isPending}
						className='m-4 rounded-md bg-red-500'
					>
						<Trash2Icon className='size-4' />
						{mutation.isPending ? 'Deleting' : 'Delete product(s)'}
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
