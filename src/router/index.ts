import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { autoRouteInit } from '@/router/auto';
import { localRouteInit } from '@/router/local';
import { serveRouteInit } from '@/router/serve';
import { rootRoute, errorRoute, staticRoute } from '@/router/route';
import { useStore } from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const { useRouteStore, useAppStore } = useStore();

// 动态加载views-modules文件夹下的所有index.vue文件
const viewsModules = import.meta.glob('../views/modules/**/index.vue');

// 创建路由实例
export const router = createRouter({
	history: import.meta.env.VITE_ROUTER_MODE === 'history' ? createWebHistory() : createWebHashHistory(),
	routes: [...rootRoute, ...staticRoute, ...errorRoute],
});

/**
 * @description 获取views-modules文件夹下的所有index.vue文件 以键值对的形式返回 key作为路由名称
 * @示例 { /home: () => import('/src/views/home/index.vue') }
 * @returns {Record<string, Function>}
 */
export function getViewsModule(): { [key: string]: Record<string, Function> } {
	let routeKeyValue = {};
	for (let key in viewsModules) {
		let matched = key.match(/\/views\/modules(.*)\/index.vue$/);
		let routeName = matched?.length ? matched[1] : '';
		if (routeName) routeKeyValue[routeName] = viewsModules[key];
	}
	return routeKeyValue;
}

/**
 * @description 扁平化路由
 * @param {RouteRecordRaw[]} routes
 * @returns {RouteRecordRaw[]} 扁平化后的路由
 */
export function flatRoute(routes: RouteRecordRaw[]): RouteRecordRaw[] {
	let result: RouteRecordRaw[] = [];
	routes.forEach((route) => {
		result.push(route);
		if (route.children) {
			result.push(...flatRoute(route.children));
		}
	});
	return result;
}

/**
 * @description 设置mode=mine时的侧边菜单状态
 */
export function setModuleMenuExpand(routePath: string) {
	const { app, setApp } = useAppStore();
	if (app.mode !== 'mine') return;
	if (routePath.startsWith('/modules/')) {
		if (app.moduleMenuExpand === undefined) {
			setApp({ moduleMenuExpand: true });
		}
	} else {
		setApp({ moduleMenuExpand: false });
	}
}

// 路由守卫
router.beforeEach(async (to, from, next) => {
	NProgress.start();
	const { routeList } = useRouteStore();
	to.path = decodeURIComponent(to.fullPath);

	switch (import.meta.env.VITE_MENU_MODE) {
		case 'auto': // 根据文件自动生成路由和菜单（无权限相关）
			setModuleMenuExpand(to.path);
			if (!routeList.length) {
				await autoRouteInit(to.path);
				// 刷新之后重新导航一次，防止加载动态路由失败
				next({ path: decodeURIComponent(to.path), query: to.query });
			} else {
				next();
			}
			break;
		case 'local': // TODO
			localRouteInit();
			break;
		case 'server': // TODO
			serveRouteInit();
			break;
	}
	NProgress.done();
});

router.afterEach(() => {});

// 导出路由
export default router;
