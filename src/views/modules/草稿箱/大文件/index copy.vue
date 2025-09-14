<template>
	<div>
		<el-tree-v2
			:props="treeProps"
			:min-height="100"
			:height="600"
			class="node-tree mt10"
			ref="vTreeRef"
			show-checkbox
			highlight-current
			:expand-on-click-node="false"
		>
			<template #default="{ node, data }">
				<div class="node-tree__item" draggable="true">
					<el-icon class="el-icon--left">
						<Document v-if="node.isLeaf" />
						<Folder v-else-if="!node.expanded" />
						<FolderOpened v-else />
					</el-icon>
					<span class="prefix" :class="{ 'is-leaf': node.isLeaf }"></span>
					<span>{{ node.label }}</span>

					<!-- 弹出的按钮 -->
					<!-- <div class="icons" @click.stop>
						<el-icon
							v-if="data.viewType?.includes('node') && (hoverNodeKey === data?.uniqueId || currentNodeKey === data?.uniqueId)"
							ref="iconBtnRef"
							@click.stop="showIconBtns(node)"
							title="点击展开更多功能"
							class="icon"
						>
							<MoreFilled />
						</el-icon>

						<span class="icon-btns-box">
							<template v-if="iconBtnsVisible && currentNodeKey === data.uniqueId">
								<el-popover :visible="redundantVisible" placement="right" title="" width="auto" trigger="click" popper-class="redundant-popover">
									<template #reference>
										<el-icon @click.prevent="redundantVisible = true" class="icon"><Operation /></el-icon>
									</template>
									<el-radio-group v-model="redundantRadio" size="small" class="mt10">
										<el-radio :value="0">无冗余</el-radio>
										<el-radio :value="1">双冗余</el-radio>
										<el-radio :value="3">三冗余</el-radio>
									</el-radio-group>

									<div style="text-align: right; margin-top: 10px">
										<el-button size="small" text @click="redundantPopoverClose">取消</el-button>
										<el-button size="small" type="primary" @click="redundantPopoverConfirm">确定</el-button>
									</div>
								</el-popover>
							</template>
							<el-icon v-if="iconBtnsVisible && currentNodeKey === data.uniqueId" @click="deleteNode(node)" class="delete-icon icon"
								><Delete
							/></el-icon>
						</span>
					</div> -->
				</div>
			</template>
		</el-tree-v2>
	</div>
</template>

<script setup lang="ts" name="">
import cloudNetwork from './cloudNetWork';
import testData from './cloudNetWork.json';
// import { IndexedDBUtil } from '@/utils/indexedDBUtil';
import { JSONParser } from '@streamparser/json';
// import * as idb from 'idb';
import { openDB, DBSchema } from 'idb';

// console.log(idb);

const vTreeRef = ref();
let largeData: any = [];

const treeProps = computed(() => {
	return {
		children: 'children',
		label: 'label',
		value: 'uniqueId',
	};
});

// onBeforeMount(async () => {});

onMounted(async () => {
	// vTreeRef.value.loadData(cloudNetwork);
	// vTreeRef.value.loadData([testData]);
	// await initLargeData();
	// await saveToIndexedDB();
	// nextTick(() => {
	// 	loadData();
	// });
	// loadLargeJson();
});

// utils/storeWholeFile.ts

interface WholeFileDB extends DBSchema {
	bigfile: {
		key: string;
		value: Blob; // 整个文件二进制
	};
}

// async function saveWholeFile(url = './cloudNetWork.json') {
// 	const db = await openDB<WholeFileDB>('WholeJsonDB', 1, {
// 		upgrade(db) {
// 			if (!db.objectStoreNames.contains('bigfile')) {
// 				db.createObjectStore('bigfile');
// 			}
// 		},
// 	});

// 	const resp = await fetch(url);
// 	const blob = await resp.blob(); // 不解析成字符串
// 	await db.put('bigfile', blob, 'file'); // key 固定为 'file'
// }

// export async function getWholeFile() {
// 	const db = await openDB<WholeFileDB>('WholeJsonDB', 1);
// 	const blob = await db.get('bigfile', 'file');
// 	if (!blob) return null;
// 	const text = await blob.text(); // 需要时才解析
// 	return JSON.parse(text);
// }

// const data = ref(null);
// const error = ref(null);
// const loading = ref(false);

// async function loadLargeJson() {
// 	loading.value = true;
// 	try {
// 		const response = await fetch('./cloudNetWork.json'); // 确保文件在 public 目录
// 		if (!response.ok) throw new Error(`HTTP 错误: ${response.status}`);
// 		console.log(response);
// 		const parser = new JsonParser({
// 			stringBufferSize: 64 * 1024, // 64KB 缓冲区，优化内存
// 			paths: ['$.*'], // 根据 JSON 结构调整，仅解析必要路径
// 		});
// 		console.log(parser);
// 		parser.onValue = ({ value, key, stack }) => {
// 			console.log(value, key, stack);
// 			if (stack.length === 1) {
// 				// 假设一级数组/对象
// 				data.value.push(value); // 分块存储
// 			}
// 		};

// 		parser.onEnd = () => {
// 			loading.value = false;
// 			console.log('解析完成，数据量:', data.value.length);
// 		};

// 		const reader = response.body.getReader();
// 		while (true) {
// 			const { done, value } = await reader.read();
// 			if (done) break;
// 			parser.write(value);
// 		}
// 	} catch (e) {
// 		error.value = `加载失败: ${e.message}`;
// 		loading.value = false;
// 	}
// }

const initLargeData = async () => {
	const largeFileModule = await import('./cloudNetWork');
	largeData = largeFileModule.default;
	// 使用加载的文件
};

const saveToIndexedDB = async () => {
	const dbUtil = new IndexedDBUtil();
	try {
		await dbUtil.saveData(largeData); // 存储大数据
		console.log('数据保存成功');
	} catch (error) {
		console.error('保存数据失败:', error);
	}
};

const loadData = async () => {
	const dbUtil = new IndexedDBUtil();
	try {
		const data = await dbUtil.getData(0, 1); // 获取第一页的数据（分页）
		console.log('数据加载成功', data);
	} catch (error) {
		console.error('加载数据失败:', error);
	}
};
</script>

<style lang="scss" scoped></style>
