<template>
	<div>
		<!-- ref -->
		<fieldset>
			<legend>基本数据类型Ref</legend>
			<div class="ref">
				<div>基本数据类型Ref: {{ baseRef }}</div>
				<div>基本数据类型MarkRaw: {{ baseMarkRaw }}</div>
				<el-button @click="baseRef++"> Ref++ </el-button>
				<el-button @click="baseMarkRaw++"> MarkRaw++ </el-button>
			</div>
		</fieldset>

		<fieldset>
			<legend>引用类型Ref</legend>
			<div class="ref">
				<div>引用类型类型Ref: {{ referenceRef.count }}</div>
				<div>引用类型类型MarkRaw: {{ referenceMarkRaw.count }}</div>
				<el-button @click="referenceRef.count++"> Ref++ </el-button>
				<el-button @click="referenceMarkRaw.count++"> MarkRaw++ </el-button>
			</div>
		</fieldset>

		<!-- reactive -->
		<fieldset>
			<legend>Reactive</legend>
			<div class="reactive">
				<div>Reactive: {{ react.count }}</div>
				<div>ReactiveMarkRaw: {{ reactiveMarkRaw.count }}</div>
				<el-button @click="react.count++"> Reactive++ </el-button>
				<el-button @click="reactiveMarkRaw.count++"> MarkRaw++ </el-button>
			</div>
		</fieldset>
	</div>
</template>

<script setup lang="ts" name="markRaw">
const baseRef = ref(0);
const baseMarkRaw = markRaw(baseRef);

const referenceRef = ref({ count: 1 });
const referenceMarkRaw = markRaw(referenceRef);

const react = reactive({ count: 1 });
const reactiveMarkRaw = markRaw(react);
</script>

<style lang="scss" scoped></style>
