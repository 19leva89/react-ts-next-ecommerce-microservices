import type { Kafka, Producer } from 'kafkajs'

export const createProducer = (kafka: Kafka) => {
	const producer: Producer = kafka.producer()

	const connect = async () => {
		await producer.connect()

		console.log('✅ Kafka producer connected')
	}

	const send = async (topic: string, message: object) => {
		await producer.send({
			topic,
			messages: [{ value: JSON.stringify(message) }],
		})

		console.log(`📤 Sent to topic "${topic}":`, message)
	}

	const disconnect = async () => {
		await producer.disconnect()

		console.log('🛑 Kafka producer disconnected')
	}

	return { connect, send, disconnect }
}
