'use client'

import axios from 'axios'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@repo/ui/components'
import { loadStripe } from '@stripe/stripe-js'
import { CartItemsType, ShippingFormInputs } from '@repo/types'
import { CheckoutProvider } from '@stripe/react-stripe-js/checkout'

import { CheckoutForm } from '@/components/shared'
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

		if (!data.client_secret) {
			throw new Error('No client_secret in response')
		}

		return data.client_secret
	} catch (error) {
		console.error('fetchClientSecret error:', error)

		throw new Error('Failed to fetch client secret')
	}
}

export const StripePaymentForm = ({ shippingForm }: Props) => {
	const router = useRouter()

	const { getToken } = useAuth()
	const { cart } = useCartStore()

	const [token, setToken] = useState<string | null>(null)

	// Get token
	useEffect(() => {
		getToken().then((token) => setToken(token))
	}, [getToken])

	if (!token)
		return (
			<Button variant='default' size='lg' onClick={() => router.push('/sign-in')} className='rounded-lg'>
				Please sign in
			</Button>
		)

	if (cart.length === 0) {
		return (
			<div>
				Your cart is empty.{' '}
				<Button variant='outline' onClick={() => router.push('/cart')}>
					View Cart
				</Button>
			</div>
		)
	}

	return (
		<CheckoutProvider
			stripe={stripePromise}
			options={{ fetchClientSecret: () => fetchClientSecret(cart, token!) }}
		>
			<CheckoutForm shippingForm={shippingForm} />
		</CheckoutProvider>
	)
}
