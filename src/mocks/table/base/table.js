import { baseList } from './table.json';

// 获取表格数据
export const table_base_list = () => {
	return [
		'/table/base/list',
		'get',
		() => ({
			code: 200,
			msg: '操作成功',
			data: baseList,
		}),
	];
};
