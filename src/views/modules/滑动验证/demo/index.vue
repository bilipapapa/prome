<template>
  <div class="slider-captcha">
    <div class="slider-container" ref="container">
      <div class="slider-track"></div>
      <div
        class="slider-thumb"
        :style="{ left: thumbPosition + 'px' }"
        @mousedown="startDrag"
        @touchstart="startDrag"
      ></div>
    </div>
    <p v-if="message" :class="['message', { success: isSuccess, error: !isSuccess }]">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const container = ref(null); // 容器元素
const thumbPosition = ref(0); // 滑块位置
const isDragging = ref(false); // 是否正在拖动
const message = ref(''); // 验证消息
const isSuccess = ref(false); // 是否验证成功

// 开始拖动
const startDrag = (event) => {
  isDragging.value = true;

  // 阻止默认行为（如触摸滚动）
  event.preventDefault();
};

// 停止拖动
const stopDrag = () => {
  if (!isDragging.value) return;

  isDragging.value = false;

  // 验证是否滑动到最右端
  const containerWidth = container.value.offsetWidth;
  const thumbWidth = 40; // 滑块宽度
  if (thumbPosition.value >= containerWidth - thumbWidth - 10) {
    message.value = '验证成功！';
    isSuccess.value = true;
  } else {
    message.value = '请滑动到最右端';
    isSuccess.value = false;
  }

  // 松开时自动回到原点
  thumbPosition.value = 0;
};

// 处理拖动
const handleDrag = (event) => {
  if (!isDragging.value) return;

  // 获取鼠标或触摸位置
  const clientX = event.clientX || event.touches[0].clientX;
  const containerRect = container.value.getBoundingClientRect();
  let newLeft = clientX - containerRect.left - 20; // 20 是滑块半径

  // 限制滑块在容器内移动
  newLeft = Math.max(0, Math.min(newLeft, containerRect.width - 40)); // 40 是滑块宽度
  thumbPosition.value = newLeft;
};

// 监听事件
onMounted(() => {
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchmove', handleDrag);
  document.addEventListener('touchend', stopDrag);
});

// 移除事件
onUnmounted(() => {
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', handleDrag);
  document.removeEventListener('touchend', stopDrag);
});
</script>

<style lang="scss" scoped>
.slider-captcha {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  .slider-container {
    position: relative;
    width: 300px;
    height: 40px;
    background-color: #e0e0e0;
    border-radius: 20px;
    overflow: hidden;

    .slider-track {
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }

    .slider-thumb {
      position: absolute;
      width: 40px;
      height: 40px;
      background-color: #4caf50;
      border-radius: 50%;
      cursor: pointer;
      top: 0;
      transition: left 0.1s ease;
    }
  }

  .message {
    margin-top: 10px;
    font-size: 14px;

    &.success {
      color: #4caf50;
    }

    &.error {
      color: #f44336;
    }
  }
}
</style>