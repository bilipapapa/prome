<template>
	<el-dialog
		title="选择S端点"
		v-model="visible"
		:close-on-click-modal="false"
		draggable
		align-center
		:modal="false"
		@closed="handleClose"
		append-to-body
		width="35%"
		:before-close="handleClose"
	>
		<vxe-table
			border
			ref="sourcePointTableRef"
			:data="sourcePointTableData"
			show-overflow
			show-header-overflow
			show-footer-overflow
			:column-config="{ resizable: true }"
			:virtual-x-config="{ enabled: false }"
			:virtual-y-config="{ enabled: true, gt: 0 }"
			:min-height="400"
			:max-height="500"
			:radioConfig="{ highlight: true }"
			@radio-change="selectChange"
			@cell-click="cellClick"
			class="mt10"
		>
			<vxe-column type="radio" width="60" align="center"></vxe-column>
			<vxe-column title="名称" field="label" align="center"></vxe-column>
		</vxe-table>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="visible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="">
import { ElMessage } from 'element-plus';
// 定义变量
const visible = ref(false);
const sourcePointTableData = ref([]);
const sourcePointTableRef = ref<any>(null);
const selectSourcePoint = ref(null);

let emit = defineEmits(['select']);

// 打开本窗口
const open = (data: any) => {
	sourcePointTableData.value = data;
	visible.value = true;
};

const confirm = () => {
	if (!selectSourcePoint.value) return ElMessage.warning('请选择一个S端点');
	emit('select', selectSourcePoint.value);
	handleClose();
};

const handleClose = () => {
	visible.value = false;
	selectSourcePoint.value = null;
	sourcePointTableData.value = [];
};

const cellClick = ({ row }: any) => {
	selectSourcePoint.value = row;
	sourcePointTableRef.value.setRadioRow(row);
};

const selectChange = ({ row }: any) => {
	selectSourcePoint.value = row;
};
// 暴露方法
defineExpose({
	open,
});
</script>

<style lang="scss" scoped></style>
