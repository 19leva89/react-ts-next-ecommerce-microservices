import z from 'zod'
import { Category } from '@repo/product-db'

export type CategoryType = Category

export const categoryFormSchema = z.object({
	name: z.string({ message: 'Name is required!' }).min(1, { message: 'Name is required!' }),
	slug: z.string({ message: 'Slug is required!' }).min(1, { message: 'Slug is required!' }),
	icon: z.string({ message: 'Icon is required!' }).min(1, { message: 'Icon is required!' }),
})

export type TCategoryForm = z.infer<typeof categoryFormSchema>
