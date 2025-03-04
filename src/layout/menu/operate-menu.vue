<template>
	<ul class="operate-menu">
		<li>
			<el-dropdown @command="languageChange">
				<img class="operate-menu-icon" src="@/assets/svg/icon/lang.svg" alt="" />
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="zh-cn" :disabled="app.locale === 'zh-cn'">简体中文</el-dropdown-item>
						<el-dropdown-item command="en" :disabled="app.locale === 'en'">English</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</li>
		<li>
			<img class="operate-menu-icon" src="@/assets/svg/icon/setting.svg" @click="openSetting" alt="" />
			<!-- <el-icon class="operate-menu-icon"> <i-ep-Setting /> </el-icon> -->
		</li>
	</ul>
</template>

<script setup lang="ts" name="operate-menu">
import { useI18n } from 'vue-i18n';
import { useAppStore } from '@/store/modules/app';

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
.operate-menu {
	display: flex;
	margin: 0 1rem;
	&-icon {
		width: 1.4rem;
		height: 1.4rem;
		margin-left: 0.8rem;
		&:hover {
			color: var(--el-color-primary);
		}
	}
}
</style>
