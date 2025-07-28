<template>
	<div class="vueVTable-demo1">
		<div class="tip">
			<span>tip：2024-09-29新增@visactor/vue-vtable改用新的语法</span>
		</div>
		<div class="vueVTable-box">
			<ListTable class="vueVTable" :options="tableOptions">
				<ListColumn v-for="(column, index) in columns" :key="index" :field="column.field" :title="column.title" />
				<ListColumn field="4" title="邮件" maxWidth="300" />
				<ListColumn field="5" title="地址" dragHeader="true" />
				<ListColumn field="6" title="手机" dragHeader="true" />
				<ListColumn field="7" title="状态" dragHeader="true" />
			</ListTable>
		</div>
	</div>
</template>

<script setup lang="ts" name="listColumn">
import { VTable } from '@visactor/vue-vtable';
const columns = ref([
	{ field: '0', title: '名字' },
	{ field: '1', title: '年龄' },
	{ field: '2', title: '性别' },
	{ field: '3', title: '爱好' },
]);

const tableOptions = ref({
	records: new Array(1000).fill(['张三', 18, '男', 'basketball', 'example@example.com', 'xxx.xxx.xxx.xxx', '12345678901', '正常']),
	hover: {
		highlightMode: 'row',
		disableHeaderHover: true,
	},
	select: {
		disableSelect: true,
	},
});
</script>

<style lang="scss" scoped>
.vueVTable-demo1 {
	height: 100%;
	display: flex;
	flex-direction: column;
	.tip {
		font-size: 14px;
	}
	.vueVTable-box {
		flex: 1;
	}
}
</style>
