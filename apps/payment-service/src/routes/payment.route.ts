import Stripe from 'stripe'
import dotenv from 'dotenv'
import { Hono } from 'hono'

import { shouldBeUser } from '../middleware/auth-middleware'

dotenv.config({ path: '.env.local' })
dotenv.config() // fallback на .env

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const paymentRoute = new Hono()

interface CartItem {
	id: string
	price: number
	quantity: number
	name?: string
}

interface CreateIntentBody {
	cart: CartItem[]
}

paymentRoute.post('/create-intent', shouldBeUser, async (c) => {
	try {
		const body = (await c.req.json()) as CreateIntentBody
		const { cart } = body

		if (!cart || !Array.isArray(cart)) {
			return c.json({ error: 'Invalid cart data' }, 400)
		}

		// Calculate total amount
		const amount = cart.reduce((sum: number, item: CartItem) => {
			if (!item.price || !item.quantity) return sum

			return sum + item.price * item.quantity
		}, 0)

		// Empty cart check
		if (amount <= 0) {
			return c.json({ error: 'Cart total must be greater than 0' }, 400)
		}

		// Create PaymentIntent
		const paymentIntent = await stripe.paymentIntents.create({
			currency: 'usd',
			amount: Math.round(amount * 100),
			automatic_payment_methods: { enabled: true },
		})

		return c.json({
			clientSecret: paymentIntent.client_secret,
		})
	} catch (err) {
		console.error('Error creating PaymentIntent:', err)

		const message = err instanceof Error ? err.message : 'Internal Server Error'

		return c.json({ error: message }, 500)
	}
})

paymentRoute.get('/:payment_intent', async (c) => {
	const payment_intent = c.req.param('payment_intent')

	if (!payment_intent) {
		return c.json({ error: 'PaymentIntent ID is required' }, 400)
	}

	try {
		const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent)

		return c.json({
			amount_received: paymentIntent.amount_received,
			currency: paymentIntent.currency,
			status: paymentIntent.status,
			shipping: paymentIntent.shipping,
		})
	} catch (err) {
		console.error(err)

		const message = err instanceof Error ? err.message : 'Internal Server Error'

		return c.json({ error: message }, 500)
	}
})

export default paymentRoute
