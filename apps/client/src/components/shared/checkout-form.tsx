'use client'

import { MouseEvent, useState } from 'react'
import { ShippingFormInputs } from '@repo/types'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

export const CheckoutForm = ({ shippingForm }: { shippingForm: ShippingFormInputs }) => {
	const stripe = useStripe()
	const elements = useElements()

	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		if (!stripe || !elements) return

		setLoading(true)
		setError(null)

		const { error: stripeError } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				receipt_email: shippingForm.email,
				shipping: {
					name: shippingForm.name || 'Customer',
					address: {
						line1: shippingForm.address,
						city: shippingForm.city,
						country: 'US',
					},
				},
			},
			redirect: 'if_required',
		})

		if (stripeError) {
			setError(stripeError.message ?? 'Payment failed')
		}

		setLoading(false)
	}

	return (
		<form>
			<PaymentElement options={{ layout: 'accordion' }} />

			<button disabled={loading || !stripe} onClick={handleClick}>
				{loading ? 'Loading...' : 'Pay'}
			</button>

			{error && <div>{error}</div>}
		</form>
	)
}
