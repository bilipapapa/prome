/* --------------核心----------------- */
import { createApp } from 'vue'
import App from './App.vue'

/* --------------状态管理和路由----------------- */
import pinia from '@/store'
import router from '@/router'

/* --------------样式----------------- */
import 'element-plus/dist/index.css'
/* vxe-table样式 */
import 'vxe-pc-ui/lib/style.css'
import 'vxe-table/lib/style.css'
import '@vxe-ui/plugin-render-element/dist/style.css'	// 该插件提供了在表格中渲染第三方组件，用于兼容 element-plus 组件库
/* 全局样式 */
import '@/styles/index.scss'
/* 插件样式 */
import 'highlight.js/lib/common'
import 'vue-cropper/dist/index.css'

/* --------------创建应用----------------- */
const app = createApp(App)

/* --------------UI框架----------------- */
/* element-plus */
import ElementPlus from 'element-plus'
/* vxe UI 组件库 */
import VxeUI from 'vxe-pc-ui'

/* --------------注册自定义指令----------------- */
import { directive } from '@/directive'
directive(app)

/* --------------其他插件----------------- */
/* 国际化 */
import { i18n } from '@/i18n'
/* 图片裁切 */
import Cropper from 'vue-cropper'
/* 代码高亮 */
import hljsVuePlugin from '@highlightjs/vue-plugin'
/* vxe-表格库 */
import VxeUITable from 'vxe-table'
/* 该插件提供了在表格中渲染第三方组件，用于兼容 element-plus 组件库 */
import VxeUIPluginRenderElement from '@vxe-ui/plugin-render-element'
VxeUI.use(VxeUIPluginRenderElement)
// @visactor/vue-vtable
import * as VueVTable from '@visactor/vue-vtable'

/* --------------其他配置----------------- */
/* 自定义配置 */
import '@/config'
/* Mock */
import '@/mocks'

/* --------------全局组件----------------- */
/* 注册vue-vtable全局组件 */
app.component('ListTable', VueVTable.ListTable)
app.component('ListColumn', VueVTable.ListColumn)

/* --------------挂载----------------- */
app.use(pinia)
	.use(router)
	.use(i18n)
	.use(ElementPlus)
	.use(VxeUI)
	.use(VxeUITable)
	.use(hljsVuePlugin)
	.use(Cropper)
	.mount('#app')