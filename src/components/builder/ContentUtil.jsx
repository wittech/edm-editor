import React from 'react'
import store from 'stores'


export class Selectable extends React.Component {
  handleSelect = e => {
    e.stopPropagation()

    // 获取当前选中的
    store.canvasStore.select(this.props.path)
  }

  render() {
    return React.cloneElement(this.props.children, {
      onClick: this.handleSelect,
    })
  }
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
    props.onDrag && props.onDrag()
  }

  const handleDragStart = e => {
    e.stopPropagation()
    start.x = e.clientX
    start.y = e.clientY
    e.target.style.position = 'relative'
    e.target.style.transition = 'none'
    props.onDragStart && props.onDragStart()
  }

  const handleDragEnd = e => {
    e.stopPropagation()
    last.x = current.x
    last.y = current.y
    e.target.style.left = 0
    e.target.style.top = 0
    e.target.style.transition = 'all ease 0.3s'
    props.onDragEnd && props.onDragEnd(e, last.x, last.y)
  }

  return React.cloneElement(props.children, {
    draggable: true,
    onDrag: handleDrag,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onClick: props.onClick,
  })
}
