import axios from 'axios'
import { auth, type User } from '@clerk/nextjs/server'

import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'

export const dynamic = 'force-dynamic'

const getData = async (): Promise<{ data: User[]; totalCount: number }> => {
	const { getToken } = await auth()
	const token = await getToken()

	try {
		const { data } = await axios.get<{ data: User[]; totalCount: number }>(
			`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)

		return data
	} catch (error) {
		console.error(error)

		return { data: [], totalCount: 0 }
	}
}

const UsersPage = async () => {
	const res = await getData()

	return (
		<div>
			<div className='bg-secondary mb-8 rounded-md px-4 py-2'>
				<h1 className='font-semibold'>All Users</h1>
			</div>

			<DataTable columns={columns} data={res.data} />
		</div>
	)
}

export default UsersPage
