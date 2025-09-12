<template>
	<div></div>
</template>

<script setup lang="ts" name="">
import apis from '@/api';

onMounted(async () => {
	const res = await apis['tree_virtual_cloudNetWork']();
	console.log(res.data);
});
</script>

<style lang="scss" scoped></style>
