import { Args, MockArg, pagination } from '@/mocks'
import { mock, mock1, mock2, mock3 } from './virtual-mock'

// 获取表格数据
// 百万
export const table_virtual_list = (): MockArg => {
	return ['/table/virtual/list', 'get', mock]
}

// 十万
export const table_virtual_list1 = (): MockArg => {
	return ['/table/virtual/list', 'get', mock1]
}

// 万
export const table_virtual_list2 = (): MockArg => {
	return ['/table/virtual/list2', 'get', mock2]
}

// 千
export const table_virtual_list3 = (): MockArg => {
	return ['/table/virtual/list3', 'get', mock3]
}