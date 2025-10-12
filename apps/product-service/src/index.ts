import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'
import express, { Express, NextFunction, Request, Response } from 'express'

import productRouter from './routes/product.route.js'
import categoryRouter from './routes/category.route.js'
import { consumer, producer } from './utils/kafka.js'
import { shouldBeUser } from './middleware/auth-middleware.js'

interface AppError extends Error {
	status?: number
}

const app: Express = express()

app.use(
	cors({
		origin: [`${process.env.NEXT_PUBLIC_CLIENT_URL}`, `${process.env.NEXT_PUBLIC_ADMIN_URL}`],
		credentials: true,
	}),
)
app.use(express.json())
app.use(
	clerkMiddleware({
		secretKey: process.env.CLERK_SECRET_KEY,
		publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
	}),
)

app.get('/health', (_req: Request, res: Response) => {
	return res.status(200).json({
		status: 'ok',
		uptime: process.uptime(),
		timestamp: Date.now(),
	})
})

app.get('/test', shouldBeUser, (req, res) => {
	res.json({ message: 'Product service authenticated', userId: req.userId })
})

app.use('/products', productRouter)
app.use('/categories', categoryRouter)

app.use((error: AppError, _req: Request, res: Response, _next: NextFunction) => {
	console.log(error)

	return res.status(error.status || 500).json({ message: error.message || 'Inter Server Error!' })
})

// Initialize Kafka (always, regardless of env)
const initializeKafka = async () => {
	try {
		await Promise.all([producer.connect(), consumer.connect()])

		console.log('Kafka connected')
	} catch (error) {
		console.error('Kafka connection failed:', error)

		process.exit(1)
	}
}

if (process.env.NODE_ENV !== 'production') {
	// For dev/local only: starting the server
	const startServer = async () => {
		await initializeKafka()

		const port = 8000

		app.listen(port, () => {
			console.log(`Product service is running on port ${port}`)
		})
	}

	startServer()
} else {
	// In production: initialize Kafka, but don't listen to the port (Vercel will handle it automatically)
	initializeKafka()
}

// Export for Vercel/serverless
export default app
