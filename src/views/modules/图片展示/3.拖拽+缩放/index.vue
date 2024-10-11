<template>
	<div class="pic-container" ref="container">
		<img
			ref="img"
			:style="style"
			src="/src/assets/imgs/vue-life-cycle_en.png"
			title="滚动缩放-点击拖拽"
			alt="操作的图片"
			@mousewheel="handleMouseWheel"
			@mousedown="handleMouseDown"
		/>
	</div>
</template>

<script setup lang="ts" name="图片-缩放拖拽">
const drag = ref(false);
const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);
const container = ref<HTMLDivElement | null>(null);

const style = computed(() => {
	return {
		transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
		'transform-origin': `0px 0px`,
		cursor: 'pointer',
	};
});

// 鼠标滚轮事件
const handleMouseWheel = (e: WheelEvent) => {
	const rect = container.value?.getBoundingClientRect();
	if (!rect) return;

	// 如有margin-left margin-top等 需要在这里减去
	const mouseX = e.clientX - rect.left;
	const mouseY = e.clientY - rect.top;

	const delta = e.deltaY > 0 ? -0.05 : 0.05;
	const newScale = Math.min(Math.max(0.5, scale.value + delta), 5);

	const contentMouseX = (mouseX - translateX.value) / scale.value;
	const contentMouseY = (mouseY - translateY.value) / scale.value;

	translateX.value = mouseX - contentMouseX * newScale;
	translateY.value = mouseY - contentMouseY * newScale;

	scale.value = newScale;
};

// 鼠标按下事件
const handleMouseDown = (e: MouseEvent) => {
	e.preventDefault();
	drag.value = true;
	const rect = container.value?.getBoundingClientRect();
	if (!rect) return;

	const startX = e.clientX;
	const startY = e.clientY;

	const startTranslateX = translateX.value;
	const startTranslateY = translateY.value;

	const handleMouseMove = (e: MouseEvent) => {
		if (!drag.value) return;

		translateX.value = startTranslateX + e.clientX - startX;
		translateY.value = startTranslateY + e.clientY - startY;
	};

	const handleMouseUp = () => {
		drag.value = false;
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	document.addEventListener('mousemove', handleMouseMove);
	document.addEventListener('mouseup', handleMouseUp);
};
</script>

<style lang="scss" scoped>
.pic-container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}
</style>
