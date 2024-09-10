<template>
	<div class="vTable" ref="vTableRef"></div>
</template>

<script setup lang="ts">
import * as VTable from '@visactor/vtable';

const props = defineProps({
	modelValue: {
		type: Object,
		required: true,
		default: () => ({}),
	},
});
const options = shallowRef(props.modelValue);

const emit = defineEmits(['update:modelValue']);

watchEffect(() => {
	options.value = props.modelValue;
});

// refs
const vTableRef = ref(null);
const tableInstance = ref();

onBeforeMount(() => {
	initTable();
});

onMounted(() => {});

watch(
	() => options.value,
	(val) => {
		if (tableInstance.value) tableInstance.value.updateOption(val);
	},
	{ deep: true }
);

const initTable = () => {
	setTimeout(() => {
		tableInstance.value = new VTable.ListTable({
			container: vTableRef.value,
			...options.value,
		});
	}, 0);
};

defineExpose({
	tableInstance,
});
</script>

<style lang="scss" scoped></style>
