'use client'

import { z } from '@repo/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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

const formSchema = z.object({
	fullName: z.string().min(2, { message: 'Full name must be at least 2 characters!' }).max(50),
	email: z.email({ message: 'Invalid email address!' }).min(2, 'Email is required!'),
	phone: z
		.string()
		.min(7, 'Phone number must be between 7 and 10 digits!')
		.max(10, 'Phone number must be between 7 and 10 digits!')
		.regex(/^\d+$/, 'Phone number must contain only numbers!'),
	address: z.string().min(2, 'Address is required!'),
	city: z.string().min(2, 'City is required!'),
})

export const EditUser = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: 'John Doe',
			email: 'john.doe@gmail.com',
			phone: '+1 234 5678',
			address: '123 Main St',
			city: 'New York',
		},
	})

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle className='mb-4'>Edit User</SheetTitle>

				<SheetDescription asChild>
					<Form {...form}>
						<form className='space-y-8'>
							<FormField
								control={form.control}
								name='fullName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name</FormLabel>

										<FormControl>
											<Input {...field} />
										</FormControl>

										<FormDescription>Enter user full name.</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>

										<FormControl>
											<Input {...field} />
										</FormControl>

										<FormDescription>Only admin can see your email.</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone</FormLabel>

										<FormControl>
											<Input {...field} />
										</FormControl>

										<FormDescription>Only admin can see your phone number (optional)</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='address'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Address</FormLabel>

										<FormControl>
											<Input {...field} />
										</FormControl>

										<FormDescription>Enter user address (optional)</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='city'
								render={({ field }) => (
									<FormItem>
										<FormLabel>City</FormLabel>

										<FormControl>
											<Input {...field} />
										</FormControl>

										<FormDescription>Enter user city (optional)</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type='submit'>Submit</Button>
						</form>
					</Form>
				</SheetDescription>
			</SheetHeader>
		</SheetContent>
	)
}
