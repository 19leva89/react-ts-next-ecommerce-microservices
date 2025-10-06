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
import { availableIcons } from '@repo/ui/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { categoryFormSchema, TCategoryForm } from '@repo/types'

export const AddCategory = () => {
	const router = useRouter()

	const form = useForm<TCategoryForm>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			name: '',
			slug: '',
			icon: '',
		},
	})

	const { getToken } = useAuth()

	const mutation = useMutation({
		mutationFn: async (data: TCategoryForm) => {
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
			router.refresh()
			form.reset()
		},
		onError: (error) => {
			console.error(error || 'Failed to create category!')

			toast.error(error.message || 'Failed to create category!')
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
											<Input {...field} type='text' />
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
											<Input {...field} type='text' />
										</FormControl>

										<FormDescription>Enter category slug</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='icon'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Icon</FormLabel>

										<FormControl>
											<div className='grid grid-cols-8 gap-2 rounded-md border p-2'>
												{Object.entries(availableIcons).map(([iconValue, LucideIcon]) => {
													const isSelected = field.value === iconValue

													return (
														<Button
															key={iconValue}
															variant={isSelected ? 'default' : 'outline'}
															size='icon'
															onClick={(e) => {
																e.preventDefault()
																field.onChange(iconValue)
															}}
															className='rounded-lg'
														>
															<LucideIcon size={20} />
														</Button>
													)
												})}
											</div>
										</FormControl>

										<FormDescription>Select an icon</FormDescription>

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
