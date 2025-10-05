import z from 'zod'
import type { Product } from '@repo/product-db'

export type ProductType = Product

export type ProductsType = ProductType[]

export type StripeProductType = {
	id: string
	name: string
	price: number
}

export const colors = [
	'blue',
	'green',
	'red',
	'yellow',
	'purple',
	'orange',
	'pink',
	'brown',
	'gray',
	'black',
	'white',
] as const

export const sizes = [
	'xs',
	's',
	'm',
	'l',
	'xl',
	'xxl',
	'34',
	'35',
	'36',
	'37',
	'38',
	'39',
	'40',
	'41',
	'42',
	'43',
	'44',
	'45',
	'46',
	'47',
	'48',
] as const

export const productFormSchema = z
	.object({
		name: z.string({ message: 'Product name is required!' }).min(1, { message: 'Product name is required!' }),
		shortDescription: z
			.string({ message: 'Short description is required!' })
			.min(1, { message: 'Short description is required!' })
			.max(60),
		description: z
			.string({ message: 'Description is required!' })
			.min(1, { message: 'Description is required!' }),
		price: z.number({ message: 'Price is required!' }).min(1, { message: 'Price is required!' }),
		categorySlug: z.string({ message: 'Category is required!' }).min(1, { message: 'Category is required!' }),
		sizes: z.array(z.enum(sizes)).min(1, { message: 'At least one size is required!' }),
		colors: z.array(z.enum(colors)).min(1, { message: 'At least one color is required!' }),
		images: z.record(z.string(), z.string(), {
			message: 'Image for each color is required!',
		}),
	})
	.refine(
		(data) => {
			const missingImages = data.colors.filter((color: string) => !data.images?.[color])

			return missingImages.length === 0
		},
		{
			message: 'Image is required for each selected color!',
			path: ['images'],
		},
	)

export type TProductForm = z.infer<typeof productFormSchema>
