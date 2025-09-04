import { Args, MockArg, pagination } from '@/mocks'
import { mock, mock2, mock3 } from './virtual-mock'

// 获取表格数据
export const table_virtual_list = (): MockArg => {
	return ['/table/virtual/list', 'get', mock]
}

// 获取表格数据
export const table_virtual_list2 = (): MockArg => {
	return ['/table/virtual/list2', 'get', mock2]
}

// 获取表格数据
export const table_virtual_list3 = (): MockArg => {
	return ['/table/virtual/list3', 'get', mock3]
}