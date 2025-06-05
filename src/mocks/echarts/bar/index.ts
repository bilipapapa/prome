import { Args, MockArg } from '@/mocks'
import { mockList, mockList2 } from './mock'

// 获取echarts柱状图数据
export const echarts_bar_list: MockArg = [
	'/echarts/bar/list',
	'get',
	mockList
]

// 获取echarts柱状图数据2
export const echarts_bar_list2: MockArg = [
	'/echarts/bar/list2',
	'get',
	mockList2
]