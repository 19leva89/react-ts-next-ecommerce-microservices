import { Suspense } from 'react'

import { LoadingState } from '@/components/shared'
import { InfoBlock } from '@/components/shared/info-block'

export default function NotFoundPage() {
	return (
		<div className='flex min-h-screen w-full items-center justify-center'>
			<Suspense fallback={<LoadingState title='Loading page' description='This may take a few seconds' />}>
				<InfoBlock
					type='not-found'
					title='Page not found'
					text='Please check the address entered is correct or try again later'
					imageUrl='/img/not-found.png'
				/>
			</Suspense>
		</div>
	)
}
