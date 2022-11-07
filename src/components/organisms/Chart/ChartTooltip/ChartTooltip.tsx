import { accessors } from '../accessors'
import type { ChartTooltipProps } from './types'

export const ChartTooltip = ({
	tooltipData,
	colorScale,
}: ChartTooltipProps) => {

	if (!tooltipData || !tooltipData.nearestDatum || !colorScale) {
		return null
	}

	return (
		<div>
			<div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
				{tooltipData.nearestDatum.key}
			</div>
			{accessors.xAccessor(tooltipData.nearestDatum.datum)}
			{', '}
			{accessors.yAccessor(tooltipData.nearestDatum.datum)}
		</div>
	)
}
