import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';

export const useRouteStore = defineStore('route', {
	state: (): RouteState => ({
		routeList: [],
	}),
	actions: {
		setRouteList(routes: Array<RouteRecordRaw>) {
			this.routeList = routes;
		},
	},
});
