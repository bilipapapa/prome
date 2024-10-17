import { baseList } from './table.json';

// 获取表格数据
export const table_base_list = [
	'/table/base/list',
	'get',
	(params) => {
		const { pageNum = 1, pageSize = 999999 } = params.query;
		const data = baseList.slice((pageNum - 1) * pageSize, pageNum * pageSize);
		return {
			code: 200,
			msg: '操作成功',
			data,
		};
	},
];
