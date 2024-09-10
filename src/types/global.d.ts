// 申明外部 npm 插件模块
declare module 'splitpanes';
declare module 'js-cookie';
declare module 'qs';

// 声明一个模块，防止引入文件时报错
declare module '*.json';
declare module '*.png';
declare module '*.jpg';
declare module '*.scss';
declare module '*.ts';
declare module '*.js';

// 声明文件，*.vue 后缀的文件交给 vue 模块来处理
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

/**
 * @desc:	全局-对象类型
 */
declare type Obj<T = any> = {
	[key: string]: T;
};

/**
 * @desc:	全局-数组类型
 */
declare type Arr<T = any> = T[];

declare type mockApi = [string, 'get' | 'post' | 'delete' | 'patch' | 'put', object];
