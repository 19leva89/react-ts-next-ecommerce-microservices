import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { clerkMiddleware } from '@hono/clerk-auth'

import sessionRoute from './routes/session.route'
import webhookRoute from './routes/webhooks.route'
import { consumer, producer } from './utils/kafka'
import { runKafkaSubscriptions } from './utils/subscriptions'

const app = new Hono()

app.use(
	'*',
	clerkMiddleware({
		secretKey: process.env.CLERK_SECRET_KEY,
		publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
	}),
)
app.use('*', cors({ origin: [`${process.env.NEXT_PUBLIC_CLIENT_URL}`] }))

app.get('/health', (ctx) => {
	return ctx.json({
		status: 'ok',
		uptime: process.uptime(),
		timestamp: Date.now(),
	})
})

app.route('/sessions', sessionRoute)
app.route('/webhooks', webhookRoute)

const start = async () => {
	try {
		await Promise.all([producer.connect(), consumer.connect()])

		await runKafkaSubscriptions()

		serve(
			{
				fetch: app.fetch,
				port: Number(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_PORT}` || 8002),
			},
			(info) => {
				console.log(`Payment-service is running on port ${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_PORT}`)
				console.log(`Server info:`, info)
			},
		)
	} catch (error) {
		console.error('Failed to start payment-service:', error)

		process.exit(1)
	}
}

start()
