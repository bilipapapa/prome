import { VxeUI } from 'vxe-table';

/**
 * vxe-table 全局配置
 */
VxeUI.setConfig({
	size: null, // 全局尺寸
	// zIndex: 999, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡；新版本可以使用 dom-zindex 共享配置
	// version: 1, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
	emptyCell: '　',

	table: {
		showHeader: true,
		autoResize: true,
		minHeight: 144,
		border: 'full',
		align: 'center',
		// keepSource: false,
		// showOverflow: null,
		// showHeaderOverflow: null,
		// showFooterOverflow: null,
		// resizeInterval: 500,
		// size: null,
		// zIndex: null,
		// stripe: false,
		// round: false,
		// emptyText: '暂无数据',
		// emptyRender: {
		//   name: ''
		// },
		rowConfig: {
			keyField: '_X_ROW_KEY', // 行数据的唯一主键字段名，必须设置，随时都可能会被改变
		},
		columnConfig: {
			resizable: true,
		},
		resizeConfig: {
			refreshDelay: 250,
		},
		radioConfig: {
			// trigger: 'default'
			strict: true,
		},
		checkboxConfig: {
			// trigger: 'default',
			strict: true,
			isShiftKey: true,
		},
		tooltipConfig: {
			enterable: true,
		},
		validConfig: {
			showMessage: true,
			autoClear: true,
			autoPos: true,
			message: 'inline',
			msgMode: 'single',
		},
		// menuConfig: {
		//   visibleMethod () {}
		// },
		customConfig: {
			allowVisible: true,
			allowResizable: true,
			allowFixed: true,
			allowSort: true,
			showFooter: true,
			placement: 'top-right',
			//  storage: false,
			//  checkMethod () {},
			modalOptions: {
				showMaximize: true,
				mask: true,
				lockView: true,
				resize: true,
				escClosable: true,
			},
		},
		sortConfig: {
			// remote: false,
			// trigger: 'default',
			// orders: ['asc', 'desc', null],
			// sortMethod: null,
			showIcon: true,
			iconLayout: 'vertical',
		},
		filterConfig: {
			// remote: false,
			// filterMethod: null,
			showIcon: true,
		},
		treeConfig: {
			rowField: 'id',
			parentField: 'parentId',
			childrenField: 'children',
			hasChildField: 'hasChild',
			mapChildrenField: '_X_ROW_CHILD',
			indent: 20,
			showIcon: true,
		},
		expandConfig: {
			// trigger: 'default',
			showIcon: true,
		},
		editConfig: {
			mode: 'cell',
			showIcon: true,
			showAsterisk: true,
		},
		importConfig: {
			_typeMaps: {
				csv: 1,
				html: 1,
				xml: 1,
				txt: 1,
			},
		},
		exportConfig: {
			_typeMaps: {
				csv: 1,
				html: 1,
				xml: 1,
				txt: 1,
			},
		},
		printConfig: {},
		mouseConfig: {
			extension: true,
		},
		keyboardConfig: {
			isArrow: true,
			isEsc: true,
			isEnter: true,
		},
		areaConfig: {
			autoClear: true,
			selectCellByHeader: true,
		},
		clipConfig: {
			isCopy: true,
			isCut: true,
			isPaste: true,
		},
		fnrConfig: {
			isFind: true,
			isReplace: true,
		},
		scrollX: {
			// enabled: false,
			gt: 60,
			// oSize: 0
		},
		scrollY: {
			// enabled: false,
			gt: 100,
			// oSize: 0
		},
	},
	// export: {
	//   types: {}
	// },
	grid: {
		// size: null,
		// zoomConfig: {
		//   escRestore: true
		// },
		formConfig: {
			enabled: true,
		},
		pagerConfig: {
			enabled: true,
			// perfect: false
		},
		toolbarConfig: {
			enabled: true,
			// perfect: false
		},
		proxyConfig: {
			enabled: true,
			autoLoad: true,
			message: true,
			props: {
				list: null,
				result: 'result',
				total: 'page.total',
				message: 'message',
			},
			// beforeItem: null,
			// beforeColumn: null,
			// beforeQuery: null,
			// afterQuery: null,
			// beforeDelete: null,
			// afterDelete: null,
			// beforeSave: null,
			// afterSave: null
		},
	},
	toolbar: {
		// size: null,
		// import: {
		//   mode: 'covering'
		// },
		// export: {
		//   types: ['csv', 'html', 'xml', 'txt']
		// },
		// buttons: []
	},
});

/**
 * vxe-table 全局图标配置
 */
VxeUI.setIcon({
	// table
	TABLE_SORT_ASC: 'vxe-icon-caret-up',
	TABLE_SORT_DESC: 'vxe-icon-caret-down',
	TABLE_FILTER_NONE: 'vxe-icon-funnel',
	TABLE_FILTER_MATCH: 'vxe-icon-funnel',
	TABLE_EDIT: 'vxe-icon-edit',
	TABLE_TREE_LOADED: 'vxe-icon-spinner roll',
	TABLE_TREE_OPEN: 'vxe-icon-caret-right rotate90',
	TABLE_TREE_CLOSE: 'vxe-icon-caret-right',
	TABLE_EXPAND_LOADED: 'vxe-icon-spinner roll',
	TABLE_EXPAND_OPEN: 'vxe-icon-arrow-right rotate90',
	TABLE_EXPAND_CLOSE: 'vxe-icon-arrow-right',
	TABLE_CHECKBOX_CHECKED: 'vxe-icon-checkbox-checked',
	TABLE_CHECKBOX_UNCHECKED: 'vxe-icon-checkbox-unchecked',
	TABLE_CHECKBOX_INDETERMINATE: 'vxe-icon-checkbox-indeterminate',
	TABLE_RADIO_CHECKED: 'vxe-icon-radio-checked',
	TABLE_RADIO_UNCHECKED: 'vxe-icon-radio-unchecked',

	// toolbar
	TOOLBAR_TOOLS_REFRESH: 'vxe-icon-repeat',
	TOOLBAR_TOOLS_REFRESH_LOADING: 'vxe-icon-repeat roll',
	TOOLBAR_TOOLS_IMPORT: 'vxe-icon-upload',
	TOOLBAR_TOOLS_EXPORT: 'vxe-icon-download',
	TOOLBAR_TOOLS_PRINT: 'vxe-icon-print',
	TOOLBAR_TOOLS_FULLSCREEN: 'vxe-icon-fullscreen',
	TOOLBAR_TOOLS_MINIMIZE: 'vxe-icon-minimize',
	TOOLBAR_TOOLS_CUSTOM: 'vxe-icon-custom-column',
	TOOLBAR_TOOLS_FIXED_LEFT: 'vxe-icon-fixed-left',
	TOOLBAR_TOOLS_FIXED_RIGHT: 'vxe-icon-fixed-right',
});

/**
 * vxe-table 全局主题配置
 */
// 切换为默认主题
VxeUI.setTheme('light');
// 切换为暗黑主题
// VxeUI.setTheme('dark');
