<template>
	<div
		class="node-drop-cell"
		:class="{
			'dragging-highlight': highlightOnDragging,
			'drag-over-highlight': highlightOnDragOver,
			'disable-highlight': highlightOnNonDrop,
		}"
		:style="{
			'--dragging-text': mergedConfig.showText ? `'${mergedConfig.draggingText}'` : '',
			'--drag-over-text': mergedConfig.showText ? `'${mergedConfig.dragOverText}'` : '',
			'--nonDropText-text': mergedConfig.showText ? `'${mergedConfig.nonDropText}'` : '',
		}"
		@dragover="handleDragover"
		@dragenter="handleDragEnter"
		@dragleave="handleDragLeave"
		@drop="handleDrop"
	>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
// 定义接口
interface DragConfig {
	disableHighlight?: boolean; // 是否禁用高亮
	draggingHighlight?: boolean; // 拖拽中是否高亮
	dragOverHighlight?: boolean; // 拖拽到当前单元格时是否高亮
	nonDropHighlight?: boolean; // 不可放置时是否高亮
	isDragging?: boolean; // 是否正在拖拽
	showText?: boolean; // 高亮时是否显示文本
	draggingText?: string; // 拖拽中高亮时显示的文本
	dragOverText?: string; // 拖拽到当前单元格高亮时显示的文本
	nonDropText?: string; // 禁止放置高亮时显示的文本
}

// 定义props
interface Props {
	dragConfig?: DragConfig;
}

// 使用withDefaults定义props默认值
const props = withDefaults(defineProps<Props>(), {
	dragConfig: () => ({}),
});

// 定义emit事件
const emit = defineEmits<{
	(e: 'dragenter', event: DragEvent, droppable: boolean): void;
	(e: 'dragover', event: DragEvent, droppable: boolean): void;
	(e: 'dragleave', event: DragEvent, droppable: boolean): void;
	(e: 'drop', event: DragEvent, droppable: boolean): void;
}>();

// 是否拖到了当前区域
const isDragOver = ref(false);

// 合并默认配置和传入的配置
const mergedConfig = computed<DragConfig>(() => ({
	disableHighlight: false,
	draggingHighlight: true,
	dragOverHighlight: true,
	nonDropHighlight: true,
	isDragging: false,
	showText: true,
	draggingText: '拖拽至此',
	dragOverText: '鼠标松开放置',
	nonDropText: '禁止放置',
	...props.dragConfig,
}));

// 拖拽中是否高亮
const highlightOnDragging = computed((): boolean => {
	return mergedConfig.value.isDragging! && mergedConfig.value.draggingHighlight! && !mergedConfig.value.disableHighlight!;
});

// 拖拽到当前区域是否高亮
const highlightOnDragOver = computed((): boolean => {
	return isDragOver.value! && mergedConfig.value.dragOverHighlight! && !mergedConfig.value.disableHighlight!;
});

// 不可放置时是否高亮
const highlightOnNonDrop = computed((): boolean => {
	return mergedConfig.value.isDragging! && mergedConfig.value.nonDropHighlight! && !mergedConfig.value.disableHighlight!;
});

// 在本区域上拖动触发
const handleDragover = (event: DragEvent) => {
	event.preventDefault();
	emit('dragover', event, !highlightOnNonDrop.value);
};

// 拖动到本区域时触发
const handleDragEnter = (event: DragEvent) => {
	// 防止重复触发
	if (!isDragOver.value) {
		isDragOver.value = true;
		event.preventDefault();
		emit('dragenter', event, !highlightOnNonDrop.value);
	}
};

// 拖离本区域时触发
const handleDragLeave = (event: DragEvent) => {
	// 检查是否真正离开了当前元素
	const relatedTarget = event.relatedTarget as Node;
	const currentTarget = event.currentTarget as Node;

	// 只有当鼠标真正离开当前元素时才触发
	if (!currentTarget.contains(relatedTarget)) {
		isDragOver.value = false;
		emit('dragleave', event, !highlightOnNonDrop.value);
	}
};

// 拖动到本区域松开后触发
const handleDrop = (event: DragEvent) => {
	isDragOver.value = false;
	event.preventDefault();
	emit('drop', event, !highlightOnNonDrop.value);
};
</script>

<style lang="scss" scoped>
.node-drop-cell {
	width: 100%;
	height: 100%;
	flex: 1;
	min-width: 0;
	min-height: inherit;
	position: relative;
	border-radius: 3px;
	box-sizing: border-box;
	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		font-weight: bold;
		pointer-events: none;
		opacity: 0;
		border: 2px solid transparent;
		background-color: transparent;
		transition: all 0.3s ease;
		z-index: 1;
		box-sizing: border-box;
		will-change: opacity, border-color, background-color;
	}

	// 高亮优先级：dragging < drag-over < disable
	// dragging高亮
	&.dragging-highlight {
		&::after {
			content: var(--dragging-text, '');
			opacity: 1;
			border-radius: 5px;
			color: rgba(0, 120, 255, 0.8);
			border: 2px dashed #007bff;
			background-color: rgba(0, 120, 255, 0.1);
		}
	}
	// drag-over高亮
	&.drag-over-highlight {
		cursor: pointer;
		&::after {
			content: var(--drag-over-text, '');
			opacity: 1;
			border-radius: 5px;
			color: rgba(40, 167, 69, 0.8);
			border: 2px dashed #28a745;
			background-color: rgba(40, 167, 69, 0.1);
		}
	}
	// non-drop高亮
	&.disable-highlight {
		cursor: not-allowed;
		&::after {
			content: var(--nonDropText-text, '');
			opacity: 1;
			border-radius: 5px;
			color: rgba(220, 53, 69, 0.8);
			border: 2px dashed #dc3545;
			background-color: rgba(220, 53, 69, 0.1);
		}
	}
}
</style>
