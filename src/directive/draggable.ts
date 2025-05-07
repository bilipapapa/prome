import type { App, DirectiveBinding } from 'vue'

// 回调参数类型（保持原始结构）
interface DragCallbackParams {
	e: MouseEvent
	x: number
	y: number
	name: 'mousemove' | 'mouseup'
}

// 性能优化配置
const PERFORMANCE_CONFIG = {
	USE_RAF: true,          // 启用requestAnimationFrame
	USE_TRANSFORM3D: true,  // 使用3D变换加速
	WILL_CHANGE: 'transform' // 优化渲染提示
}

// 共享事件处理器缓存
const handlerStore = new WeakMap<HTMLElement, {
	moveHandler: (e: MouseEvent) => void
	upHandler: () => void
}>()

const createDragHandler = (
	el: HTMLElement,
	binding: DirectiveBinding,
	axis: string[],
	isMove: boolean
) => {
	let rafId: number | null = null
	let startX = 0
	let startY = 0
	let initialX = 0
	let initialY = 0

	// 初始化位置信息（减少布局抖动）
	const initPosition = () => {
		const rect = el.getBoundingClientRect()
		initialX = rect.left
		initialY = rect.top
	}

	// 鼠标按下处理
	const mouseDownHandler = (e: MouseEvent) => {
		e.preventDefault()
		initPosition()

		startX = e.clientX
		startY = e.clientY

		document.body.style.userSelect = 'none'
		document.body.style.cursor = axis.includes('x') ? 'col-resize' : 'row-resize'

		if (PERFORMANCE_CONFIG.WILL_CHANGE) {
			el.style.willChange = PERFORMANCE_CONFIG.WILL_CHANGE
		}

		// 添加全局监听
		document.addEventListener('mousemove', moveHandler)
		document.addEventListener('mouseup', mouseUpHandler)
	}

	// 鼠标移动处理
	const moveHandler = (e: MouseEvent) => {
		if (rafId && PERFORMANCE_CONFIG.USE_RAF) {
			cancelAnimationFrame(rafId)
		}

		const update = () => {
			const deltaX = e.clientX - startX
			const deltaY = e.clientY - startY

			// 生成位移值
			const translateX = axis.includes('x') ? deltaX : 0
			const translateY = axis.includes('y') ? deltaY : 0

			// 应用变换
			if (isMove && PERFORMANCE_CONFIG.USE_TRANSFORM3D) {
				el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`
			} else if (isMove) {
				el.style.transform = `translate(${translateX}px, ${translateY}px)`
			}

			// 触发回调（保持原始参数结构）
			if (typeof binding.value === 'function') {
				const params: DragCallbackParams = {
					e,
					x: translateX,
					y: translateY,
					name: 'mousemove'
				}
				binding.value(params)
			}
		}

		// 使用RAF优化渲染
		if (PERFORMANCE_CONFIG.USE_RAF) {
			rafId = requestAnimationFrame(update)
		} else {
			update()
		}
	}

	// 鼠标释放处理
	const mouseUpHandler = () => {
		// 清理操作
		document.removeEventListener('mousemove', moveHandler)
		document.removeEventListener('mouseup', mouseUpHandler)

		// 重置样式
		requestAnimationFrame(() => {
			document.body.style.removeProperty('user-select')
			document.body.style.removeProperty('cursor')
			el.style.transform = 'none'

			if (PERFORMANCE_CONFIG.WILL_CHANGE) {
				el.style.willChange = 'auto'
			}
		})

		// 触发最终回调
		if (typeof binding.value === 'function') {
			const params: DragCallbackParams = {
				e: new MouseEvent('mouseup'),
				x: el.offsetLeft - initialX,
				y: el.offsetTop - initialY,
				name: 'mouseup'
			}
			binding.value(params)
		}

		if (rafId) {
			cancelAnimationFrame(rafId)
			rafId = null
		}
	}

	// 存储处理器
	handlerStore.set(el, { moveHandler, upHandler: mouseUpHandler })

	// 绑定事件
	el.addEventListener('mousedown', mouseDownHandler)
}

// 指令工厂函数
const createDirective = (axis: string[], isMove = true) => ({
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		createDragHandler(el, binding, axis, isMove)
	},

	beforeUnmount(el: HTMLElement) {
		const handlers = handlerStore.get(el)
		if (handlers) {
			document.removeEventListener('mousemove', handlers.moveHandler)
			document.removeEventListener('mouseup', handlers.upHandler)
			handlerStore.delete(el)
		}
		el.removeEventListener('mousedown', () => { })
	}
})

// 指令集
const installDragDirectives = (app: App) => {
	// 元素移动版本
	app.directive('draggable', createDirective(['x', 'y']))
	app.directive('draggable-x', createDirective(['x']))
	app.directive('draggable-y', createDirective(['y']))

	// 元素不移动版本
	app.directive('draggable2', createDirective(['x', 'y'], false))
	app.directive('draggable2-x', createDirective(['x'], false))
	app.directive('draggable2-y', createDirective(['y'], false))
}

export default installDragDirectives