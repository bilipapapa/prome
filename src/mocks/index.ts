import Mock from 'mockjs';
import { parseUrlParams } from '@/utils/tools';

// Mock.mock方法参数
export type MockArg = [string, AxiosMethod, (options: Args) => any | Obj];

// Mock.mock第三个参数为函数时，需要传入一个对象，包含url、type、body三个属性
export interface MockOptions {
	url: string;
	type: string;
	body: any;
}

// 自定义返回方法参数 增加了自定义参数query
export interface Args extends MockOptions {
	query: Obj;
}

Mock.setup({
	timeout: '1-300', // 默认10-100
});

// 导出所有的mock文件（.ts格式）
const modules: Record<string, any> = import.meta.glob('./**/*.ts', { eager: true });
Object.values(modules)
	.map((module) => Object.values(module))
	.flat()
	.forEach((arg: unknown) => {
		const mockArg: MockArg = arg instanceof Function ? arg() : arg;
		const [url, method, cb] = mockArg;
		const callBack = cb instanceof Function ? mockFun : cb;

		function mockFun(options: MockOptions) {
			const query = parseUrlParams(options.url);
			return cb({ ...options, query } as Args);
		}

		Mock.mock(new RegExp(url), method, callBack);
	});

export default Mock;
