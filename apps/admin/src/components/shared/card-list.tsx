import axios from 'axios'
import Image from 'next/image'
import { auth } from '@clerk/nextjs/server'
import { OrderType, ProductsType } from '@repo/types'
import { Badge, Card, CardContent, CardFooter, CardTitle } from '@repo/ui/components'

interface Props {
	title: string
}

export const CardList = async ({ title }: Props) => {
	let orders: OrderType[] = []
	let products: ProductsType = []

	const { getToken } = await auth()
	const token = await getToken()

	if (title === 'Popular products') {
		products = await axios
			.get(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`, {
				params: { limit: 5, popular: true },
			})
			.then((res) => res.data)
			.catch((error) => {
				console.error('Failed to fetch popular products:', error)
				return []
			})
	} else {
		orders = await axios
			.get(`${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders`, {
				params: { limit: 5 },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.data)
			.catch((error) => {
				console.error('Failed to fetch orders:', error)
				return []
			})
	}

	return (
		<div>
			<h1 className='mb-6 text-lg font-medium'>{title}</h1>

			<div className='flex flex-col gap-2'>
				{title === 'Popular products'
					? products.map((item) => (
							<Card key={item.id} className='flex-row items-center justify-between gap-4 p-4'>
								<div className='relative size-12 overflow-hidden rounded-sm'>
									<Image
										src={Object.values(item.images as Record<string, string>)[0] || ''}
										alt={item.name}
										fill
										className='object-cover'
									/>
								</div>

								<CardContent className='flex-1 p-0'>
									<CardTitle className='text-sm font-medium'>{item.name}</CardTitle>
								</CardContent>

								<CardFooter className='p-0'>${item.price}K</CardFooter>
							</Card>
						))
					: orders.map((item) => (
							<Card key={item._id} className='flex-row items-center justify-between gap-4 p-4'>
								<CardContent className='flex-1 p-0'>
									<CardTitle className='text-sm font-medium'>{item.email}</CardTitle>

									<Badge variant='secondary'>{item.status}</Badge>
								</CardContent>

								<CardFooter className='p-0'>${item.amount / 100}</CardFooter>
							</Card>
						))}
			</div>
		</div>
	)
}
