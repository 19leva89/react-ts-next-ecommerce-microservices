'use client'

import { z } from 'zod'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'
import { CategoryFormSchema } from '@repo/types'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

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
			const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			if (!res.ok) {
				throw new Error('Failed to create category!')
			}
		},
		onSuccess: () => {
			toast.success('Category created successfully')
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle className='mb-4'>Add Category</SheetTitle>

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

										<FormDescription>Enter category name.</FormDescription>

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

										<FormDescription>Enter category slug.</FormDescription>

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
