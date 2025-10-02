'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@repo/ui/components'

interface Props {
	data: {
		status: string
		amount_received: number
		currency: string
		shipping: {
			address: {
				city: string
				line1: string
			}
		}
	}
}

export const ReturnPageView = ({ data }: Props) => {
	const router = useRouter()

	return (
		<div className='flex flex-col gap-4'>
			<div>
				<h1>Payment {data.status}</h1>

				<p>
					Payment amount: {data.amount_received / 100} <span className='uppercase'>{data.currency}</span>
				</p>

				<p>
					Shipping address: {data.shipping.address.city}, {data.shipping.address.line1}
				</p>
			</div>

			<Button variant='default' onClick={() => router.push('/orders')} className='rounded-lg'>
				See your orders
			</Button>
		</div>
	)
}
