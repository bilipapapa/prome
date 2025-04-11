<template>
	<div class="element-plus-table">
		<el-table :data="tableData" border stripe v-on="events">
			<el-table-column type="selection" align="center" width="40"></el-table-column>
			<el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
			<el-table-column label="名称" prop="title" align="center" width="" min-width=""></el-table-column>
			<el-table-column label="描述" prop="desc" align="center" width="" min-width=""></el-table-column>
			<el-table-column label="操作" align="center" width="95">
				<template v-slot="{ row }">
					<el-button type="primary" link>编辑</el-button>
					<el-button type="danger" link>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts" name="表格-基础">
import apis from '@/api';

// 定义变量
const tableData = ref<any>([]);

const events = {
	'current-change'(row: any) {
		console.log(row);
	},
	'selection-change'(rows: any) {
		console.log(rows);
	},
};

onBeforeMount(() => {
	getData();
});

// 获取数据s
const getData = async () => {
	const res = await apis[`table_base_list`]({ pageNum: 1, pageSize: 10 }, []);
	const data = res.data
	console.log(res);
	if (Array.isArray(data) && data.length) {
		tableData.value = data;
	} else {
		tableData.value = [];
	}
};
</script>

<style lang="scss" scoped></style>
