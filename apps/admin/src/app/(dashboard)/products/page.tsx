import { ProductsType } from '@repo/types'

import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'

const getData = async (): Promise<ProductsType> => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`)
		const data = await res.json()
		return data
	} catch (error) {
		console.log(error)
		return []
	}
}

const ProductPage = async () => {
	const data = await getData()
	return (
		<div className=''>
			<div className='bg-secondary mb-8 rounded-md px-4 py-2'>
				<h1 className='font-semibold'>All Products</h1>
			</div>

			<DataTable columns={columns} data={data} />
		</div>
	)
}

export default ProductPage
