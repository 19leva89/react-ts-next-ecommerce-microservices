'use client'

import { use } from 'react'
import { OrderChartType } from '@repo/types'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@repo/ui/components'

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

// const chartData = [
//   { month: "January", total: 186, successful: 80 },
//   { month: "February", total: 305, successful: 200 },
//   { month: "March", total: 237, successful: 120 },
//   { month: "April", total: 173, successful: 100 },
//   { month: "May", total: 209, successful: 130 },
//   { month: "June", total: 214, successful: 140 },
// ];

export const AppBarChart = ({ dataPromise }: Props) => {
	const chartData = use(dataPromise)

	return (
		<div>
			<h1 className='mb-6 text-lg font-medium'>Total Revenue</h1>

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
						content={
							<ChartTooltipContent
								active={false}
								payload={[]}
								coordinate={{ x: 0, y: 0 }}
								accessibilityLayer={false}
							/>
						}
					/>

					<ChartLegend content={<ChartLegendContent />} />

					<Bar dataKey='total' fill='var(--color-total)' radius={4} />

					<Bar dataKey='successful' fill='var(--color-successful)' radius={4} />
				</BarChart>
			</ChartContainer>
		</div>
	)
}
