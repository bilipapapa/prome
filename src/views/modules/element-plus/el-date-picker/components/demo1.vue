<template>
	<div>
		<slot></slot>
		<el-date-picker
			v-model="timeRange"
			type="datetimerange"
			:clearable="false"
			start-placeholder="开始时间"
			end-placeholder="结束时间"
			:disabled-date="disabledDate"
			@calendar-change="handleCalendarChange"
			format="YYYY-MM-DD HH:mm:ss"
			date-format="YYYY-MM-DD HH:mm:ss"
			time-format="HH:mm:ss"
			:default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]"
			:shortcuts="shortcuts"
			show-now
		/>
	</div>
</template>

<script setup lang="ts">
import { formatDate, dateTimeStr } from '@/utils/time';

let now = new Date().getTime();
let yesterdayTimeStart = formatDate(new Date(now - 3600 * 1000 * 24), dateTimeStr);

// 默认昨天到今天
const timeRange = ref<any>([yesterdayTimeStart, now]);
const tempStartDate = ref<any>(null); // 临时存储开始时间

// 预设时间段
let shortcuts = [
	{
		text: '近1天',
		value: () => {
			const start = new Date(yesterdayTimeStart);
			const end = new Date(now);
			return [start, end];
		},
	},
	{
		text: '近7天',
		value: () => {
			const start = new Date(yesterdayTimeStart);
			const end = new Date(now);
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			return [start, end];
		},
	},
	{
		text: '近30天',
		value: () => {
			const start = new Date(yesterdayTimeStart);
			const end = new Date(now);
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			return [start, end];
		},
	},
];

function handleCalendarChange(dates) {
	// 当用户选择开始日期时，暂存开始时间
	if (dates && dates[0]) {
		tempStartDate.value = dates[0];
	} else {
		tempStartDate.value = null;
	}
}

function disabledDate(time) {
	if (tempStartDate.value) {
		const startTime = tempStartDate.value.getTime() - 30 * 24 * 60 * 60 * 1000;
		const endTime = tempStartDate.value.getTime() + 30 * 24 * 60 * 60 * 1000;
		const currentTime = time.getTime();
		// 限制只能选择开始日期前后一个月内的日期
		return currentTime < startTime || currentTime > endTime;
	}
	return false;
}
</script>

<style lang="scss" scoped></style>
