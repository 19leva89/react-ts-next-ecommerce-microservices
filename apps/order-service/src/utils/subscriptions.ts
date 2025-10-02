import { consumer } from './kafka'
import { createOrder } from './order'
import { OrderType } from '@repo/types'

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
