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

// 引入组件
const Setting = defineAsyncComponent(() => import('@/layout/setting/setting.vue'));

// 定义变量内容
const { messages, locale } = useI18n();
const { useAppStore } = useStore();
const { app } = toRefs(useAppStore());

onMounted(() => {
	nextTick(() => {
		// 获取缓存中的配置
		useAppStore().setApp();
		// 设置样式 防止刷新时主题颜色闪烁
		document.documentElement.style.cssText = Local.get('appStyle');
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
