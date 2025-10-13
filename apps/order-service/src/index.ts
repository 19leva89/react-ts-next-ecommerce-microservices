import Fastify from 'fastify'
import cors from '@fastify/cors'
import { createRequire } from 'module'
import { connectOrderDB } from '@repo/order-db'

import { orderRoute } from './routes/order.js'
import { shouldBeUser } from './middleware/auth-middleware.js'

const require = createRequire(import.meta.url)
const { clerkPlugin } = require('@clerk/fastify')

const fastify = Fastify({
	logger: true,
})

await fastify.register(cors, {
	origin: [`${process.env.NEXT_PUBLIC_ADMIN_URL}`],
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	credentials: true,
})

fastify.register(clerkPlugin, {
	secretKey: process.env.CLERK_SECRET_KEY,
	publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
})

fastify.get('/health', (_req, reply) => {
	return reply.status(200).send({
		status: 'ok',
		uptime: process.uptime(),
		timestamp: Date.now(),
	})
})

fastify.get('/test', { preHandler: shouldBeUser }, (req, reply) => {
	return reply.send({
		message: 'Order service is authenticated!',
		userId: req.userId,
	})
})

fastify.register(orderRoute)

// Initialization of services
const initializeServices = async () => {
	try {
		// In serverless/production: only DB connection
		if (process.env.NODE_ENV === 'production') {
			await connectOrderDB()
			console.log('DB initialized (serverless mode)')
		} else {
			// In dev: full initialization with Kafka (dynamic import)
			const { consumer, producer } = await import('./utils/kafka.js')
			const { runKafkaSubscriptions } = await import('./utils/subscriptions.js')

			await Promise.all([connectOrderDB(), producer.connect(), consumer.connect()])
			await runKafkaSubscriptions()

			console.log('All services initialized (dev mode)')
		}
	} catch (error) {
		fastify.log.error({ error }, 'Services initialization failed')
		process.exit(1)
	}
}

if (process.env.NODE_ENV !== 'production') {
	// For dev/local only: starting the server
	const startServer = async () => {
		await initializeServices()

		const port = Number(process.env.NEXT_PUBLIC_ORDER_SERVICE_PORT || '8001')

		await fastify.listen({ port })

		console.log(`Order service is running on port ${port}`)
	}

	startServer().catch((error) => {
		fastify.log.error('Failed to start server:', error)

		process.exit(1)
	})
} else {
	// In production: initialize services (DB only for serverless)
	await initializeServices()
}

// Export app for serverless deployments
export default fastify
