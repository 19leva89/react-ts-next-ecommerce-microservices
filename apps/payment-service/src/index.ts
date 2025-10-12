import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { clerkMiddleware } from '@hono/clerk-auth'

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

// Initialize Kafka (always, regardless of env)
const initializeKafkaAndSubscriptions = async () => {
	try {
		await Promise.all([producer.connect(), consumer.connect()])

		await runKafkaSubscriptions()

		console.log('Kafka connected and subscriptions running')
	} catch (error) {
		console.error('Kafka initialization failed:', error)

		if (process.env.NODE_ENV === 'production') {
			process.exit(1)
		}
	}
}

if (process.env.NODE_ENV !== 'production') {
	// For dev/local only: starting the server
	const startServer = async () => {
		await initializeKafkaAndSubscriptions()

		const port = Number(process.env.NEXT_PUBLIC_PAYMENT_SERVICE_PORT || 8002)

		serve(
			{
				fetch: app.fetch,
				port,
			},
			() => {
				console.log(`Payment-service is running on port ${port}`)
			},
		)
	}

	startServer()
} else {
	// In production: initialize Kafka, but don't listen to the port (Vercel will handle it automatically)
	initializeKafkaAndSubscriptions()
}

// Export for Vercel/serverless
export default app
