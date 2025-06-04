<template>
	<el-header class="layout-header">
		<!-- logo & 菜单 -->
		<div class="layout-header-content">
			<Logo />
			<!-- 导航菜单 -->
			<NavMenu />
			<!-- 操作菜单 -->
			<OperateMenu />
			<!-- 用户信息 -->
			<User />
		</div>
	</el-header>
</template>

<script setup lang="ts" name="layout-header">
const Logo = defineAsyncComponent(() => import('@/layout/logo/index.vue'));
const NavMenu = defineAsyncComponent(() => import('@/layout/menu/nav-menu.vue'));
const OperateMenu = defineAsyncComponent(() => import('@/layout/menu/operate-menu.vue'));
const User = defineAsyncComponent(() => import('@/layout/user/user.vue'));
</script>

<style lang="scss" scoped>
.layout-header {
	width: 100%;
	height: 0.5rem;
	border: 1px dashed #ccc;
	&-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
