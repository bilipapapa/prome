import { Args, MockArg } from '@/mocks'
import treeData from './mock.json'
import { tree, tree2, tree3, cloudNetWork, pipeMock } from './mock'

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
export const tree_virtual_tree = (): MockArg => {
	return ['/tree/virtual/tree', 'get', tree]
}

// 千
export const tree_virtual_tree2 = (): MockArg => {
	return ['/tree/virtual/tree2', 'get', tree2]
}

// 万
export const tree_virtual_tree3 = (): MockArg => {
	return ['/tree/virtual/tree3', 'get', tree3]
}


export const tree_virtual_cloudNetWork = (): MockArg => {
	// return ['/tree/virtual/cloudNetWork', 'get', cloudNetWork]
	return ['/tree/virtual/cloudNetWork', 'get', pipeMock]
}