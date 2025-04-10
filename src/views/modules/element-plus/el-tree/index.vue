<template>
	<div class="tree-box">
		<el-tree
			:data="treeData"
			node-key="id"
			:props="treeProps"
			:filter-node-method="filterNode"
			:indent="0"
			render-after-expand
			ref="treeRef"
			class="tree"
		>
			<template #default="{ node, data }">
				<div class="custom-node">
					<template v-if="node.childNodes.length > 0">
						<img class="custom-icon" v-show="node.expanded" src="/src/assets/imgs/icon-tree-collapse.png" />
						<img class="custom-icon" v-show="!node.expanded" src="/src/assets/imgs/icon-tree-expand.png" />
					</template>
					<div class="custom-label">
						{{ data.label }}
					</div>
				</div>
			</template>
		</el-tree>
	</div>
</template>

<script setup lang="ts">
import { list } from '@/api/tree/base';
const treeRef = ref(null);
const filterText = ref('');
const treeData: any = ref([]);
const treeProps: any = ref({
	label: 'label',
	children: 'children',
	class: (data, node) => {
		if (node.level > 1) {
			// 预设类名 margin-left 8  padding-left 16 , 8为icon宽度的一半 ,tree的indent设为0
			return `custom-tree-node ml8 pl16`;
		}
	},
});

onBeforeMount(() => {
	getTreeData();
});

function filterNode(value: string, data: any) {
	if (!value) return true;
	return data.label.includes(value);
}

async function getTreeData() {
	const { data } = await list();
	treeData.value = data;
}
</script>

<style lang="scss" scoped>
.tree-box {
	width: 300px;
	overflow: auto;
	flex: 1;
	border: 1px solid var(--el-color-primary-light-4);
	margin: 10px;
	:deep(.tree) {
		width: 100%;
		height: 100%;
		background: transparent;
		// 隐藏自带的图标
		.el-tree-node__expand-icon {
			display: none;
		}
		.custom-tree-node {
			border-left: 1px solid #ddd;
		}

		.custom-node {
			display: flex;
			align-items: center;
			.custom-icon {
				width: 16px;
				height: 16px;
				margin-right: 5px;
			}
		}
	}
}
</style>
