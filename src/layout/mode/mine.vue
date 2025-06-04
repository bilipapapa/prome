<template>
	<!-- mine -->
	<el-container class="layout-container">
		<LayoutModuleAside />
		<el-container class="layout-container-main" direction="vertical">
			<el-scrollbar>
				<LayoutHeader />
				<LayoutMain />
				<LayoutFooter />
			</el-scrollbar>
		</el-container>
	</el-container>
</template>

<script setup lang="ts" name="mine">
import { useRoute } from 'vue-router';
import { useStore } from '@/store';

// 组件
import LayoutModuleAside from '@/layout/component/aside.vue';
import LayoutHeader from '@/layout/component/header.vue';
import LayoutMain from '@/layout/component/main.vue';
import LayoutFooter from '@/layout/component/footer.vue';

// 定义变量
const route = useRoute();
const { useAppStore, useMenuStore } = useStore();
const { app } = toRefs(useAppStore());
const { moduleMenuList } = toRefs(useMenuStore());

// 侧边栏module菜单是否显示
// const moduleMenuVisible = computed(() => route.path.startsWith('/modules/'));
</script>

<style lang="scss" scoped></style>
