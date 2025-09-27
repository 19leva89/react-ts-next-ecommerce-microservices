'use client'

import { useState } from 'react'
import { ConfirmError } from '@stripe/stripe-js'
import { ShippingFormInputs } from '@repo/types'
import { PaymentElement, useCheckout } from '@stripe/react-stripe-js'

export const CheckoutForm = ({ shippingForm }: { shippingForm: ShippingFormInputs }) => {
	const checkout = useCheckout()

	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<ConfirmError | null>(null)

	const handleClick = async () => {
		setLoading(true)
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
			setError(res.error)
		}
		setLoading(false)
	}

	return (
		<form>
			<PaymentElement options={{ layout: 'accordion' }} />

			<button disabled={loading} onClick={handleClick}>
				{loading ? 'Loading...' : 'Pay'}
			</button>

			{error && <div className=''>{error.message}</div>}
		</form>
	)
}
