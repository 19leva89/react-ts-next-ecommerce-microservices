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
import { CategoryFormSchema } from '@repo/types'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

export const AddCategory = () => {
	const form = useForm<z.infer<typeof CategoryFormSchema>>({
		resolver: zodResolver(CategoryFormSchema),
		defaultValues: {
			name: '',
			slug: '',
		},
	})

	const { getToken } = useAuth()

	const mutation = useMutation({
		mutationFn: async (data: z.infer<typeof CategoryFormSchema>) => {
			const token = await getToken()

			await axios.post(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`, data, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
		},
		onSuccess: () => {
			toast.success('Category created successfully')
		},
		onError: (error) => {
			const message = error.message || 'Failed to create category!'

			toast.error(message)
		},
	})

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle className='mb-4'>Add category</SheetTitle>

				<SheetDescription asChild>
					<Form {...form}>
						<form className='space-y-8' onSubmit={form.handleSubmit((data) => mutation.mutate(data))}>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>

										<FormControl>
											<Input {...field} />
										</FormControl>

										<FormDescription>Enter category name</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='slug'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Slug</FormLabel>

										<FormControl>
											<Input {...field} />
										</FormControl>

										<FormDescription>Enter category slug</FormDescription>

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
