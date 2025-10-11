import { Hono } from 'hono'
import type { CartItemsType } from '@repo/types'

import { stripe } from '../utils/stripe'
import { shouldBeUser } from '../middleware/auth-middleware'
import { getStripeProductPrice } from '../utils/stripe-product'

const sessionRoute = new Hono()

sessionRoute.post('/create-checkout-session', shouldBeUser, async (ctx) => {
	const userId = ctx.get('userId')
	const { cart }: { cart: CartItemsType } = await ctx.req.json()

	const lineItems = await Promise.all(
		cart.map(async (item) => {
			const unitAmount = await getStripeProductPrice(item.id)

			return {
				price_data: {
					currency: 'usd',
					product_data: {
						name: item.name,
					},
					unit_amount: unitAmount as number,
				},
				quantity: item.quantity,
			}
		}),
	)

	// console.log('lineItems:', lineItems)

	try {
		const session = await stripe.checkout.sessions.create({
			ui_mode: 'custom',
			line_items: lineItems,
			mode: 'payment',
			client_reference_id: userId,
			return_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
		})

		// console.log('session:', session)

		return ctx.json({ clientSecret: session.client_secret })
	} catch (error) {
		console.log(error)

		return ctx.json({ error: (error as Error).message })
	}
})

sessionRoute.get('/:session_id', shouldBeUser, async (ctx) => {
	const { session_id } = ctx.req.param()

	try {
		const session = await stripe.checkout.sessions.retrieve(session_id, {
			expand: ['line_items'],
		})

		return ctx.json({
			status: session.status,
			amount_total: session.amount_total,
			currency: session.currency,
		})
	} catch (error) {
		console.error('Backend session retrieve error:', error)

		// Type guard for unknown error
		if (error && typeof error === 'object' && 'type' in error && error.type === 'StripeInvalidRequestError') {
			ctx.status(404)

			return ctx.json({ error: 'Session not found' })
		}

		ctx.status(500)
		return ctx.json({ error: error instanceof Error ? error.message : 'Unknown error' })
	}
})

export default sessionRoute
