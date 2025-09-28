import axios from 'axios'
import { auth } from '@clerk/nextjs/server'

const TestPage = async () => {
	const { getToken } = await auth()
	const token = await getToken()

	console.log(token)

	// 	const { data: dataProduct } = await axios.get('http://localhost:8000/test', {
	// 		headers: {
	// 			Authorization: `Bearer ${token}`,
	// 		},
	// 	})

	// 	const { data: dataOrder } = await axios.get('http://localhost:8001/test', {
	// 		headers: {
	// 			Authorization: `Bearer ${token}`,
	// 		},
	// 	})

	// const { data: dataPayment } = await axios.get('http://localhost:8002/test', {
	// 	headers: {
	// 		Authorization: `Bearer ${token}`,
	// 	},
	// })

	return <div>TestPage</div>
}

export default TestPage
