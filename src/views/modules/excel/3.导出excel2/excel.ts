import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { formatDate } from '@/utils/time';
import { cloneDeep } from 'lodash-es'

import { ElMessage } from 'element-plus';

export function saveJsonToExcel(rawData, filename, columns) {
	if (!rawData.length) return ElMessage.warning('数据为空，无法导出！');
	let data = rawData;
	if (columns && columns.length) {
		data = cloneDeep(rawData).map((el) =>
			columns.reduce((acc, col) => {
				acc[col.label] = el[col.prop || col.field];
				return acc;
			}, {})
		);
	}
	let sheet: any = XLSX.utils.json_to_sheet(data, { raw: true } as any);
	let colWidths: any = [],
		colNames = Object.keys(data[0]); // 所有列的名称数组

	// 计算每一列的所有单元格宽度
	// 先遍历行
	data &&
		data.forEach((row) => {
			// 列序号
			let index = 0;
			// 遍历列
			for (const key in row) {
				if (colWidths[index] == null) colWidths[index] = [];

				switch (typeof row[key]) {
					case 'string':
					case 'number':
					case 'boolean':
						colWidths[index].push(getCellWidth(row[key]));
						break;
					case 'object':
					case 'function':
						colWidths[index].push(0);
						break;
				}
				index++;
			}
		});

	sheet['!cols'] = [];
	// 每一列取最大值最为列宽
	colWidths.forEach((widths, index) => {
		// 计算列头的宽度
		widths.push(getCellWidth(colNames[index]));
		// 设置最大值为列宽
		sheet['!cols'].push({ wch: Math.max(...widths) });
	});

	let workbook = {
		SheetNames: ['sheet1'],
		Sheets: {
			sheet1: sheet,
		},
	};

	let wbout = XLSX.write(workbook, {
		bookType: 'xlsx',
		bookSST: true,
		type: 'array',
	});

	FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), filename + formatDate(new Date(), 'YYYYMMDDHHmmss') + '.xlsx');

	function getCellWidth(value) {
		// 判断是否为null或undefined
		if (value == null) {
			return 10;
		} else if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
			// 中文的长度
			const chineseLength = value.match(/[\u4e00-\u9fa5]/g).length;
			// 其他不是中文的长度
			const otherLength = value.length - chineseLength;
			return chineseLength * 2.1 + otherLength * 1.1;
		} else {
			return value.toString().length * 1.1;
			/* 另一种方案
			value = value.toString()
			return value.replace(/[\u0391-\uFFE5]/g, 'aa').length
			*/
		}
	}
}
