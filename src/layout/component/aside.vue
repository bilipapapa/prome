<template>
	<el-aside class="layout-aside">
		<el-scrollbar>
			<!-- default -->
			<!-- <template v-show="app.mode === 'default'">
				<VerticalMenu class="vertical-menu" :class="{ isExpand: app.verticalMenuExpand, isHidden: !app.verticalMenuExpand }" />
			</template> -->
			<!-- mine -->
			<ModuleMenu
				v-show="app.mode === 'mine'"
				class="module-menu"
				ref="moduleMenuRef"
				:class="{
					isExpand: app.moduleMenuExpand && isModulePage,
					isHidden: !app.moduleMenuExpand || !app.moduleMenuExpand,
					loaded: loaded,
					dragging: isDragging,
				}"
			/>
		</el-scrollbar>

		<!-- 拖线 & 折叠 -->
		<div class="controls-line" ref="controlsLineRef" v-draggable2-x="asideWidthChange" @mousedown="controlsHide">
			<div class="controls" ref="controlsRef" v-show="isModulePage" @click="toggleExpand" @mousedown.stop="isDrag = false">
				<img v-show="app.moduleMenuExpand" class="controls-icon" src="/src/assets/svg/icon/expand-l.svg" />
				<img v-show="!app.moduleMenuExpand" class="controls-icon" src="/src/assets/svg/icon/expand-r.svg" />
			</div>
		</div>
	</el-aside>
</template>

<script setup lang="ts" name="layout-aside">
// import VerticalMenu from '@/layout/menu/vertical-menu.vue';
import ModuleMenu from '@/layout/menu/module-menu.vue';

import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import { Local } from '@/utils/storage';
import { debounce, throttle } from 'lodash-es';

// 响应式
const route = useRoute();
const { useMenuStore, useAppStore } = useStore();
const { app } = toRefs(useAppStore());
const loaded = ref(false);
// 侧边栏宽度（动态） 默认200px
const width: any = ref('');
// 控制按钮Ref
const controlsRef = ref<HTMLElement | null>(null);
// 控制拖拽
const isDrag = ref(true);
const isDragging = ref(false);

// 是否是模块页面
const isModulePage = computed(() => route.path.startsWith('/modules/'));

onMounted(() => {
	loaded.value = true;
});

// 侧边栏宽度改变
const asideWidthChange = ({ e, name }) => {
	if (name === 'mousemove' && isDrag.value) {
		requestAnimationFrame(() => {
			isDragging.value = true;
			const len = Math.max(66, e.x + 1);
			width.value = `${len}px`;
			// 批量更新样式
			updateMenuWidth(len);
		});
		setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
	} else if (name === 'mouseup') {
		isDragging.value = false;
		controlsShow();
		// 最终更新一次
		saveWidthToStore();
	}
};

// 合并样式更新逻辑
const updateMenuWidth = throttle((width: number) => {
	const propName = app.value.mode === 'mine' ? '--module-menu-width' : '--vertical-menu-width';
	document.documentElement.style.setProperty(propName, `${width}px`);
}, 8); // 约120fps

// 存储操作防抖
const saveWidthToStore = debounce(() => {
	const prop = app.value.mode === 'mine' ? 'moduleMenuWidth' : 'verticalMenuWidth';
	useAppStore().setApp({ [prop]: width.value });
	Local.set('appStyle', document.documentElement.style.cssText);
}, 300);

// 折叠展开 按住控制按钮不可拖拽
const toggleExpand = () => {
	useAppStore().setApp({ moduleMenuExpand: !app.value.moduleMenuExpand });
	// 触发window.resize事件
	window.dispatchEvent(new Event('resize'));
};

// 控制按钮隐藏
const controlsLineRef = ref();
const controlsHide = () => {
	isDrag.value = true;
	controlsLineRef.value?.addEventListener('mousemove', controlsHideEvent);
	controlsLineRef.value?.addEventListener('mouseleave', controlsHideEvent);
};
// 控制按钮显示
const controlsShow = () => {
	controlsLineRef.value?.removeEventListener('mousemove', controlsHideEvent);
	controlsLineRef.value?.removeEventListener('mouseleave', controlsHideEvent);
	controlsRef.value!.style.opacity = '1';
};
// 控制按钮隐藏事件
function controlsHideEvent() {
	controlsRef.value!.style.opacity = '0';
}
</script>

<style lang="scss" scoped>
.layout-aside {
	width: auto;
	height: 100%;
	overflow: visible;
	position: relative;
	:deep(.el-scrollbar) {
		.el-scrollbar__wrap {
			.el-scrollbar__view {
				height: 100%;
			}
		}
	}
	.vertical-menu,
	.module-menu {
		transition: none !important;
		transform: translateZ(0);
		will-change: width;
		contain: strict;
		backface-visibility: hidden;
		content-visibility: auto;
		&.loaded {
			transition: width 0.28s;
		}
		&.isHidden {
			width: 0px;
		}
		&.dragging {
			transition: none !important;
			will-change: width;
		}
	}
	.vertical-menu {
		width: var(--vertical-menu-width);
		&.isExpand {
			width: var(--vertical-menu-width);
		}
	}
	.module-menu {
		width: var(--module-menu-width, 200px); // 双保险
		&.isExpand {
			width: var(--module-menu-width);
		}
	}

	// 添加拖拽状态标识
	&.dragging {
		.module-menu,
		.vertical-menu {
			transition: none !important;
			will-change: width;
		}
		~ .layout-main {
			pointer-events: none; // 禁用主区域交互
		}
	}
	.controls-line {
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		width: 2px;
		background-color: var(--el-color-primary-dark-2);
		cursor: e-resize;
		z-index: 999;
		user-select: none;
	}
	.controls {
		position: absolute;
		right: 0%;
		top: 50%;
		transform: translate(7px, -50%);
		width: 16px;
		height: 16px;
		background-color: var(--el-color-primary);
		border-radius: 50%;
		cursor: pointer;
		z-index: 1000;
		transition: opacity 0.5s;
	}
	.controls-icon {
		width: 16px;
		height: 16px;
	}
}
</style>
