import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
	darkTheme
} from '@visx/xychart'
import { accessors } from './accessors'
import { ChartTooltip } from './ChartTooltip'
import type { ChartProps } from './types'

export const Chart = ({
	data,
}: ChartProps) => (
	<div className='bg-black'>
		<XYChart
			theme={darkTheme}
			height={500}
			xScale={{ type: 'band' }}
			yScale={{ type: 'linear' }}
		>
			<AnimatedGrid columns={false} numTicks={5} />
			<AnimatedAxis orientation='bottom' />
			<AnimatedAxis orientation='right' />
			{data.map(series => {
				return (
					<AnimatedLineSeries
						key={series.key}
						dataKey={series.key}
						data={series.data}
						{...accessors}
					/>
				)
			})}
			<Tooltip
				snapTooltipToDatumX
				snapTooltipToDatumY
				showVerticalCrosshair
				showSeriesGlyphs
				renderTooltip={ChartTooltip}
			/>
		</XYChart>
	</div>
)
