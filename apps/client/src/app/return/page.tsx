import axios from 'axios'

import { ReturnPageView } from './_components/return-page-view'

interface Props {
	searchParams: Promise<{ payment_intent: string }>
}

const ReturnPage = async ({ searchParams }: Props) => {
	const resolvedSearchParams = await searchParams

	if (!resolvedSearchParams.payment_intent) {
		return <div>No payment found!</div>
	}

	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/payments/${resolvedSearchParams.payment_intent}`,
		)

		return <ReturnPageView data={data} />
	} catch (error) {
		console.error(error)
	}
}

export default ReturnPage
