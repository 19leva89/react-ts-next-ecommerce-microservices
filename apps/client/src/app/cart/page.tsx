import { Suspense } from 'react'
import { LoaderIcon } from 'lucide-react'

import { CartPageView } from './_components/cart-page-view'

const CartPage = () => {
	return (
		<Suspense fallback={<LoaderIcon className='size-5 animate-spin text-white' />}>
			<CartPageView />
		</Suspense>
	)
}

export default CartPage
