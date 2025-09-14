// @ts-check
// Worker script as ES module
self.onmessage = (e) => {
  const tree = e.data;
  const encoder = new TextEncoder();
  const chunks: string[] = [];

  // 流式序列化
  const stream = new ReadableStream({
    start(controller) {
      try {
        const json = JSON.stringify(tree); // 分片处理
        const chunkSize = 1024 * 1024; // 1MB 块
        for (let i = 0; i < json.length; i += chunkSize) {
          controller.enqueue(encoder.encode(json.slice(i, i + chunkSize)));
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  const reader = stream.getReader();
  reader.read().then(function process({ done, value }) {
    if (done) {
      self.postMessage(chunks.join(''));
      return;
    }
    chunks.push(new TextDecoder().decode(value));
    return reader.read().then(process);
  }).catch((err) => {
    self.postMessage({ error: err.message });
  });
};