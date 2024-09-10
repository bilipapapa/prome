import request from '@/utils/request';

export function list() {
	return request({
		url: '/table/base/list',
		method: 'get',
	});
}
