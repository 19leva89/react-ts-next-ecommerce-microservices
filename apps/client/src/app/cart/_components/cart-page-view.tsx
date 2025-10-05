'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@repo/ui/lib'
import { TShippingForm } from '@repo/types'
import { Button } from '@repo/ui/components'
import { ArrowRightIcon, Trash2Icon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useCartStore } from '@/stores/cart-store'
import { checkoutSteps } from '../_constants/steps'
import { ShippingForm, StripePaymentForm } from '@/components/shared'

export const CartPageView = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const { cart, removeFromCart } = useCartStore()

	const [shippingForm, setShippingForm] = useState<TShippingForm>()

	const activeStep = parseInt(searchParams.get('step') || '1')

	return (
		<div className='mt-12 flex flex-col items-center justify-center gap-8'>
			{/* TITLE */}
			<h1 className='text-2xl font-medium'>Your Shopping Cart</h1>

			{/* STEPS */}
			<div className='flex flex-col items-center gap-8 lg:flex-row lg:gap-16'>
				{checkoutSteps.map((step) => (
					<Link
						key={step.id}
						href={step.href}
						className={cn(
							'flex items-center gap-2 border-b-2 pb-4',
							step.id === activeStep ? 'border-gray-800' : 'border-gray-200',
						)}
					>
						<div
							className={cn(
								'flex size-6 items-center justify-center rounded-full p-4 text-white',
								step.id === activeStep ? 'bg-gray-800' : 'bg-gray-400',
							)}
						>
							{step.id}
						</div>

						<p
							className={cn(
								'text-sm font-medium',
								step.id === activeStep ? 'text-gray-800' : 'text-gray-400',
							)}
						>
							{step.title}
						</p>
					</Link>
				))}
			</div>

			{/* STEPS & DETAILS */}
			<div className='flex w-full flex-col gap-16 lg:flex-row'>
				{/* STEPS */}
				<div className='border-1 flex w-full flex-col gap-8 rounded-lg border-gray-100 p-8 shadow-lg lg:w-7/12'>
					{activeStep === 1 ? (
						cart.map((item) => (
							// SINGLE CART ITEM
							<div
								key={item.id + item.selectedSize + item.selectedColor}
								className='flex items-center justify-between'
							>
								{/* IMAGE AND DETAILS */}
								<div className='flex gap-8'>
									{/* IMAGE */}
									<div className='relative size-32 overflow-hidden rounded-lg bg-gray-50'>
										<Image
											src={(item.images as Record<string, string>)?.[item.selectedColor] || ''}
											alt={item.name}
											fill
											className='object-contain'
										/>
									</div>

									{/* ITEM DETAILS */}
									<div className='flex flex-col justify-between'>
										<div className='flex flex-col gap-1'>
											<p className='text-sm font-medium'>{item.name}</p>
											<p className='text-xs text-gray-500'>Quantity: {item.quantity}</p>
											<p className='text-xs text-gray-500'>Size: {item.selectedSize}</p>
											<p className='text-xs text-gray-500'>Color: {item.selectedColor}</p>
										</div>
										<p className='font-medium'>${(item.price * item.quantity).toFixed(2)}</p>
									</div>
								</div>

								{/* DELETE BUTTON */}
								<Button
									variant='destructive'
									size='icon'
									onClick={() => removeFromCart(item)}
									className='rounded-full bg-red-100 text-red-400 hover:bg-red-200'
								>
									<Trash2Icon className='size-3' />
								</Button>
							</div>
						))
					) : activeStep === 2 ? (
						<ShippingForm setShippingForm={setShippingForm} />
					) : activeStep === 3 && shippingForm ? (
						<StripePaymentForm shippingForm={shippingForm} />
					) : (
						<p className='text-sm text-gray-500'>Please fill in the shipping form to continue</p>
					)}
				</div>

				{/* DETAILS */}
				<div className='border-1 flex h-max w-full flex-col gap-8 rounded-lg border-gray-100 p-8 shadow-lg lg:w-5/12'>
					<h2 className='font-semibold'>Cart Details</h2>

					<div className='flex flex-col gap-4'>
						<div className='flex justify-between text-sm'>
							<p className='text-gray-500'>Subtotal</p>

							<p className='font-medium'>
								${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
							</p>
						</div>

						<div className='flex justify-between text-sm'>
							<p className='text-gray-500'>Discount (10%)</p>
							<p className='font-medium'>$10.00</p>
						</div>

						<div className='flex justify-between text-sm'>
							<p className='text-gray-500'>Shipping Fee</p>
							<p className='font-medium'>$10.00</p>
						</div>

						<hr className='border-gray-200' />

						<div className='flex justify-between'>
							<p className='font-semibold text-gray-800'>Total</p>

							<p className='font-medium'>
								${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
							</p>
						</div>
					</div>

					{activeStep === 1 && (
						<Button
							variant='default'
							size='lg'
							onClick={() => router.push('/cart?step=2', { scroll: false })}
							className='rounded-lg'
						>
							Continue
							<ArrowRightIcon className='size-3' />
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
