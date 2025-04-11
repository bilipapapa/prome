import { Args, MockArg } from '@/mocks'
import { mockList } from './mock'

// 获取树结构数据
export const bar_base_list: MockArg = [
	'/echarts/bar/list',
	'get',
	mockList
]