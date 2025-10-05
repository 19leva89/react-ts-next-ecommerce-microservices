'use client'

import {
	HomeIcon,
	InboxIcon,
	CalendarIcon,
	SearchIcon,
	SettingsIcon,
	PlusIcon,
	ShirtIcon,
	UserIcon,
	ShoppingBasketIcon,
} from 'lucide-react'
import {
	Sheet,
	SheetTrigger,
	Sidebar,
	SidebarContent,
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
								<Image src='/logo.png' alt='DimaTrend' width={20} height={20} />

								<span>DimaTrend</span>
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
						<PlusIcon /> <span className='sr-only'>Add product</span>
					</SidebarGroupAction>

					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href='/products'>
										<ShirtIcon />
										See all products
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
													Add product
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
													Add category
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
										See all users
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
													Add user
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
										See all transactions
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
													Add order
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
		</Sidebar>
	)
}
