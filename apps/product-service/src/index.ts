import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'
import express, { NextFunction, Request, Response } from 'express'

import productRouter from './routes/product.route'
import categoryRouter from './routes/category.route'
import { consumer, producer } from './utils/kafka.js'
import { shouldBeUser } from './middleware/auth-middleware.js'

const app = express()

app.use(
	cors({
		origin: ['http://localhost:3002', 'http://localhost:3003'],
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

interface AppError extends Error {
	status?: number
}

app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
	console.log(err)

	return res.status(err.status || 500).json({ message: err.message || 'Inter Server Error!' })
})

const start = async () => {
	try {
		await Promise.all([producer.connect(), consumer.connect()])

		app.listen(8000, () => {
			console.log('Product service is running on 8000')
		})
	} catch (error) {
		console.log(error)

		process.exit(1)
	}
}

start()
