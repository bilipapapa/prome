<template>
	<component :is="layouts[app.mode]"></component>
</template>

<script setup lang="ts" name="layout">
import { useAppStore } from '@/store/app';

// 组件
const layouts: any = {
	default: defineAsyncComponent(() => import('@/layout/mode/default.vue')),
	mine: defineAsyncComponent(() => import('@/layout/mode/mine.vue')),
};

// 定义变量
const settingStore = useAppStore();
const { app } = storeToRefs(settingStore);
</script>

<style lang="scss" scoped></style>
@/store/setting
