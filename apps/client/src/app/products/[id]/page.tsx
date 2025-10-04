import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { LoaderIcon } from 'lucide-react'
import { ProductType } from '@repo/types'

import { ProductInteraction } from '@/components/shared'

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params

	const product = await fetchProduct(id)

	return {
		title: product?.name,
		describe: product?.description,
	}
}

const fetchProduct = async (id: string): Promise<ProductType | null> => {
	try {
		const { data } = await axios.get<ProductType>(
			`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`,
		)

		return data
	} catch (error) {
		console.error(error)

		return null
	}
}

interface Props {
	params: Promise<{ id: string }>
	searchParams: Promise<{ color: string; size: string }>
}

const ProductPage = async ({ params, searchParams }: Props) => {
	const { id } = await params
	const { size, color } = await searchParams

	const product = await fetchProduct(id)

	const selectedSize = size || (product?.sizes[0] as string)
	const selectedColor = color || (product?.colors[0] as string)

	if (!product) {
		return <div>No product found</div>
	}

	return (
		<div className='mt-12 flex flex-col gap-4 md:gap-12 lg:flex-row'>
			{/* IMAGE */}
			<div className='relative aspect-[2/3] w-full lg:w-5/12'>
				<Image
					src={(product.images as Record<string, string>)?.[selectedColor] || ''}
					alt={product.name}
					fill
					className='rounded-md object-contain'
				/>
			</div>

			{/* DETAILS */}
			<div className='flex w-full flex-col gap-4 lg:w-7/12'>
				<h1 className='text-2xl font-medium'>{product.name}</h1>

				<p className='text-gray-500'>{product.description}</p>

				<h2 className='text-2xl font-semibold'>${product.price.toFixed(2)}</h2>

				<Suspense fallback={<LoaderIcon className='size-5 animate-spin text-white' />}>
					<ProductInteraction product={product} selectedSize={selectedSize} selectedColor={selectedColor} />
				</Suspense>

				{/* CARD INFO */}
				<div className='mt-4 flex items-center gap-2'>
					<Image src='/klarna.png' alt='klarna' width={50} height={25} className='rounded-md' />
					<Image src='/cards.png' alt='cards' width={50} height={25} className='rounded-md' />
					<Image src='/stripe.png' alt='stripe' width={50} height={25} className='rounded-md' />
				</div>

				<p className='text-xs text-gray-500'>
					By clicking Pay Now, you agree to our{' '}
					<Link href='/terms' className='underline hover:text-black'>
						Terms & Conditions
					</Link>{' '}
					and{' '}
					<Link href='/privacy' className='underline hover:text-black'>
						Privacy Policy
					</Link>
					. You authorize us to charge your selected payment method for the total amount shown. All sales are
					subject to our return and{' '}
					<Link href='/refund-policy' className='underline hover:text-black'>
						Refund Policies
					</Link>
					.
				</p>
			</div>
		</div>
	)
}

export default ProductPage
