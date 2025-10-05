import z from 'zod'

export interface ClerkClientUserRole {
	privateMetadata?: {
		role?: 'user' | 'admin'
	}
}

export const addUserFormSchema = z.object({
	firstName: z
		.string({ message: 'First name is required!' })
		.min(2, { message: 'First name must be at least 2 characters!' })
		.max(50),
	lastName: z
		.string({ message: 'Last name is required!' })
		.min(2, { message: 'Last name must be at least 2 characters!' })
		.max(50),
	username: z
		.string({ message: 'Username is required!' })
		.min(2, { message: 'Username must be at least 2 characters!' })
		.max(50)
		.regex(/^[a-zA-Z0-9_-]+$/, { message: 'Username can only contain letters, numbers, - or _.' }),
	emailAddress: z
		.string({ message: 'Email addresses are required!' })
		.min(1, { message: 'At least one email required!' })
		.refine(
			(val) => {
				const emails = val
					.split(',')
					.map((email) => email.trim())
					.filter((email) => email.length > 0)
				return emails.length >= 1 && emails.every((email) => z.email().safeParse(email).success)
			},
			{ message: 'Provide at least one valid email address (comma-separated)' },
		),
	password: z
		.string({ message: 'Password is required!' })
		.min(8, { message: 'Password must be at least 8 characters!' })
		.max(50),
	phoneNumber: z
		.string()
		.optional()
		.refine(
			(val) => {
				if (!val || val.trim() === '') {
					return true
				}
				const phons = val
					.split(',')
					.map((phone) => phone.trim())
					.filter((phone) => phone.length > 0)
				const phoneRegex = /^(?:\+\d{7,15}|\d{7,10})$/
				return phons.every((phone) => phoneRegex.test(phone))
			},
			{
				message:
					'Each phone number must be 7–10 digits or start with + and contain up to 15 digits (comma-separated)',
			},
		),
})

export const editUserFormSchema = z.object({
	firstName: z
		.string({ message: 'First name is required!' })
		.min(2, { message: 'First name must be at least 2 characters!' })
		.max(50),
	lastName: z
		.string({ message: 'Last name is required!' })
		.min(2, { message: 'Last name must be at least 2 characters!' })
		.max(50),
	phoneNumber: z
		.string()
		.refine(
			(val) => {
				if (!val || val.trim() === '') {
					return true
				}

				const phons = val
					.split(',')
					.map((phone) => phone.trim())
					.filter((phone) => phone.length > 0)
				const phoneRegex = /^(?:\+\d{7,15}|\d{7,10})$/
				return phons.every((phone) => phoneRegex.test(phone))
			},
			{
				message:
					'Each phone number must be 7–10 digits or start with + and contain up to 15 digits (comma-separated)',
			},
		)
		.optional(),
	// address: z.string().min(2, 'Address is required!'),
	// city: z.string().min(2, 'City is required!'),
})

export type TAddUserForm = z.infer<typeof addUserFormSchema>
export type TEditUserForm = z.infer<typeof editUserFormSchema>
