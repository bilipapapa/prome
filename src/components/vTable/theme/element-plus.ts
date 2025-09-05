const borderColor = '#ebeef5'
const rowHoverColor = '#f5f7fa'
const fontFamily = 'Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif'

function getBackgroundColor(args): string {
	const { row, table } = args
	// if (row < table.frozenRowCount) {
	//   return "#FFF";
	// }
	const index = row - table.frozenRowCount
	if (!(index & 1)) {
		return '#FAF9FB'
	}
	return '#FDFDFD'
}

const theme = {
	name: 'element-plus',
	//默认样式，如bodyStyle或者headerStyle未设置某项配置则从这里获取相应样式
	defaultStyle: {
		color: '#1B1F23',
		bgColor: '#ffffff',
		font: '500 12px PingFang SC',
		lineHeight: 16,
		borderColor: borderColor,
		padding: [0, 0, 0, 0]
	},
	// 列表头
	headerStyle: {
		color: '#909399',
		bgColor: '#ffffff',
		fontSize: 14,
		fontFamily: fontFamily,
		fontWeight: '700',
		textAlign: 'center',
		lineHeight: 16,
		borderColor: borderColor,
		padding: [8, 12, 8, 12],
		hover: {
			//hover状态单元格样式
			cellBgColor: 'transparent'
		},
		click: {
			//click状态单元格样式
			cellBgColor: '#c8daf6',
			cellBorderColor: ['#e1e4e8', '#e1e4e8', '#3073f2', '#e1e4e8'],
			cellBorderLineWidth: [0, 1, 3, 1]
		}
	},
	// 行表头
	rowHeaderStyle: {},
	// 角表头
	cornerHeaderStyle: {},
	// 表身
	bodyStyle: {
		padding: [0, 0, 0, 0],
		color: '#000000',
		fontSize: 14,
		fontFamily: fontFamily,
		fontWeight: '400',
		textAlign: 'center',
		bgColor: '#ffffff',
		borderColor: '#e1e4e8',
		lineHeight: 18,
		hover: {
			cellBgColor: rowHoverColor,
			inlineRowBgColor: rowHoverColor,
			inlineColumnBgColor: rowHoverColor
		},
		click: {
			cellBgColor: '#d6e6fe',
			cellBorderLineWidth: 1,
			inlineColumnBgColor: '#CCE0FF',
			cellBorderColor: '#3073f2'
		}
	},
	//表格外边框样式
	frameStyle: {
		borderColor: borderColor,
		borderLineWidth: null,
		borderLineDash: [],
		cornerRadius: 0,
		shadowBlur: 0,
		shadowOffsetX: 0,
		shadowOffsetY: 0,
		shadowColor: 'transparent',
	},
	//拖拽列宽分割线样式
	columnResize: {
		lineWidth: 1,
		lineColor: '#416EFF',
		bgColor: '#D9E2FF',
		width: 3
	},
	//冻结列分割线样式
	frozenColumnLine: {
		shadow: {
			width: 4,
			startColor: 'rgba(00, 24, 47, 0.05)',
			endColor: 'rgba(00, 24, 47, 0)',
			visible: 'scrolling'
		}
	},
	//菜单样式
	menuStyle: {
		color: '#000',
		highlightColor: '#2E68CF',
		font: '12px sans-serif',
		highlightFont: '12px sans-serif',
		hoverBgColor: '#EEE'
	},
	// 滚动条
	scrollStyle: {
		width: '7',	//滚动条宽度
		scrollRailColor: 'transparent',	//滚动条轨道的颜色。
		scrollSliderColor: 'rgba(144,147,153,0.3)', //配置滚动条滑块的颜色。
		visible: 'focus',	// 配置滚动条是否可见，可配值：'always' | 'scrolling' | 'none' | 'focus'，分别对应：常驻显示|滚动时显示|显示|聚焦在画布上时。默认为‘scrolling’。
	},
	// 单元格选中样式
	selectionStyle: {
		cellBorderLineWidth: 1,
		cellBorderColor: 'transparent',
		cellBgColor: 'transparent',
	}
}
const hover = {
	highlightMode: 'row'
}
const others = {
	resize: {
		columnResizeMode: 'header'
	},
	// widthMode: 'adaptive',	// standard（标准模式）、adaptive（自适应容器宽度模式）或 autoWidth（自动列宽模式）
	autoFillWidth: true,
	tooltip: {
		renderMode: 'html'
	}
}

export default {
	theme,
	hover,
	...others
}

