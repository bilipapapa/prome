<template>
	<div>
		<el-button @click="getData">加载数据</el-button>
		<vxe-table
			ref="vxeTableRef"
			:loading="loading"
			show-overflow
			show-header-overflow
			show-footer-overflow
			:column-config="{ resizable: true }"
			:virtual-x-config="{ enabled: true, gt: 0 }"
			:virtual-y-config="{ enabled: true, gt: 0 }"
		>
			stripe >
			<!-- <vxe-column type="seq" width="auto"></vxe-column> -->
			<vxe-column title="名字" field="name" width="200"></vxe-column>
			<vxe-column title="英文名" field="enName" width="200"></vxe-column>
			<vxe-column title="年龄" field="age" width="200"></vxe-column>
			<vxe-column title="性别" field="sex" width="200"></vxe-column>
			<vxe-column title="联系方式" field="phone" width="200"></vxe-column>
			<vxe-column title="地址" field="address" width="200"></vxe-column>
		</vxe-table>
	</div>
</template>

<script setup lang="ts" name="vxe-table-虚拟表格">
import apis from '@/api';

const vxeTableRef = ref();
const loading = ref(false);

const getData = async () => {
	loading.value = true;
	try {
		const { data } = await apis[`table_virtual_list2`](); // 3：几千 2：几万  1：几十万
		if (Array.isArray(data) && data.length) {
			vxeTableRef.value.reloadData(data);
		} else {
			vxeTableRef.value.reloadData([]);
		}
	} finally {
		loading.value = false;
	}
};
</script>

<style lang="scss" scoped></style>
