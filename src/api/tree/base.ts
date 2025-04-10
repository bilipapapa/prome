import request from '@/utils/request';

export const list = (params?) => {
	return request({
		url: '/tree/base/list',
		method: 'get',
		params,
	});
};