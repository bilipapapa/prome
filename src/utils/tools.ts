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
 * @desc 对象深拷贝
 * @param {T} source - 要拷贝的对象
 * @return {T} 拷贝后的对象
 */
export function deepClone<T>(source: T) {
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
 * @desc 解析url参数
 * @param {string} url - url地址
 * @return {Object} 参数对象
 */
export function parseUrlParams(url: string) {
	// ie不支持URLSearchParams
	if (typeof URLSearchParams !== 'undefined') {
		const search = url.split('?')[1];
		if (!search) return {};
		const obj: Obj = {};
		new URLSearchParams(search).forEach((value, key) => {
			obj[key] = value;
		});
		return obj;
	} else {
		// 使用正则表达式获取地址栏参数
		const obj: Obj = {};
		const reg = /(?:\?|&)([^&=]+)=([^&=]+)/g;
		url.replace(reg, function () {
			obj[arguments[1]] = arguments[2];
			return arguments[0];
		});
		return obj;
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
	parseUrlParams,
};

export default tools;
