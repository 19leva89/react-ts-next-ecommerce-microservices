import fastify from './index.js'

export default async (req: any, res: any) => {
	await fastify.ready()
	fastify.server.emit('request', req, res)
}
