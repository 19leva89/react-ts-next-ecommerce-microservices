import { ProductList } from '@/components/shared/product-list'

const ProductsPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ category: string; sort: string; search: string }>
}) => {
	const category = (await searchParams).category
	const sort = (await searchParams).sort
	const search = (await searchParams).search

	return (
		<div>
			<ProductList category={category} sort={sort} search={search} params='products' />
		</div>
	)
}

export default ProductsPage
