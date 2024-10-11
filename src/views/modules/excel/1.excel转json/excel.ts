import * as XLSX from 'xlsx';

export function readExcelToJson(file: File, options?: { raw: false }) {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = (e: any) => {
			let data = new Uint8Array(e.target.result);
			let workbook = XLSX.read(data, { type: 'array' });
			//将Excel 第一个sheet内容转为json格式
			let worksheet = workbook.Sheets[workbook.SheetNames[0]];
			let json = XLSX.utils.sheet_to_json(worksheet, options);

			// 将Excel 所有sheet内容转为json格式
			// const json = {};
			// workbook.SheetNames.forEach((sheetName) => {
			// 	const worksheet = workbook.Sheets[sheetName];
			// 	json[sheetName] = XLSX.utils.sheet_to_json(worksheet, options);
			// });
			resolve(json);
		};

		reader.readAsArrayBuffer(file);
	});
}
