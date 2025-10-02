'use client'

import { useAuth } from '@clerk/nextjs'
import { Button } from '@repo/ui/components'

const UnauthorizedPage = () => {
	const { signOut } = useAuth()

	return (
		<div className='flex h-screen flex-col items-center justify-center gap-4'>
			<h1>You do not have an access!</h1>

			<Button
				variant='destructive'
				size='lg'
				onClick={() => signOut()}
				className='rounded-lg bg-red-100 text-red-400 hover:bg-red-200'
			>
				Sign out
			</Button>
		</div>
	)
}

export default UnauthorizedPage
