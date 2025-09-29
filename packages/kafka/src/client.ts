import { Kafka, logLevel } from 'kafkajs'

export const createKafkaClient = (service: string) => {
	if (!process.env.KAFKA_BROKER) {
		throw new Error('❌ Missing KAFKA_BROKER in .env')
	}

	if (!process.env.KAFKA_USERNAME || !process.env.KAFKA_PASSWORD) {
		throw new Error('❌ Missing KAFKA_USERNAME or KAFKA_PASSWORD in .env')
	}

	return new Kafka({
		clientId: service,
		brokers: [process.env.KAFKA_BROKER],
		ssl: process.env.KAFKA_USE_SSL === 'true',
		sasl: {
			mechanism: 'plain',
			username: process.env.KAFKA_USERNAME!,
			password: process.env.KAFKA_PASSWORD!,
		},
		logLevel: logLevel.ERROR,
	})
}
