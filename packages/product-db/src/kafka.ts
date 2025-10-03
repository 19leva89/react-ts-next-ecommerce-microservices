import { createConsumer, createKafkaClient, createKafkaTopic, createProducer } from '@repo/kafka'

const kafkaClient = createKafkaClient('payment-service')

await createKafkaTopic(kafkaClient, 'product.created')
await createKafkaTopic(kafkaClient, 'product.deleted')

export const producer = createProducer(kafkaClient)
export const consumer = createConsumer(kafkaClient, 'payment-group')
