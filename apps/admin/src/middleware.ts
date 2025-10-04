import { ClerkClientUserRole } from '@repo/types'
import { clerkClient, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/not-auth(.*)'])

export default clerkMiddleware(async (auth, req) => {
	if (!isPublicRoute(req)) {
		await auth.protect()

		const { userId } = await auth()

		if (userId) {
			const client = await clerkClient()

			const user = (await client.users.getUser(userId)) as ClerkClientUserRole

			const userRole = user.privateMetadata?.role

			if (userRole !== 'admin') {
				return Response.redirect(new URL('/not-auth', req.url))
			}
		}
	}
})

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
}
