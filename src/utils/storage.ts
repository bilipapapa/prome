import Cookies from 'js-cookie'
import { encryption, decryption } from './crypto'

const isEncrypt = import.meta.env.VITE_STORAGE_ENCRYPT == 'true'
const encKey = import.meta.env.VITE_STORAGE_ENC_KEY
const mode = import.meta.env.VITE_STORAGE_ENC_MODE
const pad = import.meta.env.VITE_STORAGE_ENC_PADDING

// 加密
const encrypt = function (src: any) {
	if (isEncrypt && src) return encryption(src, encKey, mode, pad)
	return src
}

// 解密
const decrypt = function (src: any) {
	if (isEncrypt && src) return decryption(src, encKey, mode, pad)
	return src
}

/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const Local = {
	// 查看 v2.4.3版本更新日志
	setKey(key: string) {
		// @ts-ignore
		let keyStr = `${__PROJECT_NAME__}:${key}`
		return keyStr
	},
	// 设置永久缓存
	set<T>(key: string, val: T) {
		let str = JSON.stringify(val)
		window.localStorage.setItem(Local.setKey(key), encrypt(str))
	},
	// 获取永久缓存
	get(key: string) {
		let str = <string>window.localStorage.getItem(Local.setKey(key))
		return JSON.parse(decrypt(str))
	},
	// 移除永久缓存
	remove(key: string) {
		window.localStorage.removeItem(Local.setKey(key))
	},
	// 移除全部永久缓存
	clear() {
		window.localStorage.clear()
	},
}

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
	// 设置临时缓存
	set(key: string, val: any) {
		if (key === 'token' || key === 'refresh_token') Cookies.set(key, val)
		let str = JSON.stringify(val)
		window.sessionStorage.setItem(Local.setKey(key), encrypt(str))
	},
	// 获取临时缓存
	get(key: string) {
		if (key === 'token' || key === 'refresh_token') return Cookies.get(key)
		let str = <string>window.sessionStorage.getItem(Local.setKey(key))
		return JSON.parse(decrypt(str))
	},
	// 移除临时缓存
	remove(key: string) {
		if (key === 'token' || key === 'refresh_token') Cookies.remove(key)
		window.sessionStorage.removeItem(Local.setKey(key))
	},
	// 移除全部临时缓存
	clear() {
		Cookies.remove('token')
		Cookies.remove('refresh_token')
		window.sessionStorage.clear()
	},
	// 获取当前存储的 token
	getToken() {
		return this.get('token')
	},
}
