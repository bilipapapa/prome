<template>
	<el-drawer v-model="app.settingDrawer" direction="rtl" append-to-body @close="setApp({ settingDrawer: false })">
		<!-- header -->
		<template #header>
			<h4>设置</h4>
		</template>
		<!-- content -->
		<template #default>
			<el-form label-suffix="：">
				<el-form-item label="主题颜色">
					<el-color-picker
						v-model="app.themeColor"
						color-format="hex"
						show-alpha
						@active-change="previewTheme"
						@change="themeChange"
						@blur="previewTheme(app.themeColor)"
						:predefine="predefineColors"
					/>
				</el-form-item>

				<el-form-item label="水印">
					<el-switch v-model="app.watermark" active-text="开" inactive-text="关" />
				</el-form-item>

				<el-form-item label="水印文字">
					<el-input v-model="app.watermarkText" />
				</el-form-item>

				<el-form-item label="组件大小">
					<el-radio-group v-model="app.componentSize" @change="componentSizeChange">
						<el-radio value="small">small</el-radio>
						<el-radio value="default">default</el-radio>
						<el-radio value="large">large</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="setting">
import { useStore } from '@/store';
import { ElMessage } from 'element-plus';
import { useChangeColor } from '@/utils/color';
import { Local } from '@/utils/storage';
import { VxeUI } from 'vxe-table';
import { useI18n } from 'vue-i18n';
import mittBus from '@/utils/mitt';

const { useAppStore } = useStore();
const { setApp } = useAppStore();
const { locale } = useI18n();

//定义变量
// 响应
const { app } = toRefs(useAppStore());
// 非响应
const defaultColor = app.value.defaultColor ?? '#646cffff';
const sizeMap = {
	small: 'mini',
	default: 'small',
	large: 'medium',
};

// 预设颜色
const predefineColors = ref([
	'#ff4500',
	'#ff8c00',
	'#ffd700',
	'#90ee90',
	'#00ced1',
	'#1e90ff',
	'#c71585',
	'rgba(255, 69, 0, 0.68)',
	'rgb(255, 120, 0)',
	'hsv(51, 100, 98)',
	'hsva(120, 40, 94, 0.5)',
	'hsl(181, 100%, 37%)',
	'hsla(209, 100%, 56%, 0.73)',
	'#c7158577',
]);

// 初始化设置
onBeforeMount(() => {
	init();
});

/**
 * @description 初始化设置
 */
const init = () => {
	app.value.settingDrawer = false;
	// 读取缓存中的配置
	setApp();
	// 初始化aside菜单
	initAsideMenu();
	// 初始化组件大小
	initComponentSize();
	// 初始化语言
	initI18n();
	// 初始化布局	TODO
	// 初始化主题(放最后)
	initTheme();
};

// 初始化主题
const initTheme = () => {
	if (app.value.themeColor) {
		themeChange(app.value.themeColor);
	} else {
		themeChange(defaultColor);
	}
};
// 预览主题颜色
const previewTheme = (color: string | null) => {
	if (!color) return;
	// 设置全局主题颜色
	document.documentElement.style.setProperty('--el-color-primary', color);
	// 设置vxe-table组件主题颜色
	document.documentElement.style.setProperty('--vxe-ui-font-primary-color', `var(--el-color-primary)`);
	document.documentElement.style.setProperty('--el-color-primary-dark-2', `${useChangeColor().getDarkColor(color, 0.1)}`);
	for (let i = 1; i < 10; i++) {
		if (!useChangeColor().getLightColor(color, i / 10)) break;
		document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, `${useChangeColor().getLightColor(color, i / 10)}`);
	}
};
// 主题颜色change
const themeChange = (c: string | null) => {
	let color = c;
	if (!color) {
		ElMessage.warning('颜色不能为空,已使用默认颜色');
		color = defaultColor;
	}
	previewTheme(color);
	app.value.themeColor = color;
	// 事件总线 发布主题颜色改变事件
	mittBus.emit('themeColorChange', color as string);
	// 将app配置存储到localStorage中
	setApp(app.value);
	// 将html的style变量存储到localStorage中
	Local.set('appStyle', document.documentElement.style.cssText);
};

// 初始化aside菜单
const initAsideMenu = () => {
	if (app.value.verticalMenuWidth) {
		document.documentElement.style.setProperty('--vertical-menu-width', app.value.verticalMenuWidth);
	}
	if (app.value.moduleMenuWidth) {
		document.documentElement.style.setProperty('--module-menu-width', app.value.moduleMenuWidth);
	}
};

// 初始化组件大小
const initComponentSize = () => {
	VxeUI.setConfig({ size: sizeMap[app.value.componentSize] });
};
// 组件大小change
const componentSizeChange = () => {
	setApp(app.value);
	// 设置vxe-table组件大小
	VxeUI.setConfig({ size: sizeMap[app.value.componentSize] });
	// 关闭并重载
	setApp({ settingDrawer: false });
	window.location.reload();
};

// 初始化语言
const initI18n = () => {
	if (!app.value.locale) app.value.locale = 'zh-cn';
	locale.value = app.value.locale;
};
</script>

<style lang="scss" scoped></style>
