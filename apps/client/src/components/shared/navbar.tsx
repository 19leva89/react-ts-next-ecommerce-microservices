import Link from 'next/link'
import Image from 'next/image'
import { BellIcon, HomeIcon } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

import { SearchBar } from './search-bar'
import { ProfileButton } from './profile-button'
import { ShoppingCartIcon } from './shopping-cart-icon'

export const Navbar = () => {
	return (
		<nav className='flex w-full items-center justify-between border-b border-gray-200 pb-4'>
			{/* LEFT */}
			<Link href='/' className='flex items-center'>
				<Image src='/logo.png' alt='TrendLama' width={36} height={36} className='size-6 md:size-9' />
				<p className='text-md hidden font-medium tracking-wider md:block'>TRENDLAMA.</p>
			</Link>

			{/* RIGHT */}
			<div className='flex items-center gap-6'>
				<SearchBar />

				<Link href='/'>
					<HomeIcon className='size-4 text-gray-600' />
				</Link>

				<BellIcon className='size-4 text-gray-600' />

				<ShoppingCartIcon />

				<SignedOut>
					<SignInButton />
				</SignedOut>

				<SignedIn>
					<ProfileButton />
				</SignedIn>
			</div>
		</nav>
	)
}
