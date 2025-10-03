import { Kafka } from 'kafkajs'

export const createKafkaTopic = async (kafka: Kafka, topic: string) => {
	const admin = kafka.admin()

	await admin.connect()

	const existingTopics = await admin.listTopics()

	if (existingTopics.includes(topic)) {
		console.log(`ℹ️ Topic "${topic}" already exists, skipping creation`)

		await admin.disconnect()

		return false
	}

	const created = await admin.createTopics({
		topics: [
			{
				topic,
				numPartitions: 3,
				replicationFactor: 3, // Confluent Cloud needs >=3
			},
		],
	})

	console.log(`✅ Topic "${topic}" created:`, created)

	await admin.disconnect()

	return created
}
