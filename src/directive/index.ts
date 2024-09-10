import type { App } from 'vue';
import draggableDirective from './draggable';
import wavesDirective from './wave';

/**
 * 导出指令方法：v-xxx
 * @methods authDirective 用户权限指令，用法：v-auth
 * @methods wavesDirective 按钮波浪指令，用法：v-waves
 */
export function directive(app: App) {
	// 拖拽
	draggableDirective(app);
	// 波浪
	wavesDirective(app);
}
