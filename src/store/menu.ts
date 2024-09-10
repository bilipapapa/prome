import { defineStore } from 'pinia';
import { useAppStore } from '@/store/app';
import { Local } from '@/utils/storage';
export const useMenuStore = defineStore({
	id: 'menu',
	state: (): MenuState => ({
		menuList: [],
		moduleMenuList: [],
	}),
	actions: {
		getLocal() {
			const menuList: MenuList[] = Local.get('menuList');
			const moduleMenuList: ModuleMenuList[] = Local.get('moduleMenuList');
			const { app } = useAppStore();
			if (moduleMenuList && app.mode === 'mine') return (this.moduleMenuList = moduleMenuList);
			if (menuList) this.menuList = menuList;
		},
		setMenuList(menuList: MenuList[]) {
			this.menuList = menuList;
			Local.set('menuList', menuList);
		},
		setModuleMenuList(moduleMenuList: ModuleMenuList[]) {
			this.moduleMenuList = moduleMenuList;
			Local.set('moduleMenuList', moduleMenuList);
		},
	},
});
