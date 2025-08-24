import { Args, MockArg, pagination } from '@/mocks'
import { mock } from './virtual-mock'

// 获取表格数据
export const table_virtual_list = (): MockArg => {
	return ['/table/virtual/list', 'get', mock]
}
