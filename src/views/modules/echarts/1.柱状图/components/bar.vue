<template>
	<div ref="chartDom" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { cloneDeep, debounce, throttle } from 'lodash-es';

const props = defineProps({
	// 自定义配置项
	options: {
		type: Object,
		default: () => ({}),
	},
	opts: {
		type: Object,
		default: () => ({
			notMerge: false,
			lazyUpdate: false,
			silent: false,
		}),
	},
});

const emit = defineEmits(['chart-click']);

const chartDom = ref(null);
let chartInstance = null;

// 初始化图表
const initChart = () => {
	if (chartInstance) {
		chartInstance.dispose();
	}

	chartInstance = echarts.init(chartDom.value);
	chartInstance.on('click', (params) => {
		emit('chart-click', params);
	});

	updateChart();
};

const updateChart = debounce(() => {
	chartInstance.setOption(props.options, props.opts);
}, 100);

watch(
	() => props.options,
	(val) => {
		if (val) {
			updateChart();
		}
	},
	{ deep: true }
);

// 窗口变化时自适应
const handleResize = debounce(() => {
	chartInstance?.resize();
}, 0);

// 生命周期
onMounted(() => {
	initChart();
	window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', handleResize);
	chartInstance?.dispose();
	chartInstance = null;
});
</script>
