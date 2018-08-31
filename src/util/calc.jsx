import React from 'react'
import store from 'stores'
import _ from 'lodash'

import CanvasContent from 'content/CanvasContent'
import RowContent from 'content/RowContent'
import CellContent from 'content/CellContent'

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

export const isPercent = val => /\d+%$/.test(val)
export const mapContent = content => {
  if (content.type){
    switch (content.type){
      case 'canvas':
        return (
          <CanvasContent key={content.path} data={content} />
        )
      case 'row':
        return (
          <RowContent key={content.path} data={content} />
        )
      case 'cell':
        return (
          <CellContent key={content.path} data={content} />
        )
      default:
        return null
    }
  } else {
    return Object.values(content).map(data => mapContent(data))
  }
}

export const findContent = (path) => {
  const originContent = _.cloneDeep(store.canvasStore.content)
  const content = path.split('/').reduce((content, pos) => {
    return pos ? content['content'][pos] : content
  }, originContent)

  return content || originContent
}
