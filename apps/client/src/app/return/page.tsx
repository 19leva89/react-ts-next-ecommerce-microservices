import axios from 'axios'
import { auth } from '@clerk/nextjs/server'
import { ReturnPageView } from './_components/return-page-view'

interface Props {
	searchParams: Promise<{ session_id: string }>
}

interface SessionData {
	id: string
	status: string
	amount_total: number
	currency: string
}

async function fetchSessionData(session_id: string): Promise<SessionData | null> {
	try {
		const { getToken } = await auth()
		const token = await getToken()

		const response = await axios.get<SessionData>(
			`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)

		return response.data
	} catch (error) {
		console.error('Failed to fetch session data:', error)

		return null
	}
}

const ReturnPage = async ({ searchParams }: Props) => {
	const params = await searchParams
	const session_id = params.session_id

	if (!session_id) {
		return <div>No session id found!</div>
	}

	const data = await fetchSessionData(session_id)

	if (!data) {
		return <div>Failed to fetch session data</div>
	}

	return <ReturnPageView data={data} />
}

export default ReturnPage
