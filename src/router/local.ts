import { RouteRecordRaw } from 'vue-router';
import { getViewsModule, router, flatRoute } from '@/router';
import { rootRoute, errorRoute, staticRoute } from '@/router/route';
import { useStore } from '@/store';

const { useRouteStore, useMenuStore, useAppStore } = useStore();

/**
 * @description 初始化静态路由
 */
export function localRouteInit() {}
