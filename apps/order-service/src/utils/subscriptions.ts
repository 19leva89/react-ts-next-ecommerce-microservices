import { OrderType } from '@repo/types'

import { consumer } from './kafka.js'
import { createOrder } from './order.js'

export const runKafkaSubscriptions = async () => {
	consumer.subscribe([
		{
			topicName: 'payment.successful',
			topicHandler: async (message) => {
				const order = message.value as OrderType

				if (!order || typeof order !== 'object') {
					throw new Error('Invalid order data received')
				}

				await createOrder(order)
			},
		},
	])
}
