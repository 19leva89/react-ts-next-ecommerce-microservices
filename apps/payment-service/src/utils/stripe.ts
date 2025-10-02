import dotenv from 'dotenv'
import Stripe from 'stripe'

dotenv.config({ path: '.env.local' })
dotenv.config() // fallback на .env

if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error('❌ STRIPE_SECRET_KEY is missing')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2025-09-30.clover',
	typescript: true,
})
