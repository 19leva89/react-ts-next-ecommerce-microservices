'use client'

import Link from 'next/link'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	SidebarTrigger,
} from '@repo/ui/components'
import { useTheme } from 'next-themes'
import { useAuth, useClerk, useUser } from '@clerk/nextjs'
import { LogOutIcon, MoonIcon, SunIcon, UserIcon } from 'lucide-react'

export const Navbar = () => {
	const { user } = useUser()
	const { signOut } = useAuth()
	const { setTheme } = useTheme()
	const { openUserProfile } = useClerk()

	const initials = user
		? `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase()
		: 'CN'

	return (
		<nav className='bg-background sticky top-0 z-10 flex items-center justify-between p-4'>
			{/* LEFT */}
			<SidebarTrigger />

			{/* RIGHT */}
			<div className='flex items-center gap-4'>
				<Link href='/'>Dashboard</Link>

				{/* THEME MENU */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='icon'>
							<SunIcon className='size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />

							<MoonIcon className='absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />

							<span className='sr-only'>Toggle theme</span>
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align='end'>
						<DropdownMenuItem onClick={() => setTheme('light')} className='cursor-pointer'>
							Light
						</DropdownMenuItem>

						<DropdownMenuItem onClick={() => setTheme('dark')} className='cursor-pointer'>
							Dark
						</DropdownMenuItem>

						<DropdownMenuItem onClick={() => setTheme('system')} className='cursor-pointer'>
							System
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* USER MENU */}
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src={user?.imageUrl} />

							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>

					<DropdownMenuContent sideOffset={10}>
						<DropdownMenuLabel>My account</DropdownMenuLabel>

						<DropdownMenuSeparator />

						<DropdownMenuItem className='cursor-pointer' onClick={() => openUserProfile()}>
							<UserIcon className='mr-2 size-[1.2rem]' />
							Profile
						</DropdownMenuItem>

						<DropdownMenuItem variant='destructive' className='cursor-pointer' onClick={() => signOut()}>
							<LogOutIcon className='mr-2 size-[1.2rem]' />
							Sign out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	)
}
