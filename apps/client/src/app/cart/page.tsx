import { Suspense } from 'react'

import { LoadingState } from '@/components/shared'
import { CartPageView } from './_components/cart-page-view'

const CartPage = () => {
	return (
		<Suspense fallback={<LoadingState title='Loading page' description='This may take a few seconds' />}>
			<CartPageView />
		</Suspense>
	)
}

export default CartPage
