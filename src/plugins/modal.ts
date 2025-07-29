import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action, MessageBoxState } from 'element-plus'

export default {
	// 通用弹框
	confirm(options: Omit<ConfirmOptions, 'type'> = {}): Promise<boolean> {
		return confirmDialog({
			...options,
		})
	},
	// 删除
	confirmDelete(options: Omit<ConfirmOptions, 'type'> = {}): Promise<boolean> {
		return confirmDialog({
			title: '删除确认',
			message: '是否删除此条数据？',
			loadingText: '删除中...',
			closeOnClickModal: true,
			...options,
		})
	}
}

interface ConfirmOptions {
	title?: string
	message?: string
	confirmText?: string
	cancelText?: string
	loadingText?: string
	showClose?: boolean
	closeOnClickModal?: boolean
	closeOnPressEscape?: boolean
	beforeConfirm?: (done) => Promise<void> | void
	onConfirm?: (action: Action) => void
	onCancel?: (action: Action) => void
	onClose?: (action: Action) => void
	onSuccess?: (result?: any) => void
	onError?: (error: Error) => void
	customClass?: string
	type?: 'success' | 'warning' | 'info' | 'error'
	draggable?: boolean
}

const DEFAULT_OPTIONS: Partial<ConfirmOptions> = {
	title: '提示',
	confirmText: '确认',
	message: '是否执行此操作？',
	cancelText: '取消',
	loadingText: '处理中...',
	closeOnClickModal: false,
	closeOnPressEscape: true,
	type: 'warning',
}

export async function confirmDialog(options: ConfirmOptions): Promise<boolean> {
	try {
		const action = await ElMessageBox({
			title: options.title || DEFAULT_OPTIONS.title,
			message: options.message || DEFAULT_OPTIONS.message,
			confirmButtonText: options.confirmText || DEFAULT_OPTIONS.confirmText,
			cancelButtonText: options.cancelText || DEFAULT_OPTIONS.cancelText,
			type: options.type || DEFAULT_OPTIONS.type,
			draggable: options.draggable || DEFAULT_OPTIONS.draggable,
			showClose: options.showClose || DEFAULT_OPTIONS.showClose,
			closeOnClickModal: options.closeOnClickModal || DEFAULT_OPTIONS.closeOnClickModal,
			closeOnPressEscape: options.closeOnPressEscape || DEFAULT_OPTIONS.closeOnPressEscape,
			distinguishCancelAndClose: true,
			showCancelButton: true,
			beforeClose: async (action: Action, instance: MessageBoxState, done: () => void) => {
				if (action === 'confirm') {
					instance.confirmButtonLoading = true
					instance.confirmButtonText = (DEFAULT_OPTIONS.loadingText || options.loadingText) as string
					try {
						if (options.beforeConfirm) {
							// 改为手动执行done
							await options.beforeConfirm(done)
						}
						// done()
					} catch (error) {
						instance.confirmButtonLoading = false
						instance.confirmButtonText = (options.confirmText || DEFAULT_OPTIONS.confirmText) as string
						done()
						if (error instanceof Error) {
							options.onError?.(error)
							ElMessage.error(error.message || '操作失败')
						}
						return
					}
				} else {
					done()
				}
			},
		}).catch((error) => error)	// 将关闭操作的 reject 转为 resolve，确保 action 能传递到下方

		if (action === 'confirm') {
			options.onConfirm?.(action)
			options.onSuccess?.()
			return true
		}

		if (action === 'cancel') {
			options.onCancel?.(action)
		} else if (action === 'close') {
			options.onClose?.(action)
		}

		return false
	} catch (error) {
		console.log("catch error:", error)
		if (error instanceof Error) {
			options.onError?.(error)
		}
		return false
	}
}