<template>
	<vxe-grid ref="gridRef" v-bind="state"></vxe-grid>
</template>

<script setup lang="ts" name="vxe-table-hooks">
import { VxeTableInstance } from 'vxe-table';
import { useVxeTable } from '@/hooks/vxeTable';
import apis from '@/api';

const state = reactive<VxeGridOptions>({
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
	api: apis[`table_base_list`],
});

// refs
const {} = useVxeTable(state);
// const gridRef = ref<VxeTableInstance>();
const gridRef = ref();
</script>

<style lang="scss" scoped></style>
