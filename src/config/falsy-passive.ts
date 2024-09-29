// 去除控制台警告：[Violation] Added non-passive event listener to a scroll-blocking 'wheel' event. Consider marking event handler as 'passive' to make the page more responsive.
(function () {
	if (typeof EventTarget !== 'undefined') {
		let func = EventTarget.prototype.addEventListener;
		EventTarget.prototype.addEventListener = function (type, fn, capture) {
			(this as any).func = func;
			if (typeof capture !== 'boolean') {
				capture = capture || {};
				capture.passive = false;
			}
			(this as any).func(type, fn, capture);
		};
	}
})();
