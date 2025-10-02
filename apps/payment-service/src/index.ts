import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { clerkMiddleware } from '@hono/clerk-auth'

import paymentRoute from './routes/payment.route.js'
import sessionRoute from './routes/session.route.js'
import webhookRoute from './routes/webhooks.route.js'
import { consumer, producer } from './utils/kafka.js'
import { runKafkaSubscriptions } from './utils/subscriptions.js'

const app = new Hono()

app.use(
	'*',
	clerkMiddleware({
		secretKey: process.env.CLERK_SECRET_KEY,
		publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
	}),
)
app.use('*', cors({ origin: ['http://localhost:3002'] }))

app.get('/health', (c) => {
	return c.json({
		status: 'ok',
		uptime: process.uptime(),
		timestamp: Date.now(),
	})
})

app.route('/sessions', sessionRoute)
app.route('/webhooks', webhookRoute)
app.route('/payments', paymentRoute)

const start = async () => {
	try {
		console.log('Starting payment-service...')

		await producer.connect()
		console.log('Kafka payment-service producer connected')

		await consumer.connect()
		console.log('Kafka payment-service consumer connected')

		await runKafkaSubscriptions()
		console.log('Kafka payment-service subscriptions started')

		serve(
			{
				fetch: app.fetch,
				port: 8002,
			},
			(info) => {
				console.log(`Payment-service is running on port 8002`)
				console.log(`Server info:`, info)
			},
		)
	} catch (error) {
		console.error('Failed to start payment-service:', error)

		process.exit(1)
	}
}

start()
