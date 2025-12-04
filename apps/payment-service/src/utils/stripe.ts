import dotenv from 'dotenv'
import Stripe from 'stripe'

dotenv.config({ path: '.env.local' })
dotenv.config() // fallback to .env

if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error('❌ STRIPE_SECRET_KEY is missing')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2025-10-29.clover',
	typescript: true,
})
