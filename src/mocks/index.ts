import Mock from 'mockjs';

Mock.setup({
	timeout: '200-600',
});

const modules: Record<string, any> = import.meta.glob('./**/*.js', { eager: true });

Object.values(modules).forEach((module) => {
	const moduleApi = Object.values(module);
	Object.values(moduleApi).forEach((api: any) => {
		if (api instanceof Function) {
			Mock.mock(...api());
		} else {
			Mock.mock(...api);
		}
	});
});

export default Mock;
