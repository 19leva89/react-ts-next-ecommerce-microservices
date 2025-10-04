'use client'

import Image from 'next/image'
import { cn } from '@repo/ui/lib'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@repo/ui/components'
import { ArrowLeftIcon, LogOutIcon, RefreshCcwIcon } from 'lucide-react'

import { Title } from '@/components/shared'

interface Props {
	type: 'auth' | 'not-found'
	title: string
	text: string
	imageUrl: string
	className?: string
}

export const InfoBlock = ({ title, text, imageUrl, type, className }: Props) => {
	const router = useRouter()

	const { signOut } = useAuth()

	return (
		<div className={cn('m-4 flex flex-wrap items-center justify-center gap-12', className)}>
			<div className='flex flex-col'>
				<div className='w-full'>
					<Title size='lg' text={title} className='font-extrabold' />

					<p className='text-lg text-gray-400'>{text}</p>
				</div>

				<div className='mt-11 flex gap-5'>
					<Button
						variant='default'
						size='lg'
						onClick={() => router.push('/')}
						className='rounded-xl text-white transition-colors duration-300 ease-in-out'
					>
						<ArrowLeftIcon size={16} />
						Back
					</Button>

					{type === 'auth' ? (
						<Button
							variant='outline'
							size='lg'
							onClick={() => signOut()}
							className='rounded-xl transition-colors duration-300 ease-in-out'
						>
							<LogOutIcon size={16} />
							Sign Out
						</Button>
					) : (
						<Button
							variant='outline'
							size='lg'
							onClick={() => router.refresh()}
							className='rounded-xl transition-colors duration-300 ease-in-out'
						>
							<RefreshCcwIcon size={16} />
							Refresh
						</Button>
					)}
				</div>
			</div>

			<Image src={imageUrl} alt={title} width={300} height={300} />
		</div>
	)
}
