<template>
	<div class="error-401">
		<div class="error-content">
			<!-- 显示图片 -->
			<img src="/src/assets/imgs/401.png" alt="401 Error" class="error-image" />
			<h1>401 Unauthorized</h1>
			<p>你没有权限访问该页面，请检查你的凭证。</p>
			<router-link to="/login">返回登录页</router-link>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
// 若有更多逻辑处理可在此添加
</script>

<style lang="scss" scoped>
.error-401 {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: #f4f4f4;

	.error-content {
		text-align: center;
		background-color: #fff;
		padding: 40px;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

		.error-image {
			// 设置图片最大宽度和高度，保持图片在合适大小且不失真
			max-width: 300px;
			max-height: 300px;
			margin-bottom: 20px;
		}

		h1 {
			font-size: 3rem;
			color: #d9534f;
			margin-bottom: 20px;
		}

		p {
			font-size: 1.2rem;
			color: #333;
			margin-bottom: 30px;
		}

		a {
			display: inline-block;
			background-color: #0275d8;
			color: #fff;
			padding: 10px 20px;
			border-radius: 4px;
			text-decoration: none;
			transition: background-color 0.3s ease;

			&:hover {
				background-color: #025aa5;
			}
		}
	}
}
</style>
