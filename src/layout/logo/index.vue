<template>
	<div class="layout-logo" @click="logoClick">Logo</div>
</template>

<script setup lang="ts" name="layout-logo">
import { useRouter, useRoute } from 'vue-router';
import { useAppStore } from '@/store/modules/app';

const route = useRoute();
const router = useRouter();

const appStore = useAppStore();
const { app } = storeToRefs(appStore);

// 点击logo 跳转到首页
const logoClick = () => {
	switch (app.value.mode) {
		case 'mine':
			if (route.path !== '/portal') router.push('/portal');
			break;

		default:
			router.push('/');
			break;
	}
};
</script>

<style lang="scss" scoped></style>
