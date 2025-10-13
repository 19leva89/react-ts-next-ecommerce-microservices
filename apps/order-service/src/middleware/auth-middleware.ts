import clerkFastify from '@clerk/fastify'
import type { ClerkClientUserRole } from '@repo/types'
import { FastifyReply, FastifyRequest } from 'fastify'

const { clerkClient, getAuth } = clerkFastify

declare module 'fastify' {
	interface FastifyRequest {
		userId?: string
	}
}

export const shouldBeUser = async (req: FastifyRequest, reply: FastifyReply) => {
	const { userId } = getAuth(req)
	if (!userId) {
		return reply.status(401).send({ message: 'You are not logged in!' })
	}

	req.userId = userId
}

export const shouldBeAdmin = async (req: FastifyRequest, reply: FastifyReply) => {
	const auth = getAuth(req)
	if (!auth.userId) {
		return reply.status(401).send({ message: 'You are not logged in!' })
	}

	const user = (await clerkClient.users.getUser(auth.userId)) as ClerkClientUserRole

	if (user.privateMetadata?.role !== 'admin') {
		return reply.status(403).send({ message: 'Unauthorized!' })
	}

	req.userId = auth.userId
}
