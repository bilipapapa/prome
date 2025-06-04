<template>
	<el-menu :default-active="state.active" class="module-menu">
		<template v-for="val in moduleMenuList">
			<el-menu-item :index="val.path" @click="toMenu(val)">
				<i></i>
				<span>{{ val.name }}</span>
			</el-menu-item>
		</template>
	</el-menu>
</template>

<script setup lang="ts" name="module-menu">
import { useMenuStore } from '@/store/modules/menu';
import { useAppStore } from '@/store/modules/app';

const { moduleMenuList } = storeToRefs(useMenuStore());
const { app } = storeToRefs(useAppStore());
const route = useRoute();
const router = useRouter();

const state = reactive({
	active: '',
});

const isModulePage = computed(() => route.path.startsWith('/modules/'));

watch(
	() => route.path,
	(val) => {
		state.active = decodeURIComponent(val);
	},
	{ immediate: true, deep: true }
);

const toMenu = (val: ModuleMenu) => {
	router.push(val.path);
};
</script>

<style lang="scss" scoped>
.module-menu {
	height: 100%;
}
</style>
