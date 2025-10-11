import type { StripeProductType } from '@repo/types'

import { consumer } from './kafka.js'
import { createStripeProduct, deleteStripeProduct } from './stripe-product.js'

export const runKafkaSubscriptions = async () => {
	await consumer.subscribe([
		{
			topicName: 'product.created',
			topicHandler: async (message) => {
				const product = message.value as StripeProductType
				console.log('📦 Received message: product.created', product)

				if (!product?.id || !product?.name || !product?.price) {
					console.error('❌ Invalid product data:', product)

					return
				}

				await createStripeProduct(product)
			},
		},
		{
			topicName: 'product.deleted',
			topicHandler: async (message) => {
				const productId = message.value as string
				console.log('🗑️ Received message: product.deleted', productId)

				if (!productId) {
					console.error('❌ Invalid product ID:', productId)

					return
				}

				await deleteStripeProduct(productId)
			},
		},
	])
}
