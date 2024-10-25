<template>
	<div class="file-show">
		<header class="operation">
			<el-button type="primary" @click="selectDirection">选择目录</el-button>
		</header>

		<section class="main">
			<div class="tree-box">
				<el-tree
					class="tree"
					:props="{ label: 'label', children: 'children' }"
					:data="treeData"
					:expand-on-click-node="false"
					@node-click="nodeClick"
				></el-tree>
			</div>

			<div class="code-show">
				<highlightjs :autodetect="true" :code="code" />
			</div>
		</section>
	</div>
</template>

<script setup lang="ts" name="简单文件展示">
import 'highlight.js/styles/base16/3024.css';
const treeData = ref<Arr>();
const code = ref<string>('');

const selectDirection = async () => {
	// @ts-ignore
	const directionHandle = await window.showDirectoryPicker();
	const list: Arr = [];
	await recDir(directionHandle, list);
	treeData.value = list;
};

// 递归遍历目录
const recDir = async (directionHandle: any, list: Arr) => {
	if (!directionHandle.entries) return;
	for await (const [key, FSDH] of directionHandle.entries()) {
		if (FSDH.kind === 'directory') {
			let obj = { label: FSDH.name, children: [] };
			list.push(obj);
			await recDir(FSDH, obj.children);
		} else if (FSDH.kind === 'file') {
			let file = await FSDH.getFile();
			list.push({ label: FSDH.name, file });
		}
	}
};

const nodeClick = async (data: any) => {
	if (data.file) {
		const file = await data.file.text();
		code.value = file;
	}
};
</script>

<style lang="scss" scoped>
.file-show {
	overflow: auto;
	.main {
		display: flex;
		flex: 1;
		margin-top: 1rem;
		.tree-box {
			min-width: 20rem;
			overflow: auto;
			border-right: 1px solid var(--el-color-info-light-7);
		}
	}
}
</style>
