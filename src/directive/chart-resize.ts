// 屏幕变化后，图表自动调整
import * as ECharts from "echarts"
import elementResizeDetectorMaker from "element-resize-detector"
import type { App } from 'vue'

const HANDLER = "_vue_resize_handler"

const chartResize = {
  mounted(el, binding) {
    // 处理逻辑
    el[HANDLER] = binding.value
      ? binding.value
      : () => {
        let chart = ECharts.getInstanceByDom(el)
        if (!chart) {
          return
        }
        chart.resize()
      }
    // 监听绑定的 div 大小变化，更新 ECharts 大小
    elementResizeDetectorMaker().listenTo(el, el[HANDLER])
  },
  unmounted(el) {
    // 移除监听
    elementResizeDetectorMaker().removeListener(el, el[HANDLER])
    delete el[HANDLER]
  },
}

function chartResizeDirective(app: App) {
  app.directive("chart-resize", chartResize)
}

export default chartResizeDirective