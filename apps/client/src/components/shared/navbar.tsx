import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { Button, Separator } from '@repo/ui/components'
import { BellIcon, HomeIcon, LoaderIcon } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

import { ProfileButton, SearchBar, ShoppingCartIcon } from '@/components/shared'

export const Navbar = () => {
	return (
		<div className='flex flex-col gap-4'>
			<nav className='flex w-full items-center justify-between gap-6'>
				{/* LEFT */}
				<Link href='/' className='flex items-center gap-2'>
					<Image src='/logo.png' alt='DimaTrend' width={36} height={36} className='size-6 md:size-9' />

					<p className='text-md hidden font-medium uppercase tracking-wider md:block'>DimaTrend</p>
				</Link>

				{/* RIGHT */}
				<div className='flex items-center gap-6'>
					<Suspense fallback={<LoaderIcon className='size-5 animate-spin text-white' />}>
						<SearchBar />
					</Suspense>

					<Link href='/'>
						<HomeIcon className='size-4 text-gray-600' />
					</Link>

					<BellIcon className='size-4 text-gray-600' />

					<ShoppingCartIcon />

					<SignedOut>
						<SignInButton>
							<Button variant='ghost' size='default' className='rounded-lg'>
								Sign in
							</Button>
						</SignInButton>
					</SignedOut>

					<SignedIn>
						<ProfileButton />
					</SignedIn>
				</div>
			</nav>

			<Separator className='mb-4' />
		</div>
	)
}
