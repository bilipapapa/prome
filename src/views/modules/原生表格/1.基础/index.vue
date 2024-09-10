<template>
	<div class="表格-基础">
		<table class="table" border="1" bordercolor="#123456" cellspacing="0" cellspadding="10" background="图片链接">
			<thead align="center">
				<tr>
					<td>属性</td>
					<td>说明</td>
				</tr>
			</thead>
			<tbody align="center">
				<tr>
					<td>border</td>
					<td>设置表格边框</td>
				</tr>
				<tr>
					<td>bordercolor</td>
					<td>设置表格边框颜色</td>
				</tr>
				<tr>
					<td>cellspacing</td>
					<td>设置单元格之间的距离</td>
				</tr>
				<tr>
					<td>cellspadding</td>
					<td>设置单元格内边距</td>
				</tr>
				<tr>
					<td>bgcolor</td>
					<td>设置表格背景色</td>
				</tr>
				<tr>
					<td>background</td>
					<td>设置表格背景图片</td>
				</tr>
				<tr>
					<td>align</td>
					<td>设置表格内容的水平对齐方式（top、middle、bottom）</td>
				</tr>
				<tr>
					<td>valign</td>
					<td>设置表格内容的垂直对齐方式（top、middle、bottom）</td>
				</tr>
				<tr>
					<td>width</td>
					<td>设置表格的宽度</td>
				</tr>
				<tr>
					<td>height</td>
					<td>设置表格的高度</td>
				</tr>
				<tr>
					<td>colspan</td>
					<td>设置单元格横跨的列数</td>
				</tr>
				<tr>
					<td>rowspan</td>
					<td>设置单元格横跨的行数</td>
				</tr>
				<tr>
					<td>nowrap</td>
					<td>设置表格内容不换行</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts" name="基础">
import { useChangeColor } from '@/utils/color';
import { useAppStore } from '@/store/app';
import mittBus from '@/utils/mitt';

const { app } = useAppStore();

onMounted(() => {
	let el = document.querySelector('.表格-基础') as HTMLDivElement;
	nextTick(() => {
		el.style.setProperty('--table-hover', useChangeColor().getLightColor(app.themeColor, 0.95));
	});
	mittBus.on('themeColorChange', (color) => {
		el.style.setProperty('--table-hover', useChangeColor().getLightColor(color, 0.95));
	});
});

onUnmounted(() => {
	mittBus.off('themeColorChange', () => {});
});
</script>

<style lang="scss" scoped>
.table {
	width: 60rem;
	th,
	td {
		padding: 12px 15px;
	}
	thead {
		background-color: var(--el-color-primary-light-7);
	}
	tbody tr:nth-of-type(odd) {
		background-color: #fafafa;
	}
	tbody tr:nth-of-type(even) {
		background-color: var(--el-color-primary-light-9);
	}
	tbody tr:hover {
		background-color: var(--table-hover);
	}
}
</style>
