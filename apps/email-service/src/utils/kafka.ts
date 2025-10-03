import { createConsumer, createKafkaClient, createKafkaTopic, createProducer } from '@repo/kafka'

const kafkaClient = createKafkaClient('email-service')

await createKafkaTopic(kafkaClient, 'user.created')
await createKafkaTopic(kafkaClient, 'order.created')

export const producer = createProducer(kafkaClient)
export const consumer = createConsumer(kafkaClient, 'email-service')
