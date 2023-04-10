// 18fontsize = (18/100)rem
(function (doc, win) {
  const docEl = doc.documentElement
  const head = docEl.getElementsByTagName('head')[0]
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const metaEl = doc.createElement('meta')
  metaEl.name = 'viewport'
  metaEl.content = 'initial-scale=1,maximum-scale=1, minimum-scale=1'
  head.appendChild(metaEl)
  const recalc = function () {
    // 增加判断PC/and/ios
    const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    const isAndroid = navigator.userAgent.includes('Android') || navigator.userAgent.includes('Linux') // g
    // 1rem =100px
    let width = docEl.clientWidth
    if (isAndroid || isIOS) {
      docEl.style.fontSize = `${Math.floor((100 * (width / 750)) * 2)}px`
    } else {
      if (width < 1920) {
        width = 1920
        docEl.style.minWidth = '1440px'
        docEl.style.minHeight = '800px'
      }
      docEl.style.fontSize = `${100 * (width / 1920)}px`
    }
  }
  recalc()
  if (!doc.addEventListener) { return }
  win.addEventListener(resizeEvt, recalc, false)
  console.log('rem自适应')
}(document, window))
export {}