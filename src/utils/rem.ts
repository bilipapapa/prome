// (function init(screenRatioByDesign = 16 / 9) {
//     let docEle = document.documentElement

//     function setHtmlFontSize() {
//         var screenRatio = docEle.clientWidth / docEle.clientHeight;
//         var fontSize = (
//             screenRatio > screenRatioByDesign ?
//             (screenRatioByDesign / screenRatio) :
//             1
//         ) * docEle.clientWidth / 50;
//         docEle.style.fontSize = fontSize.toFixed(3) + "px";
//         console.log(docEle.style.fontSize);
//     }
//     setHtmlFontSize()
//     window.addEventListener('resize', setHtmlFontSize)
// })()

// 自执行部分
(function flexible(window, document) {
  initFlexible(window, document)
}(typeof window !== 'undefined' ? window : {}, typeof document !== 'undefined' ? document : {}))

// 可导出函数
export function initFlexible(window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  function setRemUnit() {
    var rem = docEl.clientWidth / 24
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}

// 默认导出
export default initFlexible
