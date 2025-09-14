// worker.js
onmessage = function (e) {
  const chunk = e.data;  // 获取从主线程传来的数据块（ArrayBuffer）
  // 处理 ArrayBuffer 数据
  const processedData = new Int32Array(chunk)
  postMessage(processedData, [processedData.buffer]);  // 使用 Transferable Objects 传递内存块
};
