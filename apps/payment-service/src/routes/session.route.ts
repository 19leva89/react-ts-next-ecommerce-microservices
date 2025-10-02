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

	// console.log('lineItems:', lineItems)

	try {
		const session = await stripe.checkout.sessions.create({
			line_items: lineItems,
			client_reference_id: userId,
			mode: 'payment',
			ui_mode: 'custom',
			return_url: 'http://localhost:3002/return?session_id={CHECKOUT_SESSION_ID}',
		})

		// console.log('session:', session)

		return c.json({ client_secret: session.client_secret })
	} catch (error) {
		console.log(error)

		return c.json({ error: (error as Error).message })
	}
})

sessionRoute.get('/:session_id', shouldBeUser, async (c) => {
	const { session_id } = c.req.param()

	try {
		const session = await stripe.checkout.sessions.retrieve(session_id, {
			expand: ['line_items'],
		})

		return c.json({
			status: session.status,
			amount_total: session.amount_total,
			currency: session.currency,
		})
	} catch (error) {
		console.error('Backend session retrieve error:', error)

		// Type guard for unknown error
		if (error && typeof error === 'object' && 'type' in error && error.type === 'StripeInvalidRequestError') {
			c.status(404)

			return c.json({ error: 'Session not found' })
		}

		c.status(500)
		return c.json({ error: error instanceof Error ? error.message : 'Unknown error' })
	}
})

export default sessionRoute
