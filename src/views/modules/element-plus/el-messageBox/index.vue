<template>
	<div>
		<el-button type="primary" @click="deleteContent">删除</el-button>
		<el-button type="primary" @click="modalDelete">modal删除</el-button>
	</div>
</template>

<script setup lang="ts" name="MessageBox">
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Action } from 'element-plus';

const { proxy } = getCurrentInstance();

function deleteContent() {
	let flag = false;
	ElMessageBox({
		closeOnClickModal: false,
		closeOnPressEscape: false,
		title: '提示',
		message: '是否删除此条数据？',
		// 区分取消和关闭按钮
		distinguishCancelAndClose: true,
		showCancelButton: true,
		confirmButtonText: '',
		cancelButtonText: '',
		buttonSize: 'default',
		beforeClose: (action, instance, done) => {
			if (action === 'confirm') {
				instance.confirmButtonLoading = true;
				instance.confirmButtonText = '删除中...';
				setTimeout(() => {
					done();
				}, 1000);
			} else {
				done();
			}
		},
	})
		.then(async (action: Action) => {
			console.log(action);
			if (flag) {
				ElMessage.success('删除成功');
			}
		})
		.catch((action: Action) => {
			console.log(action);
			switch (action) {
				case 'cancel':
					ElMessage({
						message: '取消删除',
						type: 'info',
					});
					break;
				case 'close':
					ElMessage({
						message: '点击遮罩层关闭',
						type: 'info',
					});
					break;
			}
		});
}

function modalDelete() {
	proxy.$modal.confirmDelete({
		beforeConfirm: async (done) => {
			setTimeout(() => {
				console.log('beforeConfirm');
				done();
			}, 1000);
		},
		// 点击取消按钮
		onCancel: (action) => {
			console.log('oncancel', 'action:', action);
		},
		// 点击关闭按钮×
		onClose: (action) => {
			console.log('onClose', 'action:', action);
		},
		onConfirm: (action) => {
			console.log('onConfirm', 'action:', action);
		},
		onSuccess: () => {
			console.log('onSuccess');
		},
		onError: (error) => {
			console.log('onError', 'error:', error);
		},
	});
}
</script>

<style lang="scss" scoped></style>
