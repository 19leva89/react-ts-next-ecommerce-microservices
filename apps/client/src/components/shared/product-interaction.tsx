'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { cn } from '@repo/ui/lib'
import { ProductType } from '@repo/types'
import { Button } from '@repo/ui/components'
import { MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useCartStore } from '@/stores/cart-store'

interface Props {
	product: ProductType
	selectedSize: string
	selectedColor: string
}

export const ProductInteraction = ({ product, selectedSize, selectedColor }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [quantity, setQuantity] = useState<number>(1)

	const { addToCart } = useCartStore()

	const handleTypeChange = (type: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set(type, value)
		router.push(`${pathname}?${params.toString()}`, { scroll: false })
	}

	const handleQuantityChange = (type: 'increment' | 'decrement') => {
		if (type === 'increment') {
			setQuantity((prev) => prev + 1)
		} else {
			if (quantity > 1) {
				setQuantity((prev) => prev - 1)
			}
		}
	}

	const handleAddToCart = () => {
		addToCart({
			...product,
			quantity,
			selectedColor,
			selectedSize,
		})
		toast.success('Product added to cart')
	}

	return (
		<div className='mt-4 flex flex-col gap-4'>
			{/* SIZE */}
			<div className='flex flex-col gap-2 text-xs'>
				<span className='text-gray-500'>Size</span>

				<div className='flex items-center gap-2'>
					{product.sizes.map((size) => (
						<div
							key={size}
							onClick={() => handleTypeChange('size', size)}
							className={cn(
								'border-1 cursor-pointer p-0.5',
								selectedSize === size ? 'border-gray-600' : 'border-gray-300',
							)}
						>
							<div
								className={cn(
									'flex size-6 items-center justify-center text-center',
									selectedSize === size ? 'bg-black text-white' : 'bg-white text-black',
								)}
							>
								{size.toUpperCase()}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* COLOR */}
			<div className='flex flex-col gap-2 text-sm'>
				<span className='text-gray-500'>Color</span>

				<div className='flex items-center gap-2'>
					{product.colors.map((color) => (
						<div
							key={color}
							onClick={() => handleTypeChange('color', color)}
							className={cn(
								'border-1 cursor-pointer p-0.5',
								selectedColor === color ? 'border-gray-300' : 'border-white',
							)}
						>
							<div className='border-1 size-6 border-gray-300' style={{ backgroundColor: color }} />
						</div>
					))}
				</div>
			</div>

			{/* QUANTITY */}
			<div className='flex flex-col gap-2 text-sm'>
				<span className='text-gray-500'>Quantity</span>

				<div className='flex items-center gap-2'>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => handleQuantityChange('decrement')}
						className='size-7 rounded-none border border-gray-300'
					>
						<MinusIcon className='size-4' />
					</Button>

					<span>{quantity}</span>

					<Button
						variant='ghost'
						size='icon'
						onClick={() => handleQuantityChange('increment')}
						className='size-7 rounded-none border border-gray-300'
					>
						<PlusIcon className='size-4' />
					</Button>
				</div>
			</div>

			{/* BUTTONS */}
			<Button variant='default' size='lg' onClick={handleAddToCart} className='rounded-md shadow-md'>
				<PlusIcon className='size-4' />
				Add to cart
			</Button>

			<Button variant='outline' size='lg' className='rounded-md shadow-md'>
				<ShoppingCartIcon className='size-4' />
				Buy this item
			</Button>
		</div>
	)
}
