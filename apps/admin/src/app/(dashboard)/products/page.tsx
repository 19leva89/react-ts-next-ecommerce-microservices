import axios from 'axios'
import { ProductsType } from '@repo/types'

import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'

const getData = async (): Promise<ProductsType> => {
	try {
		const { data } = await axios.get<ProductsType>(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`)

		return data
	} catch (error: any) {
		console.error(error)

		return []
	}
}

const ProductPage = async () => {
	const data = await getData()

	return (
		<div>
			<div className='bg-secondary mb-8 rounded-md px-4 py-2'>
				<h1 className='font-semibold'>All Products</h1>
			</div>

			<DataTable columns={columns} data={data} />
		</div>
	)
}

export default ProductPage
