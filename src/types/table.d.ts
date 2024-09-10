/**
 * @description 分页接口参数 & 分页组件props
 */
declare type Pagination = {
	// 当前页码，默认为1	接口参数
	pageNum?: number;
	// 每页显示条数，默认为10 	接口参数
	pageSize?: number;
	// 总条数，默认为0		接口参数
	total?: number;
	// 每页显示条数选择器的选项数组，默认为[10,20,30,40]
	pageSizes?: any[];
	// 分页组件布局方式，可选值有 total,sizes,prev,jump,next，默认为'total,sizes,prev,jump,next'
	layout?: String;
};

/* --------------vxe-table-------------- */
/**
 * @description vxe-table使用hook后的options
 */
declare type VxeGridOptions = VxeHookProps & VxeGridProps;

/**
 * @description vxe-table hook: 初始化options属性
 */
declare type VxeHookProps = {
	/**
	 * 是否在创建页面时即调用数据列表接口，默认为true
	 */
	createdIsNeed?: boolean;
	/**
	 * 是否需要分页，默认为true
	 */
	isPage?: boolean;
	/**
	 * 查询条件表单对象，类型为any
	 */
	queryForm?: any;
	/**
	 * 分页属性对象
	 */
	pagination?: Pagination;
	/**
	 * 数据列表，loading状态标志，默认为false
	 */
	dataListLoading?: boolean;
	/**
	 * 数据列表多选项数组
	 */
	dataListSelections?: any[];
	/**
	 * 数据列表查询接口api方法，接收任意数量参数，返回Promise
	 */
	api?: (...arg: any) => Promise<any>;
	/**
	 * 当前选择的行数据对象
	 */
	currentRow?: Obj | null;
	/**
	 * 勾选的表格行数据
	 */
	selectRows?: Obj[];
	/**
	 * 排序字段数组
	 */
	descs?: string[];
	/**
	 * 排序方式数组
	 */
	ascs?: string[];
	/**
	 * props属性对象，类型为any
	 */
	props?: any;
};

/* --------------element-table-------------- */
/**
 * @description element-table hook: 初始化options属性
 */
declare type eleHookProps = {
	// 是否在创建页面时即调用数据列表接口，默认为true
	createdIsNeed?: boolean;
	// 是否需要分页，默认为true
	isPage?: boolean;
	// 查询条件表单对象，类型为any
	queryForm?: any;
	// 数据列表数组
	dataList?: any[];
	// 分页属性对象
	pagination?: Pagination;
	// 数据列表，loading状态标志，默认为false
	dataListLoading?: boolean;
	// 数据列表多选项数组
	dataListSelections?: any[];
	// 数据列表查询接口api方法，接收任意数量参数，返回Promise
	api?: (...arg: any) => Promise<any>;
	// loading标志，默认为false
	loading?: Boolean;
	// 多选结果数组
	selectRows?: any[];
	// 排序字段数组
	descs?: string[];
	// 排序方式数组
	ascs?: string[];
	// props属性对象，类型为any
	props?: any;
};
