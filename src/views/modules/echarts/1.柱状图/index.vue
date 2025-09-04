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
import { Session } from '@/utils/storage';
import { cloneDeep } from 'lodash-es';

import base from './options/base';
import * as setOptions from './setOptions';

const Bar = defineAsyncComponent(() => import('./components/bar.vue'));

// ref
const barType = ref('普通柱状图');
const loading = ref(false);
const topTab = ref([
	{ name: '普通柱状图' },
	{ name: '堆叠柱状图' },
	{ name: '块状切片' },
	{ name: '待定t4' },
	{ name: '待定t5' },
	{ name: '待定t6' },
	{ name: '待定t7' },
	{ name: '待定t8' },
	{ name: '待定t9' },
]);

const leftTab = ref([
	{ name: '待定l1' },
	{ name: '待定l2' },
	{ name: '待定l3' },
	{ name: '待定l4' },
	{ name: '待定l5' },
	{ name: '待定l6' },
	{ name: '待定l7' },
	{ name: '待定l8' },
	{ name: '待定l9' },
]);

const rightTab = ref([
	{ name: '待定r1' },
	{ name: '待定r2' },
	{ name: '待定r3' },
	{ name: '待定r4' },
	{ name: '待定r5' },
	{ name: '待定r6' },
	{ name: '待定r7' },
	{ name: '待定r8' },
	{ name: '待定r9' },
]);

const bottomTab = ref([
	{ name: '待定b1' },
	{ name: '待定b2' },
	{ name: '待定b3' },
	{ name: '待定b4' },
	{ name: '待定b5' },
	{ name: '待定b6' },
	{ name: '待定b7' },
	{ name: '待定b8' },
	{ name: '待定b9' },
]);

const options: any = ref();
const opts = {
	notMerge: true,
};

onBeforeMount(() => {
	barType.value = Session.get('barType') || '普通柱状图';
	options.value = cloneDeep(base);
});

onMounted(() => {
	// 获取数据
	getData();
});

async function getData() {
	loading.value = true;
	switch (barType.value) {
		case '堆叠柱状图':
			await setOptions.堆叠柱状图(options.value);
			break;
		case '块状切片':
			options.value = await setOptions.块状切片(options.value);
			console.log(options.value);
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
	Session.set('barType', barType.value);
	options.value = cloneDeep(base);
	getData();
}
</script>

<style lang="scss" scoped>
.bar {
	width: 100%;
	height: 100%;
	position: absolute !important;
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
