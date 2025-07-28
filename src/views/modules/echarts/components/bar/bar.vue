<template>
	<div ref="chartDom" :style="{ width: width, height: height }"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { deepMerge } from '@/utils/tools';
import base from './setting/base';

const props = defineProps({
	// 容器尺寸
	width: {
		type: String,
		default: '100%',
	},
	height: {
		type: String,
		default: '400px',
	},
	// 自定义配置项
	options: {
		type: Object,
		default: () => ({}),
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

const updateChart = () => {
	const mergedOptions = deepMerge(base, props.options);
	chartInstance.setOption(mergedOptions);
};

watch(
	props.options,
	(val) => {
		if (val) {
			updateChart();
		}
	},
	{ deep: true }
);

// 窗口变化时自适应
const handleResize = () => {
	chartInstance?.resize();
};

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
