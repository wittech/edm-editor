// 判断数值是否是百分比
export const isPercent = val => /\d+%$/.test(val)

export const getOffsetPos = (el, relativeEl) => {
  let top = 0,
    left = 0

  top += el.offsetTop
  left += el.offsetLeft

  if (el.offsetParent && el.offsetParent !== relativeEl) {
    top += getOffsetPos(el.offsetParent, relativeEl).top
    left += getOffsetPos(el.offsetParent, relativeEl).left
  }

  return { top, left }
}


export const setStyle = (el, style) => {
  Object.entries(style).forEach(([attr, value]) => {
    if (/^\d+$/.test(value)){
      value = `${value}px`
    }
    el.style[attr] = value
  })
}
