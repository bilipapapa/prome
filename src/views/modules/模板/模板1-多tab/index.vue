<template>
	<div>
		<el-tabs v-model="tableCurrentTab" @tab-click="handleTabClick">
			<el-tab-pane v-for="item in Object.keys(componentMap)" :key="item" :label="item" :name="item"></el-tab-pane>
		</el-tabs>

		<div>
			<keep-alive>
				<component :is="componentMap[tableCurrentTab]"></component>
			</keep-alive>
		</div>
	</div>
</template>

<script setup lang="ts" name="">
import egg1 from './components/egg1.vue';
import egg2 from './components/egg2.vue';
import egg3 from './components/egg3.vue';
import egg4 from './components/egg4.vue';
import egg5 from './components/egg5.vue';

import { Local } from '@/utils/storage';

const route = useRoute();

const componentMap: any = {
	egg1,
	egg2,
	egg3,
	egg4,
	egg5,
};

const tableCurrentTab = ref('');

let pathSplit = route.fullPath.split('/');

onBeforeMount(() => {
	const tab = Local.get(`${pathSplit[pathSplit.length - 2]}-${pathSplit[pathSplit.length - 1]}-tab`) || Object.keys(componentMap)[0];
	if (tab) tableCurrentTab.value = tab;
});

const handleTabClick = (tab: any) => {
	tableCurrentTab.value = tab.paneName;
	Local.set(`${pathSplit[pathSplit.length - 2]}-${pathSplit[pathSplit.length - 1]}-tab`, tab.paneName);
};
</script>

<style lang="scss" scoped></style>
