<template>
	<vxe-grid v-bind="gridOptions"></vxe-grid>
</template>

<script setup lang="ts">
import { VxeGridProps } from 'vxe-table';
import apis from '@/api';

const gridOptions = reactive<VxeGridProps>({
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
	data: [],
});

onBeforeMount(() => {
	getData();
});

const getData = async () => {
	const { data } = await apis[`table_base_list`]();
	if (Array.isArray(data) && data.length) {
		gridOptions.data = data;
	} else {
		gridOptions.data = [];
	}
};
</script>

<style lang="scss" scoped></style>
