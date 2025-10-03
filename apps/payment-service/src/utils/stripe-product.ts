import { StripeProductType } from '@repo/types'

import { stripe } from './stripe'

export const createStripeProduct = async (item: StripeProductType) => {
	try {
		// 1️⃣ Check if the product exists
		let existingProduct

		try {
			existingProduct = await stripe.products.retrieve(item.id)
		} catch (error: Error | any) {
			// If the product doesn't exist, Stripe will throw an error with code "resource_missing"
			if (error.code !== 'resource_missing') throw error
		}

		// 2️⃣ If the product is found
		if (existingProduct) {
			if (!existingProduct.active) {
				console.log(`♻️ Reactivating archived product: ${item.id}`)

				// Reactivate the product
				await stripe.products.update(item.id, {
					active: true,
					name: item.name,
				})
			} else {
				console.log(`🔁 Product ${item.id} already exists and is active — updating`)
			}

			// 3️⃣ Get all existing prices
			const prices = await stripe.prices.list({
				product: item.id,
				limit: 100,
			})

			// 4️⃣ Deactivate all old prices
			for (const price of prices.data) {
				if (price.active) {
					await stripe.prices.update(price.id, { active: false })
					console.log(`📉 Deactivated old price: ${price.id}`)
				}
			}

			// 5️⃣ Create a new price
			const newPrice = await stripe.prices.create({
				product: item.id,
				currency: 'usd',
				unit_amount: Math.round(item.price * 100),
			})

			// 6️⃣ Set the new price as default_price
			const updatedProduct = await stripe.products.update(item.id, {
				default_price: newPrice.id,
			})

			console.log(`✅ Reactivated or updated product ${item.name} with new price ${newPrice.id}`)
			return updatedProduct
		}

		// 7️⃣ If the product doesn't exist, create it
		const res = await stripe.products.create({
			id: item.id,
			name: item.name,
			default_price_data: {
				currency: 'usd',
				unit_amount: Math.round(item.price * 100),
			},
		})

		console.log(`✅ Created new Stripe product for ${item.name}: ${res.id}`)
		return res
	} catch (error) {
		console.error('❌ Failed to create or reactivate Stripe product:', error)
		throw error
	}
}

export const getStripeProductPrice = async (productId: string) => {
	try {
		const res = await stripe.prices.list({
			product: productId,
		})

		if (!res.data.length) {
			console.warn(`⚠️ No Stripe product found for delete product ID: ${productId}`)

			return
		}

		return res.data[0]?.unit_amount
	} catch (error) {
		console.error('❌ Failed to get Stripe product:', error)

		return error
	}
}

export const deleteStripeProduct = async (productId: string) => {
	console.log('🗑️ Deleting Stripe product:', productId)

	try {
		// First, remove the default price from the product
		await stripe.products.update(productId, {
			default_price: null as unknown as string,
		})

		console.log(`📉 Removed default price from product: ${productId}`)

		// Then, list all prices for the product
		const prices = await stripe.prices.list({
			product: productId,
			limit: 100, // Stripe max 100
		})

		// Deactivate all active prices
		for (const price of prices.data) {
			await stripe.prices.update(price.id, { active: false })

			console.log(`📉 Deactivated price: ${price.id}`)
		}

		// Now delete the product
		try {
			const deletedProduct = await stripe.products.del(productId)

			console.log('✅ Deleted Stripe product:', productId)

			return deletedProduct
		} catch (deleteError: Error | any) {
			if (deleteError.message?.includes('user-created prices')) {
				console.warn(
					`⚠️ Cannot delete product ${productId} because it has user-created prices. Archiving instead.`,
				)

				await stripe.products.update(productId, { active: false })

				return { id: productId, archived: true }
			}

			throw deleteError
		}
	} catch (error) {
		console.error('❌ Failed to delete Stripe product:', error)

		throw error
	}
}
