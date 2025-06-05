<!-- 请大佬帮看一下为什么会有border错位的情况 -->
<template>
	<div class="bar-box">
		<div class="top">
			<div class="tabs top-tabs">
				<div class="tab" v-for="tab in topTab" :class="{ active: tab.name === barType }" @click="tabChange(tab)">
					<span>{{ tab.name }}</span>
				</div>
			</div>
		</div>

		<div class="left">
			<div class="tabs left-tabs">
				<div class="tab" v-for="tab in leftTab" :class="{ active: tab.name === barType }" @click="tabChange(tab)">
					<span>{{ tab.name }}</span>
				</div>
			</div>
		</div>
		<!-- echarts -->
		<Bar class="center" v-loading="loading" element-loading-text="柱状图数据加载中···" :options="options" :opts="opts"></Bar>

		<div class="right">
			<div class="tabs right-tabs">
				<div class="tab" v-for="tab in rightTab" :class="{ active: tab.name === barType }" @click="tabChange(tab)">
					<span>{{ tab.name }}</span>
				</div>
			</div>
		</div>

		<div class="bottom">
			<div class="tabs bottom-tabs">
				<div class="tab" v-for="tab in bottomTab" :class="{ active: tab.name === barType }" @click="tabChange(tab)">
					<span>{{ tab.name }}</span>
				</div>
			</div>
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
.bar-box {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-rows: 1fr 8fr 1fr;
	grid-template-columns: 1fr 8fr 1fr;
	align-items: center;
	font-size: 0.175rem;
	gap: 0;
	position: absolute;
	> div {
		width: 100%;
		height: 100%;
	}

	.tabs {
		display: flex;
		.tab {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			transition: all 0.3s ease-in-out;
			&.active {
				background-color: var(--el-color-primary-light-2);
				color: #fff;
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
	}

	.top {
		grid-column: 1 / 3;
		grid-row: 1 / 2;
		.tabs {
			width: 100%;
			height: 100%;
			border-left: 1px solid var(--el-border-color-light);
			border-top: 1px solid var(--el-border-color-light);
			.tab {
				border-right: 1px solid var(--el-border-color-light);
				border-bottom: 1px solid var(--el-border-color-light);
				&:nth-last-child(1) {
					border-right: none;
				}
			}
		}
	}

	.left {
		grid-column: 1 / 2;
		grid-row: 2 / 4;
		.tabs {
			height: 100%;
			flex-direction: column;
			border-left: 1px solid var(--el-border-color-light);
			border-bottom: 1px solid var(--el-border-color-light);
			.tab {
				border-top: 1px solid var(--el-border-color-light);
				border-right: 1px solid var(--el-border-color-light);
				&:nth-child(1) {
					border-top: none;
				}
			}
		}
	}

	.center {
		width: 100%;
		height: 100%;
		grid-column: 2 / 3;
		grid-row: 2 / 3;
		border: none;
	}

	.right {
		grid-column: 3 / 4;
		grid-row: 1 / 3;
		.tabs {
			height: 100%;
			flex-direction: column;
			border-top: 1px solid var(--el-border-color-light);
			border-right: 1px solid var(--el-border-color-light);
			.tab {
				border-left: 1px solid var(--el-border-color-light);
				border-bottom: 1px solid var(--el-border-color-light);
				&:nth-last-child(1) {
					border-bottom: none;
				}
			}
		}
	}

	.bottom {
		grid-column: 2 / 4;
		grid-row: 3 / 4;
		.tabs {
			height: 100%;
			border-right: 1px solid var(--el-border-color-light);
			border-bottom: 1px solid var(--el-border-color-light);
			.tab {
				border-top: 1px solid var(--el-border-color-light);
				border-left: 1px solid var(--el-border-color-light);
				&:nth-child(1) {
					border-left: none;
				}
			}
		}
	}
}
</style>
