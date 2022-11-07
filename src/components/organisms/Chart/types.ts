export interface Datum {
	x: string
	y: number
}

export interface DataSeries {
	key: string
	data: Datum[]
}

export interface ChartProps {
	data: DataSeries[]
}
