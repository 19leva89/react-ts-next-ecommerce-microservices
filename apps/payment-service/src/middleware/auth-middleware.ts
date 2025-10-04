import { getAuth } from '@hono/clerk-auth'
import { createMiddleware } from 'hono/factory'
import { ClerkClientUserRole } from '@repo/types'

export const shouldBeUser = createMiddleware<{
	Variables: {
		userId: string
	}
}>(async (ctx, next) => {
	const auth = getAuth(ctx)

	if (!auth?.userId) {
		return ctx.json({
			message: 'You are not logged in',
		})
	}

	ctx.set('userId', auth.userId)

	await next()
})

export const shouldBeAdmin = createMiddleware<{
	Variables: {
		userId: string
	}
}>(async (ctx, next) => {
	const auth = getAuth(ctx)

	if (!auth?.userId) {
		return ctx.json({
			message: 'You are not logged in',
		})
	}

	const clerkClient = ctx.get('clerk')
	const user = (await clerkClient.users.getUser(auth.userId)) as ClerkClientUserRole

	if (user.privateMetadata?.role !== 'admin') {
		return ctx.json({ message: 'Unauthorized!' })
	}

	ctx.set('userId', auth.userId)

	await next()
})
