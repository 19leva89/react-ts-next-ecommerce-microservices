import { ClerkClientUserRole } from '@repo/types'
import { clerkClient, getAuth } from '@clerk/express'
import { Request, Response, NextFunction } from 'express'

declare global {
	namespace Express {
		interface Request {
			userId?: string
		}
	}
}

export const shouldBeUser = async (req: Request, res: Response, next: NextFunction) => {
	const auth = getAuth(req)

	if (!auth.userId) {
		return res.status(401).json({ message: 'You are not logged in!' })
	}

	req.userId = auth.userId

	return next()
}

export const shouldBeAdmin = async (req: Request, res: Response, next: NextFunction) => {
	const auth = getAuth(req)

	if (!auth.userId) {
		return res.status(401).json({ message: 'You are not logged in!' })
	}

	const user = (await clerkClient.users.getUser(auth.userId)) as ClerkClientUserRole

	if (user.privateMetadata?.role !== 'admin') {
		return res.status(403).send({ message: 'Unauthorized!' })
	}

	req.userId = auth.userId

	return next()
}
