import { Request, Response } from 'express'
import { StripeProductType } from '@repo/types'
import { prisma, Prisma } from '@repo/product-db'

import { producer } from '../utils/kafka.js'

export const createProduct = async (req: Request, res: Response) => {
	const data: Prisma.ProductCreateInput = req.body

	const { colors, images } = data
	if (!colors || !Array.isArray(colors) || colors.length === 0) {
		return res.status(400).json({ message: 'Colors array is required!' })
	}

	if (!images || typeof images !== 'object') {
		return res.status(400).json({ message: 'Images object is required!' })
	}

	const missingColors = colors.filter((color) => !(color in images))

	if (missingColors.length > 0) {
		return res.status(400).json({ message: 'Missing images for colors!', missingColors })
	}

	const product = await prisma.product.create({ data })

	const stripeProduct: StripeProductType = {
		id: product.id.toString(),
		name: product.name,
		price: product.price,
	}

	producer.send('product.created', { value: stripeProduct })
	res.status(201).json(product)
}

export const updateProduct = async (req: Request, res: Response) => {
	const { id } = req.params
	const data: Prisma.ProductUpdateInput = req.body

	const updatedProduct = await prisma.product.update({
		where: { id },
		data,
	})

	return res.status(200).json(updatedProduct)
}

export const deleteProduct = async (req: Request, res: Response) => {
	const { id } = req.params

	const deletedProduct = await prisma.product.delete({
		where: { id },
	})

	producer.send('product.deleted', { value: Number(id) })

	return res.status(200).json(deletedProduct)
}

export const getProducts = async (req: Request, res: Response) => {
	try {
		const { sort, category, search, limit } = req.query

		// Build where clause conditionally
		const where: Prisma.ProductWhereInput = {}

		if (category && typeof category === 'string') {
			where.category = {
				slug: category,
			}
		}

		if (search && typeof search === 'string' && search.trim() !== '') {
			where.name = {
				contains: search.trim(),
				mode: 'insensitive',
			}
		}

		// Sorting logic
		const orderBy: Prisma.ProductOrderByWithRelationInput = (() => {
			switch (sort) {
				case 'asc':
					return { price: Prisma.SortOrder.asc }
				case 'desc':
					return { price: Prisma.SortOrder.desc }
				case 'oldest':
					return { createdAt: Prisma.SortOrder.asc }
				default:
					return { createdAt: Prisma.SortOrder.desc }
			}
		})()

		// Query
		const products = await prisma.product.findMany({
			where,
			orderBy,
			take: limit ? Math.min(Number(limit), 100) : undefined, // Cap limit to prevent abuse
		})

		res.status(200).json(products)
	} catch (error) {
		console.error('Error in getProducts:', error)

		res.status(500).json({ error: 'Internal server error' })
	}
}

export const getProduct = async (req: Request, res: Response) => {
	const { id } = req.params

	const product = await prisma.product.findUnique({
		where: { id },
	})

	return res.status(200).json(product)
}
