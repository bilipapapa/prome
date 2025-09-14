<template>
	<el-auto-resizer>
		<template #default="{ height, width }">
			<div class="tree-box">
				<el-input v-model="treeOptions.filterValue" placeholder="输入关键字搜索" clearable />
				<vxe-tree ref="treeRef" class="vxe-tree" v-bind="treeOptions" :height="height"></vxe-tree>
			</div>
		</template>
	</el-auto-resizer>
</template>

<script setup lang="ts" name="">
// import cloudNetwork from './cloudNetWork';

const treeRef = ref();
const treeOptions = reactive({
	lazy: true,
	loading: false,
	transform: true,
	showCheckbox: true,
	filterValue: '',
	keyField: 'uniqueId',
	titleField: 'label',
	childrenField: 'children',
	iconOpen: 'vxe-icon-square-minus',
	iconClose: 'vxe-icon-square-plus',
	// valueField: '',
	isCurrent: true,
	isHover: true,
	virtualYConfig: {
		enabled: true,
		gt: 0,
	},
	filterConfig: {
		filterMethod({ filterValue, node }) {
			// 重写为精确匹配
			return node.title === filterValue;
		},
	},
});

onMounted(() => {
	// treeRef.value.reloadData(cloudNetwork);
});
</script>

<style lang="scss" scoped>
.tree-box {
	height: 100%;
	width: 400px;
}
</style>
