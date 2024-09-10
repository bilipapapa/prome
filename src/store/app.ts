import { defineStore } from 'pinia';
import { Local } from '@/utils/storage';

export const useAppStore = defineStore('app', {
	state: (): SettingState => ({
		app: {
			/**'
			 * 国际化
			 */
			locale: 'zh-cn', // 本地化
			/**
			 * 水印
			 */
			watermark: false, // 水印
			watermarkText: '芝士，与你分享', // 水印文字
			/**
			 * 布局
			 */
			mode: 'mine', // default, mine
			animation: 'slide-right', // 动画效果
			/**
			 * 设置页面显示
			 */
			settingDrawer: false, // app setting抽屉显示隐藏

			/**
			 * 主题
			 */
			defaultColor: '#646cffff', // 默认色
			themeColor: '#646cffff', // 主题色
			componentSize: 'small', // element-ui组件大小
			/**
			 *  菜单
			 */
			// vertical menu
			verticalMenuWidth: '200px', // 侧边垂直菜单宽度
			verticalMenuExpand: false, //侧边垂直菜单是否展开 true:展开，false:折叠
			// module menu
			moduleMenuWidth: '200px', // module-menu宽度
			moduleMenuExpand: undefined, // module-menu(mode=mine时使用moduleMenu)是否展开 undefined:折叠 并且若是进入module页面自动展开 true:展开，false:折叠
		},
	}),
	actions: {
		/**
		 * @desc: 设置app并存储到localStorage
		 * @desc:	优先级：参数app > Local.get('app') > store.app
		 * @param {Obj} setting	指定属性修改。	egg: { locale: 'en' }
		 */
		setApp(setting?: Obj | undefined) {
			let _app = Local.get('app') ?? this.app;
			this.app = { ..._app, ...setting };
			Local.set('app', this.app);
		},
	},
});
