import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';

export const useRouteStore = defineStore({
	id: 'route',
	state: (): RouteState => ({
		routeList: [],
	}),
	actions: {
		setRouteList(routes: Array<RouteRecordRaw>) {
			this.routeList = routes;
		},
	},
});
