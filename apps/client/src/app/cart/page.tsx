'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ShippingFormInputs } from '@repo/types'
import { ArrowRightIcon, Trash2Icon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useCartStore } from '@/stores/cart-store'
import { ShippingForm } from '@/components/shared/shipping-form'
import { StripePaymentForm } from '@/components/shared/stripe-payment-form'

const steps = [
	{
		id: 1,
		title: 'Shopping Cart',
	},
	{
		id: 2,
		title: 'Shipping Address',
	},
	{
		id: 3,
		title: 'Payment Method',
	},
]

// TEMPORARY
// const cartItems: CartItemsType = [
//   {
//     id: 1,
//     name: "Adidas CoreFit T-Shirt",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 39.9,
//     sizes: ["s", "m", "l", "xl", "xxl"],
//     colors: ["gray", "purple", "green"],
//     images: {
//       gray: "/products/1g.png",
//       purple: "/products/1p.png",
//       green: "/products/1gr.png",
//     },
//     quantity: 1,
//     selectedSize: "m",
//     selectedColor: "gray",
//   },
//   {
//     id: 2,
//     name: "Puma Ultra Warm Zip",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 59.9,
//     sizes: ["s", "m", "l", "xl"],
//     colors: ["gray", "green"],
//     images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//     quantity: 1,
//     selectedSize: "l",
//     selectedColor: "gray",
//   },
//   {
//     id: 3,
//     name: "Nike Air Essentials Pullover",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 69.9,
//     sizes: ["s", "m", "l"],
//     colors: ["green", "blue", "black"],
//     images: {
//       green: "/products/3gr.png",
//       blue: "/products/3b.png",
//       black: "/products/3bl.png",
//     },
//     quantity: 1,
//     selectedSize: "l",
//     selectedColor: "black",
//   },
// ];

const CartPage = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const [shippingForm, setShippingForm] = useState<ShippingFormInputs>()

	const { cart, removeFromCart } = useCartStore()

	const activeStep = parseInt(searchParams.get('step') || '1')

	return (
		<div className='mt-12 flex flex-col items-center justify-center gap-8'>
			{/* TITLE */}
			<h1 className='text-2xl font-medium'>Your Shopping Cart</h1>

			{/* STEPS */}
			<div className='flex flex-col items-center gap-8 lg:flex-row lg:gap-16'>
				{steps.map((step) => (
					<div
						className={`flex items-center gap-2 border-b-2 pb-4 ${
							step.id === activeStep ? 'border-gray-800' : 'border-gray-200'
						}`}
						key={step.id}
					>
						<div
							className={`flex size-6 items-center justify-center rounded-full p-4 text-white ${
								step.id === activeStep ? 'bg-gray-800' : 'bg-gray-400'
							}`}
						>
							{step.id}
						</div>

						<p
							className={`text-sm font-medium ${step.id === activeStep ? 'text-gray-800' : 'text-gray-400'}`}
						>
							{step.title}
						</p>
					</div>
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
								className='flex items-center justify-between'
								key={item.id + item.selectedSize + item.selectedColor}
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
								<button
									onClick={() => removeFromCart(item)}
									className='flex size-8 cursor-pointer items-center justify-center rounded-full bg-red-100 text-red-400 transition-all duration-300 hover:bg-red-200'
								>
									<Trash2Icon className='size-3' />
								</button>
							</div>
						))
					) : activeStep === 2 ? (
						<ShippingForm setShippingForm={setShippingForm} />
					) : activeStep === 3 && shippingForm ? (
						<StripePaymentForm shippingForm={shippingForm} />
					) : (
						<p className='text-sm text-gray-500'>Please fill in the shipping form to continue.</p>
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
							<p className='text-gray-500'>Discount(10%)</p>
							<p className='font-medium'>$ 10</p>
						</div>

						<div className='flex justify-between text-sm'>
							<p className='text-gray-500'>Shipping Fee</p>
							<p className='font-medium'>$10</p>
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
						<button
							onClick={() => router.push('/cart?step=2', { scroll: false })}
							className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-800 p-2 text-white transition-all duration-300 hover:bg-gray-900'
						>
							Continue
							<ArrowRightIcon className='size-3' />
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default CartPage
