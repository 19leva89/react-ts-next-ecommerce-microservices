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
import { z } from '@repo/types'
import { useAuth } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'
import { UserFormSchema } from '@repo/types'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

export const AddUser = () => {
	const form = useForm<z.infer<typeof UserFormSchema>>({
		resolver: zodResolver(UserFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			emailAddress: [],
			username: '',
			password: '',
		},
	})

	const { getToken } = useAuth()

	const mutation = useMutation({
		mutationFn: async (data: z.infer<typeof UserFormSchema>) => {
			const token = await getToken()

			await axios.post(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users`, data, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
		},
		onSuccess: () => {
			toast.success('User created successfully')
		},
		onError: (error) => {
			const message = error.message || 'Failed to create user!'

			toast.error(message)
		},
	})

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle className='mb-4'>Add User</SheetTitle>

				<SheetDescription asChild>
					<Form {...form}>
						<form className='space-y-8' onSubmit={form.handleSubmit((data) => mutation.mutate(data))}>
							<FormField
								control={form.control}
								name='firstName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name</FormLabel>

										<FormControl>
											<Input {...field} />
										</FormControl>

										<FormDescription>Enter user first name.</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='lastName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last Name</FormLabel>

										<FormControl>
											<Input {...field} />
										</FormControl>

										<FormDescription>Enter user last name.</FormDescription>

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
											<Input {...field} />
										</FormControl>

										<FormDescription>Enter username.</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='emailAddress'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email Addresses</FormLabel>

										<FormControl>
											<Input
												{...field}
												placeholder='email1@gmail.com, email2@gmail.com'
												onChange={(e) => {
													const emails = e.target.value
														.split(',')
														.map((email) => email.trim())
														.filter((email) => email)
													field.onChange(emails)
												}}
											/>
										</FormControl>

										<FormDescription>Only admin can see your email.</FormDescription>

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

										<FormDescription>Enter user password.</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type='submit'
								disabled={mutation.isPending}
								className='disabled:cursor-not-allowed disabled:opacity-50'
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
