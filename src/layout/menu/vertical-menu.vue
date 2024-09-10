<template>
	<el-menu>
		<template v-for="val in menuList">
			<el-sub-menu :index="val.path" v-if="val.children && val.children.length" :key="val.path">
				<template #title>
					<i></i>
					<span>{{ val.name }}</span>
				</template>
				<template v-for="child in val.children">
					<el-menu-item :index="child.path">{{ child.name }}</el-menu-item>
				</template>
			</el-sub-menu>

			<template v-else>
				<el-menu-item :index="val.path" :key="val.path">
					<i></i>
					<span>{{ val.name }}</span>
				</el-menu-item>
			</template>
		</template>
	</el-menu>
</template>

<script setup lang="ts" name="vertical-menu">
import { useMenuStore } from '@/store/menu';

const { menuList } = storeToRefs(useMenuStore());
</script>

<style lang="scss" scoped></style>
