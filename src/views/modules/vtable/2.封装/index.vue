<template>
	<VTable v-model="options" />
</template>

<script setup lang="ts" name="vTable-封装">
import { list } from '@/api/table/base';

const options = reactive({
	columns: [
		{ title: 'ID', field: 'id' },
		{ title: '姓名', field: 'name' },
		{ title: '年龄', field: 'age' },
		{ title: '地址', field: 'address' },
	],
	records: <any[]>[],
});

onBeforeMount(() => {
	getData();
});

// 获取数据
const getData = async () => {
	const { data } = await list();
	if (Array.isArray(data) && data.length) {
		options.records = data;
	} else {
		options.records = [];
	}
};
</script>

<style lang="scss" scoped></style>
