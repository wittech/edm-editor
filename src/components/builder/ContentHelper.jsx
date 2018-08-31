import React from 'react'
import store from 'stores'

export const Selectable = props => {
  const handleSelect = e => {
    e.stopPropagation()
    store.canvasStore.select(props.path)
  }

  return React.cloneElement(props.children, {
    onClick: handleSelect
  })
}

export const Dragable = props => {
  const last = { x: 0, y: 0 }
  const start = {}
  const current = {}
  const handleDrag = e => {
    e.stopPropagation()
    if (!e.clientX && !e.clientY) {
      return false
    }
    current.x = e.clientX - start.x + last.x
    current.y = e.clientY - start.y + last.y
    e.target.style.left = `${current.x}px`
    e.target.style.top = `${current.y}px`
  }

  const handleDragStart = e => {
    e.stopPropagation()
    start.x = e.clientX
    start.y = e.clientY
    e.target.style.position = 'relative'
    e.target.style.transition = 'none'
  }

  const handleDragEnd = e => {
    e.stopPropagation()
    if (e.target.tagName !== 'IMG') {
      handleDrag(e)
    }
    last.x = current.x
    last.y = current.y
    e.target.style.transition = 'all ease 0.3s'
  }

  return React.cloneElement(props.children, {
    draggable: true,
    onDrag: handleDrag,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onClick: props.onClick
  })
}

