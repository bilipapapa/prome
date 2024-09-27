import * as XLSX from 'xlsx';

/**
 * @desc 导出excel
 * @param {*} json	导出的数据（需要将json数据的键名更换成导出时需要的键名） egg: [{name: 'xxx'}] => [{姓名: 'xxx'}]
 * @param {*} fileName	导出文件名
 * @来源 https://segmentfault.com/a/1190000017999232
 */

export default function excelDownload(json, fileName) {
	const type = 'xlsx'; //定义导出文件的格式
	var tmpDown; //导出的内容
	var tmpdata = json[0];
	json.unshift({});
	var keyMap = []; //获取keys
	for (var k in tmpdata) {
		keyMap.push(k);
		json[0][k] = k;
	}
	var tmpdata = []; //用来保存转换好的json

	json
		.map((v, i) =>
			keyMap.map((k, j) =>
				Object.assign(
					{},
					{
						v: v[k],
						position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1),
					}
				)
			)
		)
		.reduce((prev, next) => prev.concat(next))
		.forEach(
			(v, i) =>
				(tmpdata[v.position] = {
					v: v.v,
				})
		);
	var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
	var tmpWB = {
		SheetNames: ['mySheet'], //保存的表标题
		Sheets: {
			mySheet: Object.assign(
				{},
				tmpdata, //内容
				{
					'!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1], //设置填充区域
				}
			),
		},
	};
	tmpDown = new Blob(
		[
			s2ab(
				XLSX.write(
					tmpWB,
					{ bookType: type == undefined ? 'xlsx' : type, bookSST: false, type: 'binary' } //这里的数据是用来定义导出的格式类型
				)
			),
		],
		{
			type: '',
		}
	); //创建二进制对象写入转换好的字节流
	saveAs(tmpDown, fileName);
}

function saveAs(obj, fileName) {
	//导出功能实现
	var tmpa = document.createElement('a');
	tmpa.download = fileName || '下载';
	tmpa.href = URL.createObjectURL(obj); //绑定a标签
	tmpa.click(); //模拟点击实现下载
	setTimeout(function () {
		//延时释放
		URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
	}, 100);
}

function s2ab(s) {
	//字符串转字符流
	var buf = new ArrayBuffer(s.length);
	var view = new Uint8Array(buf);
	for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
	return buf;
}

function getCharCol(n) {
	let temCol = '',
		s = '',
		m = 0;
	while (n > 0) {
		m = (n % 26) + 1;
		s = String.fromCharCode(m + 64) + s;
		n = (n - m) / 26;
	}
	return s;
}
