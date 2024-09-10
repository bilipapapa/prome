import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';

// 创建
const pinia = createPinia();
pinia.use(piniaPluginPersist);

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
