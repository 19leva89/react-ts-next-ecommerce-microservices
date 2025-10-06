import type { Kafka, Consumer } from 'kafkajs'

export const createConsumer = (kafka: Kafka, groupId: string) => {
	const consumer: Consumer = kafka.consumer({ groupId })

	const connect = async () => {
		await consumer.connect()

		console.log('✅ Kafka consumer connected: ' + groupId)
	}

	const subscribe = async (
		topics: {
			topicName: string
			topicHandler: (message: Record<string, unknown>) => Promise<void>
		}[],
	) => {
		await consumer.subscribe({
			topics: topics.map((topic) => topic.topicName),
			fromBeginning: true,
		})

		await consumer.run({
			eachMessage: async ({ topic, message }) => {
				try {
					const topicConfig = topics.find((t) => t.topicName === topic)
					if (topicConfig) {
						const value = message.value?.toString()

						if (value) {
							await topicConfig.topicHandler(JSON.parse(value))
						}
					}
				} catch (error) {
					console.error('⚠️ Error processing message', error)
				}
			},
		})
	}

	const disconnect = async () => {
		await consumer.disconnect()

		console.log('🛑 Kafka consumer disconnected')
	}

	return { connect, subscribe, disconnect }
}
