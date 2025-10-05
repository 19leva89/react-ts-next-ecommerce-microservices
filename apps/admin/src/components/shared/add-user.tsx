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
import { useAuth } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { TAddUserForm, addUserFormSchema } from '@repo/types'

export const AddUser = () => {
	const router = useRouter()

	const form = useForm<TAddUserForm>({
		resolver: zodResolver(addUserFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			emailAddress: '',
			username: '',
			password: '',
			phoneNumber: '',
		},
		mode: 'onBlur',
	})

	const { getToken } = useAuth()

	const mutation = useMutation({
		mutationFn: async (data: TAddUserForm) => {
			const token = await getToken()

			const payload = {
				...data,
				emailAddress: data.emailAddress
					.split(',')
					.map((email) => email.trim())
					.filter((email) => email.length > 0),
				phoneNumber: data.phoneNumber
					? data.phoneNumber
							.split(',')
							.map((phone) => phone.trim())
							.filter((phone) => phone.length > 0)
					: [],
			}

			await axios.post(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users`, payload, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
		},
		onSuccess: () => {
			toast.success('User created successfully')

			router.refresh()
		},
		onError: (error: Error | any) => {
			let message = 'Failed to create/update user!'

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

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle className='mb-4'>Add user</SheetTitle>

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
								name='username'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>

										<FormControl>
											<Input {...field} type='text' />
										</FormControl>

										<FormDescription>Enter username</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='emailAddress'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email addresses</FormLabel>

										<FormControl>
											<Input
												{...field}
												type='text'
												placeholder='email1@gmail.com, email2@gmail.com'
												value={field.value || ''}
											/>
										</FormControl>

										<FormDescription>
											Only admin can see your email. Use commas for multiple emails
										</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>

										<FormControl>
											<Input {...field} type='password' />
										</FormControl>

										<FormDescription>Enter user password</FormDescription>

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
								{mutation.isPending ? 'Submitting...' : 'Submit'}
							</Button>
						</form>
					</Form>
				</SheetDescription>
			</SheetHeader>
		</SheetContent>
	)
}
