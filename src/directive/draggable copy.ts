import type { App } from 'vue';
import { DirectiveBinding } from 'vue';

// 指令绑定回调函数参数
interface CallbackParams {
	e: MouseEvent;
	x: number;
	y: number;
	name: 'mousemove' | 'mouseup';
}

/* 由于vue自定义指令不支持修饰符 故分别增加x,y单轴拖拽 */

/* ------------- 拖拽时元素移动 -------------*/
const draggable = {
	beforeMount(el: HTMLElement, binding: DirectiveBinding) {
		drag(el, binding, ['x', 'y']);
	},
};

// x轴拖拽
const draggableX = {
	beforeMount(el: HTMLElement, binding: DirectiveBinding) {
		drag(el, binding, ['x']);
	},
};

// y轴拖拽
const draggableY = {
	beforeMount(el: HTMLElement, binding: DirectiveBinding) {
		drag(el, binding, ['y']);
	},
};

/* ------------- 拖拽时元素不移动 -------------*/
const draggable2 = {
	beforeMount(el: HTMLElement, binding: DirectiveBinding) {
		drag(el, binding, ['x', 'y'], false);
	},
};

// x轴拖拽
const draggable2X = {
	beforeMount(el: HTMLElement, binding: DirectiveBinding) {
		drag(el, binding, ['x'], false);
	},
};

// y轴拖拽
const draggable2Y = {
	beforeMount(el: HTMLElement, binding: DirectiveBinding) {
		drag(el, binding, ['y'], false);
	},
};

/**
 *
 * @description 拖拽函数
 * @param el	拖拽元素
 * @param binding	指令绑定回调函数
 * @param axis	拖拽轴向 ['x', 'y']
 * @param isMove	el绑定的元素是否移动
 */
function drag(el: HTMLElement, binding: DirectiveBinding, axis: string[], isMove: boolean = true) {
	let dragging = false;
	// 初始化拖拽状态变量
	let startX: number, startY: number, deltaX: number, deltaY: number;
	// 绑定拖拽事件
	el.addEventListener('mousedown', (e: MouseEvent) => {
		e.preventDefault();
		document.body.style.userSelect = 'none';
		dragging = true;

		startX = e.clientX - parseInt(el.style.left || '0');
		startY = e.clientY - parseInt(el.style.top || '0');
		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
	});

	// 移动处理函数
	function mouseMoveHandler(e: MouseEvent) {
		e.preventDefault();
		if (dragging) {
			deltaX = e.clientX - startX;
			deltaY = e.clientY - startY;
			// 移动元素
			if (isMove) {
				if (axis.includes('x') && axis.includes('y')) {
					el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
				} else if (axis.includes('x')) {
					el.style.transform = `translateX(${deltaX}px)`;
				} else if (axis.includes('y')) {
					el.style.transform = `translateY(${deltaY}px)`;
				}
			}
			// 调用回调函数
			if (typeof binding.value === 'function') {
				callback({ e, x: deltaX, y: deltaY, name: 'mousemove' });
			}
		}
	}

	// 释放处理函数
	function mouseUpHandler(e: MouseEvent) {
		dragging = false;
		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
		el.style.transform = `none`;
		document.body.style.userSelect = 'auto';
		// 调用回调函数
		if (typeof binding.value === 'function') {
			callback({ e, x: deltaX, y: deltaY, name: 'mouseup' });
		}
	}

	// 回调函数
	function callback(params: CallbackParams) {
		binding.value({ e: params.e, x: params.x, y: params.y, name: params.name });
	}
}

export function draggableDirective(app: App) {
	// 元素移动
	app.directive('draggable', draggable);
	app.directive('draggable-x', draggableX);
	app.directive('draggable-y', draggableY);

	// 元素不移动
	app.directive('draggable2', draggable2);
	app.directive('draggable2-x', draggable2X);
	app.directive('draggable2-y', draggable2Y);
}

export default draggableDirective;
