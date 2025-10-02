import { ProductList } from '@/components/shared/product-list'

interface Props {
	searchParams: Promise<{ category: string; sort: string; search: string }>
}

const ProductsPage = async ({ searchParams }: Props) => {
	const sort = (await searchParams).sort
	const search = (await searchParams).search
	const category = (await searchParams).category

	return <ProductList category={category} sort={sort} search={search} params='products' />
}

export default ProductsPage
