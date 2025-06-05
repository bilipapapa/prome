<template>
	<el-form label-width="200px" label-suffix="：">
		<el-form-item label="最大选择范围限制一个月">
			<Demo1></Demo1>
		</el-form-item>

		<el-form-item label="当天开始每半小时一个间隔">
			<Demo2></Demo2>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts" name="">
import Demo1 from './components/demo1.vue';
import Demo2 from './components/demo2.vue';
</script>

<style lang="scss" scoped></style>
