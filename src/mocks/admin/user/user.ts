import { userList } from './user.json';

// 用户列表
export const user_list = () => {
	return [
		'/user/list',
		'get',
		() => ({
			code: 200,
			msg: '操作成功',
			data: userList,
		}),
	];
};

// 用户详细信息
export const user_detail = () => {
	return [
		'/user/detail',
		'get',
		{
			code: 200,
			msg: '操作成功',
			data: [],
		},
	];
};
