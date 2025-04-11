<template>
	<div>
		<vxe-table :data="tableData" stripe>
			<vxe-column type="seq" width="60"></vxe-column>
			<vxe-column title="ID" field="id"></vxe-column>
			<vxe-column title="姓名" field="name"></vxe-column>
			<vxe-column title="年龄" field="age"></vxe-column>
			<vxe-column title="地址" field="address"></vxe-column>
		</vxe-table>
	</div>
</template>

<script setup lang="ts" name="vxe-table-基础">
import apis from '@/api';

// 定义变量
const tableData = ref();

onBeforeMount(() => {
	getData();
});

onMounted(() => {});

const getData = async () => {
	const { data } = await apis[`table_base_list`]();
	if (Array.isArray(data) && data.length) {
		tableData.value = data;
	} else {
		tableData.value = [];
	}
};
</script>

<style lang="scss" scoped></style>
