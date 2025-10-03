import Fastify from 'fastify'
import Clerk from '@clerk/fastify'
import { connectOrderDB } from '@repo/order-db'

import { orderRoute } from './routes/order.js'
import { consumer, producer } from './utils/kafka.js'
import { shouldBeUser } from './middleware/auth-middleware.js'
import { runKafkaSubscriptions } from './utils/subscriptions.js'

const fastify = Fastify()

fastify.register(Clerk.clerkPlugin, {
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

const start = async () => {
	try {
		await Promise.all([connectOrderDB(), producer.connect(), consumer.connect()])

		await runKafkaSubscriptions()
		await fastify.listen({ port: Number(`${process.env.NEXT_PUBLIC_ORDER_SERVICE_PORT}` || 8001) })

		console.log(`Order service is running on port ${process.env.NEXT_PUBLIC_ORDER_SERVICE_PORT}`)
	} catch (err) {
		console.log(err)

		process.exit(1)
	}
}

start()
