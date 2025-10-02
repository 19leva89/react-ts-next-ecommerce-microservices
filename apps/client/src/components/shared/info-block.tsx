'use client'

import Image from 'next/image'
import { cn } from '@repo/ui/lib'
import { useRouter } from 'next/navigation'
import { Button } from '@repo/ui/components'
import { ArrowLeftIcon, RefreshCcwIcon, UserIcon } from 'lucide-react'

import { Title } from '@/components/shared/title'

interface Props {
	type: 'auth' | 'not-found'
	title: string
	text: string
	imageUrl: string
	className?: string
}

export const InfoBlock = ({ title, text, imageUrl, type, className }: Props) => {
	const router = useRouter()

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
							onClick={() => router.push('/sign-in')}
							className='rounded-xl transition-colors duration-300 ease-in-out'
						>
							<UserIcon size={16} />
							Sign In
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
