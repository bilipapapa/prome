import { resolve } from 'path';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import viteCompression from 'vite-plugin-compression';
import topLevelAwait from 'vite-plugin-top-level-await';
import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Inspect from 'vite-plugin-inspect';

const pathResolve = (dir: string) => {
	return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
	'@': pathResolve('./src/'),
	'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};

// https://vitejs.dev/config/
const viteConfig = defineConfig((ConfigEnv: ConfigEnv): any => {
	const env = loadEnv(ConfigEnv.mode, process.cwd());
	// console.log('configEnv', configEnv)
	// console.log('env', env)
	return {
		plugins: [
			vue(), // Vue 插件
			vueSetupExtend(), // setup语法糖增强插件
			AutoImport({
				imports: ['vue', 'vue-router', 'pinia'], // 自动导入的依赖库数组
				resolvers: [
					ElementPlusResolver(),
					// 自动导入图标组件
					IconsResolver({
						prefix: 'Icon',
					}),
				],
				dts: './auto-imports.d.ts', // 自动导入类型定义文件路径
			}),
			Components({
				resolvers: [
					// 自动注册图标组件	使用方式 <i-ep-xxxx />
					IconsResolver({
						enabledCollections: ['ep'],
					}),
					// 自动导入 Element Plus 组件
					ElementPlusResolver(),
				],
				dts: './components.d.ts',
			}),
			Icons({
				autoInstall: true,
			}),
			Inspect(),
			createStyleImportPlugin({
				// resolves: [VxeTableResolve()], // 配置vxetable 按需加载
			}),
			topLevelAwait({
				promiseExportName: '__tla', // TLA Promise 变量名
				promiseImportName: (i) => `__tla_${i}`, // TLA Promise 导入名
			}),
			/* 打包压缩 */
			viteCompression({
				deleteOriginFile: true, // 压缩后删除原来的文件
				verbose: false, // 是否在控制台中输出压缩结果
				disable: false, // 开启压缩(不禁用)，默认即可
				threshold: 5120, // 压缩前最小文件大小
				algorithm: 'gzip', // 压缩算法，可选[‘gzip’，‘brotliCompress’，‘deflate’，‘deflateRaw’]
				ext: '.gz', // 生成的压缩包的后缀
				// compressionOptions: {},// 对应压缩算法的参数
				// filter: /\.(js|css|json|txt|ico|svg)(\?.*)?$/i, // 匹配需要压缩的文件
			}),
		],
		root: process.cwd(), // 项目根目录
		resolve: { alias }, // 路径别名配置
		base: ConfigEnv.command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
		optimizeDeps: {
			include: ['element-plus/es/locale/lang/zh-cn', 'element-plus/es/locale/lang/en'],
		},
		server: {
			/** 是否开启 HTTPS */
			https: false,
			/** 跨域设置允许 */
			cors: true,
			/** 端口被占用时，是否直接退出 */
			strictPort: false,
			/** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
			host: '127.0.0.1', // 服务器地址
			/** 端口号 */
			port: env.VITE_PORT as unknown as number, // 服务器端口
			/** 是否自动打开浏览器 */
			open: env.VITE_OPEN === 'true',
			/** 是否启用热更新 */
			hmr: true,
			/** 接口代理 */
			proxy: {
				'/api': {
					target: env.VITE_PROXY_PATH,
					changeOrigin: true,
					rewrite: (path: string) => path.replace(/^\/api/, ''),
				},
			},
		},
		build: {
			outDir: 'dist', // 打包输出目录
			chunkSizeWarningLimit: 1500, // 代码分包阈值
			rollupOptions: {
				output: {
					chunkFileNames: `static/[name].[hash].js`,
					entryFileNames: `static/[name].[hash].js`,
					assetFileNames: `static/[name].[hash].[ext]`,
					compact: true,
					manualChunks: {
						vue: ['vue', 'vue-router', 'pinia'],
						echarts: ['echarts'],
					},
				},
			},
		},
		/** 混淆器 */
		esbuild: {
			/** 打包时移除 console.log */
			// pure: ['console.log'],
			/** 打包时移除 debugger */
			drop: ['debugger'],
			/** 打包时移除所有注释 */
			legalComments: 'none',
		},
		css: { preprocessorOptions: { css: { charset: false } } },
		define: {
			__VUE_I18N_LEGACY_API__: JSON.stringify(false),
			__VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
			__INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
			__VERSION__: JSON.stringify(process.env.npm_package_version),
			__PROJECT_NAME__: JSON.stringify(process.env.npm_package_name),
		},
	};
});
export default viteConfig;
