import apis from '@/api'
import Mock from 'mockjs'
import * as echarts from 'echarts'
import { formatDate } from '@/utils/time'


// 普通柱状图
export async function base(options: any) {
	const { data } = await apis[`echarts_bar_list`]()
	options.xAxis.data = data.map((item: any) => item.name)
	options.series = [
		{
			name: Mock.mock('@ctitle(3, 5)'),
			type: 'bar',
			data: data.map((item: any) => ({
				value: item.value,
				// itemStyle: {
				// color: Mock.mock('@color'),
				// },
			})),
		},
	]
}

// 堆叠柱状图·
export async function 堆叠柱状图(options: any) {
	const { data } = await apis[`echarts_bar_list2`]()
	let series: any[] = [
		{
			name: Mock.mock('@ctitle(3, 5)'),
			type: 'bar',
			stack: 'a',
			itemStyle: {
				color: Mock.mock('@color'),
			},
			data: []
		},
		{
			name: Mock.mock('@ctitle(3, 5)'),
			type: 'bar',
			stack: 'b',
			itemStyle: {
				color: Mock.mock('@color'),
			},
			data: []
		},
		{
			name: Mock.mock('@ctitle(3, 5)'),
			type: 'bar',
			stack: 'a',
			itemStyle: {
				color: Mock.mock('@color'),
			},
			data: []
		},
		{
			name: Mock.mock('@ctitle(3, 5)'),
			type: 'bar',
			stack: 'c',
			itemStyle: {
				color: Mock.mock('@color'),
			},
			data: []
		},
		{
			name: Mock.mock('@ctitle(3, 5)'),
			type: 'bar',
			stack: 'b',
			itemStyle: {
				color: Mock.mock('@color'),
			},
			data: []
		},
	]
	// options.xAxis.data的数据为当前时间（分）-未来5分钟,5个时间点
	let now = new Date()
	options.xAxis.data = series.map((_: any, index: number) => {
		let time = new Date(now.getTime() + (index + 1) * 60 * 1000) // 每分钟增加60000毫秒
		return formatDate(time, 'HH:mm')
	})
	options.legend.data = series.map((item: any) => item.name)
	options.xAxis.axisLabel.rotate = 0
	data.forEach((item: any, index: number) => {
		series[index % 5].data.push(item.value)
	})
	options.series = series
}

// 块状切片
export async function 块状切片(options: any) {
	let data = [
		{
			name: Mock.mock('@ctitle(3, 5)'),
			value: Mock.mock('@integer(1,100)')
		},
		{
			name: Mock.mock('@ctitle(3, 5)'),
			value: Mock.mock('@integer(1,100)')
		},
		{
			name: Mock.mock('@ctitle(3, 5)'),
			value: Mock.mock('@integer(1,100)')
		}
	]

	const max = Math.max(...data.map((item: any) => item.value))

	const bgArr = [
		['rgba(23, 95, 147, 0.50)', 'rgba(44, 170, 255, 0.40)'],
		['rgba(159, 123, 62, 0.40)', 'rgba(255, 200, 89, 0.30)'],
		['rgba(22, 109, 101, 0.40)', 'rgba(24, 235, 218, 0.30)']
	]

	const sliceArr = ['#00467a', '#4a4a3e', '#174759']

	// 获取背景颜色
	function bgColor() {
		return bgArr.map((el, i) => ({
			value: max,
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
					{
						offset: 0,
						color: bgArr[i][0], // 渐变起始颜色
					},
					{
						offset: 1,
						color: bgArr[i][1], // 渐变结束颜色
					},
				]),
				borderRadius: [30, 30, 30, 30],
			}
		}))
	}
	// 获取渐变颜色
	function linearColor() {
		return data.map((item: any, i: number) => ({
			value: item.value,
			itemStyle: {
				color: 'transparent'
			},
		}))
	}

	// 获取切块颜色
	function sliceColor() {
		return data.map((item: any, i: number) => ({
			value: item.value,
			itemStyle: {
				color: sliceArr[i],
			},
		}))
	}
	return {
		legend: options.legend,
		grid: options.grid,
		xAxis: {
			type: "value",
			show: false
		},
		yAxis: {
			type: "category",
			show: false,
			splitLine: {
				show: false,
			},
			data: data.map((item: any) => item.name),
		},
		series: [
			{
				name: '全量背景图',
				type: 'bar',
				barGap: '-100%',
				data: bgColor(),
				barWidth: 24,
				itemStyle: {
					borderRadius: [30, 30, 30, 30],
				},
				z: 0,
				label: {
					show: true,
					offset: [10, -40], // 将标签上移20个像素
					color: Mock.mock('@color'),
					fontWeight: 400,
					position: 'left',
					align: 'left',
					fontSize: 16,
					formatter(params) {
						return params.name
					},
				},
			},
			{
				type: 'pictorialBar',
				name: '渐变背景',
				label: {
					show: true,
					position: 'right',
					fontSize: 14,
					color: '#000',
					offset: [0, -54],
				},
				data: linearColor(),
			},
			{
				type: 'pictorialBar',
				name: '块状切片',
				barWidth: 12,
				symbolRepeat: 200,
				symbol: 'rect',
				symbolClip: true,
				symbolSize: [4, 12],
				symbolPosition: 'start',
				symbolOffset: [5, 0],
				data: sliceColor(),
				z: 2,
				zlevel: 0,
			},
		],
	}
}