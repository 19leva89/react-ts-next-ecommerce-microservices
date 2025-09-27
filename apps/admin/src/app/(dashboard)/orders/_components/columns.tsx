'use client'

import Link from 'next/link'
import { OrderType } from '@repo/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon, MoreHorizontalIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

// export type Payment = {
//   id: string;
//   amount: number;
//   fullName: string;
//   userId: string;
//   email: string;
//   status: "pending" | "processing" | "success" | "failed";
// };

export const columns: ColumnDef<OrderType>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
			/>
		),
		cell: ({ row }) => (
			<Checkbox onCheckedChange={(value) => row.toggleSelected(!!value)} checked={row.getIsSelected()} />
		),
	},
	{
		accessorKey: '_id',
		header: 'ID',
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Email
					<ArrowUpDownIcon className='ml-2 size-4' />
				</Button>
			)
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.getValue('status')

			return (
				<div
					className={cn(
						`w-max rounded-md p-1 text-xs`,
						status === 'pending' && 'bg-yellow-500/40',
						status === 'success' && 'bg-green-500/40',
						status === 'failed' && 'bg-red-500/40',
					)}
				>
					{status as string}
				</div>
			)
		},
	},
	{
		accessorKey: 'amount',
		header: () => <div className='text-right'>Amount</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'))
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount / 100)

			return <div className='text-right font-medium'>{formatted}</div>
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const order = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='size-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontalIcon className='size-4' />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>

						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(order._id)}>
							Copy order ID
						</DropdownMenuItem>

						<DropdownMenuSeparator />

						<DropdownMenuItem>
							<Link href={`/users/${order.userId}`}>View customer</Link>
						</DropdownMenuItem>

						<DropdownMenuItem>View order details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
