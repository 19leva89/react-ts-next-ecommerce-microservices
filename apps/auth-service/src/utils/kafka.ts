import { createKafkaClient, createKafkaTopic, createProducer } from '@repo/kafka'

const kafkaClient = createKafkaClient('email-service')

await createKafkaTopic(kafkaClient, 'user.created')

export const producer = createProducer(kafkaClient)
