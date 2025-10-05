import z from 'zod'
import { OrderSchemaType } from '@repo/order-db'

export type OrderType = OrderSchemaType & {
	_id: string
}

export type OrderChartType = {
	month: string
	total: number
	successful: number
}

export const addOrderFormSchema = z.object({
	amount: z.number().min(1, { message: 'Amount must be at least 1!' }),
	userId: z.string().min(1, { message: 'User Id is required!' }),
	status: z.enum(['pending', 'processing', 'success', 'failed']),
})

export type TAddOrderForm = z.infer<typeof addOrderFormSchema>
