import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'
import express, { NextFunction, Request, Response } from 'express'

import productRouter from './routes/product.route.js'
import categoryRouter from './routes/category.route.js'
import { consumer, producer } from './utils/kafka.js'
import { shouldBeUser } from './middleware/auth-middleware.js'

interface AppError extends Error {
	status?: number
}

const app = express()

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

const start = async () => {
	try {
		await Promise.all([producer.connect(), consumer.connect()])

		app.listen(Number(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_PORT}` || 8000), () => {
			console.log(`Product service is running on port ${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_PORT}`)
		})
	} catch (error) {
		console.log(error)

		process.exit(1)
	}
}

start()
