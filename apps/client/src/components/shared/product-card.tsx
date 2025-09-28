'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { ProductType } from '@repo/types'
import { ShoppingCartIcon } from 'lucide-react'

import { useCartStore } from '@/stores/cart-store'

export const ProductCard = ({ product }: { product: ProductType }) => {
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
						src={(product.images as Record<string, string>)?.[productTypes.color] || ''}
						alt={product.name}
						fill
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
							name='size'
							id='size'
							className='rounded-md px-2 py-1 ring ring-gray-300'
							onChange={(e) => handleProductType({ type: 'size', value: e.target.value })}
						>
							{product.sizes.map((size) => (
								<option key={size} value={size}>
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
									className={`border-1 cursor-pointer ${
										productTypes.color === color ? 'border-gray-400' : 'border-gray-200'
									} rounded-full p-[1.2px]`}
									key={color}
									onClick={() => handleProductType({ type: 'color', value: color })}
								>
									<div className='size-3.5 rounded-full' style={{ backgroundColor: color }} />
								</div>
							))}
						</div>
					</div>
				</div>

				{/* PRICE AND ADD TO CART BUTTON */}
				<div className='flex items-center justify-between'>
					<p className='font-medium'>${product.price.toFixed(2)}</p>

					<button
						onClick={handleAddToCart}
						className='flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:bg-black hover:text-white'
					>
						<ShoppingCartIcon className='size-4' />
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	)
}
