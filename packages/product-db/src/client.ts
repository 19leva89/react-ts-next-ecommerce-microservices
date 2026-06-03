import 'dotenv/config'

import { PrismaPg } from '@prisma/adapter-pg'

//! Do not change the path, made for seed.ts
import { PrismaClient } from '../generated/prisma/client'

const isProduction = process.env.NODE_ENV === 'production'

const connectionString = isProduction
	? `${process.env.DATABASE_URL}&uselibpqcompat=true`
	: `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })

export const prisma = new PrismaClient({
	adapter,
	log: isProduction ? ['warn', 'error'] : ['info', 'warn', 'error'],
	errorFormat: 'pretty',
})
