import request from '@/utils/request'

const mockModules: Record<string, any> = import.meta.glob('@/mocks/**/*.ts', { eager: true })
// 移除/src/mocks/index.ts
delete mockModules['/src/mocks/index.ts']

const apis: Obj = {}

// 根据mocks文件夹里的ts文件的接口，自动生成api接口
for (let path in mockModules) {
	for (let apiName in mockModules[path]) {
		let _apiInfo = mockModules[path][apiName]
		let apiInfo = _apiInfo instanceof Function ? _apiInfo() : _apiInfo
		// 请求方法 参数第一个为params 第二个为data
		apis[apiName] = (params: any, data: any) => {
			// 只取url和method
			return request({
				url: apiInfo[0],
				method: apiInfo[1],
				params,
				data,
			})
		}
	}
}

// 根据api文件夹里的ts文件里的接口，覆盖掉mocks文件夹里的接口
const apiModules: Record<string, any> = import.meta.glob('@/api/**/*.ts', { eager: true })
for (let path in apiModules) {
	for (let apiName in apiModules[path]) {
		apis[apiName] = apiModules[path][apiName]
	}
}

export default apis