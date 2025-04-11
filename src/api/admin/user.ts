import request from '@/utils/request';

export function pageList() {
	return request({
		url: '/user/list',
		method: 'get',
	});
}

export function detail() {
	return request({
		url: '/user/detail',
		method: 'get',
	});
}
