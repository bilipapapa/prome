<template>
	<div class="2">
		<el-form class="mb10">
			<el-form-item>
				<el-button type="primary" @click="exportExcel">导出Excel</el-button>
			</el-form-item>
		</el-form>

		<el-table :data="tableData" border stripe>
			<el-table-column v-for="item in columns" v-bind="item"></el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts" name="导出Excel-2">
import apis from '@/api';
import { saveJsonToExcel } from './excel';
import { cloneDeep } from 'lodash-es'

// 定义变量
const tableData = ref<any>([]);
const columns = ref<any>([
	{ label: '序号', prop: 'index', type: 'index', align: 'center', width: '60' },
	{ label: '名称', prop: 'title', align: 'center', width: '', 'min-width': '' },
	{ label: '描述', prop: 'desc', align: 'center', width: '', 'min-width': '' },
	{ label: '时间', prop: 'createTime', align: 'center', width: '', 'min-width': '' },
]);

onBeforeMount(() => {
	getData();
});

// 获取数据
const getData = async () => {
	const { data } = await apis[`table_base_list`]();
	if (Array.isArray(data) && data.length) {
		tableData.value = data;
	} else {
		tableData.value = [];
	}
};

// 导出Excel
const exportExcel = () => {
	const data = cloneDeep(tableData.value).map((item: any, index: number) => {
		item.index = index + 1;
		return item;
	});
	saveJsonToExcel(data, '导出Excel测试.xlsx', columns.value);
};
</script>

<style lang="scss" scoped></style>
