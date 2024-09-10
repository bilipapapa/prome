import { RouteRecordRaw } from 'vue-router';
import { getViewsModule, router, flatRoute } from '@/router';
import { rootRoute, errorRoute, staticRoute } from '@/router/route';
import { useStore } from '@/store';

const { useRouteStore, useMenuStore, useAppStore } = useStore();

/**
 * @description: 用于存放views-modules里的文件作为路由
 */
export let moduleRoute: RouteRecordRaw[] = [];

/**
 * @description 本地路由初始化, 动态加载views-modules文件夹下的所有index.vue文件
 */
export function autoRouteInit(routePath: string) {
	setRedirect();
	setModuleRoute(routePath);
	setAddRoute();
}

/**
 * @description 设置首页 mode=mine => portal，其他 => home
 */
export function setRedirect() {
	const { app } = useAppStore();
	switch (app.mode) {
		case 'mine':
			rootRoute[0].redirect = '/portal';
			break;
		default:
			rootRoute[0].redirect = '/home';
	}
}

/**
 * @description views-modules文件夹下的所有index.vue文件
 */
export function setModuleRoute(routePath: string) {
	const viewsModules = getViewsModule();
	const mr: Array<RouteRecordRaw> = Object.entries(viewsModules).map(([key, value]) => {
		return {
			path: `/modules${key}`,
			name: `/modules${key}`,
			component: value,
		};
	});
	moduleRoute = mr;

	// 设置moduleMenuList
	const { app } = useAppStore();
	const { setModuleMenuList } = useMenuStore();
	if (app.mode !== 'mine') return;
	const moduleName = decodeURIComponent(routePath.split('/')[2]);
	const modules = moduleRoute
		.filter((r) => {
			return r.path.startsWith(`/modules/${moduleName}`);
		})
		.map((r) => {
			const name = decodeURIComponent(r.path.split('/')[3]);
			return { name, path: r.path };
		});
	if (modules.length) setModuleMenuList(modules);
}

/**
 * @description 合并路由
 */
export function mergeRoute() {
	rootRoute[0].children = [...errorRoute, ...moduleRoute, ...staticRoute];
	return rootRoute;
}

/**
 * @description 过滤路由或进行其他操作
 * @returns {RouteRecordRaw[]} 过滤后的路由
 */
export function filterRoute(): RouteRecordRaw[] {
	// 过滤操作
	const filterRoute = mergeRoute().filter((r) => r);
	useRouteStore().setRouteList(filterRoute);
	return filterRoute;
}

/**
 * @description 设置动态路由
 */
export function setAddRoute() {
	filterRoute().forEach((r: RouteRecordRaw) => {
		router.addRoute(r);
	});
	setMenu();
}

/**
 * @description 设置菜单
 */
export function setMenu() {
	const routeMenu = flatRoute(filterRoute()).filter((r: RouteRecordRaw) => {
		if (typeof r.name === 'string') return r.name.startsWith('/modules');
	});
	let menuList: any = [];
	// 设置首页
	const { app } = useAppStore();
	switch (app.mode) {
		case 'mine':
			menuList.push(staticRoute.find((r) => r.name === 'portal'));
			break;
		default:
			menuList.push(staticRoute.find((r) => r.name === 'home'));
	}
	// 最多二级
	routeMenu.forEach((r: RouteRecordRaw) => {
		const [moduleName, child] = r.path.split('/').slice(2);
		menuList.some((m: any) => {
			return m.name === moduleName;
		})
			? menuList.find((m: any) => m.name === moduleName)?.children.push({ name: child, path: r.path })
			: menuList.push({
					name: moduleName,
					children: [{ name: child, path: r.path }],
				});
	});
	useMenuStore().setMenuList(menuList);
}

