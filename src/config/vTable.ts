import { VTable } from "@visactor/vue-vtable"

// 默认主题配置
export const lightTheme: any = {
	defaultStyle: {
		fontFamily: "SimHei",
	},
	headerStyle: {
		color: "rgba(24, 29, 31, 0.6)",
		bgColor: "#FAFAFB",
		fontSize: 14,
		textAlign: "center",
		borderColor: "#e8e8e8",
		hover: {
			cellBgColor: "#FAFAFB",
		},
	},
	bodyStyle: {
		color: "#181d1f",
		fontSize: 14,
		hover: {
			// cellBgColor: '#E4F2FD',
			inlineRowBgColor: "#E4F2FD",
		},
		cursor: "pointer",
		bgColor({ row }) {
			if (row % 2 === 0) {
				return "transparent"
			}
			return "#FAFAFB"
		},
	},
}

// 表格基础配置
export const getBaseOption = () => ({
	widthMode: "standard",
	// menu: {
	// 	contextMenuItems: ["在上方插入行", "在下方插入行", '删除行']
	// },
	theme: VTable.themes.DEFAULT.extends(lightTheme).extends({
		scrollStyle: {
			visible: "always",
			scrollSliderColor: "#ccc",
			scrollRailColor: "#fff",
			hoverOn: false,
		},
	}),
	defaultRowHeight: 28,
	defaultHeaderRowHeight: 28,
	bordered: true,
	hover: {
		highlightMode: "row",
	},
	customConfig: {
		createReactContainer: true,
	},
	emptyTip: {
		text: "暂无数据",
	},
	hierarchyExpandLevel: "Infinity",
	keyboardOptions: {
		moveEditCellOnArrowKeys: true,
		copySelected: true,
		pasteValueToCell: true,
	},
	editCellTrigger: "click",
	ScrollAnimationOption: true,
})

// 获取带序号配置的基础配置
export const getBaseOptionWithSeriesNumber = () => {
	const baseOption: any = getBaseOption()
	baseOption.rowSeriesNumber = {
		title: "序号",
		width: "auto",
		headerStyle: {},
		style: {
			textAlign: "center",
		},
	}
	return baseOption
}
