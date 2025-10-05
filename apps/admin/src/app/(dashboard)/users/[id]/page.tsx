import axios from 'axios'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Button,
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
	Progress,
	Sheet,
	SheetTrigger,
} from '@repo/ui/components'
import { auth, User } from '@clerk/nextjs/server'
import { BadgeCheckIcon, CandyIcon, CitrusIcon, ShieldIcon } from 'lucide-react'

import { AppLineChart, EditUser } from '@/components/shared'

export const dynamic = 'force-dynamic'

const getData = async (id: string): Promise<User | null> => {
	const { getToken } = await auth()
	const token = await getToken()

	try {
		const { data } = await axios.get<User>(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return data
	} catch (error) {
		console.error(error)

		return null
	}
}

interface Props {
	params: Promise<{ id: string }>
}

const SingleUserPage = async ({ params }: Props) => {
	const { id } = await params

	const data = await getData(id)

	if (!data) {
		return <div>User not found!</div>
	}

	return (
		<div>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbLink href='/users'>Users</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbPage>{data?.firstName + ' ' + data?.lastName || data?.username || '-'}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{/* CONTAINER */}
			<div className='mt-4 flex flex-col gap-8 xl:flex-row'>
				{/* LEFT */}
				<div className='w-full space-y-6 xl:w-1/3'>
					{/* USER BADGES CONTAINER */}
					<div className='bg-primary-foreground rounded-lg p-4'>
						<h1 className='text-xl font-semibold'>User badges</h1>

						<div className='mt-4 flex gap-4'>
							<HoverCard>
								<HoverCardTrigger>
									<BadgeCheckIcon
										size={36}
										className='border-1 rounded-full border-blue-500/50 bg-blue-500/30 p-2'
									/>
								</HoverCardTrigger>

								<HoverCardContent>
									<h1 className='mb-2 font-bold'>Verified user</h1>

									<p className='text-muted-foreground text-sm'>This user has been verified by the admin</p>
								</HoverCardContent>
							</HoverCard>

							<HoverCard>
								<HoverCardTrigger>
									<ShieldIcon
										size={36}
										className='border-1 rounded-full border-green-800/50 bg-green-800/30 p-2'
									/>
								</HoverCardTrigger>

								<HoverCardContent>
									<h1 className='mb-2 font-bold'>Admin</h1>
									<p className='text-muted-foreground text-sm'>
										Admin users have access to all features and can manage users
									</p>
								</HoverCardContent>
							</HoverCard>

							<HoverCard>
								<HoverCardTrigger>
									<CandyIcon
										size={36}
										className='border-1 rounded-full border-yellow-500/50 bg-yellow-500/30 p-2'
									/>
								</HoverCardTrigger>

								<HoverCardContent>
									<h1 className='mb-2 font-bold'>Awarded</h1>
									<p className='text-muted-foreground text-sm'>
										This user has been awarded for their contributions
									</p>
								</HoverCardContent>
							</HoverCard>

							<HoverCard>
								<HoverCardTrigger>
									<CitrusIcon
										size={36}
										className='border-1 rounded-full border-orange-500/50 bg-orange-500/30 p-2'
									/>
								</HoverCardTrigger>

								<HoverCardContent>
									<h1 className='mb-2 font-bold'>Popular</h1>
									<p className='text-muted-foreground text-sm'>This user has been popular in the community</p>
								</HoverCardContent>
							</HoverCard>
						</div>
					</div>

					{/* USER CARD CONTAINER */}
					<div className='bg-primary-foreground space-y-2 rounded-lg p-4'>
						<div className='flex items-center gap-2'>
							<Avatar className='size-12'>
								<AvatarImage src={data.imageUrl} />

								<AvatarFallback>
									{data?.firstName?.charAt(0) || data?.username?.charAt(0) || '-'}
								</AvatarFallback>
							</Avatar>

							<h1 className='text-xl font-semibold'>
								{data?.firstName + ' ' + data?.lastName || data?.username || '-'}
							</h1>
						</div>

						<p className='text-muted-foreground text-sm'>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel voluptas distinctio ab ipsa
							commodi fugiat labore quos veritatis cum corrupti sed repudiandae ipsum, harum recusandae
							ratione ipsam in, quis quia
						</p>
					</div>

					{/* INFORMATION CONTAINER */}
					<div className='bg-primary-foreground rounded-lg p-4'>
						<div className='flex items-center justify-between'>
							<h1 className='text-xl font-semibold'>User information</h1>

							<Sheet>
								<SheetTrigger asChild>
									<Button variant='default' size='lg' className='rounded-lg'>
										Edit user
									</Button>
								</SheetTrigger>

								<EditUser userId={id} />
							</Sheet>
						</div>

						<div className='mt-4 space-y-4'>
							<div className='mb-8 flex flex-col gap-2'>
								<p className='text-muted-foreground text-sm'>Profile completion</p>

								<Progress value={66} />
							</div>

							<div className='flex items-center gap-2'>
								<span className='font-bold'>Full name:</span>
								<span>{data?.firstName + ' ' + data?.lastName || data?.username || '-'}</span>
							</div>

							<div className='flex items-center gap-2'>
								<span className='font-bold'>Email:</span>
								<span>{data.emailAddresses[0]?.emailAddress || '-'}</span>
							</div>

							<div className='flex items-center gap-2'>
								<span className='font-bold'>Phone:</span>
								<span>{data.phoneNumbers[0]?.phoneNumber || '-'}</span>
							</div>

							<div className='flex items-center gap-2'>
								<span className='font-bold'>Role:</span>
								<span>{String(data.publicMetadata?.role) || 'user'}</span>
							</div>

							<div className='flex items-center gap-2'>
								<span className='font-bold'>Status:</span>
								<span>{data.banned ? 'banned' : 'active'}</span>
							</div>
						</div>

						<p className='text-muted-foreground mt-4 text-sm'>
							Joined on {new Date(data.createdAt).toLocaleDateString('en-US')}
						</p>
					</div>
				</div>

				{/* RIGHT */}
				<div className='w-full space-y-6 xl:w-2/3'>
					{/* CHART CONTAINER */}
					<div className='bg-primary-foreground rounded-lg p-4'>
						<h1 className='text-xl font-semibold'>User activity</h1>

						<AppLineChart />
					</div>
				</div>
			</div>
		</div>
	)
}

export default SingleUserPage
