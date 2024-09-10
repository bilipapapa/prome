<template>
	<el-main class="layout-main">
		<router-view #default="{ Component }" class="layout-content">
			<transition :name="animation" mode="out-in">
				<keep-alive>
					<component :is="Component" :key="decodeURIComponent(route.path)" />
				</keep-alive>
			</transition>
		</router-view>
	</el-main>
</template>

<script setup lang="ts" name="layout-main">
import { useStore } from '@/store';
// 定义变量
const route = useRoute();
const router = useRouter();
const { useAppStore } = useStore();

const animation = computed(() => {
	return useAppStore().app.animation;
});
</script>

<style lang="scss" scoped></style>
