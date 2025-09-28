'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { User } from '@clerk/nextjs/server'
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

// export type User = {
//   id: string;
//   avatar: string;
//   fullName: string;
//   email: string;
//   status: "active" | "inactive";
// };

export const columns: ColumnDef<User>[] = [
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
		accessorKey: 'avatar',
		header: 'Avatar',
		cell: ({ row }) => {
			const user = row.original
			return (
				<div className='relative size-9'>
					<Image
						src={user.imageUrl}
						alt={user.firstName || user.username || '-'}
						fill
						className='rounded-full object-cover'
					/>
				</div>
			)
		},
	},
	{
		accessorKey: 'firstName',
		header: 'User',
		cell: ({ row }) => {
			const user = row.original
			return <div>{user.firstName || user.username || '-'}</div>
		},
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
		cell: ({ row }) => {
			const user = row.original
			return <div>{user.emailAddresses[0]?.emailAddress}</div>
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const user = row.original
			const status = user.banned ? 'banned' : 'active'

			return (
				<div
					className={cn(
						`w-max rounded-md p-1 text-xs`,
						status === 'active' && 'bg-green-500/40',
						status === 'banned' && 'bg-red-500/40',
					)}
				>
					{status as string}
				</div>
			)
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const user = row.original

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

						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
							Copy user ID
						</DropdownMenuItem>

						<DropdownMenuSeparator />

						<DropdownMenuItem>
							<Link href={`/users/${user.id}`}>View customer</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
