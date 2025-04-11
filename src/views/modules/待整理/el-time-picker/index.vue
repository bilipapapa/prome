<template>
	<div>
		<!-- <el-time-picker
			v-model="row[`time1`]"
			:disabled-hours="() => disabledStartHours(row)"
			:disabled-minutes="() => disabledStartMinutes(row)"
			format="HH:mm"
			value-format="HH:mm"
			:value-on-clear="''"
			style="width: 100px"
		/>
		-
		<el-time-picker
			v-model="row[`time2`]"
			:disabled-hours="() => disabledEndHours(row)"
			:disabled-minutes="() => disabledEndMinutes(row)"
			format="HH:mm"
			value-format="HH:mm"
			:value-on-clear="''"
			style="width: 100px"
		/> -->
	</div>
</template>

<script setup lang="ts">
// 禁用开始时间的小时选项
const disabledStartHours = (row: any) => {
	if (!row[`time2`]) return []; // 如果结束时间未选择，不禁用任何小时

	const [sh, sm] = row[`time1`].split(':');
	const [eh, em] = row[`time2`].split(':');
	const [startHour, startMinute, endHour, endMinute] = [parseInt(sh), parseInt(sm), parseInt(eh), parseInt(em)];

	const disabledHours = [];
	// 禁用结束时间之后的小时
	for (let i = endHour + 1; i < 24; i++) {
		disabledHours.push(i);
	}
	console.log('disabledHours', disabledHours);
	return disabledHours;
};

// 禁用开始时间的分钟选项
const disabledStartMinutes = (row: any) => {
	if (!row[`time2`]) return []; // 如果结束时间未选择，不禁用任何小时

	const [sh, sm] = row[`time1`].split(':');
	const [eh, em] = row[`time2`].split(':');
	const [startHour, startMinute, endHour, endMinute] = [parseInt(sh), parseInt(sm), parseInt(eh), parseInt(em)];

	// 如果选择的小时与结束时间的小时相同，则禁用结束时间之后的分钟
	if (startHour === endHour) {
		const disabledMinutes = [];
		for (let i = endMinute + 1; i < 60; i++) {
			disabledMinutes.push(i);
		}
		return disabledMinutes;
	}
	return [];
};

// 禁用结束时间的小时选项
const disabledEndHours = (row: any) => {
	if (!row[`time1`]) return []; // 如果结束时间未选择，不禁用任何小时

	const [sh, sm] = row[`time1`].split(':');
	const [eh, em] = row[`time2`].split(':');
	const [startHour, startMinute, endHour, endMinute] = [parseInt(sh), parseInt(sm), parseInt(eh), parseInt(em)];

	const disabledHours = [];
	// 禁用开始时间之前的小时
	for (let i = 0; i < startHour; i++) {
		disabledHours.push(i);
	}
	return disabledHours;
};

// 禁用结束时间的分钟选项
const disabledEndMinutes = (row: any) => {
	if (!row[`time1`]) return []; // 如果结束时间未选择，不禁用任何小时

	const [sh, sm] = row[`time1`].split(':');
	const [eh, em] = row[`time2`].split(':');
	const [startHour, startMinute, endHour, endMinute] = [parseInt(sh), parseInt(sm), parseInt(eh), parseInt(em)];

	// 如果选择的小时与开始时间的小时相同，则禁用开始时间之前的分钟
	if (endHour === startHour) {
		const disabledMinutes = [];
		for (let i = 0; i < startMinute; i++) {
			disabledMinutes.push(i);
		}
		return disabledMinutes;
	}

	return [];
};
</script>

<style lang="scss" scoped></style>
