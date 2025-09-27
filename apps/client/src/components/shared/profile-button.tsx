'use client'

import { UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { ShoppingBagIcon } from 'lucide-react'

export const ProfileButton = () => {
	const router = useRouter()

	return (
		<UserButton>
			<UserButton.MenuItems>
				<UserButton.Action
					label='See Orders'
					labelIcon={<ShoppingBagIcon className='size-4' />}
					onClick={() => router.push('/orders')}
				/>
			</UserButton.MenuItems>
		</UserButton>
	)
}
