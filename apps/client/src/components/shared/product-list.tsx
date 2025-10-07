import axios from 'axios'
import Link from 'next/link'
import { Suspense } from 'react'
import { Spinner } from '@repo/ui/components'
import { CategoryType, ProductType } from '@repo/types'

import { Categories, Filter, ProductCard } from '@/components/shared'

interface Props {
	category: string
	sort?: string
	search?: string
	params: 'homepage' | 'products'
}

const fetchProducts = async ({ category, sort, search, params }: Props): Promise<ProductType[]> => {
	const queryParams: Record<string, string | number> = {}

	queryParams.sort = sort || 'newest'
	if (search) queryParams.search = search
	if (params === 'homepage') queryParams.limit = 8
	if (category && category !== 'all') queryParams.category = category

	try {
		const { data } = await axios.get<ProductType[]>(
			`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`,
			{
				params: queryParams,
			},
		)

		return data
	} catch (error) {
		console.error('Failed to fetch products:', error)

		return []
	}
}

const fetchCategories = async (): Promise<CategoryType[]> => {
	try {
		const { data } = await axios.get<CategoryType[]>(
			`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`,
		)

		return data
	} catch (error) {
		console.error('Failed to fetch products:', error)

		return []
	}
}

export const ProductList = async ({ category, sort, search, params }: Props) => {
	const categories = await fetchCategories()
	const products = await fetchProducts({ category, sort, search, params })

	return (
		<div className='w-full'>
			<Suspense
				fallback={
					<div className='flex min-h-[200px] w-full items-center justify-center'>
						<Spinner className='size-6' />
					</div>
				}
			>
				<Categories categories={categories} />
			</Suspense>

			{params === 'products' && (
				<Suspense
					fallback={
						<div className='flex min-h-[200px] w-full items-center justify-center'>
							<Spinner className='size-6' />
						</div>
					}
				>
					<Filter />
				</Suspense>
			)}

			<div className='grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			<Link
				href={category ? `/products/?category=${category}` : '/products'}
				className='mt-4 flex justify-end text-sm text-gray-500 underline'
			>
				View all products
			</Link>
		</div>
	)
}
