import request from '@/utils/request';

export function pageList() {
	return request({
		url: '/menu/list',
		method: 'get',
	});
}
