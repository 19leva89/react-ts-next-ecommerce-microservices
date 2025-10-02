import { Hono } from 'hono'
import { CartItemsType } from '@repo/types'

import { stripe } from '../utils/stripe'
import { shouldBeUser } from '../middleware/auth-middleware'

const sessionRoute = new Hono()

sessionRoute.post('/create-checkout-session', shouldBeUser, async (c) => {
	const { cart }: { cart: CartItemsType } = await c.req.json()
	const userId = c.get('userId')

	const lineItems = cart.map((item) => ({
		price_data: {
			currency: 'usd',
			product_data: { name: item.name },
			unit_amount: Math.round(item.price * 100),
		},
		quantity: item.quantity,
	}))

	console.log('lineItems:', lineItems)

	try {
		const session = await stripe.checkout.sessions.create({
			line_items: lineItems,
			client_reference_id: userId,
			mode: 'payment',
			ui_mode: 'custom',
			return_url: 'http://localhost:3002/return?session_id={CHECKOUT_SESSION_ID}',
		})

		// console.log(session);

		return c.json({ checkoutSessionClientSecret: session.client_secret })
	} catch (error) {
		console.log(error)

		return c.json({ error: (error as Error).message })
	}
})

sessionRoute.get('/:session_id', async (c) => {
	const { session_id } = c.req.param()

	const session = await stripe.checkout.sessions.retrieve(session_id as string, {
		expand: ['line_items'],
	})

	// console.log(session);

	return c.json({
		status: session.status,
		paymentStatus: session.payment_status,
	})
})

export default sessionRoute
