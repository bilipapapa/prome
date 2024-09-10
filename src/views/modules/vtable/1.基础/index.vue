<template>
	<div ref="baseRef"></div>
</template>

<script setup lang="ts" name="vtable-基础">
import { ListTable } from '@visactor/vtable';

// 定义变量
const baseRef = ref();
const options: any = {
	container: null,
	columns: [
		{ title: 'ID', field: 'id' },
		{ title: '姓名', field: 'name' },
		{ title: '年龄', field: 'age' },
		{ title: '地址', field: 'address' },
	],
	records: [
		{ id: 1001, name: '王小虎', age: 18, address: '上海市普陀区金沙江路 1518 弄' },
		{ id: 1002, name: '张小虎', age: 18, address: '上海市普陀区金沙江路 1518 弄' },
		{ id: 1003, name: '李小虎', age: 18, address: '上海市普陀区金沙江路 1518 弄' },
		{ id: 1004, name: '赵小虎', age: 18, address: '上海市普陀区金沙江路 1518 弄' },
	],
};

onMounted(() => {
	let instance = new ListTable(baseRef.value, options);
	window['instance'] = instance;
});
</script>

<style lang="scss" scoped></style>
