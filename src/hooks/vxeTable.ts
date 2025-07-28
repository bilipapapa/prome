import { ElMessage } from 'element-plus';
import tools from '@/utils/tools';

export function useVxeTable(options?: VxeGridOptions) {
	const initOptions: VxeHookProps = {
		// 列表数据是否正在加载中，默认为false
		dataListLoading: false,
		// 是否需要自动请求创建接口来获取表格数据，默认为true
		immediate: true,
		// 是否展示分页组件，默认为true
		isPage: true,
		// 查询表单对象，用于提交条件查询时的参数传递，默认为空对象
		queryForm: {},
		// 分页组件属性配置，默认值为 {pageNum:1, pageSize:10,total:0,pageSizes:[10, 20, 50, 100, 200],layout:'total, sizes, prev, pager, next, jumper'}
		pagination: {
			pageNum: 1,
			pageSize: 10,
			total: 0,
			pageSizes: [10, 20, 50, 100, 200],
			layout: 'total, sizes, prev, pager, next, jumper',
		} as Pagination,
		// 当前选中的数据项，默认为空数组
		dataListSelections: [],
		// 当前选中的表格行数据，默认为空对象
		currentRow: null,
		// 当前勾选的表格行数据列表，默认为空数组
		selectRows: [],
		// 排序时使用的字段名数组，如 ['id','name']，默认为空数组
		descs: [],
		// 排序方向数组，如 ['asc', 'desc']，默认为空数组
		ascs: [],
		// props属性配置对象，用于自定义数据属性，默认值为 { data:'records', total:'total' }
		props: {
			data: 'data',
			total: 'total',
		},
	};

	// 初始化state
	const state = tools.mergeObj(options, initOptions);

	/**
	 * 发起分页查询，并设置表格数据和分页信息
	 */
	const query = () => {
		return new Promise(async (resolve, reject) => {
			// 判断是否存在state.api属性
			if (state.api) {
				try {
					// 开始加载数据，设置state.loading为true
					state.loading = true;
					// 调用state.api方法发起分页查询
					const res = await state.api({
						...state.queryForm,
						pageNum: state.pagination?.pageNum,
						pageSize: state.pagination?.pageSize,
						descs: state.descs?.join(','),
						ascs: state.ascs?.join(','),
					});

					// 设置表格展示的数据数组
					state.data = state.isPage ? res[state.props.data] : res.data;
					// 设置分页信息中的总数据条数
					state.pagination!.total = state.isPage ? res[state.props.total] || 0 : 0;
					resolve(res);
				} catch (err: any) {
					// 捕获异常并显示错误提示
					ElMessage.error(err.msg || err.data.msg);
					reject(err);
				} finally {
					// 结束加载数据，设置state.loading为false
					state.loading = false;
				}
			} else {
				resolve(false);
			}
		});
	};

	onMounted(() => {
		if (state.immediate) {
			query();
		}
	});

	/**
	 * 分页大小改变事件处理函数
	 * @param val 新的分页大小
	 */
	const sizeChangeHandle = (val: number) => {
		// 修改state.pagination中的size属性
		state.pagination!.pageSize = val;
		// 再次发起查询操作
		query();
	};

	/**
	 * 当前页码改变事件处理函数
	 * @param val 新的页码
	 */
	const currentChangeHandle = (val: number) => {
		// 修改state.pagination中的current属性
		state.pagination!.pageNum = val;
		// 再次发起查询操作
		query();
	};

	// 排序触发事件
	const sortChangeHandle = (column: any) => {
		const prop = column.prop;
		if (column.order === 'descending') {
			state.descs?.push(prop);
			if (state.ascs!.indexOf(prop) >= 0) {
				state.ascs?.splice(state.ascs.indexOf(prop), 1);
			}
		} else if (column.order === 'ascending') {
			state.ascs?.push(prop);
			if (state.descs!.indexOf(prop) >= 0) {
				state.descs?.splice(state.descs.indexOf(prop), 1);
			}
		} else {
			if (state.ascs!.indexOf(prop) >= 0) {
				state.ascs?.splice(state.ascs.indexOf(prop), 1);
			}
			if (state.descs!.indexOf(prop) >= 0) {
				state.descs?.splice(state.descs.indexOf(prop), 1);
			}
		}
		query();
	};

	/**
	 * 获取数据列表，并可选择是否刷新当前页码
	 * 刷新后不跳转第一页，则入参 getData(false)
	 * @param refresh 是否刷新当前页码
	 */
	const getData = (refresh?: any) => {
		// 如果需要刷新，则将state.pagination.current重置为1
		if (refresh !== false) {
			state.pagination!.pageNum = 1;
		}
		// 再次发起查询操作
		return query();
	};

	return {
		getData,
		sizeChangeHandle,
		currentChangeHandle,
		sortChangeHandle,
	};
}
