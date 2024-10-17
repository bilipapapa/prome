import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { Session } from '@/utils/storage';
import qs from 'qs';
import crypto from '@/utils/crypto';

/**
 * 创建并配置一个 Axios 实例对象
 */
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_MOCK ? '' : import.meta.env.VITE_API_URL,
	timeout: 180 * 1000, // 全局超时时间180s
	paramsSerializer: {
		serialize: (params: any) => {
			return qs.stringify(params, { arrayFormat: 'repeat' });
		},
	},
});

/**
 * Axios请求拦截器，对请求进行处理
 * @param config InternalAxiosRequestConfig对象，包含请求配置信息
 */
service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// 统一增加Authorization请求头, skipToken 跳过增加token
		const token = Session.getToken();
		if (token && !config.headers?.skipToken) {
			config.headers![CommonHeaderEnum.AUTHORIZATION] = `Bearer ${token}`;
		}

		// 请求报文加密
		if (config.headers![CommonHeaderEnum.ENC_FLAG]) {
			const enc = crypto.encryption(JSON.stringify(config.data), import.meta.env.VITE_ENC_KEY);
			config.data = {
				encryption: enc,
			};
		}

		// 自动适配单体和微服务架构不同的URL
		// config.url = crypto.adaptationUrl(config.url)

		return config;
	},
	(error) => {
		// 对请求错误进行处理
		return Promise.reject(error);
	}
);

/**
 * 响应拦截器处理函数
 * @param response 响应结果
 * @returns 如果响应成功，则返回响应的data属性；否则，抛出错误或者执行其他操作
 */
const handleResponse = (response: AxiosResponse<any>) => {
	// 针对密文返回解密
	if (response.data?.encryption) {
		const originData = JSON.parse(crypto.decryption(response.data.encryption, import.meta.env.VITE_PWD_ENC_KEY));
		response.data = originData;
		return response.data;
	}

	return response.data;
};

/**
 * 添加 Axios 的响应拦截器，用于全局响应结果处理
 */
service.interceptors.response.use(handleResponse, (error) => {
	const status = Number(error.response.status) || 200;
	return Promise.reject(error.response.data);
});

// 常用header
export enum CommonHeaderEnum {
	'TENANT_ID' = 'TENANT-ID',
	'ENC_FLAG' = 'Enc-Flag',
	'AUTHORIZATION' = 'Authorization',
}

// 导出 axios 实例
export default service;
