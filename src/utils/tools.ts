/**
 * @desc 合并默认属性配置和自定义属性配置 (参数2覆盖参数1)
 * @param defaultOptions 默认属性配置对象（若是响应式，返回的对象也是响应式）
 * @param options 自定义属性配置对象
 * @returns 合并后的属性配置对象defaultOptions
 */
export function mergeObj(defaultOptions: any, options: any) {
	for (const key in options) {
		if (!Object.getOwnPropertyDescriptor(defaultOptions, key)) {
			defaultOptions[key] = options[key];
		}
	}
	return defaultOptions;
}

/**
 * 对象深拷贝
 * @param {T} source - 要拷贝的对象
 * @return {T} 拷贝后的对象
 */
function deepClone<T>(source: T) {
	if (typeof source !== 'object') {
		return source;
	}

	if (source instanceof Date) {
		return new Date(source.getTime()) as any;
	}

	if (source instanceof Array) {
		const cloneArr: any[] = [];
		for (let i = 0; i < source.length; ++i) {
			cloneArr[i] = deepClone(source[i]);
		}
		return cloneArr as any;
	}

	if (source instanceof Object) {
		const cloneObj: Obj = {};
		for (const key in source) {
			if (source.hasOwnProperty(key)) {
				cloneObj[key] = deepClone(source[key]);
			}
		}
		return cloneObj as any;
	}
}

/**
 * 统一批量导出
 * @method mergeObj 合并默认属性配置和自定义属性配置 (指定覆盖默认)
 * @method deepClone 对象深拷贝
 */
const tools = {
	mergeObj,
	deepClone,
};

export default tools;
