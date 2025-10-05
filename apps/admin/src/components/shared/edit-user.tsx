'use client'

import axios from 'axios'
import {
	Button,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@repo/ui/components'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { editUserFormSchema, TEditUserForm } from '@repo/types'

interface Props {
	userId: string
}

export const EditUser = ({ userId }: Props) => {
	const router = useRouter()

	const form = useForm<TEditUserForm>({
		resolver: zodResolver(editUserFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			phoneNumber: '',
		},
		mode: 'onBlur',
	})

	const { getToken } = useAuth()

	const { data: user } = useQuery({
		queryKey: ['user', userId],
		queryFn: async () => {
			const token = await getToken()

			const res = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			return res.data
		},
		enabled: !!userId,
	})

	const mutation = useMutation({
		mutationFn: async (data: TEditUserForm) => {
			const token = await getToken()

			const payload = {
				...data,
				phoneNumber: data.phoneNumber
					? data.phoneNumber
							.split(',')
							.map((phone) => phone.trim())
							.filter((phone) => phone.length > 0)
					: [],
			}

			await axios.put(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users/${userId}`, payload, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
		},
		onSuccess: () => {
			toast.success('User updated successfully')

			router.refresh()
		},
		onError: (error: Error | any) => {
			let message = 'Failed to update user!'

			if (error.response?.data?.errors) {
				const errorMessages = error.response.data.errors
					.map((err: Error | any) => err.longMessage || err.message)
					.join('; ')
				message = errorMessages || error.response.data.message
			} else if (error.response?.data?.message) {
				message = error.response.data.message
			} else if (error.message) {
				message = error.message
			}

			toast.error(message)
		},
	})

	useEffect(() => {
		if (user) {
			form.reset({
				firstName: user.firstName || '',
				lastName: user.lastName || '',
				phoneNumber: user.phoneNumbers?.map((pn: any) => pn.phoneNumber).join(', ') || '',
			})
		}
	}, [user, form])

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle className='mb-4'>Edit user</SheetTitle>

				<SheetDescription asChild>
					<Form {...form}>
						<form className='space-y-8' onSubmit={form.handleSubmit((data) => mutation.mutate(data))}>
							<FormField
								control={form.control}
								name='firstName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>First name</FormLabel>

										<FormControl>
											<Input {...field} type='text' />
										</FormControl>

										<FormDescription>Enter user first name</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='lastName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last name</FormLabel>

										<FormControl>
											<Input {...field} type='text' />
										</FormControl>

										<FormDescription>Enter user last name</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='phoneNumber'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone numbers (optional)</FormLabel>

										<FormControl>
											<Input
												{...field}
												type='tel'
												placeholder='+123456789012, +123456789012'
												value={field.value || ''}
											/>
										</FormControl>

										<FormDescription>
											Only admin can see your phone number. Use commas for multiple phone numbers
										</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								variant='default'
								size='lg'
								type='submit'
								disabled={mutation.isPending}
								className='rounded-lg disabled:cursor-not-allowed disabled:opacity-50'
							>
								{mutation.isPending ? 'Updating...' : 'Update'}
							</Button>
						</form>
					</Form>
				</SheetDescription>
			</SheetHeader>
		</SheetContent>
	)
}
