<template>
	<el-form :model="form" :rules="rules" ref="formRef">
		<el-form-item prop="start" style="margin-bottom: 18px">
			<el-date-picker
				value-format="YYYY-MM-DD"
				date-format="YYYY-MM-DD"
				type="date"
				range-separator="To"
				placeholder="开始日期"
				:disabled-date="disabledStartDate"
				@change="setStart2"
				v-model="form.startDate"
			></el-date-picker>

			<el-time-select
				v-model="form.startTime"
				step="00:30"
				:start="start1"
				end="23:30"
				:disabled="!form.startDate"
				placeholder="开始时间"
				style="width: 160px; margin-left: 10px"
				@change="setStart2"
			>
			</el-time-select>
		</el-form-item>

		<el-form-item prop="end">
			<el-date-picker
				value-format="YYYY-MM-DD"
				date-format="YYYY-MM-DD"
				type="date"
				:disabled="!form.startTime && !form.startDate"
				placeholder="结束日期"
				:disabled-date="endDisableDate"
				@change="setStart2"
				v-model="form.endDate"
			></el-date-picker>

			<el-time-select
				v-model="form.endTime"
				step="00:30"
				:start="start2"
				:end="end2"
				:disabled="!form.startTime && !form.startDate"
				placeholder="结束时间"
				style="width: 160px; margin-left: 10px"
			>
			</el-time-select>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils/time';

const form = ref({
	startDate: '',
	endDate: '',
	startTime: '',
	endTime: '',
});
const formRef: any = ref(null);

// 开始时间date禁用的日期
const disabledStartDate = (time) => {
	return time.getTime() < Date.now() - 8.64e7;
};

// 结束时间date禁用的日期
const endDisableDate = (time) => {
	if (form.value.startTime === '23:30') {
		return new Date(form.value.startDate).getTime() > time.getTime();
	} else {
		return new Date(form.value.startDate).getTime() - 8.64e7 > time.getTime();
	}
};

// 开始日期
const start1 = computed(() => {
	if (form.value.startDate === formatDate(new Date())) {
		let nextTime;
		let now = new Date();
		if (now.getMinutes() < 30) {
			nextTime = now.setMinutes(30, 0, 0);
		} else {
			nextTime = now.setHours(now.getHours() + 1, 0, 0, 0);
		}
		return formatDate(new Date(nextTime), 'HH:mm');
	} else {
		return '00:00';
	}
});

// 结束时间end
const end2 = computed(() => {
	if (form.value.startDate === form.value.endDate) {
		return '23:00';
	} else {
		return '23:30';
	}
});

// 更新结束时间start值
const start2 = ref('00:00');
const setStart2 = () => {
	if (form.value.startDate === form.value.endDate) {
		const date = new Date(`2000-01-01 ${form.value.startTime}:00`);
		date.setMinutes(date.getMinutes() + 30);
		start2.value = date.toTimeString().slice(0, 5);
	} else {
		start2.value = '00:00';
	}
};

// 开始时间validator
const startValidator = (rule, val, cb) => {
	if (!form.value.startDate) {
		cb(new Error('选选择开始日期'));
	} else if (!form.value.startTime) {
		cb(new Error('请选择开始时间'));
	} else {
		cb();
	}
};

// 结束时间validator
const endValidator = (rule, val, cb) => {
	if (!form.value.endDate) {
		cb(new Error('选选择结束日期'));
	} else if (!form.value.endTime) {
		cb(new Error('请选择结束时间'));
	} else if (`${form.value.startDate} ${form.value.startTime}` > `${form.value.endDate} ${form.value.endTime}`) {
		cb(new Error('结束时间不能早于开始时间'));
	} else {
		cb();
	}
};

const rules = reactive({
	start: [{ required: true, validator: startValidator }],
	end: [{ required: true, validator: endValidator }],
});

watch(
	() => form.value,
	() => {
		formRef.value?.validate((valid) => {});
	},
	{ deep: true }
);
</script>

<style lang="scss" scoped></style>
