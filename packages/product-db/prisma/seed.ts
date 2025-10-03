import { prisma } from '../src/client'
import { producer } from '../src/kafka'

//! To run the command "pnpm run db:seed" the turborepo servers must be running

const mockCategory = {
	slug: 'test',
	name: 'Test Category',
}

const mockProducts = [
	{
		id: '1',
		name: 'Adidas CoreFit T-Shirt',
		shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		description:
			'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		price: 39.9,
		sizes: ['s', 'm', 'l', 'xl', 'xxl'],
		colors: ['gray', 'purple', 'green'],
		images: {
			gray: '/products/1g.png',
			purple: '/products/1p.png',
			green: '/products/1gr.png',
		},
		categorySlug: 'test',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '2',
		name: 'Puma Ultra Warm Zip',
		shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		description:
			'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		price: 59.9,
		sizes: ['s', 'm', 'l', 'xl'],
		colors: ['gray', 'green'],
		images: { gray: '/products/2g.png', green: '/products/2gr.png' },
		categorySlug: 'test',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '3',
		name: 'Nike Air Essentials Pullover',
		shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		description:
			'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		price: 69.9,
		sizes: ['s', 'm', 'l'],
		colors: ['green', 'blue', 'black'],
		images: {
			green: '/products/3gr.png',
			blue: '/products/3b.png',
			black: '/products/3bl.png',
		},
		categorySlug: 'test',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '4',
		name: 'Nike Dri Flex T-Shirt',
		shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		description:
			'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		price: 29.9,
		sizes: ['s', 'm', 'l'],
		colors: ['white', 'pink'],
		images: { white: '/products/4w.png', pink: '/products/4p.png' },
		categorySlug: 'test',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '5',
		name: 'Under Armour StormFleece',
		shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		description:
			'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		price: 49.9,
		sizes: ['s', 'm', 'l'],
		colors: ['red', 'orange', 'black'],
		images: {
			red: '/products/5r.png',
			orange: '/products/5o.png',
			black: '/products/5bl.png',
		},
		categorySlug: 'test',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '6',
		name: 'Nike Air Max 270',
		shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		description:
			'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		price: 59.9,
		sizes: ['40', '42', '43', '44'],
		colors: ['gray', 'white'],
		images: { gray: '/products/6g.png', white: '/products/6w.png' },
		categorySlug: 'test',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '7',
		name: 'Nike Ultraboost Pulse ',
		shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		description:
			'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		price: 69.9,
		sizes: ['40', '42', '43'],
		colors: ['gray', 'pink'],
		images: { gray: '/products/7g.png', pink: '/products/7p.png' },
		categorySlug: 'test',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '8',
		name: 'Levi’s Classic Denim',
		shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		description:
			'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
		price: 59.9,
		sizes: ['s', 'm', 'l'],
		colors: ['blue', 'green'],
		images: { blue: '/products/8b.png', green: '/products/8gr.png' },
		categorySlug: 'test',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
]

async function up() {
	// First, seed the category to satisfy the foreign key
	await prisma.category.upsert({
		where: { slug: 'test' },
		update: {},
		create: mockCategory,
	})

	// Then, seed the products in the database
	await prisma.product.createMany({
		data: mockProducts,
	})

	// Publish Kafka events to create products in Stripe
	for (const product of mockProducts) {
		await producer.send('product.created', { value: product })
		console.log(`📦 Published Kafka event for product: ${product.id}`)
	}

	console.log(
		`Seeded ${mockProducts.length} products into the database and published creation events to Kafka`,
	)
}

async function down() {
	// Publish Kafka events to delete products from Stripe before removing from DB
	for (const product of mockProducts) {
		await producer.send('product.deleted', { value: product.id })
		console.log(`🗑️ Published Kafka event for deleting product: ${product.id}`)
	}

	// Then, remove the products from the database
	await prisma.product.deleteMany({
		where: {
			id: { in: mockProducts.map((p) => p.id) },
		},
	})

	// Also remove the category if no other products reference it
	await prisma.category.deleteMany({
		where: { slug: 'test' },
	})

	console.log(`Removed ${mockProducts.length} products and the test category from the database`)
}

async function main() {
	try {
		await producer.connect()

		await down()
		await up()

		await producer.disconnect()
	} catch (e) {
		console.error(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)

		await prisma.$disconnect()

		process.exit(1)
	})
