<template>
	<div class="map-container">
		<v-chart class="" :option="option" />
	</div>
</template>

<script setup lang="ts" name="">
import VChart from 'vue-echarts';
const option = ref({});
</script>

<style lang="scss" scoped></style>
