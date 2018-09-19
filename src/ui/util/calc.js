export const getOffsetPos = el => {
  let top = 0,
    left = 0

  top += (el.offsetTop)
  left += el.offsetLeft

  if (el.offsetParent) {
    top += getOffsetPos(el.offsetParent).top
    left += getOffsetPos(el.offsetParent).left
  }

  return { top, left }
}
