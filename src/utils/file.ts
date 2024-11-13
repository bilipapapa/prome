import { ElMessage } from 'element-plus';

/**
 * blob 文件流处理
 * @param response 响应结果
 * @returns
 */
export function handleBlobFile(response: any, fileName?: string) {
	// 处理返回的文件流
	const blob = response.data;
	if (blob && blob.size === 0) return ElMessage.error('内容为空，无法下载');
	const link = document.createElement('a');

	// 兼容一下 入参不是 File Blob 类型情况
	var binaryData = [] as any;
	binaryData.push(response.data);
	link.href = window.URL.createObjectURL(new Blob(binaryData));
	let headerFileName: string = '';
	if (!fileName && response.headers['content-disposition']) {
		headerFileName = response.headers['content-disposition'].match(/filename=(.*)/)[1] || 'fileName';
	}
	link.download = fileName || decodeURIComponent(headerFileName);
	document.body.appendChild(link);
	link.click();
	window.setTimeout(function () {
		// @ts-ignore
		URL.revokeObjectURL(blob);
		document.body.removeChild(link);
	}, 0);
}
