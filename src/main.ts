import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import pinia from '@/store';
import { i18n } from '@/i18n';
import { directive } from '@/directive';

// 全局样式
import '@/styles/index.scss';
// 依赖配置
import './config';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// 完整导入 UI 组件库
import VxeUI from 'vxe-pc-ui';
import 'vxe-pc-ui/lib/style.css';

// 完整导入 表格库
import VxeUITable from 'vxe-table';
import 'vxe-table/lib/style.css';

// 该插件提供了在表格中渲染第三方组件，用于兼容 element-plus 组件库
import VxeUIPluginRenderElement from '@vxe-ui/plugin-render-element';
import '@vxe-ui/plugin-render-element/dist/style.css';
VxeUI.use(VxeUIPluginRenderElement);

// Mock
import '@/mocks';

let app = createApp(App);

// 注册自定义指令
directive(app);

app.use(pinia).use(router).use(ElementPlus).use(VxeUI).use(VxeUITable).use(i18n).mount('#app');
