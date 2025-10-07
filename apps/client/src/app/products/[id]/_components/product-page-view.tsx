'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { ProductType } from '@repo/types'

import { LoadingState, ProductOptions } from '@/components/shared'

interface Props {
	product: ProductType
	selectedSize: string
	selectedColor: string
}

export const ProductPageView = ({ product, selectedSize, selectedColor }: Props) => {
	return (
		<div className='mt-12 flex flex-col gap-4 md:gap-12 lg:flex-row'>
			{/* IMAGE */}
			<div className='relative aspect-[2/3] w-full lg:w-5/12'>
				<Image
					fill
					src={(product.images as Record<string, string>)?.[selectedColor] || '/svg/no-image.svg'}
					alt={product.name}
					onError={(e) => (e.currentTarget.src = '/svg/no-image.svg')}
					className='rounded-md object-contain'
				/>
			</div>

			{/* DETAILS */}
			<div className='flex w-full flex-col gap-4 lg:w-7/12'>
				<h1 className='text-2xl font-medium'>{product.name}</h1>

				<p className='text-gray-500'>{product.description}</p>

				<h2 className='text-2xl font-semibold'>${product.price.toFixed(2)}</h2>

				<Suspense
					fallback={
						<LoadingState
							title='Loading options'
							description='This may take a few seconds'
							className='bg-transparent p-0 shadow-none'
						/>
					}
				>
					<ProductOptions product={product} selectedSize={selectedSize} selectedColor={selectedColor} />
				</Suspense>

				{/* CARD INFO */}
				<div className='mt-4 flex items-center gap-2'>
					<Image src='/img/klarna.png' alt='klarna' width={50} height={25} className='rounded-md' />
					<Image src='/img/cards.png' alt='cards' width={50} height={25} className='rounded-md' />
					<Image src='/img/stripe.png' alt='stripe' width={50} height={25} className='rounded-md' />
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
