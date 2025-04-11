<template>
	<div class="vxe-table-编辑">
		<div class="mb10">
			<el-button type="primary" @click="validAll">校验全部</el-button>
			<el-button type="primary" @click="getData">刷新列表</el-button>
			<el-button type="primary" @click="clearEdit">清除修改状态</el-button>
			<el-button type="primary" @click="revert">还原修改行</el-button>
		</div>

		<vxe-table
			:data="tableData"
			show-overflow
			keep-source
			ref="gridRef"
			:edit-rules="rules"
			:row-config="{ isCurrent: true, isHover: true }"
			:column-config="{ isCurrent: true, isHover: true }"
			:mouse-config="{ selected: true }"
			:edit-config="{ trigger: 'dblclick', mode: 'cell', showStatus: true }"
			:valid-config="{ msgMode: 'full' }"
			@checkbox-all="selectAll"
			@checkbox-change="selectChange"
		>
			<vxe-table-column type="seq" width="60"></vxe-table-column>
			<vxe-table-column type="checkbox" width="60"></vxe-table-column>
			<vxe-table-column title="名称" field="title" :edit-render="{ autofocus: '.vxe-input--inner' }">
				<template #edit="props">
					<vxe-input v-model="props.row.title" type="text"></vxe-input>
				</template>
			</vxe-table-column>
			<vxe-table-column title="描述" field="desc" :edit-render="{ autofocus: '.vxe-input--inner' }">
				<template #edit="{ row }">
					<el-input v-model="row.desc"></el-input>
				</template>
			</vxe-table-column>
			<vxe-table-column title="价格" field="price" :edit-render="{ autofocus: '.vxe-input--inner' }">
				<template #edit="{ row }">
					<vxe-input v-model="row.price" type="integer"></vxe-input>
				</template>
			</vxe-table-column>
			<vxe-table-column title="数量" field="count" :edit-render="{ autofocus: '.vxe-input--inner' }">
				<template #edit="{ row }">
					<vxe-input v-model="row.count" type="integer"></vxe-input>
				</template>
			</vxe-table-column>
			<vxe-table-column title="状态" field="status">
				<template #default="{ row }">
					<el-switch v-model="row.status" active-value="1" inactive-value="0"></el-switch>
				</template>
			</vxe-table-column>
		</vxe-table>
	</div>
</template>

<script setup lang="ts" name="vxe-table-编辑">
import { list } from '@/api/table/base';
import { VxeUI, VxeTableInstance, VxeTablePropTypes } from 'vxe-table';
import { ElMessage } from 'element-plus';

// 定义变量
const gridRef = ref<VxeTableInstance>();
const tableData = ref<any[]>([]);
const rules = ref<VxeTablePropTypes.EditRules>({
	title: [
		{ required: true, message: '请输入名称' },
		{
			validator({ cellValue }) {
				// 模拟服务端校验
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						if (cellValue && (cellValue.length < 3 || cellValue.length > 50)) {
							reject(new Error('名称长度在 3 到 50 个字符之间'));
						} else {
							resolve();
						}
					}, 100);
				});
			},
		},
	],
});
const selection = ref<any>([]);

onBeforeMount(() => {
	getData();
});

const getData = async () => {
	const { data } = await list();
	if (Array.isArray(data) && data.length) {
		tableData.value = data;
	} else {
		tableData.value = [];
	}
};

// 校验全部
const validAll = async () => {
	const $table = gridRef.value;
	if ($table) {
		const errMap = await $table.fullValidate(true);
		console.log(errMap);
		if (errMap) {
			const msgList: string[] = [];
			Object.values(errMap).forEach((errList: any) => {
				errList.forEach((params: any) => {
					const { rowIndex, column, rules } = params;
					rules.forEach((rule: any) => {
						msgList.push(`第 ${rowIndex + 1} 行 ${column.title} 校验错误：${rule.message}`);
					});
				});
			});
			ElMessage.closeAll();
			ElMessage({
				message: h(
					'div',
					{ style: 'color: var(--el-color-error)' },
					msgList.map((msg) => h('p', msg))
				),
				type: 'error',
				duration: 0,
				showClose: true,
			});
			return false;
		} else {
			return true;
		}
	}
};

// 清除修改状态
const clearEdit = async () => {
	const $table = gridRef.value;
	if ($table) {
		await $table.clearEdit();
		// 重新加载行
		selection.value.forEach(async (row: any) => {
			await $table.reloadRow(row, {});
		});
	}
};

// 还原修改行
const revert = async () => {
	const $table = gridRef.value;
	if ($table) {
		await $table.clearEdit();
		// 还原数据
		if (selection.value.length) {
			selection.value.forEach(async (row: any) => {
				await $table.revertData(row);
			});
		} else {
			tableData.value.forEach(async (row: any) => {
				await $table.revertData(row);
			});
		}
	}
};

// 全选
const selectAll = ({ checked }) => {
	selection.value = gridRef.value?.getCheckboxRecords();
};

// 单选
const selectChange = ({ checked }) => {
	selection.value = gridRef.value?.getCheckboxRecords();
};
</script>

<style lang="scss" scoped></style>
