<template>
	<div class="1">
		<el-form class="mb10">
			<el-form-item>
				<el-button type="primary" @click="exportExcel">导出Excel</el-button>
			</el-form-item>
		</el-form>

		<el-table :data="tableData" border stripe>
			<el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
			<el-table-column label="名称" prop="title" align="center" width="" min-width=""></el-table-column>
			<el-table-column label="描述" prop="desc" align="center" width="" min-width=""></el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts" name="导出Excel-1">
import apis from '@/api';
import excelDownload from './1';
import { cloneDeep } from 'lodash-es';

// 定义变量
const tableData = ref<any>([]);

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
	const data = cloneDeep(tableData.value).map((el) => {
		return {
			名称: el.title,
			描述: el.desc,
			年龄: el.age,
		};
	});
	excelDownload(data, '导出Excel测试.xlsx');
};
</script>

<style lang="scss" scoped></style>
