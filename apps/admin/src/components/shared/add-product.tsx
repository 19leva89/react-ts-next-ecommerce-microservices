'use client'

import axios from 'axios'
import {
	Button,
	Checkbox,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	ScrollArea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	Textarea,
} from '@repo/ui/components'
import { toast } from 'sonner'
import { z } from '@repo/types'
import { useAuth } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CategoryType, colors, ProductFormSchema, sizes } from '@repo/types'

// const categories = [
//   "T-shirts",
//   "Shoes",
//   "Accessories",
//   "Bags",
//   "Dresses",
//   "Jackets",
//   "Gloves",
// ] as const;

const fetchCategories = async () => {
	try {
		const { data } = await axios.get(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`)

		return data
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'Failed to fetch categories!')
	}
}

export const AddProduct = () => {
	const form = useForm<z.infer<typeof ProductFormSchema>>({
		resolver: zodResolver(ProductFormSchema),
		defaultValues: {
			name: '',
			shortDescription: '',
			description: '',
			price: 0,
			categorySlug: '',
			sizes: [],
			colors: [],
			images: {},
		},
	})

	const { data } = useQuery({
		queryKey: ['categories'],
		queryFn: fetchCategories,
	})

	const { getToken } = useAuth()

	const mutation = useMutation({
		mutationFn: async (data: z.infer<typeof ProductFormSchema>) => {
			const token = await getToken()

			await axios.post(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`, data, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
		},
		onSuccess: () => {
			toast.success('Product created successfully')
		},
		onError: (error: any) => {
			const message = error.response?.data?.message || error.message || 'Failed to create product!'
			toast.error(message)
		},
	})

	return (
		<SheetContent>
			<ScrollArea className='h-screen'>
				<SheetHeader>
					<SheetTitle className='mb-4'>Add Product</SheetTitle>

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

											<FormDescription>Enter the name of the product.</FormDescription>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='shortDescription'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Short Description</FormLabel>

											<FormControl>
												<Input {...field} />
											</FormControl>

											<FormDescription>Enter the short description of the product.</FormDescription>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>

											<FormControl>
												<Textarea {...field} />
											</FormControl>

											<FormDescription>Enter the description of the product.</FormDescription>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='price'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Price</FormLabel>

											<FormControl>
												<Input
													type='number'
													{...field}
													onChange={(e) => field.onChange(Number(e.target.value))}
												/>
											</FormControl>

											<FormDescription>Enter the price of the product.</FormDescription>

											<FormMessage />
										</FormItem>
									)}
								/>

								{data && (
									<FormField
										control={form.control}
										name='categorySlug'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Category</FormLabel>

												<FormControl>
													<Select onValueChange={field.onChange} value={field.value}>
														<SelectTrigger>
															<SelectValue placeholder='Select a category' />
														</SelectTrigger>

														<SelectContent>
															{data.map((cat: CategoryType) => (
																<SelectItem key={cat.id} value={cat.slug}>
																	{cat.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>

												<FormDescription>Enter the category of the product.</FormDescription>

												<FormMessage />
											</FormItem>
										)}
									/>
								)}

								<FormField
									control={form.control}
									name='sizes'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Sizes</FormLabel>

											<FormControl>
												<div className='my-2 grid grid-cols-3 gap-4'>
													{sizes.map((size) => (
														<div className='flex items-center gap-2' key={size}>
															<Checkbox
																id='size'
																checked={field.value?.includes(size)}
																onCheckedChange={(checked) => {
																	const currentValues = field.value || []
																	if (checked) {
																		field.onChange([...currentValues, size])
																	} else {
																		field.onChange(currentValues.filter((v) => v !== size))
																	}
																}}
															/>

															<label htmlFor='size' className='text-xs'>
																{size}
															</label>
														</div>
													))}
												</div>
											</FormControl>

											<FormDescription>Select the available sizes for the product.</FormDescription>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='colors'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Colors</FormLabel>

											<FormControl>
												<div className='space-y-4'>
													<div className='my-2 grid grid-cols-3 gap-4'>
														{colors.map((color) => (
															<div className='flex items-center gap-2' key={color}>
																<Checkbox
																	id='color'
																	checked={field.value?.includes(color)}
																	onCheckedChange={(checked) => {
																		const currentValues = field.value || []
																		if (checked) {
																			field.onChange([...currentValues, color])
																		} else {
																			field.onChange(currentValues.filter((v) => v !== color))
																		}
																	}}
																/>

																<label htmlFor='color' className='flex items-center gap-2 text-xs'>
																	<div className='size-2 rounded-full' style={{ backgroundColor: color }} />
																	{color}
																</label>
															</div>
														))}
													</div>
												</div>
											</FormControl>

											<FormDescription>Select the available colors for the product.</FormDescription>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='images'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Images</FormLabel>

											<FormControl>
												<div>
													{form.watch('colors')?.map((color) => (
														<div className='mb-4 flex items-center gap-4' key={color}>
															<div className='flex items-center gap-2'>
																<div className='size-4 rounded-full' style={{ backgroundColor: color }} />

																<span className='min-w-[80px] text-sm font-medium'>{color}:</span>
															</div>

															<Input
																type='file'
																accept='image/*'
																onChange={async (e) => {
																	const file = e.target.files?.[0]
																	if (file) {
																		try {
																			const formData = new FormData()
																			formData.append('file', file)
																			formData.append('upload_preset', 'ecommerce')

																			const res = await fetch(
																				`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
																				{
																					method: 'POST',
																					body: formData,
																				},
																			)
																			const data = await res.json()

																			if (data.secure_url) {
																				const currentImages = form.getValues('images') || {}
																				form.setValue('images', {
																					...currentImages,
																					[color]: data.secure_url,
																				})
																			}
																		} catch (error) {
																			console.log(error)
																			toast.error('Upload failed!')
																		}
																	}
																}}
															/>
															{field.value?.[color] ? (
																<span className='text-sm text-green-600'>Image selected</span>
															) : (
																<span className='text-sm text-red-600'>Image required</span>
															)}
														</div>
													))}
												</div>
											</FormControl>
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
			</ScrollArea>
		</SheetContent>
	)
}
