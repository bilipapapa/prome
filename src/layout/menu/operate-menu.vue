<template>
	<ul class="operate-menu">
		<li>
			<el-dropdown @command="languageChange">
				<img class="lang-icon" src="@/assets/svg/lang.svg" alt="" />
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="zh-cn" :disabled="app.locale === 'zh-cn'">简体中文</el-dropdown-item>
						<el-dropdown-item command="en" :disabled="app.locale === 'en'">English</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</li>
		<li>
			<el-icon> <i-ep-Setting @click="openSetting" /> </el-icon>
		</li>
	</ul>
</template>

<script setup lang="ts" name="operate-menu">
import { useI18n } from 'vue-i18n';
import { useAppStore } from '@/store/app';

const { locale } = useI18n();
const { app } = storeToRefs(useAppStore());

// 打开设置
const openSetting = () => {
	app.value.settingDrawer = true;
};

const languageChange = (key) => {
	locale.value = key;
	useAppStore().setApp({ locale: key });
};
</script>

<style lang="scss" scoped>
.lang-icon {
	width: 20px;
	height: 20px;
}
</style>
