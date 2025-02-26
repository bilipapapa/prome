import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import pinia from '@/store';
import { i18n } from '@/i18n';
import { directive } from '@/directive';

const app = createApp(App);

// 全局样式
import '@/styles/index.scss';
// 配置
import '@/config';

// emelent-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// vxe-table
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

// @visactor/vue-vtable
import * as VueVTable from '@visactor/vue-vtable';
// 注册vue-vtable全局组件
app.component('ListTable', VueVTable.ListTable);
app.component('ListColumn', VueVTable.ListColumn);

// highlight.js 下面两个都要安装
import 'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin';
app.use(hljsVuePlugin);

// Mock
import '@/mocks';

// 注册自定义指令
directive(app);

app.use(pinia).use(router).use(ElementPlus).use(VxeUI).use(VxeUITable).use(i18n).mount('#app');
