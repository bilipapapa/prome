<template>
	<div class="excelToJson">
		<el-form class="mb10">
			<el-form-item>
				<el-upload action="" :http-request="selectFile" :show-file-list="false" accept=".xls,.xlsx,.csv"
					><el-button type="primary">选择excel文件</el-button>
				</el-upload>
			</el-form-item>
		</el-form>

		<div class="listTable-box">
			<ListTable :options="gridOptions"></ListTable>
		</div>
	</div>
</template>

<script setup lang="ts" name="ExcelToJson">
import { VxeGridProps } from 'vxe-table';
import { readExcelToJson } from './excel';

const gridOptions = reactive<any>({
	columns: [],
	records: [],
	limitMaxAutoWidth: 800,
	widthMode: 'autoWidth',
	heightMode: 'autoHeight',
});

const selectFile = (data): any => {
	readExcelToJson(data.file).then((json: any) => {
		console.log(json);
		if (json?.length && Object.keys(json[0]).length) {
			gridOptions.columns = Object.keys(json[0]).map((key) => ({ title: key, field: key }));
			gridOptions.records = json;
		}
	});
	return false;
};
</script>

<style lang="scss" scoped>
.excelToJson {
	overflow: hidden;
	.listTable-box {
		flex: 1;
		overflow: hidden;
	}
}
</style>
