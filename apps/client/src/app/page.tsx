import Image from 'next/image'

import { ProductList } from '@/components/shared/product-list'

interface Props {
	searchParams: Promise<{ category: string }>
}

const Homepage = async ({ searchParams }: Props) => {
	const category = (await searchParams).category

	return (
		<div>
			<div className='relative mb-12 aspect-[3/1]'>
				<Image src='/img/featured.png' alt='Featured product' fill />
			</div>

			<ProductList category={category} params='homepage' />
		</div>
	)
}

export default Homepage
