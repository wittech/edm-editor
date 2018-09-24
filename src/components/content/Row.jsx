import React from 'react'
import { observer } from 'mobx-react'
import store from 'stores'
import { sturctureGroup } from '../manager/StructureManager'

@observer
export default class Row extends React.Component {
  el = React.createRef()
  elRect = {}

  componentDidMount(){
    this.elRect = this.el.current.getBoundingClientRect()
  }

  handleDrop = e => {
    e.preventDefault()
    e.persist()
    e.stopPropagation()

    const y = e.pageY
    const center = (this.elRect.top + this.elRect.bottom) / 2
    const position = y > center ? 'after' : 'before'
    const type = e.dataTransfer.getData('type')

    if (type === 'row-move'){
      const path = e.dataTransfer.getData('path')
      store.canvasStore.moveRow(path, this.props.path, position)
    }

    if (type === 'row-insert'){
      const rowType = e.dataTransfer.getData('row-type')
      store.canvasStore.insertRow(sturctureGroup[rowType], this.props.path, position)
    }
  }

  handleDragStart = e => {
    e.dataTransfer.setData('type', 'row-move')
    e.dataTransfer.setData('path', this.props.path)
  }

  handleDragEnter = () => {
    store.canvasStore.currentDragGoal = this.props.path
  }

  handleMouseMove = e => {
    const y = e.pageY
    const b = this.elRect.bottom

    if (y > b - 10 && y<b){
      this.el.current.style.cursor = 's-resize'
    } else {
      this.el.current.style.cursor = 'default'
    }
  }

  render() {
    const { path, children } = this.props

    return (
      <table
        ref={this.el}
        style={{ width: '100%' }}
        draggable={(store.canvasStore.dragType === 'row').toString()}
        onDragEnter={this.handleDragEnter}
        onDragStart={this.handleDragStart}
        onDragOver={e => {
          e.preventDefault(); e.stopPropagation()
        }}
        onDrag={this.handleDrag}
        onMouseMove={this.handleMouseMove}
        onDrop={this.handleDrop}
      >
        <tbody>
          <tr
            className={`main-row ${store.canvasStore.currentSelect.path === path ? 'current-select' : ''}`}
          >
            {children}
          </tr>
        </tbody>
      </table>
    )
  }
}
