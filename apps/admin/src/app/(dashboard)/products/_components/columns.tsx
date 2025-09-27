'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ProductType } from '@repo/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon, MoreHorizontalIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// export type Product = {
//   id: string | number;
//   price: number;
//   name: string;
//   shortDescription: string;
//   description: string;
//   sizes: string[];
//   colors: string[];
//   images: Record<string, string>;
// };

export const columns: ColumnDef<ProductType>[] = [
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
		accessorKey: 'image',
		header: 'Image',
		cell: ({ row }) => {
			const product = row.original
			return (
				<div className='relative size-9'>
					<Image
						src={(product.images as Record<string, string>)?.[product.colors[0] || ''] || ''}
						alt={product.name}
						fill
						className='rounded-full object-cover'
					/>
				</div>
			)
		},
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'price',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Price
					<ArrowUpDownIcon className='ml-2 size-4' />
				</Button>
			)
		},
	},
	{
		accessorKey: 'shortDescription',
		header: 'Description',
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const product = row.original

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

						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id.toString())}>
							Copy product ID
						</DropdownMenuItem>

						<DropdownMenuSeparator />

						<DropdownMenuItem>
							<Link href={`/products/${product.id}`}>View product</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
