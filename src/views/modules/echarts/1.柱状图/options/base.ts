export default {
	color: ['#91BEF9', '#94E6FC', '#79F28E', '#CDF279', '#F3AD79', '#F29496', '#F4F198'],
	legend: {
		top: '2%',
	},
	grid: {
		top: '10%',
		left: '2%',
		right: '2%',
		bottom: '2%',
		containLabel: true
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	xAxis: {
		type: 'category',
		axisLabel: {
			rotate: 45
		},
		data: [],
	},
	yAxis: {
		type: 'value'
	},
	series: [],
}