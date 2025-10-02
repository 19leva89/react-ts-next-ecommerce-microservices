'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { Button } from '@repo/ui/components'
import { ShippingFormInputs } from '@repo/types'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

export const CheckoutForm = ({ shippingForm }: { shippingForm: ShippingFormInputs }) => {
	const stripe = useStripe()
	const elements = useElements()

	const [loading, setLoading] = useState<boolean>(false)

	const handleClick = async () => {
		if (!stripe || !elements) {
			toast.error('Stripe not initialized')
			setLoading(false)

			return
		}

		setLoading(true)

		const { error: stripeError } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				receipt_email: shippingForm.email,
				return_url: `${window.location.origin}/return`,
				shipping: {
					name: shippingForm.name || 'Customer',
					address: {
						line1: shippingForm.address,
						city: shippingForm.city,
						country: 'US',
					},
				},
			},
			redirect: 'always',
		})

		if (stripeError) {
			toast.error(stripeError.message ?? 'Payment failed')
		}

		toast.success('Payment successful')
		setLoading(false)
	}

	return (
		<form className='flex flex-col gap-2'>
			<PaymentElement options={{ layout: 'accordion' }} />

			<Button
				variant='default'
				size='lg'
				onClick={handleClick}
				disabled={loading || !stripe}
				className='rounded-lg'
			>
				{loading ? 'Loading...' : 'Pay'}
			</Button>
		</form>
	)
}
