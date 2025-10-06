'use client'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { useState } from 'react'
import { cn } from '@repo/ui/lib'
import { ProductType } from '@repo/types'
import { Button } from '@repo/ui/components'
import { ShoppingCartIcon } from 'lucide-react'

import { useCartStore } from '@/stores/cart-store'

interface Props {
	product: ProductType
}

export const ProductCard = ({ product }: Props) => {
	const [productTypes, setProductTypes] = useState<{ size: string; color: string }>({
		size: product.sizes[0]!,
		color: product.colors[0]!,
	})

	const { addToCart } = useCartStore()

	const handleProductType = ({ type, value }: { type: 'size' | 'color'; value: string }) => {
		setProductTypes((prev) => ({
			...prev,
			[type]: value,
		}))
	}

	const handleAddToCart = () => {
		addToCart({
			...product,
			quantity: 1,
			selectedSize: productTypes.size,
			selectedColor: productTypes.color,
		})

		toast.success('Product added to cart')
	}

	return (
		<div className='overflow-hidden rounded-lg shadow-lg'>
			{/* IMAGE */}
			<Link href={`/products/${product.id}`}>
				<div className='relative aspect-[2/3]'>
					<Image
						fill
						src={(product.images as Record<string, string>)?.[productTypes.color] || '/svg/no-image.svg'}
						alt={product.name}
						onError={(e) => (e.currentTarget.src = '/svg/no-image.svg')}
						className='object-cover transition-all duration-300 hover:scale-105'
					/>
				</div>
			</Link>

			{/* PRODUCT DETAIL */}
			<div className='flex flex-col gap-4 p-4'>
				<h1 className='font-medium'>{product.name}</h1>

				<p className='text-sm text-gray-500'>{product.shortDescription}</p>

				{/* PRODUCT TYPES */}
				<div className='flex items-center gap-4 text-xs'>
					{/* SIZES */}
					<div className='flex flex-col gap-1'>
						<span className='text-gray-500'>Size</span>

						<select
							id='size'
							name='size'
							onChange={(e) => handleProductType({ type: 'size', value: e.target.value })}
							className='cursor-pointer rounded-md px-2 py-1 ring ring-gray-300'
						>
							{product.sizes.map((size) => (
								<option key={size} value={size} className='cursor-pointer'>
									{size.toUpperCase()}
								</option>
							))}
						</select>
					</div>

					{/* COLORS */}
					<div className='flex flex-col gap-1'>
						<span className='text-gray-500'>Color</span>

						<div className='flex items-center gap-2'>
							{product.colors.map((color) => (
								<div
									key={color}
									onClick={() => handleProductType({ type: 'color', value: color })}
									className={cn(
										'cursor-pointer rounded-full border p-[1.2px]',
										productTypes.color === color ? 'border-gray-400' : 'border-gray-200',
									)}
								>
									<div
										className='border-input size-3.5 rounded-full border'
										style={{ backgroundColor: color }}
									/>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* PRICE AND ADD TO CART BUTTON */}
				<div className='flex items-center justify-between'>
					<p className='font-medium'>${product.price.toFixed(2)}</p>

					<Button
						variant='ghost'
						size='default'
						onClick={handleAddToCart}
						className='rounded-md shadow-lg ring-1 ring-gray-200 hover:bg-black hover:text-white'
					>
						<ShoppingCartIcon className='size-4' />
						Add to cart
					</Button>
				</div>
			</div>
		</div>
	)
}
