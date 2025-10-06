import { InfoBlock } from '@/components/shared/info-block'

const NotAuthPage = () => {
	return (
		<div className='flex min-h-screen w-full items-center justify-center'>
			<InfoBlock
				type='auth'
				title='Access denied'
				text='This page can only be viewed by administrators'
				imageUrl='/img/lock.png'
			/>
		</div>
	)
}

export default NotAuthPage
