<template>
	<el-footer class="layout-footer"> {{ app.footerText }} </el-footer>
</template>

<script setup lang="ts" name="layout-footer">
import { useAppStore } from '@/store/modules/app';

const { app } = storeToRefs(useAppStore());
</script>

<style lang="scss" scoped>
.layout-footer {
	width: 100%;
	height: 30px;
	border: 1px dashed #ccc;
	display: flex;
	justify-content: center;
	align-items: center;
	user-select: none;
}
</style>
