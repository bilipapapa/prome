<template>
	<el-aside class="layout-aside">
		<el-scrollbar>
			<!-- default -->
			<template v-if="app.mode === 'default'">
				<VerticalMenu class="vertical-menu" :class="{ isExpand: app.verticalMenuExpand }" />
			</template>
			<!-- mine -->
			<template v-else-if="app.mode === 'mine'">
				<ModuleMenu class="module-menu" ref="moduleMenuRef" :class="{ isExpand: app.moduleMenuExpand && isModulePage }" />
			</template>
		</el-scrollbar>

		<!-- 拖线 & 折叠 -->
		<div class="controls-line" ref="controlsLineRef" v-draggable2-x="asideWidthChange" @mousedown="controlsHide">
			<div class="controls" ref="controlsRef" v-if="isModulePage" @click="toggleExpand">
				<img v-show="app.moduleMenuExpand" class="controls-icon" src="/src/assets/svg/icon/expand-l.svg" />
				<img v-show="!app.moduleMenuExpand" class="controls-icon" src="/src/assets/svg/icon/expand-r.svg" />
			</div>
		</div>
	</el-aside>
</template>

<script setup lang="ts" name="layout-aside">
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import { Local } from '@/utils/storage';
import pinia from '@/store';

// 引入组件
const VerticalMenu = defineAsyncComponent(() => import('@/layout/menu/vertical-menu.vue'));
const ModuleMenu = defineAsyncComponent(() => import('@/layout/menu/module-menu.vue'));

// 定义变量
let timer: any = null;
const route = useRoute();
const { useMenuStore, useAppStore } = useStore();
const { app } = toRefs(useAppStore());
const width: any = ref(app.value.moduleMenuWidth || '200px');
const controlsRef = ref<HTMLElement | null>(null);

// 是否是模块页面
const isModulePage = computed(() => route.path.startsWith('/modules/'));

// 侧边栏宽度改变
const asideWidthChange = ({ e, name }) => {
	if (name === 'mousemove') {
		let n = requestAnimationFrame(() => {
			let len = e.x + 1;
			width.value = (len < 66 ? 66 : len) + 'px';
			switch (app.value.mode) {
				case 'mine':
					moduleMenuWidthChange(width.value);
					break;
				default:
					verticalMenuWidthChange(width.value);
					break;
			}
			cancelAnimationFrame(n);
		});
	} else if (name === 'mouseup') {
		controlsShow();
	}
};
// module menu 宽度改变
const moduleMenuWidthChange = (width: string) => {
	document.documentElement.style.setProperty('--module-menu-width', width);
	setAppStyle('moduleMenuWidth', width);
};
// vertical menu 宽度改变
const verticalMenuWidthChange = (width: string) => {
	document.documentElement.style.setProperty('--vertical-menu-width', width);
	setAppStyle('verticalMenuWidth', width);
};
// 设置appStore
const setAppStyle = (prop: string, width: string) => {
	// 段时间内多次执行只取最后一次
	if (timer) clearTimeout(timer);
	timer = setTimeout(() => {
		Local.set('appStyle', document.documentElement.style.cssText);
		useAppStore().setApp({ [prop]: width });
	}, 300);
};

// 折叠展开
const toggleExpand = () => {
	useAppStore().setApp({ moduleMenuExpand: !app.value.moduleMenuExpand });
};
// 控制按钮隐藏
const controlsLineRef = ref();
const controlsHide = () => {
	controlsLineRef.value?.addEventListener('mousemove', controlsRefHide);
	controlsLineRef.value?.addEventListener('mouseleave', controlsRefHide);
};
// 控制按钮显示
const controlsShow = () => {
	controlsLineRef.value?.removeEventListener('mousemove', controlsRefHide);
	controlsLineRef.value?.removeEventListener('mouseleave', controlsRefHide);
	controlsRef.value!.style.opacity = '1';
};
// 控制按钮隐藏事件
function controlsRefHide() {
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
		transition: width 0.08s;
		width: 0px;
	}
	.vertical-menu {
		&.isExpand {
			width: var(--vertical-menu-width);
		}
	}
	.module-menu {
		&.isExpand {
			width: var(--module-menu-width);
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
