'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { TShippingForm } from '@repo/types'
import { Button } from '@repo/ui/components'
import { useCheckout } from '@stripe/react-stripe-js/checkout'
import { PaymentElement } from '@stripe/react-stripe-js/checkout'

interface Props {
	shippingForm: TShippingForm
}

export const CheckoutForm = ({ shippingForm }: Props) => {
	const checkoutState = useCheckout()

	const [loading, setLoading] = useState<boolean>(false)

	const handleClick = async () => {
		// Early return if not ready
		if (checkoutState.type === 'loading') {
			toast.error('Checkout is still loading')
			return
		}

		if (checkoutState.type === 'error') {
			toast.error(checkoutState.error.message)
			return
		}

		setLoading(true)

		const { checkout } = checkoutState

		try {
			await checkout.updateEmail(shippingForm.email)

			await checkout.updateShippingAddress({
				name: 'shipping_address',
				address: {
					line1: shippingForm.address,
					city: shippingForm.city,
					country: 'US',
				},
			})

			const res = await checkout.confirm()

			if (res.type === 'error') {
				toast.error(res.error?.message ?? 'Payment failed')
			} else if (res.type === 'success') {
				toast.success('Payment succeeded!')
			}
		} catch (error) {
			console.error(error)

			toast.error('An unexpected error occurred')
		} finally {
			setLoading(false)
		}
	}

	return (
		<form className='flex flex-col gap-2'>
			<PaymentElement id='payment-element' options={{ layout: 'accordion' }} />

			<Button
				variant='default'
				size='lg'
				onClick={handleClick}
				disabled={loading || checkoutState.type !== 'success'}
				className='rounded-lg'
			>
				{loading ? 'Loading...' : 'Pay'}
			</Button>
		</form>
	)
}
