import { Args, MockArg } from '@/mocks'
import { mockList } from './mock'

// 获取树结构数据
export const tree_list: MockArg = [
	'/tree/base/list',
	'get',
	mockList
]