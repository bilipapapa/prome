import * as CryptoJS from 'crypto-js';

/**
 *加密处理
 */
export function encryption(src: string, keyWord: string, mode?: string, pad?: string) {
	const key = CryptoJS.enc.Utf8.parse(keyWord);
	const encryptionMode = mode || import.meta.env.VITE_ENC_MODE;
	const encryptionPad = pad || import.meta.env.VITE_ENC_PADDING;
	// 加密
	var encrypted = CryptoJS.AES.encrypt(src, key, {
		iv: key,
		mode: CryptoJS.mode[encryptionMode],
		padding: CryptoJS.pad[encryptionPad],
	});
	return encrypted.toString();
}

/**
 *  解密
 * @param {*} params 参数列表
 * @returns 明文
 */
export function decryption(src: string, keyWord: string, mode?: string, pad?: string) {
	const key = CryptoJS.enc.Utf8.parse(keyWord);
	const encryptionMode = mode || import.meta.env.VITE_ENC_MODE;
	const encryptionPad = pad || import.meta.env.VITE_ENC_PADDING;
	// 解密逻辑
	var decrypted = CryptoJS.AES.decrypt(src, key, {
		iv: key,
		mode: CryptoJS.mode[encryptionMode],
		padding: CryptoJS.pad[encryptionPad],
	});

	return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * 统一批量导出
 */
const crypto = {
	encryption: (src: string, keyWord: string) => {
		return encryption(src, keyWord);
	},
	decryption: (src: string, keyWord: string) => {
		return decryption(src, keyWord);
	},
};

export default crypto;
