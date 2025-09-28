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
		.min(7, 'Phone number must be between 7 and 10 digits!')
		.max(10, 'Phone number must be between 7 and 10 digits!')
		.regex(/^\d+$/, 'Phone number must contain only numbers!'),
	address: z.string().min(2, 'Address is required!'),
	city: z.string().min(2, 'City is required!'),
})

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>

export type CartStoreStateType = {
	cart: CartItemsType
	hasHydrated: boolean
}

export type CartStoreActionsType = {
	addToCart: (product: CartItemType) => void
	removeFromCart: (product: CartItemType) => void
	clearCart: () => void
}
