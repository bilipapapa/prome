<template>
	<vxe-grid ref="vxeGridRef" v-bind="modelValue" v-on="gridListeners"></vxe-grid>
</template>

<script setup lang="ts">
import { VxeTableInstance, VxeGridListeners } from 'vxe-table';
import { useVxeTable } from '@/hooks/vxeTable';

const { modelValue } = defineProps({
	modelValue: {
		type: Object,
		required: true,
		default: () => ({}),
	},
});

// emits
const emit = defineEmits([
	'update:modelValue',
	'keydown',
	'paste',
	'copy',
	'cut',
	'current-change',
	'radio-change',
	'checkbox-change',
	'checkbox-all',
	'checkbox-range-start',
	'checkbox-range-change',
	'checkbox-range-end',
	'cell-click',
	'cell-dblclick',
	'cell-menu',
	'cell-mouseenter',
	'cell-mouseleave',
	'header-cell-click',
	'header-cell-dblclick',
	'header-cell-menu',
	'footer-cell-click',
	'footer-cell-dblclick',
	'footer-cell-menu',
	'sort-change',
	'filter-change',
	'filter-visible',
	'resizable-change',
	'toggle-row-expand',
	'toggle-tree-expand',
	'menu-click',
	'edit-closed',
	'edit-activated',
	'edit-disabled',
	'valid-error',
	'scroll',
	'custom',
]);

// refs
const vxeGridRef = ref<VxeTableInstance>();
const {} = useVxeTable(modelValue);

watchEffect(() => {
	emit('update:modelValue', modelValue);
});

watch(
	() => modelValue,
	(value) => {
		emit('update:modelValue', value);
	}
);

// 执行vxe-grid里的方法
const gridMethods = function () {
	if (vxeGridRef.value) return vxeGridRef.value[arguments[0]]([...arguments].slice(1));
};

// 事件监听器
const gridListeners: VxeGridListeners = {
	keydown: (args) => {
		emit('keydown', args);
	},
	paste: (args) => {
		emit('paste', args);
	},
	copy: (args) => {
		emit('copy', args);
	},
	cut: (args) => {
		emit('cut', args);
	},
	currentChange: (args) => {
		modelValue.currentRow = args.newValue;
		emit('current-change', args);
	},
	radioChange: (args) => {
		modelValue.currentRow = args.newValue;
		emit('radio-change', args);
	},
	checkboxChange: (args) => {
		modelValue.selectRows = vxeGridRef.value?.getCheckboxRecords();
		emit('checkbox-change', args);
	},
	checkboxAll: (args) => {
		modelValue.selectRows = vxeGridRef.value?.getCheckboxRecords();
		emit('checkbox-all', args);
	},
	checkboxRangeStart: (args) => {
		emit('checkbox-range-start', args);
	},
	checkboxRangeChange: (args) => {
		modelValue.selectRows = vxeGridRef.value?.getCheckboxRecords();
		emit('checkbox-range-change', args);
	},
	checkboxRangeEnd: (args) => {
		emit('checkbox-range-end', args);
	},
	cellClick: (args) => {
		emit('cell-click', args);
	},
	cellDblclick: (args) => {
		emit('cell-dblclick', args);
	},
	cellMenu: (args) => {
		emit('cell-menu', args);
	},
	cellMouseenter: (args) => {
		emit('cell-mouseenter', args);
	},
	cellMouseleave: (args) => {
		emit('cell-mouseleave', args);
	},
	headerCellClick: (args) => {
		emit('header-cell-click', args);
	},
	headerCellDblclick: (args) => {
		emit('header-cell-dblclick', args);
	},
	headerCellMenu: (args) => {
		emit('header-cell-menu', args);
	},
	footerCellClick: (args) => {
		emit('footer-cell-click', args);
	},
	footerCellDblclick: (args) => {
		emit('footer-cell-dblclick', args);
	},
	footerCellMenu: (args) => {
		emit('footer-cell-menu', args);
	},
	sortChange: (args) => {
		emit('sort-change', args);
	},
	filterChange: (args) => {
		emit('filter-change', args);
	},
	filterVisible: (args) => {
		emit('filter-visible', args);
	},
	resizableChange: (args) => {
		emit('resizable-change', args);
	},
	toggleRowExpand: (args) => {
		emit('toggle-row-expand', args);
	},
	toggleTreeExpand: (args) => {
		emit('toggle-tree-expand', args);
	},
	menuClick: (args) => {
		emit('menu-click', args);
	},
	editClosed: (args) => {
		emit('edit-closed', args);
	},
	editActivated: (args) => {
		emit('edit-activated', args);
	},
	editDisabled: (args) => {
		emit('edit-disabled', args);
	},
	validError: (args) => {
		emit('valid-error', args);
	},
	scroll: (args) => {
		emit('scroll', args);
	},
	custom: (args) => {
		emit('custom', args);
	},
};

defineExpose({
	gridMethods,
});
</script>

<style lang="scss" scoped></style>
