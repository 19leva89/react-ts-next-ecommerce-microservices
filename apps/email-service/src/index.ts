import { createConsumer, createKafkaClient, createKafkaTopic } from '@repo/kafka'

import { sendMail } from './utils/mailer'

const kafkaClient = createKafkaClient('email-service')

await createKafkaTopic(kafkaClient, 'user.created')
await createKafkaTopic(kafkaClient, 'order.created')

const consumer = createConsumer(kafkaClient, 'email-service')

const start = async () => {
	try {
		await consumer.connect()

		await consumer.subscribe([
			{
				topicName: 'user.created',
				topicHandler: async (message) => {
					const { email, username } = message.value

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
				topicName: 'order.created',
				topicHandler: async (message) => {
					const { email, amount, status } = message.value

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
