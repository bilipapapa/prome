<template>
	<el-auto-resizer>
		<template #default="{ height }">
			<el-tree-v2
				:props="{
					children: 'children',
					label: 'label',
					value: 'uniqueId',
				}"
				:height="height"
				:default-expanded-keys="expandedKeys"
				class="node-tree"
				ref="vTreeRef"
				show-checkbox
				:expand-on-click-node="false"
			>
			</el-tree-v2>
		</template>
	</el-auto-resizer>
</template>

<script setup lang="ts" name="">
import treeDataDemo from './treeData';
const expandedKeys = ref();
const vTreeRef = ref();

onBeforeMount(() => {
	setDefaultExpandKeys(treeDataDemo);
});

onMounted(() => {
	vTreeRef.value.setData(treeDataDemo);
	console.log(treeDataDemo);
});

// 根节点&分类节点 默认展开
const setDefaultExpandKeys = (data: any) => {
	let defaultExpandKeysArr: any = [];
	if (data.length) {
		defaultExpandKeysArr.push(data[0].uniqueId);
		data[0].children.forEach((item: any) => {
			defaultExpandKeysArr.push(item.uniqueId);
		});
		expandedKeys.value = defaultExpandKeysArr;
	}
};
</script>

<style lang="scss" scoped></style>
