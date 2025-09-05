<template>
	<div class="virtual-table">
		<el-row class="mb10">
			<el-col :span="10">
				<el-button type="primary" @click="getData(3)">加载数据-千</el-button>
				<el-button type="warning" @click="getData(2)">加载数据-万</el-button>
				<el-button type="danger" @click="getData(1)">加载数据-几十万</el-button>
				<!-- <span class="ml30">
					<el-button @click="scrollBottom">跳转最后一行</el-button>
				</span> -->

				<el-popover placement="top-start" title="历史" :width="450" trigger="click">
					<template #reference>
						<span class="ml30">
							<el-button type="primary" link>查看历史</el-button>
						</span>
					</template>

					<div style="min-height: 200px; max-height: 600px">
						<p v-for="(item, index) in historyList" :key="index">
							<span :style="{ color: item.color }">
								{{ `${index + 1}. ${item.message}` }}
							</span>
						</p>
					</div>
				</el-popover>
			</el-col>
		</el-row>

		<el-auto-resizer class="vxe-table-box">
			<template #default="{ height }">
				<vxe-table
					ref="vxeTableRef"
					:loading="loading"
					show-overflow
					show-header-overflow
					show-footer-overflow
					:virtual-x-config="{ enabled: true, gt: 0 }"
					:virtual-y-config="{ enabled: true, gt: 0 }"
					:height="height"
				>
					<vxe-column type="seq" width="auto"></vxe-column>
					<vxe-column title="名字" field="name" min-width="200"></vxe-column>
					<vxe-column title="英文名" field="enName" min-width="200"></vxe-column>
					<vxe-column title="年龄" field="age" min-width="200"></vxe-column>
					<vxe-column title="性别" field="sex" min-width="200"></vxe-column>
					<vxe-column title="联系方式" field="phone" min-width="200"></vxe-column>
					<vxe-column title="地址" field="address" min-width="200"></vxe-column>
				</vxe-table>
			</template>
		</el-auto-resizer>
	</div>
</template>

<script setup lang="ts" name="vxe-table-虚拟表格">
import apis from '@/api';
import { ElMessage } from 'element-plus';

const vxeTableRef = ref();
const loading = ref(false);
const historyList = ref<Arr>([]);
let lastRow = null;

const getData = async (num: number) => {
	loading.value = true;
	let userWaitStartTime = Date.now();
	let api = `table_virtual_list${num}`;
	let colorMap = {
		1: 'var(--el-color-danger)',
		2: 'var(--el-color-warning)',
		3: 'var(--el-color-primary)',
	};
	try {
		const { data } = await apis[api](); // 3：几千 2：几万  1：几十万
		if (Array.isArray(data) && data.length) {
			lastRow = data[data.length - 1];
			const startTime = Date.now();
			vxeTableRef.value.reloadData(data).then(() => {
				ElMessage.success(`加载时间 ${Date.now() - startTime} 毫秒`);
				nextTick(() => {
					let seconds = (Date.now() - userWaitStartTime) / 1000;
					ElMessage.warning(`用户等待时间 ${seconds} 秒 （${data.length}条）平均每秒：${(data.length / seconds).toFixed(1)}条`);
					historyList.value.push({
						color: colorMap[num],
						message: `用户等待时间 ${seconds} 秒 （${data.length}条）平均每秒：${(data.length / seconds).toFixed(1)}条`,
					});
				});
				scrollBottom();
			});
		} else {
			vxeTableRef.value.reloadData([]);
		}
	} finally {
		loading.value = false;
	}
};

const scrollBottom = () => {
	vxeTableRef.value.scrollToRow(lastRow);
};
</script>

<style lang="scss" scoped>
.virtual-table {
	display: flex;
	flex-direction: column;
	.vxe-table-box {
		flex: 1;
		min-height: 0;
	}
}
</style>
