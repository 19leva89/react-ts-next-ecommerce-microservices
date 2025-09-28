'use client'

import axios from 'axios'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { CartItemsType, ShippingFormInputs } from '@repo/types'

import { CheckoutForm } from './checkout-form'
import { useCartStore } from '@/stores/cart-store'

interface Props {
	shippingForm: ShippingFormInputs
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export const fetchClientSecret = async (cart: CartItemsType, token: string): Promise<string> => {
	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
			{ cart },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			},
		)

		return data.checkoutSessionClientSecret
	} catch (error: any) {
		console.error(error)
		throw new Error('Failed to fetch client secret')
	}
}

export const StripePaymentForm = ({ shippingForm }: Props) => {
	const { getToken } = useAuth()
	const { cart } = useCartStore()

	const [token, setToken] = useState<string | null>(null)
	const [clientSecret, setClientSecret] = useState<string | null>(null)

	// Get token
	useEffect(() => {
		getToken().then((token) => setToken(token))
	}, [getToken])

	// Get client secret on cart change
	useEffect(() => {
		if (token && cart.length > 0) {
			fetchClientSecret(cart, token).then(setClientSecret)
		}
	}, [token, cart])

	if (!token || !clientSecret) return <div>Loading...</div>

	return (
		<Elements stripe={stripePromise} options={{ clientSecret }}>
			<CheckoutForm shippingForm={shippingForm} />
		</Elements>
	)
}
