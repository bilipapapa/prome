<template>
	<div class="bar">
		<div class="bar-box">
			<!-- 上 -->
			<div
				class="tab top"
				v-for="(tab, i) in topTab"
				:class="{ active: tab.name === barType }"
				:style="{ gridColumn: i + 1 }"
				@click="tabChange(tab)"
			>
				<span>{{ tab.name }}</span>
			</div>

			<!-- 下 -->
			<div
				class="tab bottom"
				v-for="(tab, i) in bottomTab"
				:class="{ active: tab.name === barType }"
				:style="{ gridColumn: i + 2 }"
				@click="tabChange(tab)"
			>
				<span>{{ tab.name }}</span>
			</div>

			<!-- 左 -->
			<div class="tab left" v-for="(tab, i) in leftTab" :class="{ active: tab.name === barType }" :style="{ gridRow: i + 2 }" @click="tabChange(tab)">
				<span>{{ tab.name }}</span>
			</div>

			<!-- 右 -->
			<div
				class="tab right"
				v-for="(tab, i) in rightTab"
				:class="{ active: tab.name === barType }"
				:style="{ gridRow: i + 1 }"
				@click="tabChange(tab)"
			>
				<span>{{ tab.name }}</span>
			</div>

			<!-- echarts -->
			<Bar class="center" v-loading="loading" element-loading-text="柱状图数据加载中···" :options="options" :opts="opts"></Bar>
		</div>
	</div>
</template>

<script setup lang="ts" name="柱状图">
import base from './options/base';

import * as setOptions from './setOptions';
import { cloneDeep } from 'lodash';

const Bar = defineAsyncComponent(() => import('./components/bar.vue'));

// ref
const barType = ref('普通柱状图');
const loading = ref(false);
const topTab = ref([
	{ name: '普通柱状图', options: base },
	{ name: '堆叠柱状图', options: base },
	{ name: '待定t3', options: base },
	{ name: '待定t4', options: base },
	{ name: '待定t5', options: base },
	{ name: '待定t6', options: base },
	{ name: '待定t7', options: base },
	{ name: '待定t8', options: base },
	{ name: '待定t9', options: base },
]);

const leftTab = ref([
	{ name: '待定l1', options: base },
	{ name: '待定l2', options: base },
	{ name: '待定l3', options: base },
	{ name: '待定l4', options: base },
	{ name: '待定l5', options: base },
	{ name: '待定l6', options: base },
	{ name: '待定l7', options: base },
	{ name: '待定l8', options: base },
	{ name: '待定l9', options: base },
]);

const rightTab = ref([
	{ name: '待定r1', options: base },
	{ name: '待定r2', options: base },
	{ name: '待定r3', options: base },
	{ name: '待定r4', options: base },
	{ name: '待定r5', options: base },
	{ name: '待定r6', options: base },
	{ name: '待定r7', options: base },
	{ name: '待定r8', options: base },
	{ name: '待定r9', options: base },
]);

const bottomTab = ref([
	{ name: '待定b1', options: base },
	{ name: '待定b2', options: base },
	{ name: '待定b3', options: base },
	{ name: '待定b4', options: base },
	{ name: '待定b5', options: base },
	{ name: '待定b6', options: base },
	{ name: '待定b7', options: base },
	{ name: '待定b8', options: base },
	{ name: '待定b9', options: base },
]);

const options: any = ref({});
const opts = {
	notMerge: true,
};

onBeforeMount(() => {
	options.value = topTab.value[0].options;
});

onMounted(() => {
	// 获取数据
	getData();
});

async function getData() {
	loading.value = true;
	switch (barType.value) {
		case '堆叠柱状图':
			await setOptions.stack(options.value);
			break;

		default:
			await setOptions.base(options.value);
			break;
	}
	loading.value = false;
}

function tabChange(tab) {
	if (tab.name === barType.value) return;
	barType.value = tab.name;
	options.value = cloneDeep(tab.options);
	options.value.series = [];
	options.value.xAxis.data = [];

	if (!barType.value) barType.value = '普通柱状图';
	getData();
}
</script>

<style lang="scss" scoped>
.bar {
	width: 100%;
	height: 100%;
	position: absolute;
	.bar-box {
		height: 100%;
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		grid-template-rows: repeat(10, 1fr);
		align-items: center;
		font-size: 0.175rem;
		gap: 0;
		border: 1px solid var(--el-border-color-light);

		.tab {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			transition: all 0.3s ease-in-out;
			border: 1px solid var(--el-border-color-light);
			&.active {
				background-color: var(--el-color-primary-light-2);
				color: #fff;
				border-color: var(--el-color-primary-light-2);
				&:hover {
					color: #fff;
				}
			}
			&:hover {
				color: var(--el-color-primary);
			}
			&:active {
				color: #fff;
				background-color: var(--el-color-primary-light-1);
			}
		}

		.center {
			width: 100%;
			height: 100%;
			grid-column: 2 / 10;
			grid-row: 2 / 10;
			border: 1px solid var(--el-border-color-light);
		}

		/* 分配小矩形位置 */
		.tab.top {
			grid-row: 1;
		}
		.tab.bottom {
			grid-row: 10;
		}
		.tab.left {
			grid-column: 1;
		}
		.tab.right {
			grid-column: 10;
		}
	}
}
</style>
