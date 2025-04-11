import { Args, MockArg } from '@/mocks'
import { treeMock } from './mock'
import Mock from 'mockjs'

// 获取树结构数据
export const tree_list: MockArg = [
	'/tree/base/list',
	'get',
	(args: Args) => {
		const { pageNum = 1, pageSize = 999999 } = args.query
		const mockData = Mock.mock(treeMock)
		const data = mockData.data.slice((pageNum - 1) * pageSize, pageNum * pageSize)
		return {
			code: 200,
			msg: '获取树结构数据成功',
			data,
		}
	},
]