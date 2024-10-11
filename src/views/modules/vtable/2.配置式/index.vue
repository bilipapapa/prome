<template>
	<div>
		<ListTable :options="options" />
	</div>
</template>

<script setup lang="ts" name="vtable-配置式">
const options = {
	columns: [
		{ field: '0', title: 'name' },
		{ field: '1', title: 'age' },
		{ field: '2', title: 'gender' },
		{ field: '3', title: 'hobby' },
	],
	records: new Array(1000).fill(['John', 18, 'male', '🏀']),
};
</script>

<style lang="scss" scoped></style>
