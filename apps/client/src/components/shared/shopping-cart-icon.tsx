'use client'

import Link from 'next/link'
import { ShoppingCartIcon as CartIcon } from 'lucide-react'

import useCartStore from '@/stores/cart-store'

export const ShoppingCartIcon = () => {
	const { cart, hasHydrated } = useCartStore()

	if (!hasHydrated) return null

	return (
		<Link href='/cart' className='relative'>
			<CartIcon className='size-4 text-gray-600' />

			<span className='absolute -right-3 -top-3 flex size-4 items-center justify-center rounded-full bg-amber-400 text-xs font-medium text-gray-600'>
				{cart.reduce((acc, item) => acc + item.quantity, 0)}
			</span>
		</Link>
	)
}
