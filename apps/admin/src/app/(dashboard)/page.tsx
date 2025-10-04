import axios from 'axios'
import { auth } from '@clerk/nextjs/server'
import { OrderChartType } from '@repo/types'

import { CardList } from '@/components/shared/card-list'
import { AppAreaChart, AppBarChart, AppPieChart, TodoList } from '@/components/shared'

export const dynamic = 'force-dynamic'

const HomePage = async () => {
	const { getToken } = await auth()
	const token = await getToken()

	const orderChartData = axios
		.get<OrderChartType[]>(`${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/order-chart`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => res.data)
		.catch((error) => {
			console.error('Failed to fetch order chart data:', error)
			return []
		})

	return (
		<div className='grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4'>
			<div className='bg-primary-foreground rounded-lg p-4 lg:col-span-2 xl:col-span-1 2xl:col-span-2'>
				<AppBarChart dataPromise={orderChartData} />
			</div>

			<div className='bg-primary-foreground rounded-lg p-4'>
				<CardList title='Latest transactions' />
			</div>

			<div className='bg-primary-foreground rounded-lg p-4'>
				<AppPieChart />
			</div>

			<div className='bg-primary-foreground rounded-lg p-4'>
				<TodoList />
			</div>

			<div className='bg-primary-foreground rounded-lg p-4 lg:col-span-2 xl:col-span-1 2xl:col-span-2'>
				<AppAreaChart />
			</div>

			<div className='bg-primary-foreground rounded-lg p-4'>
				<CardList title='Popular products' />
			</div>
		</div>
	)
}

export default HomePage
