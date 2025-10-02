import axios from 'axios'
import { OrderType } from '@repo/types'
import { auth } from '@clerk/nextjs/server'

const fetchOrders = async (): Promise<OrderType[]> => {
	const { getToken } = await auth()
	const token = await getToken()

	try {
		const { data } = await axios.get<OrderType[]>(
			`${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/user-orders`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)

		return data
	} catch (error) {
		console.error(error)

		return []
	}
}

const OrdersPage = async () => {
	const orders = await fetchOrders()

	if (!orders) {
		return <div>No orders found!</div>
	}

	// console.log(orders)

	return (
		<div>
			<h1 className='my-4 text-2xl font-medium'>Your Orders</h1>

			<ul>
				{orders.map((order) => (
					<li key={order._id} className='mb-4 flex items-center'>
						<div className='w-1/4'>
							<span className='text-sm font-medium text-gray-500'>Order ID</span>
							<p>{order._id}</p>
						</div>

						<div className='w-1/12'>
							<span className='text-sm font-medium text-gray-500'>Total</span>
							<p>{order.amount / 100}</p>
						</div>

						<div className='w-1/12'>
							<span className='text-sm font-medium text-gray-500'>Status</span>
							<p>{order.status}</p>
						</div>

						<div className='w-1/8'>
							<span className='text-sm font-medium text-gray-500'>Date</span>
							<p>{order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US') : '-'}</p>
						</div>

						<div>
							<span className='text-sm font-medium text-gray-500'>Products</span>
							<p>{order.products?.map((product) => product.name).join(', ') || '-'}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default OrdersPage
