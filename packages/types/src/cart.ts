import z from 'zod'
import type { Product } from '@repo/product-db'

export type CartItemType = Product & {
	quantity: number
	selectedSize: string
	selectedColor: string
}

export type CartItemsType = CartItemType[]

export const shippingFormSchema = z.object({
	name: z.string().min(2, 'Name is required!'),
	email: z.email({ message: 'Invalid email address!' }).min(2, 'Email is required!'),
	phone: z
		.string()
		.regex(
			/^(?:\+\d{7,15}|\d{7,10})$/,
			'Phone number must be 7–10 digits or start with + and contain up to 15 digits',
		),
	address: z.string().min(2, 'Address is required!'),
	city: z.string().min(2, 'City is required!'),
})

export type TShippingForm = z.infer<typeof shippingFormSchema>

export type CartStoreStateType = {
	cart: CartItemsType
	hasHydrated: boolean
}

export type CartStoreActionsType = {
	addToCart: (product: CartItemType) => void
	removeFromCart: (product: CartItemType) => void
	clearCart: () => void
}
