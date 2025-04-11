<template>
	<div class="portal">
		<ul class="menuList">
			<template v-for="menu in menuList" :key="menu.name">
				<li v-if="menu.children && menu.children.length" class="menu flex-center m10" @click="toModule(menu)">
					{{ menu.name }}
				</li>
			</template>
		</ul>
	</div>
</template>

<script setup lang="ts" name="portal">
import { useMenuStore } from '@/store/modules/menu';
import { useRouter } from 'vue-router';

const router = useRouter();
const { setModuleMenuList } = useMenuStore();
const { menuList } = storeToRefs(useMenuStore());

const toModule = async (menu: Menu) => {
	await setModuleMenu(menu);
	router.push(menu.children[0].path);
};

const setModuleMenu = (menu: Menu) => {
	setModuleMenuList(menu.children);
};
</script>

<style lang="scss" scoped>
.portal {
	.menuList {
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		.menu {
			width: 150px;
			height: 60px;
			border: 1px dashed #ccc;
			cursor: pointer;
		}
	}
}
</style>
