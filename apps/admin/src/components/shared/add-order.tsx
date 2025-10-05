'use client'

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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@repo/ui/components'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addOrderFormSchema, TAddOrderForm } from '@repo/types'

export const AddOrder = () => {
	const form = useForm<TAddOrderForm>({
		resolver: zodResolver(addOrderFormSchema),
	})

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle className='mb-4'>Add order</SheetTitle>

				<SheetDescription asChild>
					<Form {...form}>
						<form className='space-y-8'>
							<FormField
								control={form.control}
								name='amount'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Amount</FormLabel>

										<FormControl>
											<Input {...field} />
										</FormControl>

										<FormDescription>Enter the amount of the order</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='userId'
								render={({ field }) => (
									<FormItem>
										<FormLabel>User ID</FormLabel>

										<FormControl>
											<Input {...field} />
										</FormControl>

										<FormDescription>Enter the user id</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='status'
								render={() => (
									<FormItem>
										<FormLabel>Status</FormLabel>

										<FormControl>
											<Select>
												<SelectTrigger>
													<SelectValue placeholder='Select a status' />
												</SelectTrigger>

												<SelectContent>
													<SelectItem value='pending' className='cursor-pointer'>
														Pending
													</SelectItem>

													<SelectItem value='processing' className='cursor-pointer'>
														Processing
													</SelectItem>

													<SelectItem value='success' className='cursor-pointer'>
														Success
													</SelectItem>

													<SelectItem value='failed' className='cursor-pointer'>
														Failed
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>

										<FormDescription>Enter the status of the order</FormDescription>

										<FormMessage />
									</FormItem>
								)}
							/>

							<Button variant='default' size='lg' type='submit' className='rounded-lg'>
								Submit
							</Button>
						</form>
					</Form>
				</SheetDescription>
			</SheetHeader>
		</SheetContent>
	)
}
