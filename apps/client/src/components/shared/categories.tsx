'use client'

import {
	FootprintsIcon,
	GlassesIcon,
	BriefcaseIcon,
	ShirtIcon,
	ShoppingBasketIcon,
	HandIcon,
	VenusIcon,
} from 'lucide-react'
import { cn } from '@repo/ui/lib'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const categories = [
	{
		name: 'All',
		icon: <ShoppingBasketIcon className='size-4' />,
		slug: 'all',
	},
	{
		name: 'T-shirts',
		icon: <ShirtIcon className='size-4' />,
		slug: 't-shirts',
	},
	{
		name: 'Shoes',
		icon: <FootprintsIcon className='size-4' />,
		slug: 'shoes',
	},
	{
		name: 'Accessories',
		icon: <GlassesIcon className='size-4' />,
		slug: 'accessories',
	},
	{
		name: 'Bags',
		icon: <BriefcaseIcon className='size-4' />,
		slug: 'bags',
	},
	{
		name: 'Dresses',
		icon: <VenusIcon className='size-4' />,
		slug: 'dresses',
	},
	{
		name: 'Jackets',
		icon: <ShirtIcon className='size-4' />,
		slug: 'jackets',
	},
	{
		name: 'Gloves',
		icon: <HandIcon className='size-4' />,
		slug: 'gloves',
	},
]

export const Categories = () => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const selectedCategory = searchParams.get('category')

	const handleChange = (value: string | null) => {
		const params = new URLSearchParams(searchParams)
		params.set('category', value || 'all')
		router.push(`${pathname}?${params.toString()}`, { scroll: false })
	}

	return (
		<div className='mb-4 grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-2 text-sm sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'>
			{categories.map((category) => (
				<div
					key={category.name}
					onClick={() => handleChange(category.slug)}
					className={cn(
						'flex cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1',
						category.slug === selectedCategory ? 'bg-white' : 'text-gray-500',
					)}
				>
					{category.icon}

					{category.name}
				</div>
			))}
		</div>
	)
}
