import request from '@/utils/request';

export const list = (params?) => {
	return request({
		url: '/table/base/list',
		method: 'get',
		params,
	});
};

export const mock = () => {
	return request({
		url: '/table/base/mock',
		method: 'get',
	});
};

export const mock2 = () => {
	return request({
		url: '/table/base/mock2',
		method: 'get',
	});
};
