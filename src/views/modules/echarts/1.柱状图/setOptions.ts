import apis from '@/api'
import Mock from 'mockjs'
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
				itemStyle: {
					color: Mock.mock('@color'),
				},
			})),
		},
	]
}

// 堆叠柱状图·
export async function stack(options: any) {
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