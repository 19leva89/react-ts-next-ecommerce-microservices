import { OrderCreatedMessage, UserCreatedMessage } from '@repo/types'

import { consumer } from './utils/kafka.js'
import { sendMail } from './utils/mailer.js'

const start = async () => {
	try {
		await consumer.connect()

		await consumer.subscribe([
			{
				topicName: 'user.created',
				topicHandler: async (message) => {
					const { email, username } = message.value as UserCreatedMessage

					if (email) {
						await sendMail({
							to: email,
							subject: 'Welcome to E-commerce App',
							text: `Welcome ${username}. You account has been created!`,
						})
					}
				},
			},
			{
				topicName: 'user.updated',
				topicHandler: async (message) => {
					const { email, username } = message.value as UserCreatedMessage

					if (email) {
						await sendMail({
							to: email,
							subject: 'E-commerce App',
							text: `Hello ${username}. You account has been updated!`,
						})
					}
				},
			},
			{
				topicName: 'order.created',
				topicHandler: async (message) => {
					const { email, amount, status } = message.value as OrderCreatedMessage

					if (email) {
						await sendMail({
							to: email,
							subject: 'Order has been created',
							text: `Hello! Your order: Amount: ${amount / 100}, Status: ${status}`,
						})
					}
				},
			},
		])
	} catch (error) {
		console.log(error)
	}
}

start()
