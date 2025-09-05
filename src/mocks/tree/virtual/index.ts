import { Args, MockArg } from '@/mocks'
import treeData from './mock.json'
import { tree, tree2, tree3 } from './mock'

// 获取树结构数据
export const tree_virtual_net: MockArg = [
	'/tree/virtual/net',
	'get',
	(args: Args) => {
		const { pageNum = 1, pageSize = 999999999 } = args.query
		const data = treeData.slice((pageNum - 1) * pageSize, pageNum * pageSize)
		return {
			code: 200,
			msg: '获取树结构数据成功',
			data,
		}
	},
]

// 百
export const table_virtual_tree = (): MockArg => {
	return ['/table/virtual/tree', 'get', tree]
}

// 千
export const table_virtual_tree2 = (): MockArg => {
	return ['/table/virtual/tree2', 'get', tree2]
}

// 万
export const table_virtual_tree3 = (): MockArg => {
	return ['/table/virtual/tree3', 'get', tree3]
}