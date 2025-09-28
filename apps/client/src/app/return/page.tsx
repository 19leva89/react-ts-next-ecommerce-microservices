import axios from 'axios'
import Link from 'next/link'

const ReturnPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ session_id: string }> | undefined
}) => {
	const session_id = (await searchParams)?.session_id

	if (!session_id) {
		return <div>No session id found!</div>
	}

	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`)

	return (
		<>
			<h1>Payment {data.status}</h1>

			<p>Payment status: {data.paymentStatus}</p>

			<Link href='/orders'>See your orders</Link>
		</>
	)
}

export default ReturnPage
