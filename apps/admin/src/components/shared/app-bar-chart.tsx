'use client'

import { use } from 'react'
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@repo/ui/components'
import { OrderChartType } from '@repo/types'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

interface Props {
	dataPromise: Promise<OrderChartType[]>
}

const chartConfig = {
	total: {
		label: 'Total',
		color: 'var(--chart-1)',
	},
	successful: {
		label: 'Successful',
		color: 'var(--chart-4)',
	},
} satisfies ChartConfig

export const AppBarChart = ({ dataPromise }: Props) => {
	const chartData = use(dataPromise)

	return (
		<div>
			<h1 className='mb-6 text-lg font-medium'>Total revenue</h1>

			<ChartContainer config={chartConfig} className='min-h-50 w-full'>
				<BarChart accessibilityLayer data={chartData}>
					<CartesianGrid vertical={false} />

					<XAxis
						dataKey='month'
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/>

					<YAxis tickLine={false} tickMargin={10} axisLine={false} />

					<ChartTooltip
						content={({ active, activeIndex, payload, coordinate }) => (
							<ChartTooltipContent
								active={active}
								activeIndex={activeIndex}
								payload={payload}
								coordinate={coordinate}
								accessibilityLayer={false}
							/>
						)}
					/>

					<ChartLegend content={<ChartLegendContent />} />

					<Bar dataKey='total' fill='var(--color-total)' radius={4} />

					<Bar dataKey='successful' fill='var(--color-successful)' radius={4} />
				</BarChart>
			</ChartContainer>
		</div>
	)
}
