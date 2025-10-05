'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@repo/ui/components'
import { ArrowRightIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TShippingForm, shippingFormSchema } from '@repo/types'

interface Props {
	setShippingForm: (data: TShippingForm) => void
}

export const ShippingForm = ({ setShippingForm }: Props) => {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TShippingForm>({
		resolver: zodResolver(shippingFormSchema),
	})

	const handleShippingForm: SubmitHandler<TShippingForm> = (data) => {
		setShippingForm(data)

		router.push('/cart?step=3', { scroll: false })
	}

	return (
		<form className='flex flex-col gap-4' onSubmit={handleSubmit(handleShippingForm)}>
			<div className='flex flex-col gap-1'>
				<label htmlFor='name' className='text-xs font-medium text-gray-500'>
					Name
				</label>

				<input
					id='name'
					type='text'
					placeholder='John Doe'
					className='border-b border-gray-200 py-2 text-sm outline-none'
					{...register('name')}
				/>

				{errors.name && <p className='text-xs text-red-500'>{errors.name.message}</p>}
			</div>

			<div className='flex flex-col gap-1'>
				<label htmlFor='email' className='text-xs font-medium text-gray-500'>
					Email
				</label>

				<input
					id='email'
					type='email'
					placeholder='john.doe@gmail.com'
					className='border-b border-gray-200 py-2 text-sm outline-none'
					{...register('email')}
				/>

				{errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p>}
			</div>

			<div className='flex flex-col gap-1'>
				<label htmlFor='phone' className='text-xs font-medium text-gray-500'>
					Phone
				</label>

				<input
					id='phone'
					type='text'
					placeholder='+123456789012'
					className='border-b border-gray-200 py-2 text-sm outline-none'
					{...register('phone')}
				/>

				{errors.phone && <p className='text-xs text-red-500'>{errors.phone.message}</p>}
			</div>

			<div className='flex flex-col gap-1'>
				<label htmlFor='address' className='text-xs font-medium text-gray-500'>
					Address
				</label>

				<input
					id='address'
					type='text'
					placeholder='123 Main St, Any town'
					className='border-b border-gray-200 py-2 text-sm outline-none'
					{...register('address')}
				/>

				{errors.address && <p className='text-xs text-red-500'>{errors.address.message}</p>}
			</div>

			<div className='flex flex-col gap-1'>
				<label htmlFor='city' className='text-xs font-medium text-gray-500'>
					City
				</label>

				<input
					id='city'
					type='text'
					placeholder='New York'
					className='border-b border-gray-200 py-2 text-sm outline-none'
					{...register('city')}
				/>

				{errors.city && <p className='text-xs text-red-500'>{errors.city.message}</p>}
			</div>

			<Button variant='default' size='lg' type='submit' className='rounded-lg'>
				Continue
				<ArrowRightIcon className='size-3' />
			</Button>
		</form>
	)
}
