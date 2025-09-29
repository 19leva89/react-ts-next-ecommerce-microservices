import axios from 'axios'
import Image from 'next/image'
import { ProductType } from '@repo/types'

import { ProductInteraction } from '@/components/shared'

// TEMPORARY
// const product: ProductType = {
//   id: 1,
//   name: "Adidas CoreFit T-Shirt",
//   shortDescription:
//     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//   description:
//     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//   price: 59.9,
//   sizes: ["xs", "s", "m", "l", "xl"],
//   colors: ["gray", "purple", "green"],
//   images: {
//     gray: "/products/1g.png",
//     purple: "/products/1p.png",
//     green: "/products/1gr.png",
//   },
//   categorySlug: "test",
//   createdAt: new Date(),
//   updatedAt: new Date(),
// };

const fetchProduct = async (id: string): Promise<ProductType | null> => {
	try {
		const { data } = await axios.get<ProductType>(
			`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`,
		)

		return data
	} catch (error: any) {
		console.error(error)

		return null
	}
}

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params

	const product = await fetchProduct(id)

	return {
		title: product?.name,
		describe: product?.description,
	}
}

const ProductPage = async ({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>
	searchParams: Promise<{ color: string; size: string }>
}) => {
	const { size, color } = await searchParams
	const { id } = await params

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

				<ProductInteraction product={product} selectedSize={selectedSize} selectedColor={selectedColor} />

				{/* CARD INFO */}
				<div className='mt-4 flex items-center gap-2'>
					<Image src='/klarna.png' alt='klarna' width={50} height={25} className='rounded-md' />
					<Image src='/cards.png' alt='cards' width={50} height={25} className='rounded-md' />
					<Image src='/stripe.png' alt='stripe' width={50} height={25} className='rounded-md' />
				</div>

				<p className='text-xs text-gray-500'>
					By clicking Pay Now, you agree to our{' '}
					<span className='underline hover:text-black'>Terms & Conditions</span> and{' '}
					<span className='underline hover:text-black'>Privacy Policy</span>. You authorize us to charge your
					selected payment method for the total amount shown. All sales are subject to our return and{' '}
					<span className='underline hover:text-black'>Refund Policies</span>.
				</p>
			</div>
		</div>
	)
}

export default ProductPage
