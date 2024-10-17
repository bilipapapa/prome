import Mock from 'mockjs';
import { parseUrlParams } from '@/utils/tools';
interface MockOptions {
	url: string;
	type: string;
	body: any;
}

declare type MockApi = [string, 'get' | 'post' | 'delete' | 'patch' | 'put', (options: MockOptions) => any];

Mock.setup({
	timeout: '200-600',
});

const modules: Record<string, any> = import.meta.glob('./**/*.js', { eager: true });

Object.values(modules).forEach((module) => {
	const moduleApi: MockApi[] = Object.values(module);
	Object.values(moduleApi).forEach((api: unknown) => {
		const apiTuple: MockApi = api instanceof Function ? api() : api;
		const [url, method, callback] = apiTuple;
		Mock.mock(new RegExp(url), method, (options: MockOptions) => {
			const args = parseUrlParams(options.url);
			callback({ ...options, query: args } as MockOptions & { query: Obj });
		});
	});
});

export default Mock;
