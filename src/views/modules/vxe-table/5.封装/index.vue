<template>
	<Vxe ref="vxeRef" v-model="gridOptions" v-on="eventTrigger"></Vxe>
</template>

<script setup lang="ts" name="vxe-table-封装">
import apis from '@/api';
import { useTemplateRef } from 'vue';

const vxeRef = useTemplateRef('vxeRef');
const gridOptions = reactive<VxeGridOptions>({
	columns: [
		{ type: 'seq', width: 60 },
		{ type: 'checkbox', width: 60 },
		{ title: 'ID', field: 'id' },
		{ title: '名称', field: 'title', editRender: { name: 'input' } },
		{ title: '描述', field: 'desc' },
		{ title: '价格', field: 'price' },
		{ title: '数量', field: 'count' },
		{ title: '状态', field: 'status' },
	],
	rowConfig: {
		isCurrent: true,
	},
	api: apis.table_base_list,
	isPage: false,
});

const eventTrigger = {
	'checkbox-change': () => {
		console.log(gridOptions.selectRows);
	},
};
</script>

<style lang="scss" scoped></style>
