import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// 创建
const pinia = createPinia();

// pinia.use(piniaPluginPersistedstate);
const persist = createPersistedState({
	storage: localStorage,
	// @ts-ignore
	key: (id) => `${__PROJECT_NAME__}:${id}`,
	// 可选项，处理存储值的方法，默认为JSON.stringify和JSON.parse
	serializer: {
		serialize: (data) => JSON.stringify(data),
		deserialize: (data) => JSON.parse(data),
	},
});
pinia.use(persist);

// 导出
export default pinia;

let files: Record<string, Function> = import.meta.glob('./*.ts', { eager: true });
const modules: Record<string, Function> = {};
for (let path in files) {
	for (let key in files[path]) {
		modules[key] = files[path][key];
	}
}
export const useStore = () => modules;
