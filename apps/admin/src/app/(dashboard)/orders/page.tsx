import { OrderType } from '@repo/types'
import { auth } from '@clerk/nextjs/server'

import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'

const getData = async (): Promise<OrderType[]> => {
	try {
		const { getToken } = await auth()
		const token = await getToken()
		const res = await fetch(`${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await res.json()
		return data
	} catch (err) {
		console.log(err)
		return []
	}
}

const OrdersPage = async () => {
	const data = await getData()
	return (
		<div className=''>
			<div className='bg-secondary mb-8 rounded-md px-4 py-2'>
				<h1 className='font-semibold'>All Payments</h1>
			</div>

			<DataTable columns={columns} data={data} />
		</div>
	)
}

export default OrdersPage
