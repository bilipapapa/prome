import { baseList } from './table.json';
import { parseUrlParams } from '@/utils/tools';

// 获取表格数据
export const table_base_list = () => {
	return [
		'/table/base/list',
		'get',
		(params) => {
			const { pageNum = 1, pageSize = 999999 } = parseUrlParams(params.url);
			const data = baseList.slice((pageNum - 1) * pageSize, pageNum * pageSize);
			return {
				code: 200,
				msg: '操作成功',
				data,
			};
		},
	];
};
