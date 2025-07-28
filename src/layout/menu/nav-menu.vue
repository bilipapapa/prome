<template>
	<el-menu class="nav-menu" :default-active="defaultActive" :ellipsis="ellipsisEnabled" mode="horizontal" :aria-hidden="false">
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
import { debounce } from 'lodash-es';

const router = useRouter();
const menuStore = useMenuStore();
const { setModuleMenuList } = menuStore;
const { menuList } = storeToRefs(menuStore);
const navMenuList = computed(() => menuList.value.filter((menu) => !['portal'].includes(menu.name)));

const ellipsisEnabled = ref(true);
const defaultActive = ref('');

watchEffect(() => {
	defaultActive.value = router.currentRoute.value.path;
});

onMounted(() => {
	const menuDom: any = document.querySelector('.nav-menu');
	if (!menuDom) return;
	const resizeObserver = new ResizeObserver(menuResize);
	resizeObserver.observe(menuDom);
	onUnmounted(() => resizeObserver.disconnect());
});

const menuResize = () => {
	ellipsisEnabled.value = false;
	debouncedHandleEllipsis();
};

// 防抖
const debouncedHandleEllipsis = debounce(() => {
	nextTick(() => {
		ellipsisEnabled.value = true;
	});
}, 60);

const toPage = (menu: Menu, menuList: Menu[]) => {
	router.push(menu.path);
	setModuleMenuList(menuList);
};
</script>

<style lang="scss" scoped>
.nav-menu {
	height: 0.5rem;
	width: 50%;
	flex: 1;
	overflow: hidden;
	--el-menu-base-level-padding: 12px;
}
</style>
