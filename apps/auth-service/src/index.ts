import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'
import express, { NextFunction, Request, Response } from 'express'

import userRoute from './routes/user.route'
import { producer } from './utils/kafka.js'
import { shouldBeAdmin } from './middleware/auth-middleware.js'

const app = express()

app.use(
	cors({
		origin: [`${process.env.NEXT_PUBLIC_ADMIN_URL}`],
		credentials: true,
	}),
)
app.use(express.json())
app.use(clerkMiddleware())

app.get('/health', (_req: Request, res: Response) => {
	return res.status(200).json({
		status: 'ok',
		uptime: process.uptime(),
		timestamp: Date.now(),
	})
})

app.use('/users', shouldBeAdmin, userRoute)

interface AppError extends Error {
	status?: number
}

app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
	console.log(err)

	return res.status(err.status || 500).json({ message: err.message || 'Inter Server Error!' })
})

const start = async () => {
	try {
		await producer.connect()

		app.listen(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT}` || 8003, () => {
			console.log(`Auth service is running on ${process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT}`)
		})
	} catch (error) {
		console.log(error)

		process.exit(1)
	}
}

start()
