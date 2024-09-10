import { ElMessage } from 'element-plus';

/**
 * 颜色转换函数
 * @method hexToRgbArr  hex => [r, g, b] && [r, g, b, a]  兼容8位hex
 * @method hexToRgbaArr  hex => [r, g, b, a]  兼容8位hex
 * @method hexToRgb  hex => rgb  兼容8位hex egg: #ffffff => rgb(255, 255, 255)
 * @method hexToRgba  hex => rgba  egg: #ffffff => rgba(255, 255, 255, 1)
 * @method rgbToHex rgb或rgba => hex  a=1返回6位hex
 * @method getDarkColor 加深颜色值
 * @method getLightColor 变浅颜色值
 */
export const useChangeColor = function () {
	const rgbReg = /^\#?[0-9A-Fa-f]{6}$/;
	const rgbaReg = /^\#?[0-9A-Fa-f]{8}$/;
	const fix3 = (str: string): number => {
		return Math.round((parseInt(str, 16) / 255) * 1000) / 1000;
	};

	// hex => rgb  返回数组 兼容8位hex egg: #ffffff => [255, 255, 255]
	const hexToRgbArr = (str: string): any => {
		let hexs: any = [];
		let isAlpha = rgbaReg.test(str);
		if (!rgbReg.test(str) && !rgbaReg.test(str)) {
			ElMessage.warning('输入错误的hex颜色值');
			return '';
		}
		str = str.replace('#', '');
		hexs = str.match(/../g);
		for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16);
		const arr = [hexs[0], hexs[1], hexs[2]];
		// 8位hex
		let a = isAlpha ? parseInt(str.slice(6, 8), 16) / 255 : 1;
		if (a !== 1) arr.push(a);
		return arr;
	};

	// hex => rgb  兼容8位hex egg: #ffffff => rgb(255, 255, 255)
	const hexToRgb = (str: string): any => {
		let arr = hexToRgbArr(str);
		return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]}${arr.length === 4 ? `, ${arr[3]}` : ''})`;
	};

	// hex => rgba  返回数组 egg: #ffffff => [255, 255, 255, 1]
	const hexToRgbaArr = (str: string): any => {
		let hexs: any = [];
		let isAlpha = rgbaReg.test(str);
		if (!rgbReg.test(str) && !rgbaReg.test(str)) {
			ElMessage.warning('输入错误的hex颜色值');
			return '';
		}
		hexs = str.replace('#', '').match(/../g);
		for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16);
		let a = isAlpha && hexs[3] ? fix3(hexs[3]) : 1;
		// 8位hex
		hexs[3] = a;
		return hexs;
	};

	// hex => rgba egg: #ffffff => rgba(255, 255, 255, 1)
	const hexToRgba = (str: string): any => {
		let arr = hexToRgbaArr(str);
		return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]})`;
	};

	// rgb或rgba => hex
	const rgbToHex = (r: any, g: any, b: any, a?: any): string => {
		const toInteger = (n: any): number => {
			return typeof n === 'string' ? parseInt(n, 10) : n;
		};
		r = toInteger(r);
		g = toInteger(g);
		b = toInteger(b);
		a = a !== undefined ? parseFloat(a) : undefined;
		const isValidChannel = (n: number): boolean => n >= 0 && n <= 255;
		const isValidAlpha = (n: number): boolean => n >= 0 && n <= 1;
		if (!isValidChannel(r) || !isValidChannel(g) || !isValidChannel(b)) {
			ElMessage.warning('输入错误的rgb颜色值');
			return '';
		}
		if (a !== undefined) {
			if (a > 1) {
				a = 1;
			} else if (!isValidAlpha(a)) {
				return '';
			}
		}
		const toHex = (n: number): string => {
			const hex = n.toString(16);
			return hex.length === 1 ? `0${hex}` : hex;
		};
		const hexR = toHex(r);
		const hexG = toHex(g);
		const hexB = toHex(b);
		if (a === undefined || a === 1) {
			return `#${hexR}${hexG}${hexB}`;
		} else {
			const hexA = toHex(Math.round(a * 255));
			return `#${hexR}${hexG}${hexB}${hexA}`;
		}
	};

	// color 颜色值字符串 | level 变浅的程度，限0-1之间
	const getDarkColor = (color: string, level: number): string => {
		if (!rgbaReg.test(color) && !rgbReg.test(color)) {
			ElMessage.warning('输入错误的hex颜色值');
			return '';
		}
		let rgba = useChangeColor().hexToRgbaArr(color);
		for (let i = 0; i < 3; i++) rgba[i] = Math.floor(rgba[i] * (1 - level));
		if (rgbaReg.test(color)) return useChangeColor().rgbToHex(rgba[0], rgba[1], rgba[2], rgba[3]);

		return useChangeColor().rgbToHex(rgba[0], rgba[1], rgba[2]);
	};

	// color 颜色值字符串 | level 加深的程度，限0-1之间
	const getLightColor = (color: string, level: number): string => {
		if (!rgbaReg.test(color) && !rgbReg.test(color)) {
			ElMessage.warning('输入错误的hex颜色值');
			return '';
		}
		let rgba = useChangeColor().hexToRgbaArr(color);
		for (let i = 0; i < 3; i++) rgba[i] = Math.floor((255 - rgba[i]) * level + rgba[i]);
		// 将alpha值转为16进制0 => 00
		var hexValue = Math.round(rgba[3] * 255).toString(16);
		rgba[3] = hexValue.length < 2 ? '0' + hexValue : hexValue;
		return useChangeColor().rgbToHex(rgba[0], rgba[1], rgba[2]);
	};
	return {
		hexToRgbArr,
		hexToRgbaArr,
		hexToRgb,
		hexToRgba,
		rgbToHex,
		getDarkColor,
		getLightColor,
	};
};
