import { Hono } from 'hono'
import Stripe from 'stripe'

import { stripe } from '../utils/stripe.js'
import { producer } from '../utils/kafka.js'

const webhookRoute = new Hono()
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string

webhookRoute.post('/stripe', async (ctx) => {
	const body = await ctx.req.text()
	const sig = ctx.req.header('stripe-signature')

	let event: Stripe.Event

	try {
		event = stripe.webhooks.constructEvent(body, sig!, webhookSecret)
	} catch (error) {
		console.log('Webhook verification failed!')

		return ctx.json({ error: 'Webhook verification failed!' }, 400)
	}

	switch (event.type) {
		case 'checkout.session.completed':
			const session = event.data.object as Stripe.Checkout.Session

			const lineItems = await stripe.checkout.sessions.listLineItems(session.id)

			producer.send('payment.successful', {
				value: {
					userId: session.client_reference_id,
					email: session.customer_details?.email,
					amount: session.amount_total,
					status: session.payment_status === 'paid' ? 'success' : 'failed',
					products: lineItems.data.map((item) => ({
						name: item.description,
						quantity: item.quantity,
						price: item.price?.unit_amount,
					})),
				},
			})

			break

		default:
			break
	}

	return ctx.json({ received: true })
})

webhookRoute.get('/', (ctx) => {
	return ctx.json({
		status: 'ok webhook',
		uptime: process.uptime(),
		timestamp: Date.now(),
	})
})

export default webhookRoute
