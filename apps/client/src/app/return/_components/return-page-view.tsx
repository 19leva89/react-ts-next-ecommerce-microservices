'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@repo/ui/components'

interface Props {
	data: {
		status: string
		amount_total: number
		currency: string
	}
}

export const ReturnPageView = ({ data }: Props) => {
	const router = useRouter()

	return (
		<div className='flex flex-col gap-4'>
			<div>
				<h1>Payment {data.status}</h1>

				<p>
					Payment amount: {data.amount_total / 100} <span className='uppercase'>{data.currency}</span>
				</p>
			</div>

			<Button variant='default' size='lg' onClick={() => router.push('/orders')} className='rounded-lg'>
				See your orders
			</Button>
		</div>
	)
}
