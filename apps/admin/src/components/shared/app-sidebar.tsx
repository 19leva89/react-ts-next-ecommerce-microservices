'use client'

import {
	HomeIcon,
	InboxIcon,
	CalendarIcon,
	SearchIcon,
	SettingsIcon,
	User2Icon,
	ChevronUpIcon,
	PlusIcon,
	ShirtIcon,
	UserIcon,
	ShoppingBasketIcon,
} from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Sheet,
	SheetTrigger,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from '@repo/ui/components'
import Link from 'next/link'
import Image from 'next/image'

import { AddCategory, AddOrder, AddProduct, AddUser } from '@/components/shared'

const items = [
	{
		title: 'Home',
		url: '/',
		icon: HomeIcon,
	},
	{
		title: 'Inbox',
		url: '#',
		icon: InboxIcon,
	},
	{
		title: 'Calendar',
		url: '#',
		icon: CalendarIcon,
	},
	{
		title: 'Search',
		url: '#',
		icon: SearchIcon,
	},
	{
		title: 'Settings',
		url: '#',
		icon: SettingsIcon,
	},
]

export const AppSidebar = () => {
	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader className='py-4'>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link href='/'>
								<Image src='/logo.svg' alt='logo' width={20} height={20} />

								<span>Lama Dev</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarSeparator />

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />

											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
									{item.title === 'Inbox' && <SidebarMenuBadge>24</SidebarMenuBadge>}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Products</SidebarGroupLabel>

					<SidebarGroupAction>
						<PlusIcon /> <span className='sr-only'>Add Product</span>
					</SidebarGroupAction>

					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href='/products'>
										<ShirtIcon />
										See All Products
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Sheet>
										<SheetTrigger asChild>
											<SidebarMenuButton asChild>
												<Link href='#'>
													<PlusIcon />
													Add Product
												</Link>
											</SidebarMenuButton>
										</SheetTrigger>

										<AddProduct />
									</Sheet>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Sheet>
										<SheetTrigger asChild>
											<SidebarMenuButton asChild>
												<Link href='#'>
													<PlusIcon />
													Add Category
												</Link>
											</SidebarMenuButton>
										</SheetTrigger>

										<AddCategory />
									</Sheet>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Users</SidebarGroupLabel>

					<SidebarGroupAction>
						<PlusIcon /> <span className='sr-only'>Add User</span>
					</SidebarGroupAction>

					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href='/users'>
										<UserIcon />
										See All Users
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Sheet>
										<SheetTrigger asChild>
											<SidebarMenuButton asChild>
												<Link href='#'>
													<PlusIcon />
													Add User
												</Link>
											</SidebarMenuButton>
										</SheetTrigger>

										<AddUser />
									</Sheet>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Orders / Payments</SidebarGroupLabel>

					<SidebarGroupAction>
						<PlusIcon /> <span className='sr-only'>Add Order</span>
					</SidebarGroupAction>

					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href='/orders'>
										<ShoppingBasketIcon />
										See All Transactions
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Sheet>
										<SheetTrigger asChild>
											<SidebarMenuButton asChild>
												<Link href='#'>
													<PlusIcon />
													Add Order
												</Link>
											</SidebarMenuButton>
										</SheetTrigger>

										<AddOrder />
									</Sheet>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2Icon /> John Doe <ChevronUpIcon className='ml-auto' />
								</SidebarMenuButton>
							</DropdownMenuTrigger>

							<DropdownMenuContent align='end'>
								<DropdownMenuItem>Account</DropdownMenuItem>

								<DropdownMenuItem>Setting</DropdownMenuItem>

								<DropdownMenuItem>Sign out</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
