<template>
	<!-- default -->
	<el-container class="layout-container">
		<LayoutAside />
		<el-container :class="`layout-container-main`" direction="vertical">
			<el-scrollbar>
				<LayoutHeader />
				<LayoutMain />
				<LayoutFooter />
			</el-scrollbar>
		</el-container>
	</el-container>
</template>

<script setup lang="ts" name="default">
import { useAppStore } from '@/store/modules/app';

// 组件
const LayoutAside = defineAsyncComponent(() => import('@/layout/component/aside.vue'));
const LayoutHeader = defineAsyncComponent(() => import('@/layout/component/header.vue'));
const LayoutMain = defineAsyncComponent(() => import('@/layout/component/main.vue'));
const LayoutFooter = defineAsyncComponent(() => import('@/layout/component/footer.vue'));

// 定义变量
const settingStore = useAppStore();
const { app } = storeToRefs(settingStore);
</script>

<style lang="scss" scoped></style>
