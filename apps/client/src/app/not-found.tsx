import { Suspense } from 'react'
import { LoaderIcon } from 'lucide-react'

import { InfoBlock } from '@/components/shared/info-block'

export default function NotFoundPage() {
	return (
		<div className='flex min-h-screen w-full items-center justify-center'>
			<Suspense fallback={<LoaderIcon className='size-5 animate-spin text-white' />}>
				<InfoBlock
					type='not-found'
					title='Page not found'
					text='Please check the address entered is correct or try again later'
					imageUrl='/not-found.png'
				/>
			</Suspense>
		</div>
	)
}
