import { Args, MockArg } from '@/mocks';
import { baseList } from './base.json';
import { mock, mock2 } from './base-mock';

// 获取表格数据
export const table_base_list: MockArg = [
	'/table/base/list',
	'get',
	(args: Args) => {
		const { pageNum = 1, pageSize = 999999 } = args.query;
		const data = baseList.slice((pageNum - 1) * pageSize, pageNum * pageSize);
		return {
			code: 200,
			msg: '操作成功',
			data,
		};
	},
];

// 获取表格mock数据
export const table_base_mock = (): MockArg => {
	return ['/table/base/mock', 'get', mock];
};

// 获取表格mock2数据
export const table_base_mock2 = (): MockArg => {
	return ['/table/base/mock2', 'get', mock2];
};
