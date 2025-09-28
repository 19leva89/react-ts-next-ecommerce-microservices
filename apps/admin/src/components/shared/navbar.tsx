'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { LogOutIcon, MoonIcon, SettingsIcon, SunIcon, UserIcon } from 'lucide-react'

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
	useSidebar,
} from '@/components/ui'

export const Navbar = () => {
	const { theme, setTheme } = useTheme()
	const { toggleSidebar } = useSidebar()

	return (
		<nav className='bg-background sticky top-0 z-10 flex items-center justify-between p-4'>
			{/* LEFT */}
			<SidebarTrigger />

			{/* <Button variant="outline" onClick={toggleSidebar}>
        Custom Button
      </Button> */}

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
						<DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* USER MENU */}
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src='https://avatars.githubusercontent.com/u/1486366' />

							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>

					<DropdownMenuContent sideOffset={10}>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>

						<DropdownMenuSeparator />

						<DropdownMenuItem>
							<UserIcon className='mr-2 size-[1.2rem]' />
							Profile
						</DropdownMenuItem>

						<DropdownMenuItem>
							<SettingsIcon className='mr-2 size-[1.2rem]' />
							Settings
						</DropdownMenuItem>

						<DropdownMenuItem variant='destructive'>
							<LogOutIcon className='mr-2 size-[1.2rem]' />
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	)
}
