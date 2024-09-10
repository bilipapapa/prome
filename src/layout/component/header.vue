<template>
	<el-header class="layout-header">
		<Logo />
		<div class="layout-header-wrapper">
			<NavMenu />
			<OperateMenu />
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
	height: 4rem;
	border: 1px dashed #ccc;
	display: flex;
	align-items: center;
	&-wrapper {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}
}
</style>
