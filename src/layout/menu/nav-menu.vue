<template>
	<el-menu class="nav-menu" ellipsis mode="horizontal">
		<template v-for="menu in navMenuList">
			<el-sub-menu :index="menu.name" v-if="menu.children && menu.children.length > 0" :key="menu.name">
				<template #title>{{ menu.name }}</template>
				<el-menu-item v-for="item in menu.children" :key="item.path" :index="item.path" @click="toPage(item, menu.children)">{{
					item.name
				}}</el-menu-item>
			</el-sub-menu>

			<el-menu-item v-else :index="menu.path" @click="toPage(menu, [])">{{ menu.name }}</el-menu-item>
		</template>
	</el-menu>
</template>

<script setup lang="ts" name="nav-menu">
import { useMenuStore } from '@/store/modules/menu';
import { storeToRefs } from 'pinia';

const router = useRouter();
const menuStore = useMenuStore();
const { setModuleMenuList } = menuStore;
const { menuList } = storeToRefs(menuStore);
const navMenuList = computed(() => menuList.value.filter((menu) => !['portal'].includes(menu.name)));

const toPage = (menu: Menu, menuList: Menu[]) => {
	router.push(menu.path);
	setModuleMenuList(menuList);
};
</script>

<style lang="scss" scoped>
.nav-menu {
	height: 4rem;
	width: 50%;
	flex: 1;
	--el-menu-base-level-padding: 12px;
}
</style>
