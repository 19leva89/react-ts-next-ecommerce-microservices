import axios from 'axios'
import { ProductType } from '@repo/types'

import { ProductPageView } from './_components/product-page-view'

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

	return <ProductPageView product={product} selectedSize={selectedSize} selectedColor={selectedColor} />
}

export default ProductPage
