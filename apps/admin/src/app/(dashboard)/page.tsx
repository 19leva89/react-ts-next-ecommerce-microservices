import { auth } from '@clerk/nextjs/server'

import { CardList } from '@/components/shared/card-list'
import { TodoList } from '@/components/shared/todo-list'
import { AppBarChart } from '@/components/shared/app-bar-chart'
import { AppPieChart } from '@/components/shared/app-pie-chart'
import { AppAreaChart } from '@/components/shared/app-area-chart'

const Homepage = async () => {
	const { getToken } = await auth()
	const token = await getToken()

	const orderChartData = fetch(`${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/order-chart`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	return (
		<div className='grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4'>
			<div className='bg-primary-foreground rounded-lg p-4 lg:col-span-2 xl:col-span-1 2xl:col-span-2'>
				<AppBarChart dataPromise={orderChartData} />
			</div>

			<div className='bg-primary-foreground rounded-lg p-4'>
				<CardList title='Latest Transactions' />
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
				<CardList title='Popular Products' />
			</div>
		</div>
	)
}

export default Homepage
