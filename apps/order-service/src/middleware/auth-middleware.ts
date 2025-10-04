import Clerk from '@clerk/fastify'
import { FastifyReply, FastifyRequest } from 'fastify'
import type { ClerkClientUserRole } from '@repo/types'

declare module 'fastify' {
	interface FastifyRequest {
		userId?: string
	}
}

export const shouldBeUser = async (req: FastifyRequest, reply: FastifyReply) => {
	const { userId } = Clerk.getAuth(req)
	if (!userId) {
		return reply.status(401).send({ message: 'You are not logged in!' })
	}

	req.userId = userId
}

export const shouldBeAdmin = async (req: FastifyRequest, reply: FastifyReply) => {
	const auth = Clerk.getAuth(req)
	if (!auth.userId) {
		return reply.status(401).send({ message: 'You are not logged in!' })
	}

	const user = (await Clerk.clerkClient.users.getUser(auth.userId)) as ClerkClientUserRole

	if (user.privateMetadata?.role !== 'admin') {
		return reply.status(403).send({ message: 'Unauthorized!' })
	}

	req.userId = auth.userId
}
