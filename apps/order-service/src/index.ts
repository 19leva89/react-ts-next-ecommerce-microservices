import Fastify from 'fastify'
import cors from '@fastify/cors'
import clerkFastify from '@clerk/fastify'
import { connectOrderDB } from '@repo/order-db'

import { orderRoute } from './routes/order.js'
import { consumer, producer } from './utils/kafka.js'
import { shouldBeUser } from './middleware/auth-middleware.js'
import { runKafkaSubscriptions } from './utils/subscriptions.js'

const { clerkPlugin } = clerkFastify

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

// Initialization of services (DB, Kafka, subscriptions)
const initializeServices = async () => {
	try {
		await Promise.all([connectOrderDB(), producer.connect(), consumer.connect()])
		await runKafkaSubscriptions()

		console.log('Services initialized')
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
	// In production: only initialization of services, Vercel will handle fastify itself
	initializeServices()
}

// Export app for serverless deployments
export default fastify
