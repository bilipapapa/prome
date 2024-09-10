import { RouteRecordRaw } from 'vue-router';

/**
 * @description: 异常页面路由 404或无权限
 */
export const errorRoute: RouteRecordRaw[] = [
	{
		path: '/:path(.*)*',
		name: 'notFound',
		component: () => import('@/views/error/404.vue'),
		meta: {
			isHide: true,
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('@/views/error/401.vue'),
		meta: {
			isHide: true,
		},
	},
];

/**
 * @description: 静态路由, 本地写死的路由
 */
export const staticRoute: RouteRecordRaw[] = [
	{
		path: '/home',
		name: 'home',
		meta: { title: '首页' },
		component: () => import('@/views/home/index.vue'),
	},
	{
		path: '/portal',
		name: 'portal',
		meta: { title: '门户' },
		component: () => import('@/views/home/portal.vue'),
	},
	{
		path: '/modules',
		name: 'modules',
		meta: { title: '模块' },
		children: [],
		component: () => import('@/layout/mode/mine.vue'),
	},
];

/**
 * @description: 根路由，所有路由节点都挂载在此
 */
export const rootRoute: RouteRecordRaw[] = [
	{
		path: '/',
		name: '/',
		component: () => import('@/layout/index.vue'),
		children: [],
	},
];
