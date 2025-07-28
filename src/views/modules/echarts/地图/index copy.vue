<template>
	<div ref="container">
		<div ref="chartRef" :style="style" class="map-container" @mousewheel="handleMouseWheel" @mousedown="handleMouseDown"></div>
	</div>
</template>

<script setup lang="ts" name="地图">
import * as echarts from 'echarts';
import motherland from '@/assets/json/map/中华人民共和国.json';
import picTag from '@/assets/imgs/wl6.png';

const chartRef = ref(null);
const currentMap = shallowRef('china');
const currentProvince = ref('');
const scatterData: any = ref([]);
const highLightIndex: any = ref(-1);
let curSub: any = ref([
	{
		value: ['', ''],
	},
]);

// 初始展示 写死
const originMap = 'china';
// echarts实例
let chartInstance: any = null;
// 背景图片
const bgImage = new Image();
bgImage.src = picTag;

// 一些相同的配置 series[0]和geo，地图重叠实现指定的样式
const chinaShowOption = {
	map: originMap,
	aspectScale: 0.8,
	layoutCenter: ['45%', '40%'],
	layoutSize: 900,
	zoom: 0.8,
};

// 省份展示大小
const provinceShowOption = {
	map: '',
	aspectScale: 0.8,
	layoutCenter: ['45%', '40%'],
	layoutSize: 600,
	zoom: 0.8,
};

// 总配置
const mapOption = {
	tooltip: {
		// 自定义显示数据
		formatter: (params: any) => {
			return params.name;
		},
	},
	// 初值
	series: [
		// 上层地图配置
		{
			map: chinaShowOption.map,
			aspectScale: chinaShowOption.aspectScale,
			layoutCenter: chinaShowOption.layoutCenter,
			layoutSize: chinaShowOption.layoutSize,
			zoom: chinaShowOption.zoom,
			name: '',
			type: 'map',
			selectedMode: false,
			label: {
				// 通常状态下的样式
				normal: {
					show: true,
					textStyle: {
						fontSize: 14,
						color: '#fff',
					},
				},
				// 鼠标放上去的样式
				emphasis: {
					textStyle: {
						color: '#fff',
					},
				},
			},
			itemStyle: {
				normal: {
					borderColor: 'white',
					borderWidth: 1,
					areaColor: {
						type: 'radial',
						x: 0.5,
						y: 0.5,
						r: 0.8,
						colorStops: [
							{
								offset: 0,
								color: 'rgba(35, 114, 157, 0.1)', // 0% 处的颜色
							},
							{
								offset: 1,
								color: 'rgba(35, 114, 157, 0.1)', // 100% 处的颜色
							},
						],
						globalCoord: false, // 缺省为 false
					},
					shadowColor: 'rgba(46, 150, 246,0.2)',
					shadowBlur: 4,
				},
				// 鼠标放上去高亮的样式
				emphasis: {
					// shadowColor: "rgba(6,46,50,0.8)",
					areaColor: 'rgba(2, 157, 183,0.6)',
					borderWidth: 1,
				},
			},
		},
		// 高亮的点
		{
			name: 'grigio',
			symbolSize: 4,
			type: 'effectScatter',
			coordinateSystem: 'geo',
			effectType: 'ripple',
			symbol: 'circle',
			rippleEffect: {
				period: 4,
				scale: 6,
			},
			label: {
				show: false,
				formatter(value: any) {
					return value.data.value[2];
				},
			},
			hoverAnimation: true,
			itemStyle: {
				normal: {
					color: '#aab9b4',
					shadowBlur: 0,
					shadowColor: '#333',
				},
			},
			zlevel: 1,
			data: [],
		},
	],
	// 地图配置 初值
	geo: {
		map: chinaShowOption.map,
		aspectScale: chinaShowOption.aspectScale,
		layoutCenter: chinaShowOption.layoutCenter,
		layoutSize: chinaShowOption.layoutSize,
		zoom: chinaShowOption.zoom,
		label: {
			// 通常状态下的样式
			normal: {
				show: false,
			},
			// 鼠标放上去的样式
			emphasis: {
				show: false,
			},
		},
		// 地图区域的样式设置
		itemStyle: {
			normal: {
				borderColor: 'white',
				borderWidth: 2,
				areaColor: {
					image: picTag, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
					repeat: 'repeat', // 是否平铺，可以是
				},
				shadowColor: 'rgba(13, 128, 240,0.9)',
				shadowOffsetX: 10,
				shadowOffsetY: 10,
				shadowBlur: 4,
			},
			// 鼠标放上去高亮的样式
			emphasis: {
				shadowColor: 'rgba(6,46,50,0.8)',
				areaColor: 'rgba(2, 157, 183,0.6)',
				borderWidth: 0,
			},
		},
	},
};

// 初始化地图
const initChart = async () => {
	console.log('motherland', motherland);
	echarts.registerMap(currentMap.value, motherland);
	chartInstance = echarts.init(chartRef.value);

	// mapOption.series[1].data = [{ value: ['118.69', '28.986', '123'] }] as any;

	chartInstance.setOption(mapOption);
	chartInstance.on('click', handleMapClick);
};

// 设置省份地图
const setProvince = async (params: any) => {
	currentProvince.value = params.name;
	try {
		const provinceGeo = await import(`@/assets/json/map/province/${currentProvince.value}/${currentProvince.value}.json`);
		// const provinceGeo = await import(`@/assets/geojson/province/${currentProvince.value}/${currentProvince.value}.geojson`);
		console.log('provinceGeo', provinceGeo);
		echarts.registerMap(currentProvince.value, provinceGeo.default);

		currentMap.value = 'province';
		mapOption.series[0].map = currentProvince.value;
		mapOption.geo.map = currentProvince.value;

		chartInstance.setOption({
			geo: { ...provinceShowOption, map: currentProvince.value },
			series: [{ ...provinceShowOption, map: currentProvince.value }, { data: [] }],
		});
	} catch (error: any) {
		console.error('加载省份地图失败:', decodeURIComponent(error));
	}
};

// 处理地图点击事件
const handleMapClick = async (params) => {
	if (currentMap.value === originMap) {
		setProvince(params);
	} else {
		console.log(params);
		const event = params.event;
		// 省份地图点击区域
		// if (params.event.event?.clientX) {
		// 	scatterData.value = [
		// 		{
		// 			name: params.name,
		// 			value: [params.event.event.offsetX, params.event.event.offsetY],
		// 		},
		// 	];

		// 	chartInstance.setOption({
		// 		series: [
		// 			{
		// 				emphasis: { itemStyle: { areaColor: 'rgba(2, 157, 183,0.8)' } },
		// 			},
		// 			{
		// 				data: scatterData.value,
		// 			},
		// 		],
		// 	});
		// }
		// 获取点击的像素坐标
		var pixelCoord = [event.offsetX, event.offsetY];
		// 将像素坐标转换为经纬度坐标
		var coord = chartInstance.convertFromPixel('geo', pixelCoord);
		if (coord) {
			console.log('真实经纬度坐标:', coord);
		} else {
			console.log('点击位置不在有效地图区域内');
		}

		chartInstance.dispatchAction({
			type: 'downplay',
			seriesIndex: 0, // 如果有多个系列，需要指定系列的索引
			dataIndex: highLightIndex.value,
		});
		highLightIndex.value = params.dataIndex;
		chartInstance.dispatchAction({
			type: 'highlight',
			seriesIndex: 0, // 如果有多个系列，需要指定系列的索引
			dataIndex: params.dataIndex,
		});

		chartInstance.setOption({
			series: [{}, { data: [{ value: [...coord] }] }],
		});
	}
};

// 返回全国地图
const backToChina = () => {
	currentMap.value = originMap;
	scatterData.value = [];
	chartInstance.setOption({
		geo: { map: originMap },
		series: [{ map: originMap }, { data: [] }],
	});
};

// 地图缩放拖拽
let drag = false;
const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);
const container = ref<HTMLDivElement | null>(null);

const style = computed(() => {
	return {
		transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
		'transform-origin': `0px 0px`,
		cursor: 'pointer',
	};
});

// 鼠标滚轮事件
const handleMouseWheel = (e: WheelEvent) => {
	const rect = container.value?.getBoundingClientRect();
	if (!rect) return;

	// 如有margin-left margin-top等 需要在这里减去
	const mouseX = e.clientX - rect.left;
	const mouseY = e.clientY - rect.top;

	const delta = e.deltaY > 0 ? -0.1 : 0.1;
	const newScale = Math.min(Math.max(0.5, scale.value + delta), 5);

	const contentMouseX = (mouseX - translateX.value) / scale.value;
	const contentMouseY = (mouseY - translateY.value) / scale.value;

	translateX.value = mouseX - contentMouseX * newScale;
	translateY.value = mouseY - contentMouseY * newScale;

	scale.value = newScale;
};

// 鼠标按下事件
const handleMouseDown = (e: MouseEvent) => {
	e.preventDefault();
	drag = true;
	const rect = container.value?.getBoundingClientRect();
	if (!rect) return;

	const startX = e.clientX;
	const startY = e.clientY;

	const startTranslateX = translateX.value;
	const startTranslateY = translateY.value;

	const handleMouseMove = (e: MouseEvent) => {
		if (!drag) return;

		translateX.value = startTranslateX + e.clientX - startX;
		translateY.value = startTranslateY + e.clientY - startY;
	};

	const handleMouseUp = () => {
		drag = false;
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	document.addEventListener('mousemove', handleMouseMove);
	document.addEventListener('mouseup', handleMouseUp);
};

onMounted(() => {
	initChart();
	window.addEventListener('resize', () => chartInstance?.resize());
});

onBeforeUnmount(() => {
	chartInstance?.dispose();
	window.removeEventListener('resize', () => chartInstance?.resize());
});
</script>

<style scoped>
.map-container {
	width: 100%;
	height: 100%;
}
</style>
