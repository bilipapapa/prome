import Mock from 'mockjs';

Mock.setup({
	timeout: '200-600',
});

const modules: Record<string, any> = import.meta.glob('./**/*.js', { eager: true });

Object.values(modules).forEach((module) => {
	const moduleApi = Object.values(module);
	Object.values(moduleApi).forEach((api: any) => {
		const [url, method, callback] = api instanceof Function ? api() : api;
		Mock.mock(new RegExp(url), method, (options: any) => callback(options));
	});
});

export default Mock;
