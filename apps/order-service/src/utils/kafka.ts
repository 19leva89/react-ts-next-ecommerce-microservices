import { createConsumer, createKafkaClient, createKafkaTopic, createProducer } from '@repo/kafka'

const kafkaClient = createKafkaClient('order-service')

await createKafkaTopic(kafkaClient, 'order.created')
await createKafkaTopic(kafkaClient, 'payment.successful')

export const producer = createProducer(kafkaClient)
export const consumer = createConsumer(kafkaClient, 'order-group')
