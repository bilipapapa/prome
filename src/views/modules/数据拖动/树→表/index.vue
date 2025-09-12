<template>
	<div class="treeToTable">
		<div class="tree-box">
			<el-auto-resizer>
				<template #default="{ height }">
					<el-tree-v2
						:props="{
							children: 'children',
							label: 'label',
							value: 'id',
						}"
						ref="vTreeRef"
						class="node-tree"
						show-checkbox
						:height="height"
						:expand-on-click-node="false"
					>
						<template #default="{ node, data }">
							<div :draggable="node.isLeaf ? 'true' : 'true'" @dragstart="onTreeDragStart($event, data)" @dragend="onTreeDragEnd">
								<el-icon class="el-icon--left">
									<Document v-if="node.isLeaf" />
									<Folder v-else-if="!node.expanded" />
									<FolderOpened v-else />
								</el-icon>
								<span>{{ node.label }}</span>
							</div>
						</template>
					</el-tree-v2>
				</template>
			</el-auto-resizer>
		</div>

		<div class="vxe-table-box">
			<el-auto-resizer>
				<template #default="{ height }">
					<vxe-table
						ref="vxeTableRef"
						:height="height - 80"
						:row-config="{ isHover: false }"
						keep-source
						:show-overflow="false"
						show-header-overflow
						:virtual-x-config="{ enabled: true, gt: 200 }"
						:virtual-y-config="{ enabled: true, gt: 200 }"
						:edit-config="{ showStatus: true }"
						:merge-cells="mergeCells"
					>
						<vxe-column type="seq" field="seq" align="center" width="60">
							<template #default="{ row, $rowIndex, column }">
								<NodeDropCell
									v-if="isDragging && row.insert"
									:drag-config="newRowDragConfig"
									@drop="($event, droppable) => onCellDrop($event, droppable, row, column)"
								>
								</NodeDropCell>
								<span v-else>{{ $rowIndex + 1 }}</span>
							</template>
						</vxe-column>

						<vxe-column title="数据源" field="source" align="center">
							<template #default="{ row, $rowIndex, column }">
								<NodeDropCell :drag-config="sourceDragConfig(row)" @drop="($event, droppable) => onCellDrop($event, droppable, row, column)">
									<div class="source-box">
										<div v-for="item in row.source" :key="item.id" class="source-item">
											{{ item.label }}
											<el-icon class="delete_icon"><Delete @click="row.source = []" /></el-icon>
										</div>
									</div>
								</NodeDropCell>
							</template>
						</vxe-column>
						<vxe-column title="线路号" field="lineNo" align="center"></vxe-column>
						<vxe-column title="数据目标" field="receive" align="center">
							<template #default="{ row, $rowIndex, column }">
								<NodeDropCell :drag-config="targetDragConfig(row)" @drop="($event, droppable) => onCellDrop($event, droppable, row, column)">
									<div class="receive-box">
										<div v-for="(item, index) in row.receive" :key="item.id" class="receive-item">
											{{ item.label }}
											<el-icon class="delete_icon"><Delete @click="receiveItemDelete(row, index)" /></el-icon>
										</div>
									</div>
								</NodeDropCell>
							</template>
						</vxe-column>
						<vxe-column title="地址" field="address" align="center"></vxe-column>
					</vxe-table>

					<NodeDropCell
						v-if="hasScroll && isDragging"
						class="mt10"
						style="height: 70px"
						:drag-config="newRowDragConfig"
						@drop="($event, droppable) => onCellDrop($event, droppable, null, { field: 'seq' })"
					>
					</NodeDropCell>
				</template>
			</el-auto-resizer>
		</div>

		<SourceList ref="sourceListRef" @select="onSelect" />
	</div>
</template>

<script setup lang="ts" name="treeToTable">
import SourceList from './dialog/source-list.vue';
import NodeDropCell from './component/node-drop-cell.vue';

import apis from '@/api';

import { uniqBy } from 'lodash-es';
import { ElMessage } from 'element-plus';

// const treeData: Arr = [];
const vTreeRef = ref<any>(null);

const loading = ref(false);
const vxeTableRef = ref<any>(null);
const isDragging = ref(false);
const draggingNode: any = ref([]);
const mergeCells = ref<any>([]);
const currentRow = ref<any>(null);
const hasScroll = ref(false);
const tableData: any = [
	{
		source: [],
		lineNo: '线路号1',
		receive: [],
		address: '地址',
	},
];
const sourceListRef = ref<any>(null);

onMounted(() => {
	getData();
	vxeTableRef.value?.reloadData(tableData);
});

const getData = async () => {
	try {
		const { data } = await apis['tree_virtual_net']();
		if (Array.isArray(data) && data.length) {
			setDefaultExpandKeys(data);
			nextTick(() => {
				vTreeRef.value.setData(data);
			});
		} else {
		}
	} finally {
		loading.value = false;
	}
};

// 展开level1,2,3
const setDefaultExpandKeys = (data: any) => {
	let defaultExpandKeysArr: any = [];
	if (data.length) {
		defaultExpandKeysArr.push(data[0].id);
		data[0].children.forEach((item: any) => {
			defaultExpandKeysArr.push(item.id);
			item.children.forEach((el) => {
				defaultExpandKeysArr.push(el.id);
			});
		});
		vTreeRef.value.setExpandedKeys(defaultExpandKeysArr);
	}
};

const newRowDragConfig = computed(() => {
	let nonDropText = '';
	let sourcePointList = draggingNode.value.filter((item) => item.viewType.includes('sourcePoint'));
	if (!sourcePointList.length) nonDropText = '未勾选S端点';
	return {
		nonDropHighlight: !!nonDropText,
		isDragging: isDragging.value,
		draggingText: '拖动此处新增行',
		nonDropText,
	};
});

const sourceDragConfig = computed(() => (row: any) => {
	let nonDropText = '';
	let draggingText = '';
	let sourcePointList = draggingNode.value.filter((item) => item.viewType.includes('sourcePoint'));
	if (!sourcePointList.length) nonDropText = '未勾选S端点';
	if (Array.isArray(row.source) && row.source?.length) nonDropText = '已有S端点';
	sourcePointList.length > 1 ? (draggingText = '拖拽至此选择S端点') : (draggingText = '放置S端点');
	return {
		// showText: !row.source?.length,
		showText: true,
		nonDropHighlight: !!nonDropText,
		isDragging: isDragging.value,
		draggingText: draggingText,
		nonDropText,
	};
});

const targetDragConfig = computed(() => (row: any) => {
	let nonDropText = '';
	let receivePointList = draggingNode.value.filter((item) => item.viewType.includes('receivePoint'));
	if (!receivePointList.length) nonDropText = '未勾选R端点';
	return {
		showText: !row.target?.length,
		nonDropHighlight: !!nonDropText,
		isDragging: isDragging.value,
		draggingText: '放置R端点',
		nonDropText,
	};
});

// 树节点开始拖拽
const onTreeDragStart = (event, data) => {
	let checkedNodes = vTreeRef.value.getCheckedNodes(true);
	event.dataTransfer.effectAllowed = 'copy';
	document.body.classList.add('dragging');
	isDragging.value = true;
	draggingNode.value = checkedNodes;

	const vxeBody = vxeTableRef.value.$el.querySelector('table.vxe-table--body');
	const bodyWrapper = vxeTableRef.value.$el.querySelector('.vxe-table--body-inner-wrapper');
	const hasScrollY = vxeBody.clientHeight > bodyWrapper.clientHeight;

	// 设置拖拽状态
	isDragging.value = true;
	if (hasScrollY) {
		hasScroll.value = true;
	} else {
		vxeTableRef.value.insertAt({ insert: true }, -1).then(({ row }) => {
			vxeTableRef.value.scrollToRow(row);
		});
		const { fullData } = vxeTableRef.value.getTableData();
		mergeCells.value = [
			{
				row: fullData.length - 1,
				col: 0,
				rowspan: 1,
				colspan: 5,
			},
		];
	}

	let sourcePointList = draggingNode.value.filter((item) => item.viewType.includes('sourcePoint'));
	let receivePointList = draggingNode.value.filter((item) => item.viewType.includes('receivePoint'));
	// ✅ 使用隐藏 DOM 做拖拽预览图
	const dragIcon = document.createElement('div');
	dragIcon.style.cssText = `
    position: absolute;
    top: -9999px;
    left: -9999px;
    background: #ecf5ff;
    border: 1px solid #409eff;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
    color: #333;
    white-space: nowrap;
  `;
	dragIcon.innerText = `${sourcePointList.length}个S端点和${receivePointList.length}个R端点`;

	document.body.appendChild(dragIcon);

	// ⚠️ 需要强制 reflow，让浏览器真正渲染 DOM
	dragIcon.getBoundingClientRect();

	event.dataTransfer.setDragImage(dragIcon, dragIcon.offsetWidth / 2 - 5, dragIcon.offsetHeight / 2);

	// 异步删除，不影响 setDragImage
	setTimeout(() => document.body.removeChild(dragIcon), 0);
};

// 树节点拖拽结束
const onTreeDragEnd = () => {
	isDragging.value = false;
	hasScroll.value = false;
	const { fullData } = vxeTableRef.value.getTableData();
	vxeTableRef.value.remove(fullData.filter((item) => item.insert));

	document.body.classList.remove('dragging');
	isDragging.value = false;
	draggingNode.value = [];
};

// 放置
const onCellDrop = (event, droppable, row?, column?) => {
	if (!droppable) return;
	event.preventDefault();

	let field = column.field;
	let sourcePointList = draggingNode.value.filter((item) => item.viewType.includes('sourcePoint'));
	let receivePointList = draggingNode.value.filter((item) => item.viewType.includes('receivePoint'));
	switch (field) {
		case 'seq':
			vxeTableRef.value.insertAt(
				sourcePointList.map((item, index) => ({
					...item,
					source: [sourcePointList[index]],
					receive: receivePointList,
				})),
				-1
			);
			break;
		case 'source':
			currentRow.value = row;
			if (sourcePointList.length === 1) {
				row[field] = sourcePointList;
			} else if (sourcePointList.length > 1) {
				sourceListRef.value.open(sourcePointList);
			}

			break;
		case 'receive':
			let originLen = row[field]?.length;
			row[field] = uniqBy([...row[field], ...receivePointList], 'id');
			if ((row[field]?.length || 0) < originLen + receivePointList.length) ElMessage.info('已自动合并相同项');
			break;
	}
};

const onSelect = (data) => {
	currentRow.value.source = [data];
};

const receiveItemDelete = (row, index) => {
	row.receive = row.receive.filter((_, i) => i !== index);
	vxeTableRef.value.recalculate(true);
};
</script>

<style lang="scss" scoped>
.treeToTable {
	height: 100%;
	display: flex;
	gap: 15px;
	.tree-box {
		flex: 0.25;
		min-width: 0;
		.node-tree {
			user-select: none;
		}
	}
	.vxe-table-box {
		flex: 0.75;
		min-width: 0;
	}
	.node-drop-cell {
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		padding: 5px 10px;
	}

	.source-box,
	.receive-box {
		width: 100%;
		.source-item,
		.receive-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 4px;
			padding: 0px 15px;
			border-radius: 5px;
			.delete_icon {
				display: none;
			}
			&:hover {
				background-color: var(--el-fill-color-light);
				color: var(--el-color-primary);
				transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
				cursor: pointer;
				.delete_icon {
					display: block;
				}
			}
		}
	}
}
</style>
