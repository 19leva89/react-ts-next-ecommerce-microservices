'use client'

import { cn } from '@repo/ui/lib'
import { availableIcons } from '@repo/ui/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props {
	categories: { name: string; icon: string; slug: string }[]
}

export const Categories = ({ categories }: Props) => {
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
			{categories.map((category) => {
				const LucideIcon = availableIcons[category.icon as string as keyof typeof availableIcons]

				return (
					<div
						key={category.slug}
						onClick={() => handleChange(category.slug)}
						className={cn(
							'flex cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1',
							category.slug === selectedCategory ? 'bg-white' : 'text-gray-500',
						)}
					>
						<LucideIcon className='size-4' />

						{category.name}
					</div>
				)
			})}
		</div>
	)
}
