/**
 * @desc 合并默认属性配置和自定义属性配置 (参数2覆盖参数1)
 * @param defaultOptions 默认属性配置对象（若是响应式，返回的对象也是响应式）
 * @param options 自定义属性配置对象
 * @returns 合并后的属性配置对象defaultOptions
 */
export function mergeObj(defaultOptions: any, options: any) {
	for (const key in options) {
		if (!Object.getOwnPropertyDescriptor(defaultOptions, key)) {
			defaultOptions[key] = options[key]
		}
	}
	return defaultOptions
}

/**
 * @desc 解析url参数
 * @param {string} url - url地址
 * @return {Object} 参数对象
 */
export function parseUrlParams(url: string) {
	// ie不支持URLSearchParams
	if (typeof URLSearchParams !== 'undefined') {
		const search = url.split('?')[1]
		if (!search) return {}
		const obj: Obj = {}
		new URLSearchParams(search).forEach((value, key) => {
			obj[key] = value
		})
		return obj
	} else {
		// 使用正则表达式获取地址栏参数
		const obj: Obj = {}
		const reg = /(?:\?|&)([^&=]+)=([^&=]+)/g
		url.replace(reg, function () {
			obj[arguments[1]] = arguments[2]
			return arguments[0]
		})
		return obj
	}
}


/**
 * @desc 深度合并对象，只合并source中存在的属性
 * @param {T} target - 目标对象
 * @param {U} source - 源对象
 * @return {T & U} 合并后的对象
 */
export function deepMerge<T extends object, U extends object>(target: T, source: U, seen = new WeakMap()): T & U {
	// 处理source为falsey值或空对象的情况
	if (!source || (typeof source === 'object' && Object.getOwnPropertyNames(source).length === 0)) {
		return target as T & U
	}

	// 确保target和source都是对象
	if (typeof target !== 'object' || target === null ||
		typeof source !== 'object' || source === null) {
		return target as T & U
	}

	// 检查循环引用
	if (seen.has(source)) {
		return seen.get(source)
	}
	seen.set(source, target)

	// 获取source的所有自有属性名(包括不可枚举属性)
	const propNames = Object.getOwnPropertyNames(source)

	// 深度合并逻辑
	propNames.forEach(key => {
		// 跳过Vue内部属性(以$或_开头的属性)
		if (key.startsWith('$') || key.startsWith('_')) {
			return
		}

		const sourceValue = (source as any)[key]
		const targetValue = (target as any)[key]

		// 递归合并对象
		if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
			deepMerge(targetValue, sourceValue, seen)
		}
		// 处理数组 - 直接覆盖
		else if (Array.isArray(sourceValue)) {
			(target as any)[key] = [...sourceValue]
		}
		// 处理对象 - 创建新对象并递归合并
		else if (isPlainObject(sourceValue)) {
			(target as any)[key] = deepMerge({}, sourceValue, seen)
		}
		// 基本类型直接赋值
		else {
			(target as any)[key] = sourceValue
		}
	})

	return target as T & U
}

/**
 * 检查是否为普通对象
 */
export function isPlainObject(value: any): value is object {
	return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * @description 生成唯一 uuid
 * @return string
 */
export function generateUUID() {
	if (typeof crypto === 'object') {
		if (typeof crypto.randomUUID === 'function') {
			return crypto.randomUUID()
		}
		if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
			const callback = (c: any) => {
				const num = Number(c)
				return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16)
			}
			return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, callback)
		}
	}
	let timestamp = new Date().getTime()
	let performanceNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		let random = Math.random() * 16
		if (timestamp > 0) {
			random = (timestamp + random) % 16 | 0
			timestamp = Math.floor(timestamp / 16)
		} else {
			random = (performanceNow + random) % 16 | 0
			performanceNow = Math.floor(performanceNow / 16)
		}
		return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16)
	})
}


/**
 * 统一批量导出
 * @method mergeObj 合并默认属性配置和自定义属性配置 (指定覆盖默认)
 * @method deepClone 对象深拷贝
 */
const tools = {
	mergeObj,
	parseUrlParams,
	deepMerge,
	isPlainObject,
	generateUUID
}

export default tools
