import { StripeProductType } from '@repo/types'

import { stripe } from './stripe'

export const createStripeProduct = async (item: StripeProductType) => {
	try {
		const res = await stripe.products.create({
			name: item.name,
			default_price_data: {
				currency: 'usd',
				unit_amount: Math.round(item.price * 100),
			},
			metadata: {
				local_id: item.id,
			},
		})

		console.log(`✅ Created Stripe product for ${item.name}: ${res.id}`)

		return res
	} catch (error) {
		console.error('❌ Failed to create Stripe product:', error)

		return error
	}
}

export const getStripeProductPrice = async (productId: string) => {
	try {
		const res = await stripe.prices.list({
			product: productId,
		})

		return res.data[0]?.unit_amount
	} catch (error) {
		console.log(error)

		return error
	}
}

export const deleteStripeProduct = async (localProductId: string) => {
	try {
		const list = await stripe.products.list({ limit: 100 })

		const stripeProduct = list.data.find((p) => p.metadata?.local_id === localProductId)

		if (!stripeProduct) {
			console.warn(`⚠️ No Stripe product found for local ID ${localProductId}`)

			return
		}

		const res = await stripe.products.del(stripeProduct.id)
		console.log(`🗑️ Deleted Stripe product ${stripeProduct.id}`)

		return res
	} catch (error) {
		console.error('❌ Failed to delete Stripe product:', error)

		return error
	}
}
