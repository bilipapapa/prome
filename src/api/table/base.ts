import request from '@/utils/request';

export const list = (params?) => {
	return request({
		url: '/table/base/list',
		method: 'get',
		params,
	});
};
