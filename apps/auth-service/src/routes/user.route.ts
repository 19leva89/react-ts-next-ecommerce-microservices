import { Router } from 'express'

import clerkClient from '../utils/clerk'
import { producer } from '../utils/kafka'

const router: Router = Router()

router.post('/', async (req, res) => {
	type CreateParams = Parameters<typeof clerkClient.users.createUser>[0]

	try {
		const newUser: CreateParams = req.body
		const user = await clerkClient.users.createUser(newUser)

		producer.send('user.created', {
			value: {
				username: user.username,
				email: user.emailAddresses[0]?.emailAddress,
			},
		})

		res.status(200).json(user)
	} catch (error: Error | any) {
		if (error.clerkError) {
			// For Clerk errors
			return res.status(error.status).json({
				success: false,
				message: error.message || 'Clerk API error',
				errors: error.errors || [],
				clerkTraceId: error.clerkTraceId,
			})
		}

		// For other errors
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
})

router.get('/', async (_req, res) => {
	const users = await clerkClient.users.getUserList()

	res.status(200).json(users)
})

router.get('/:id', async (req, res) => {
	const { id } = req.params
	const user = await clerkClient.users.getUser(id)

	res.status(200).json(user)
})

router.put('/:id', async (req, res) => {
	type UpdateParams = Parameters<typeof clerkClient.users.updateUser>[1]

	const { id } = req.params

	try {
		const updatedUser: UpdateParams = req.body
		const user = await clerkClient.users.updateUser(id, updatedUser)

		producer.send('user.updated', {
			value: {
				username: user.username,
				email: user.emailAddresses[0]?.emailAddress,
			},
		})

		res.status(200).json(user)
	} catch (error: Error | any) {
		if (error.clerkError) {
			// For Clerk errors
			return res.status(error.status).json({
				success: false,
				message: error.message || 'Clerk API error',
				errors: error.errors || [],
				clerkTraceId: error.clerkTraceId,
			})
		}

		// For other errors
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
})

router.delete('/:id', async (req, res) => {
	const { id } = req.params
	const user = await clerkClient.users.deleteUser(id)

	res.status(200).json(user)
})

export default router
