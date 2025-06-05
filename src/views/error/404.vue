<template>
	<div class="error-404">
		<div class="error-content">
			<!-- 显示 404 错误配图 -->
			<img src="/src/assets/imgs/404.png" alt="404 Error" class="error-image" />
			<h1>404 Not Found</h1>
			<p>你访问的页面好像已经消失在宇宙中啦，请检查一下网址是否正确。</p>
			<router-link to="/">返回首页</router-link>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.error-404 {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: #f9f9f9;

	.error-content {
		text-align: center;
		background-color: #ffffff;
		padding: 40px;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

		.error-image {
			max-width: 400px;
			max-height: 400px;
			margin-bottom: 20px;
		}

		h1 {
			font-size: 35px;
			color: #e74c3c;
			margin-bottom: 15px;
		}

		p {
			font-size: 14px;
			color: #333333;
			margin-bottom: 30px;
		}

		a {
			display: inline-block;
			background-color: #3498db;
			color: #ffffff;
			padding: 12px 25px;
			border-radius: 5px;
			text-decoration: none;
			transition: background-color 0.3s ease;

			&:hover {
				background-color: #2980b9;
			}
		}
	}
}
</style>
