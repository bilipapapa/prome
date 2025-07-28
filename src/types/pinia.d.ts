/**
 * pinia 类型定义
 */

// 路由信息 route
declare interface RouteState<T = RouteRecordRaw> {
	routeList: Array<T>;
}

// 菜单信息 menu
declare interface MenuState<T = Menu> {
	menuList: Menu[];
	moduleMenuList: ModuleMenuList[];
}
declare interface Menu<T = any> {
	name: string;
	path: string;
	children: Menu[];
}
declare interface ModuleMenu<T = any> {
	name: string;
	path: string;
}

// 设置 setting
declare type LayoutMode = 'default' | 'mine';
declare interface AppSetting {
	locale: string;
	watermark: boolean;
	watermarkText: string;
	mode: LayoutMode;
	animation: string;
	footerText: string;
	settingDrawer: boolean;
	defaultColor: string;
	themeColor: string;
	componentSize: string;
	verticalMenuWidth: string;
	verticalMenuExpand: boolean;
	moduleMenuWidth: string;
	moduleMenuExpand: boolean | null;
}
declare interface SettingState {
	app: AppSetting;
}
