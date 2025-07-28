<template>
	<el-config-provider :size="getSize" :locale="getLocale">
		<el-watermark v-if="app.watermark" class="watermark" :content="app.watermarkText">
			<router-view />
		</el-watermark>

		<router-view v-else />
		<!-- app设置 -->
		<Setting />
	</el-config-provider>
</template>

<script setup lang="ts" name="app">
import { useI18n } from 'vue-i18n';
import { useStore } from '@/store';
import { Local } from '@/utils/storage';
import rem from '@/utils/rem';

// 引入组件
const Setting = defineAsyncComponent(() => import('@/layout/setting/setting.vue'));

const router = useRouter();
const { useAppStore, useMenuStore } = useStore();
const { app } = toRefs(useAppStore());
const { setModuleMenuList } = useMenuStore();
const { menuList } = toRefs(useMenuStore());

// 定义变量内容
const { messages, locale } = useI18n();

onMounted(() => {
	nextTick(() => {
		// 获取缓存中的配置
		useAppStore().setApp();
		// 设置样式 防止刷新时主题颜色闪烁
		document.documentElement.style.cssText = Local.get('appStyle');
		rem(window, document);
	});

	// 因页面路由为中文名，故前进后退使用popstate事件监听，避免因为中文名称导致页面404问题，
	window.addEventListener('popstate', (event) => {
		// 阻止浏览器默认的导航行为
		event.preventDefault();

		const path = decodeURIComponent(location.pathname);

		// 判断是否已存在匹配路由
		const matchedLength = router.resolve(path).matched.filter((el) => el.path === path).length;
		if (matchedLength) {
			router.replace(path);
			const moduleName = path.match(/\/modules\/(.*)\/(.*)/)?.[1] || '';
			const moduleMenu = menuList.value.find((el) => el.name === moduleName);
			setModuleMenuList(moduleMenu?.children || []);
		}
	});
});

// 全局element size
const getSize = computed(() => {
	return Local.get('app')?.componentSize || app.value.componentSize;
});

// 国际化
const getLocale = computed(() => {
	return messages.value[locale.value] as any;
});
</script>

<style lang="scss" scoped>
.watermark {
	height: 100%;
}
</style>
