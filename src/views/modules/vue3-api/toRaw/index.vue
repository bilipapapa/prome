<template>
	<div>
		<!-- ref -->
		<fieldset>
			<legend>基本数据类型Ref</legend>
			<div class="ref">
				<div>基本数据类型Ref: {{ baseRef }}</div>
				<div>基本数据类型ToRaw: {{ baseToRaw }}</div>
				<el-button @click="baseRef++"> Ref++ </el-button>
				<el-button @click="baseToRaw++"> toRaw++ </el-button>
			</div>
		</fieldset>

		<fieldset>
			<legend>引用类型Ref</legend>
			<div class="ref">
				<div>引用类型类型Ref: {{ referenceRef.count }}</div>
				<div>引用类型类型ToRaw: {{ referenceToRaw.count }}</div>
				<el-button @click="referenceRef.count++"> Ref++ </el-button>
				<el-button @click="referenceToRaw.count++"> toRaw++ </el-button>
			</div>
		</fieldset>

		<!-- reactive -->
		<fieldset>
			<legend>Reactive</legend>
			<div class="reactive">
				<div>Reactive: {{ react.count }}</div>
				<div>ReactiveToRaw: {{ reactiveToRaw.count }}</div>
				<el-button @click="react.count++"> Reactive++ </el-button>
				<el-button @click="reactiveToRaw.count++"> toRaw++ </el-button>
			</div>
		</fieldset>
	</div>
</template>

<script setup lang="ts" name="toRaw">
const baseRef = ref(0);
const baseToRaw = toRaw(baseRef);

const referenceRef = ref({ count: 1 });
const referenceToRaw = toRaw(referenceRef);

const react = reactive({ count: 1 });
const reactiveToRaw = toRaw(react);
</script>

<style lang="scss" scoped></style>
